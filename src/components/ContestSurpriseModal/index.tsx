"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SvgIcons from "../common/SvgIcons";
import { ICONS_NAMES } from "@/constants";
import { aktivGrotesk } from "@/app/layout";
import SurpriseMeCTA from "@/components/SurpriseMeCTA";
import { MakeLaughExitPopup } from "@/components/ExitPopUps";
import { useGetSurpriseMeJoke } from "@/api/hooks/JokeHooks";
import { formatNumberToK } from "@/utils";
import CustomPopupWrapper from "../common/CustomPopupWrapper";
import {
  useSendGluedinUserReaction,
  useGetGluedinAssetById,
  useViewGludeinJokes,
} from "@/api/hooks/GluedinHooks";
import { ReactionType } from "@/types";
import { useGlobalLoader } from "@/hooks/useGlobalLoader";
import SerialChillerPopup from "../common/SerialChillerPopup";
import { CoinAnimation, useCoinAnimation } from "../common/CoinAnimation";
import useAppDispatch from "@/hooks/useDispatch";
import { incrementComicCoins } from "@/store/profile/profile.slice";

interface ContestSurpriseModalProps {
  open: boolean;
  onClose: () => void;
  onReaction?: () => void;
}

const ContestSurpriseModal: React.FC<ContestSurpriseModalProps> = ({
  open,
  onClose,
  onReaction,
}) => {
  const [makeLaughExitPopup, setMakeLaughExitPopup] = useState<boolean>(false);
  const [joke, setJoke] = useState<any>(null);
  const [jokeId, setJokeId] = useState<string>("");
  const [reactionType, setReactionType] = useState<string>("");
  const [serialChill, setSerialChill] = useState<boolean>(false);
  const { forceHideLoader } = useGlobalLoader();

  // Coin animation hook
  const { isAnimating, triggerAnimation, animationKey } = useCoinAnimation();

  // Only fetch joke data when modal is open
  const { data: jokeData, isLoading: jokeLoading } = useGetSurpriseMeJoke();

  const {
    mutate: mutateSendGluedinUserReaction,
    data: gluedinUserReactionData,
    isPending: reactionLoading,
  } = useSendGluedinUserReaction();
  const { mutate: viewGludeinJokes, data: viewGludeinJokesData } =
    useViewGludeinJokes();
  const { data: gluedinAssetData } = useGetGluedinAssetById(jokeId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (open && jokeData?.ok) {
      viewGludeinJokes({ assetIds: [jokeData?.data?.id] });
      setJoke(jokeData?.data ?? {});
      setSerialChill(false);
    } else if (open && jokeData?.ok === false) {
      setJoke({});
      setSerialChill(true);
    }
  }, [jokeData, open]);

  useEffect(() => {
    if (gluedinAssetData?.ok) {
      const { isLiked, reactionType } = gluedinAssetData?.data as {
        isLiked: boolean;
        reactionType: string;
      };
      setJoke((prev: any) => ({
        ...prev,
        isLiked: isLiked,
        reactionType: reactionType,
      }));
    }
  }, [gluedinAssetData]);

  const handleSendGluedinUserReaction = (
    reactionType: string,
    assetId: string
  ) => {
    setReactionType(reactionType);
    mutateSendGluedinUserReaction({
      assetId: assetId,
      reactionType: reactionType,
      increaseComicCoin: true,
    });

    // Trigger coin animation on reaction
    if (onReaction) {
      onReaction();
    }
  };

  useEffect(() => {
    if (gluedinUserReactionData?.ok) {
      dispatch(incrementComicCoins());
      setJoke((prev: any) => ({
        ...prev,
        isReacted: true,
        reactionType: reactionType,
        user_reaction: {
          ...prev?.user_reaction,
          [reactionType]: (prev?.user_reaction?.[reactionType] ?? 0) + 1,
        },
      }));

      // Trigger coin animation on successful reaction
      triggerAnimation();
    }
  }, [gluedinUserReactionData]);

  useEffect(() => {
    if (viewGludeinJokesData?.ok && joke) {
      setJoke((prev: any) => ({
        ...prev,
        view_count: prev?.view_count + 1,
      }));
    }
  }, [viewGludeinJokesData]);

  // Handle modal close with proper cleanup
  const handleClose = () => {
    forceHideLoader(); // Ensure any loading states are cleared
    onClose();
  };

  useEffect(() => {
    return () => {
      forceHideLoader(); // Cleanup on unmount
    };
  }, [forceHideLoader]);

  // Don't render anything if modal is not open
  if (!open) {
    return null;
  }

  if (serialChill) {
    return (
      <SerialChillerPopup
        open={serialChill}
        onClose={() => {
          setSerialChill(false);
          handleClose();
        }}
      />
    );
  }

  if (!joke && jokeLoading) {
    return <></>;
  }

  if (!joke) {
    return <></>;
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="border-none md:max-w-[239px] max-w-[277px] shadow-none p-0 rounded-[10px]">
        <div className="absolute border-none outline-none top-[-105px] md:top-[-125px] left-0 flex justify-center items-center w-full">
          <SvgIcons
            name={ICONS_NAMES.SURPRISE_ME}
            className="w-[145px] h-[102px] md:w-[182px] md:h-[114px]"
          />
        </div>
        <div className="flex justify-between items-start px-[10px] pt-[10px]">
          <div className="w-[80%] relative flex gap-[10px]">
            <SvgIcons
              name={ICONS_NAMES.MAN_WITH_SEARCH}
              className="w-[23px] h-[28px]"
            />
            <div className="flex flex-col gap-[2px]">
              <p
                className={`${aktivGrotesk.className} font-[700] md:text-[9px] text-[12px] text-[#000000]`}
              >
                {joke?.title ?? ""}
              </p>
              <p
                className={`${aktivGrotesk.className} font-[400] md:text-[7px] text-[8px] text-[#000000]`}
              >
                {joke?.joke_creator ?? ""}
              </p>
            </div>
          </div>
          <button
            className="flex justify-center items-center cursor-pointer border-none outline-none"
            onClick={() => {
              if (joke?.reactionType) {
                handleClose()
              } else {
                setMakeLaughExitPopup(true)
              }
            }}
          >
            <SvgIcons
              name={ICONS_NAMES.CROSS}
              className="w-[16px] h-[16px] md:w-[13px] md:h-[13px]"
            />
          </button>
        </div>
        <div className="relative max-w-[255px] md:max-w-[220px] h-[429px] md:h-[371px] ml-[11px]">
          <video
            className="w-full h-full relative bg-[#11A64B]  object-fill"
            controls
            autoPlay
            muted
            poster={joke?.thumbnail_url ?? ""}
          >
            <source src={joke?.url ?? ""} type="video/mp4" />
          </video>
        </div>
        <div className="bg-white rounded-[10px] px-[12px] pb-[16px] flex justify-between">
          <div className="flex gap-[24px] md:gap-[14px] pl-[10px]">
            <SurpriseMeCTA
              name={ICONS_NAMES.FUNNY}
              isReacted={joke?.isReacted ?? false}
              disabled={
                joke?.reactionType
                  ? joke?.reactionType !== ReactionType.LAUGH
                  : false
              }
              text={formatNumberToK(
                parseInt(joke?.user_reaction?.laugh, 10) ?? 0
              )}
              onClick={() => {
                handleSendGluedinUserReaction(ReactionType.LAUGH, joke?.id);
              }}
            />
            <SurpriseMeCTA
              name={ICONS_NAMES.MAD}
              isReacted={joke?.isReacted ?? false}
              disabled={
                joke?.reactionType
                  ? joke?.reactionType !== ReactionType.NEUTRAL
                  : false
              }
              text={formatNumberToK(
                parseInt(joke?.user_reaction?.neutral, 10) ?? 0
              )}
              onClick={() => {
                handleSendGluedinUserReaction(ReactionType.NEUTRAL, joke?.id);
              }}
            />
            <SurpriseMeCTA
              name={ICONS_NAMES.ANGRY}
              isReacted={joke?.isReacted ?? false}
              disabled={
                joke?.reactionType
                  ? joke?.reactionType !== ReactionType.SAD
                  : false
              }
              text={formatNumberToK(
                parseInt(joke?.user_reaction?.sad, 10) ?? 0
              )}
              onClick={() => {
                handleSendGluedinUserReaction(ReactionType.SAD, joke?.id);
              }}
            />
          </div>
          <div className="pr-[10px]">
            <SurpriseMeCTA
              name={ICONS_NAMES.VIEWS}
              text={formatNumberToK(parseInt(joke?.view_count, 10) ?? 0)}
              onClick={() => {}}
            />
          </div>
        </div>
        {/* Coin Animation */}
        <CoinAnimation isVisible={isAnimating} animationKey={animationKey} />
      </DialogContent>
      {makeLaughExitPopup && (
        <MakeLaughExitPopup
          open={makeLaughExitPopup}
          onClose={() => {
            setMakeLaughExitPopup(false);
            handleClose();
          }}
          setOpen={setMakeLaughExitPopup}
        />
      )}
    </Dialog>
  );
};

export default ContestSurpriseModal;
