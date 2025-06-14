"use client";
import { useEffect, useState } from "react";
import Login from "@/components/common/Login";
import OtpModal from "@/components/common/OtpModal";
import Signup from "@/components/common/Signup";
import SurpriseMeLockModal from "@/components/common/SurpriseMeLockModal";
import SurpriseMeModal from "@/components/common/SurpriseMeModal";
import useAppSelector from "@/hooks/useSelector";
import { useCMSData } from "@/data";

import Banner from "@/components/common/Banner/Banner";
import bannerImage from "../../public/assets/images/banner-top.svg";
import Header from "@/components/common/Header/Header";
import VideoScroll from "@/components/video-carousel/VideoScroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import CircularBoxesModal, {
  BoxIds,
} from "@/components/common/CircularBoxesModal";
import useWindowWidth from "@/hooks/useWindowWidth";
import SvgIcons from "@/components/common/SvgIcons";
import { GA_EVENTS, ICONS_NAMES } from "@/constants";
import { updateSurpriseMe } from "@/store/auth/auth.slice";
import useAppDispatch from "@/hooks/useDispatch";
import { useGetJokes } from "@/api/hooks/JokeHooks";
import { useLanguage } from "@/hooks/useLanguage";
import { triggerGAEvent } from "@/utils/gTagEvents";
import HomePageJokeSection from "./common/HomePageJokeSection";
import { PJChallenge } from "./Banners";
import { useRouter } from "next/navigation";

