import { AxiosError, AxiosResponse } from "axios";
import apiClient from "../client";
import { ErrorResponse, SuccessResponse } from "../utils/responseConvertor";
import { API_ROUTES, LOCAL_STORAGE_KEYS } from "../client/config";
import { MainService } from "./MainService";
import { getLocalStorageItem } from "@/utils";
import { AUTHORIZATION_TYPES } from "../client/constant";
import { TSubmitJokeParams } from "../types/JokeTypes";
import gluedin from "gluedin";

export class JokeService extends MainService {
  private static instance: JokeService;

  public static getInstance(): JokeService {
    if (!JokeService.instance) {
      JokeService.instance = new JokeService();
    }
    return JokeService.instance;
  }

  private getAuthHeaders() {
    const token = getLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    return token
      ? {
          Authorization: `${AUTHORIZATION_TYPES.BEARER} ${token}`,
        }
      : {};
  }

  public async GetSurpriseMe() {
    try {
      const endpoint = `${API_ROUTES.JOKES.GET_SURPRISE_ME}?genre=1&language=1`;
      const response = await apiClient.get(endpoint, {
        headers: {
          ...this.getAuthHeaders(),
        },
      });
      console.log("joke response", response);
      const responseData = response.data;
      if (responseData?.success) {
        return SuccessResponse(responseData.data);
      }
      console.log("joke error", responseData);
      return ErrorResponse(responseData?.message ?? "Something went wrong");
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fetch list of jokes for Scroll & LOL screen
   * Corresponds to GET /joke/jokes
   */
  public async GetJokes({
    limit,
    selected_joke,
    preferredJokes,
    language,
  }: import("../types/JokeTypes").TGetJokesParams = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (limit) queryParams.append("limit", limit.toString());
      if (selected_joke) queryParams.append("selected_joke", selected_joke);
      if (preferredJokes) queryParams.append("preferredJokes", preferredJokes);
      if (language) queryParams.append("language", language);

      const endpoint = `${API_ROUTES.JOKES.GET_SCROLL_AND_LOL}${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;

      const response = await apiClient.get(endpoint, {
        headers: {
          ...this.getAuthHeaders(),
        },
      });

      const videosId = response.data?.data?.map((video: any) => video.id) ?? [];

      const feedModule = new gluedin.GluedInFeedModule();
      const getReactionData = await feedModule.Reactions(videosId);
      const reactionResponse = getReactionData?.data ?? {};
      const reactionResult = reactionResponse?.result ?? [];

      const transformedData = response?.data?.data?.map((video: any) => {
        const reactionType = reactionResult?.find(
          (item: any) => item?.videoId === video?.id
        )?.reaction ?? '';
        return {
          ...video,
          reactionType,
          isReacted: reactionType ? true : false,
        };
      });

      const responseData = response.data;
      if (responseData?.success) {
        return SuccessResponse(transformedData);
      }
      return ErrorResponse(responseData?.message ?? "Something went wrong");
    } catch (error) {
      throw error;
    }
  }

  public async SubmitJoke(data: TSubmitJokeParams) {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "file") {
          if (data.format === "Text") {
            const blob = new Blob([data.jokeText || ""], {
              type: "text/plain",
            });
            const textFile = new File([blob], "joke.txt", {
              type: "text/plain",
            });
            formData.append(key, textFile);
          } else if (value instanceof FileList && value.length > 0) {
            formData.append(key, value[0]);
          }
        } else {
          formData.append(key, value.toString());
        }
      });
      const response = await apiClient.post(
        API_ROUTES.JOKES.SUBMIT_JOKE,
        formData,
        {
          headers: {
            ...this.getAuthHeaders(),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const responseData = response.data;
      if (responseData?.success) {
        const data = {
          message: responseData.message,
          ok: true,
        };
        return data;
      }
      return ErrorResponse(responseData?.message ?? "Something went wrong");
    } catch (error) {
      throw error;
    }
  }

  public async getUserSubmittedJokes() {
    try {
      const jokesResponse = await apiClient.get(
        API_ROUTES.JOKES.GET_USER_SUBMITTED_JOKES,
        {
          headers: {
            ...this.getAuthHeaders(),
          },
        }
      );
      const jokesResponseData = jokesResponse.data;
      if (jokesResponseData?.success) {
        return SuccessResponse(jokesResponseData.data);
      }
      return ErrorResponse(
        jokesResponseData?.message ?? "Something went wrong"
      );
    } catch (error) {
      throw error;
    }
  }
}
