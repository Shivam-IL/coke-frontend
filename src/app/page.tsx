"use client";

import Login from "@/components/common/Login";
import OtpModal from "@/components/common/OtpModal";
import Signup from "@/components/common/Signup";
import SurpriseMeLockModal from "@/components/common/SurpriseMeLockModal";
import SurpriseMeModal from "@/components/common/SurpriseMeModal";
import useAppSelector from "@/hooks/useSelector";

import Banner from "@/components/common/Banner/Banner";
import bannerImage from "../../public/assets/images/banner-top.svg";
import pjChallengeImage from "../../public/assets/images/pj-challenge.svg";
import Header from "@/components/common/Header/Header";
import VideoScroll from "@/components/video-carousel/VideoScroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Image from "next/image";
import CircularBoxesModal, {
  BoxIds,
} from "@/components/common/CircularBoxesModal";
import HomePageSurpriseButton from "@/components/HomePageSurpriseButton";
import useWindowWidth from "@/hooks/useWindowWidth";
import SvgIcons from "@/components/common/SvgIcons";
import { ICONS_NAMES } from "@/constants";
import UgcCard from "@/components/common/UgcCard";
import Link from "next/link";

export default function Home() {
  const { otpSent, otpFilled, loginModal, signupDone, crossModal } =
    useAppSelector((state) => state.auth);
  const width = useWindowWidth();

  // Tour Guide State
  const [runCenteredTour, setRunCenteredTour] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Mount check for client-side rendering
  /*useEffect(() => {
    if (crossModal) {
      setRunCenteredTour(true)
      setIsMounted(true)
    }
  }, [crossModal])*/

  // Tour steps with targets
  const centeredTourSteps = [
    {
      target: ".banner-section",
      content:
        "Welcome to Joke In A Bottle! This is your starting point for endless entertainment.",
      title: "Welcome Guide",
      placement: "bottom" as const,
      disableBeacon: true,
    },
    {
      target: ".video-section",
      content:
        "Scroll through hilarious videos and discover amazing content creators!",
      title: "Video Content",
      placement: "bottom" as const,
      disableBeacon: true,
    },
    {
      target: ".categories-section",
      content:
        "Pick your mood and explore different comedy categories that match your vibe!",
      title: "Pick Your Mood",
      placement: "bottom" as const,
      disableBeacon: true,
    },
    {
      target: ".challenge-section",
      content:
        "Join special challenges and events for extra fun and amazing prizes!",
      title: "Special Events",
      placement: "bottom" as const,
      disableBeacon: true,
    },
  ];

  // Path to the thumbnail image - you'll need to ensure this exists in your project
  const thumbnailPath = "/videos/thumbnail.jpg";

  // Video data for the carousel
  const videoData = [
    {
      id: "video1",
      src: thumbnailPath,
    },
    {
      id: "video2",
      src: thumbnailPath,
    },
    {
      id: "video3",
      src: thumbnailPath,
    },
  ];

  const categories = [
    {
      id: "category1",
      name: "Cricket",
      icon: ICONS_NAMES.CRICKET,
    },
    {
      id: "category2",
      name: "Animals",
      icon: ICONS_NAMES.ANIMAL,
    },
    {
      id: "category3",
      name: "Food",
      icon: ICONS_NAMES.FOOD,
    },
    {
      id: "category4",
      name: "Wedding",
      icon: ICONS_NAMES.RELATIONSHIP,
    },
    {
      id: "category5",
      name: "College",
      icon: ICONS_NAMES.COLLEGE,
    },
    {
      id: "category6",
      name: "Office",
      icon: ICONS_NAMES.OFFICE,
    },
    {
      id: "category7",
      name: "Family",
      icon: ICONS_NAMES.FAMILY,
    },
    {
      id: "category8",
      name: "Friends",
      icon: ICONS_NAMES.FRIENDS,
    },
    {
      id: "category9",
      name: "Finance",
      icon: ICONS_NAMES.FINANCE,
    },
    {
      id: "category10",
      name: "Childhood",
      icon: ICONS_NAMES.DAILY_HUMOR,
    },
    {
      id: "category11",
      name: "Self",
      icon: ICONS_NAMES.SELF,
    },
    {
      id: "category12",
      name: "Adulting",
      icon: ICONS_NAMES.ADULTING,
    },
    {
      id: "category13",
      name: "Observation",
      icon: ICONS_NAMES.OBSERVING,
    },
    {
      id: "category14",
      name: "Internet",
      icon: ICONS_NAMES.INTERNET,
    },
    {
      id: "category15",
      name: "Pollution",
      icon: ICONS_NAMES.POLLUTION,
    },
    {
      id: "category16",
      name: "Travel",
      icon: ICONS_NAMES.TRAVEL,
    },
    {
      id: "category17",
      name: "Dating",
      icon: ICONS_NAMES.DATING,
    },
    {
      id: "category18",
      name: "Traffic",
      icon: ICONS_NAMES.TRAFFIC,
    },
    {
      id: "category19",
      name: "OTT",
      icon: ICONS_NAMES.OTT,
    },
    {
      id: "category20",
      name: "Non-Genre",
      icon: ICONS_NAMES.NON_GENRE,
    },
  ];

  // Calculate how many pages we need based on screen size
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Default to desktop
  const [activeTab, setActiveTab] = useState<"Latest" | "Trending">("Trending");
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

  return (
    <div className="bg-lightGray min-h-screen">
      <div className="container mx-auto md:pt-24 pt-20">
        {/* Modals */}
        <SurpriseMeLockModal />
        {loginModal && <Login />}
        {otpSent && <OtpModal />}
        {otpFilled && <Signup />}
        {signupDone && <SurpriseMeModal />}

        <Banner
          type="image"
          src={bannerImage.src}
          className="rounded-lg banner-section mx-5"
        />
        {/* Video Scroll */}
        <Header
          title="SCROLL & LOL"
          className="md:my-[40px] mt-[20px] mb-[16px]"
          viewAllUrl="/scroll-and-lol"
        />
        <div className="video-section">
          <VideoScroll videos={videoData} />
        </div>
        {/* Pick your mood */}
        <Header
          title="Pick your mood"
          className="md:mb-[40px] mb-[16px] md:mt-0 mt-[20px]"
          viewAllUrl="/scroll-and-lol"
          description="Pick your Delulu, Get your Solulu"
        />
        <div id={BoxIds.PICK_YOUR_MOOD} className="categories-section">
          <Carousel
            className="mx-4"
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
                  <div
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <div className="rounded-full bg-white w-[60px] h-[60px] md:w-[120px] md:h-[120px] flex items-center justify-center md:hover:border-2 hover:border hover:border-green transition-all duration-900 md:hover:shadow-lg">
                      <SvgIcons
                        name={category.icon}
                        className="w-10 h-10 md:w-20 md:h-20"
                      />
                    </div>
                    <p className="text-center font-medium mt-3 text-xs md:text-lg">
                      {category.name}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Navigation dots - page based */}
          <div className="flex justify-center md:gap-2 gap-[1.77px] md:mb-10 mb-0 md:mt-[40px]">
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === current
                    ? "md:w-8 w-[17.73px] bg-black"
                    : "md:w-4 w-[8.86px] bg-gray-300"
                }`}
                onClick={() => goToPage(index)}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* PJ Challenge */}
        <div className="challenge-section md:mt-0 mt-[20px]">
          <Link href="/submit-your-joke">
            <Banner
              type="image"
              src={pjChallengeImage.src}
              className="rounded-lg mb-4 mx-5 cursor-pointer"
            />
          </Link>
        </div>

        {/* Joke Box */}
        <Header
          title="Joke Box"
          className="md:mb-[40px] mb-[16px] md:mt-0 mt-[20px]"
          viewAllUrl="/user-generated-jokes"
          description="Jokes For you, Created By You"
        />
        <div className="mx-4 mt-[20px] mb-[20px]">
          <div className="flex justify-center w-full">
            <div className="flex items-center bg-white rounded-full w-max mb-4 p-2 justify-center gap-2 relative">
              <div
                className={`absolute transition-all duration-300 ease-in-out h-[calc(100%-8px)] rounded-full bg-green ${
                  activeTab === "Latest"
                    ? "left-[4px] w-[84px]"
                    : "left-[92px] w-[87px]"
                }`}
              />
              <button
                onClick={() => setActiveTab("Latest")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative z-10 ${
                  activeTab === "Latest"
                    ? "text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                Latest
              </button>
              <button
                onClick={() => setActiveTab("Trending")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative z-10 ${
                  activeTab === "Trending"
                    ? "text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                Trending
              </button>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-scroll scrollbar-hide">
            <UgcCard />
            <UgcCard />
          </div>
        </div>

        {/* Follow Sprite */}
        <div className="bg-[#121212] text-white pt-[13.19px] mx-4 rounded-lg mb-[90px] block md:hidden">
          <h2 className="text-center text-md font-semibold mb-[13px]">
            Follow Sprite<sup>®</sup>
          </h2>
          <div className="flex justify-center gap-6 pb-[16.18px]">
            {[
              {
                href: "https://www.facebook.com/sprite",
                icon: (
                  <SvgIcons name={ICONS_NAMES.FACEBOOK} className="w-5 h-5" />
                ),
                label: "Facebook",
              },
              {
                href: "https://www.instagram.com/sprite",
                icon: (
                  <SvgIcons name={ICONS_NAMES.INSTAGRAM} className="w-5 h-5" />
                ),
                label: "Instagram",
              },
              {
                href: "https://www.youtube.com/sprite",
                icon: (
                  <SvgIcons name={ICONS_NAMES.YOUTUBE} className="w-5 h-5" />
                ),
                label: "YouTube",
              },
              {
                href: "https://www.whatsapp.com",
                icon: (
                  <SvgIcons name={ICONS_NAMES.WHATSAPP} className="w-5 h-5" />
                ),
                label: "WhatsApp",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-full w-[31px] h-[31px] flex items-center justify-center"
                aria-label={`Follow on ${social.label}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      {width < 768 && crossModal && (
        <CircularBoxesModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      <HomePageSurpriseButton />
    </div>
  );
}