export default function HomePageClient() {
  const {
    otpSent,
    otpVerified,
    loginModal,
    crossModal,
    enableCoachMarks,
    refreshTokenNotVerified,
  } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const width = useWindowWidth();

  const [isClient, setIsClient] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsClient(true);
  }, []);

  // Get mapped CMS data using our data layer
  const cmsData = useCMSData(mounted);

  // Fetch jokes to populate video carousel dynamically
  const { selectedLanguage } = useLanguage();
  const { data: jokesResponse } = useGetJokes({
    limit: 3,
    language: selectedLanguage,
  });

  // Map API response to the structure expected by <VideoScroll />
  const jokesData = jokesResponse?.ok ? (jokesResponse.data as any[]) : [];
  const videoData = jokesData.map((joke) => ({
    id: joke.id,
    src: joke.thumbnail_url,
    url: `/scroll-and-lol?selected_joke=${encodeURIComponent(joke.id)}`,
  }));

  const categories: {
    id: string;
    name: string;
    icon: string;
    url?: string;
  }[] = [
    {
      id: "category1",
      name: "Cricket",
      icon: ICONS_NAMES.CRICKET,
      url: "/pick-mood",
    },
    {
      id: "category2",
      name: "Animals",
      icon: ICONS_NAMES.ANIMAL,
      url: "/pick-mood",
    },
    {
      id: "category3",
      name: "Food",
      icon: ICONS_NAMES.FOOD,
      url: "/pick-mood",
    },
    {
      id: "category4",
      name: "Wedding",
      icon: ICONS_NAMES.RELATIONSHIP,
      url: "/pick-mood",
    },
    {
      id: "category5",
      name: "College",
      icon: ICONS_NAMES.COLLEGE,
      url: "/pick-mood",
    },
    {
      id: "category6",
      name: "Office",
      icon: ICONS_NAMES.OFFICE,
      url: "/pick-mood",
    },
    {
      id: "category7",
      name: "Family",
      icon: ICONS_NAMES.FAMILY,
      url: "/pick-mood",
    },
    {
      id: "category8",
      name: "Friends",
      icon: ICONS_NAMES.FRIENDS,
      url: "/pick-mood",
    },
    {
      id: "category9",
      name: "Finance",
      icon: ICONS_NAMES.FINANCE,
      url: "/pick-mood",
    },
    {
      id: "category10",
      name: "Daily Humour",
      icon: ICONS_NAMES.DAILY_HUMOR,
      url: "/pick-mood",
    },
    {
      id: "category11",
      name: "Self",
      icon: ICONS_NAMES.SELF,
      url: "/pick-mood",
    },
    {
      id: "category12",
      name: "Adulting",
      icon: ICONS_NAMES.ADULTING,
      url: "/pick-mood",
    },
    {
      id: "category13",
      name: "Observation",
      icon: ICONS_NAMES.OBSERVING,
      url: "/pick-mood",
    },
    {
      id: "category14",
      name: "Internet",
      icon: ICONS_NAMES.INTERNET,
      url: "/pick-mood",
    },
    {
      id: "category15",
      name: "Pollution",
      icon: ICONS_NAMES.POLLUTION,
      url: "/pick-mood",
    },
    {
      id: "category16",
      name: "Travel",
      icon: ICONS_NAMES.TRAVEL,
      url: "/pick-mood",
    },
    {
      id: "category17",
      name: "Dating",
      icon: ICONS_NAMES.DATING,
      url: "/pick-mood",
    },
    {
      id: "category18",
      name: "Traffic",
      icon: ICONS_NAMES.TRAFFIC,
      url: "/pick-mood",
    },
    {
      id: "category19",
      name: "OTT",
      icon: ICONS_NAMES.OTT,
      url: "/pick-mood",
    },
    {
      id: "category20",
      name: "Non-Genre",
      icon: ICONS_NAMES.NON_GENRE,
      url: "/pick-mood",
    },
  ];

  // Calculate how many pages we need based on screen size
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Default to desktop
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Use window check for client-side only
    const handleResize = () => {
      // Set items per page based on screen width
      if (window.innerWidth < 768) {
        setItemsPerPage(5); // Mobile: 5 items
      } else {
        setItemsPerPage(6); // Desktop: 6 items
      }
    };

    // Initial check
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (width < 768) {
      if (crossModal) {
        setIsModalOpen(true);
      } else {
        setIsModalOpen(false);
      }
    } else {
      setIsModalOpen(false);
    }
  }, [width, crossModal]);

  // Calculate page count
  useEffect(() => {
    setPageCount(Math.ceil(categories.length / itemsPerPage));
  }, [itemsPerPage, categories.length]);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      const selectedIndex = api.selectedScrollSnap();
      const totalItems = categories.length;
      const lastPage = Math.ceil(totalItems / itemsPerPage) - 1;

      // Check if we're at or near the end of the carousel
      if (selectedIndex >= totalItems - itemsPerPage) {
        setCurrent(lastPage);
      } else {
        setCurrent(Math.floor(selectedIndex / itemsPerPage));
      }
    });
  }, [api, itemsPerPage, categories.length]);

  // Function to navigate to a specific page
  const goToPage = (pageIndex: number) => {
    if (!api) return;
    api.scrollTo(pageIndex * itemsPerPage);
  };

  // Function to handle category click - will trigger modal
  const handleCategoryClick = (category: (typeof categories)[0]) => {
    console.log(`Category clicked: ${category.name}`);
    // Modal trigger logic would go here
  };

  const { isAuthenticated, isFirstLogin, surpriseMe } = useAppSelector(
    (state) => state.auth
  );

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePJChallengeClick = () => {
    triggerGAEvent(GA_EVENTS.SPRITE_J24_SUBMIT_JOKE);
    router.push("/submit-your-joke");
  };

  return (
    <div className="bg-lightGray min-h-screen">
      <div className="container mx-auto md:pt-24 pt-20">
        {/* Modals */}
        {!isAuthenticated && refreshTokenNotVerified && <SurpriseMeLockModal />}
        {!isAuthenticated && loginModal && <Login />}
        {!isAuthenticated && otpSent && <OtpModal />}
        {isAuthenticated && otpVerified && isFirstLogin && <Signup />}
        {isAuthenticated &&
          !isFirstLogin &&
          surpriseMe &&
          !enableCoachMarks && (
            <SurpriseMeModal
              onClose={() => {
                dispatch(updateSurpriseMe({ surpriseMe: false }));
              }}
            />
          )}

        <Banner
          type="image"
          src={bannerImage.src}
          className="rounded-lg banner-section mx-5 md:mx-0"
        />
        {/* Video Scroll */}
        <Header
          title={cmsData.homePage.scrollAndLolText}
          className="md:mt-[40px] md:mb-[24px] mt-[20px] mb-[16px]"
          viewAllUrl="/scroll-and-lol"
          viewAllButtonText={cmsData.homePage.viewAllButtonText}
        />
        <div className="video-section">
          <VideoScroll videos={videoData} />
        </div>
        {/* Pick your mood */}
        <Header
          title={cmsData.homePage.pickYourMoodHeading}
          className="md:mb-[24px] mb-[16px] md:mt-0 mt-[20px]"
          viewAllUrl="/pick-mood"
          viewAllButtonText={cmsData.homePage.viewAllButtonText}
          description={cmsData.homePage.pickYourMoodSubheading}
        />
        <div id={BoxIds.PICK_YOUR_MOOD} className="categories-section">
          <Carousel
            className="md:mx-0 mx-4"
            setApi={setApi}
            opts={{
              align: "start",
              loop: false,
              skipSnaps: true,
            }}
          >
            <CarouselContent>
              {categories.map((category) => (
                <CarouselItem
                  key={category.id}
                  className="basis-1/5 md:basis-1/6"
                >
                  <button
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <div className="rounded-full bg-white w-[60px] h-[60px] md:w-[140px] md:h-[140px] flex items-center justify-center md:hover:border-2 hover:border hover:border-green transition-all duration-900 md:hover:shadow-lg">
                      <SvgIcons
                        name={category.icon}
                        className="w-10 h-10 md:w-20 md:h-20"
                      />
                    </div>
                    <p className="text-center font-medium mt-3 text-xs md:text-lg">
                      {category.name}
                    </p>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Navigation dots - page based */}
          <div className="flex justify-center md:gap-1 gap-[1.77px] md:mb-10 mb-0 md:mt-[40px] mt-[8px]">
            {Array.from({ length: pageCount }).map((_, index) => {
              const isActive = index === current;
              const key = `pagination-dot-${index}`;

              const classes = [
                "h-1 rounded-full transition-all duration-300",
                isActive
                  ? "md:w-[24px] w-[17.73px] bg-black"
                  : "md:w-[12px] w-[8.86px] bg-gray-300",
              ].join(" ");

              return (
                <button
                  key={key}
                  className={classes}
                  onClick={() => goToPage(index)}
                  aria-label={`Go to page ${index + 1}`}
                />
              );
            })}
          </div>
        </div>

        {/* PJ Challenge */}
        <div className="challenge-section md:mt-0 mt-[20px] mx-4 md:mx-0 mb-[20px] md:mb-[40px]">
          <PJChallenge
            heading={cmsData.homePage.pjChallengeHeading}
            subheading={cmsData.homePage.pjChallengeSubheading}
            buttonText={cmsData.homePage.pjBannerSubmitButtonText}
            onClick={handlePJChallengeClick}
          />
        </div>

        {isAuthenticated && <HomePageJokeSection isClient={isClient} />}

        {/* Follow Sprite */}
        <div className="bg-[#121212] text-white pt-[13.19px] mx-4 rounded-lg mb-[90px] block md:hidden">
          <h2 className="text-center text-md font-medium mb-[13px]">
            {cmsData.homePage.followSprite}
          </h2>
          <div className="flex justify-center gap-6 pb-[16.18px]">
            {[
              {
                id: 1,
                href: "https://www.facebook.com/sprite",
                icon: (
                  <SvgIcons name={ICONS_NAMES.FACEBOOK} className="w-5 h-5" />
                ),
                label: "Facebook",
              },
              {
                id: 2,
                href: "https://www.instagram.com/sprite",
                icon: (
                  <SvgIcons name={ICONS_NAMES.INSTAGRAM} className="w-5 h-5" />
                ),
                label: "Instagram",
              },
              {
                id: 3,
                href: "https://www.youtube.com/sprite",
                icon: (
                  <SvgIcons name={ICONS_NAMES.YOUTUBE} className="w-5 h-5" />
                ),
                label: "YouTube",
              },
              {
                id: 4,
                href: "https://www.whatsapp.com",
                icon: (
                  <SvgIcons name={ICONS_NAMES.WHATSAPP} className="w-5 h-5" />
                ),
                label: "WhatsApp",
              },
            ].map((social) => (
              <button
                key={social.id}
                onClick={() => {
                  triggerGAEvent(GA_EVENTS.CLICK);
                  window.open(social.href, "_blank");
                }}
                rel="noopener noreferrer"
                className="bg-white border-none outline-none rounded-full w-[31px] h-[31px] flex items-center justify-center"
                aria-label={`Follow on ${social.label}`}
              >
                {social.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
      {isClient && width < 768 && enableCoachMarks && (
        <CircularBoxesModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
