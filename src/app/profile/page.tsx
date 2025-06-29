"use client";

import HelpUsToKnowYourBetter from "@/components/common/HelpUsToKnowYourBetter";
import ReferAFriend from "@/components/common/ReferAFriend";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import UserAddressCard from "@/components/common/UserAddressCard";
import UserComicsCoinsAndRankCard from "@/components/common/UserComicsCoinsAndRankCard";
import ProfileCard from "@/components/ProfileCard";
import UserGeneratedJokecComponent from "@/components/UserGeneratedJokecComponent";
import React, { useEffect, useState, useRef } from "react";
import useAppSelector from "@/hooks/useSelector";
import { useCMSData } from "@/data";
import {
  CoinAnimation,
  useCoinAnimation,
} from "@/components/common/CoinAnimation";
import { triggerGAEvent } from "@/utils/gTagEvents";
import { GA_EVENTS, SESSION_STORAGE_KEYS } from "@/constants";
import { getSessionStorageItem, setSessionStorageItem } from "@/utils";

const ProfilePage = () => {
  const [mounted, setMounted] = useState(false);

  const prevProfilePercentageRef = useRef<number | null>(null);

  const cmsData = useCMSData(mounted);

  const { user } = useAppSelector((state) => state.profile);

  const { isAnimating, triggerAnimation, animationKey } = useCoinAnimation();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle profile completion animation
  useEffect(() => {
    if (!mounted || !user?.id) return;

    const currentProfilePercentage = user.profile_percentage;
    const previousProfilePercentage = prevProfilePercentageRef.current;

    // Check if animation has already been shown for this user
    const animationShownKey = `profile_completion_animation_shown_${user.id}`;
    const hasAnimationBeenShown =
      localStorage.getItem(animationShownKey) === "true";

    // Trigger animation if:
    // 1. Current percentage is 100%
    // 2. Previous percentage was not 100% (or null on first load)
    // 3. Animation hasn't been shown before for this user
    if (
      currentProfilePercentage === 100 &&
      (previousProfilePercentage === null || previousProfilePercentage < 100) &&
      !hasAnimationBeenShown
    ) {
      // Small delay to ensure smooth animation

      if (
        user?.id &&
        getSessionStorageItem(
          SESSION_STORAGE_KEYS.PROFILE_GA_EVENT_TRIGGERED
        ) !== "true"
      ) {
        triggerGAEvent(GA_EVENTS.SPRITE_J24_COMPLETED_PROFILE_CONSUMER);
        setSessionStorageItem(
          SESSION_STORAGE_KEYS.PROFILE_GA_EVENT_TRIGGERED,
          "true"
        );
      }
      setTimeout(() => {
        triggerAnimation();
        // Mark animation as shown for this user
        localStorage.setItem(animationShownKey, "true");
      }, 500);
    }

    // Update the ref with current percentage
    prevProfilePercentageRef.current = currentProfilePercentage;
  }, [user?.profile_percentage, user?.id, mounted, triggerAnimation]);

  // Handle fragment scrolling when page loads
  useEffect(() => {
    const handleFragmentScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.slice(1)); // Remove the '#'
        if (element) {
          // Add a small delay to ensure all components are rendered
          setTimeout(() => {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
          }, 300);
        }
      }
    };

    // Check for fragment on initial load
    handleFragmentScroll();

    // Also listen for hash changes (in case user navigates back/forward)
    window.addEventListener("hashchange", handleFragmentScroll);

    return () => {
      window.removeEventListener("hashchange", handleFragmentScroll);
    };
  }, [mounted]); // Depend on mounted to ensure DOM is ready

  return (
    <ScreenWrapper>
      <div className="flex flex-col gap-2">
        <ProfileCard />
        <UserComicsCoinsAndRankCard
          comicCoins={cmsData?.myProfile?.comicCoins}
          ranks={cmsData?.myProfile?.rank}
          leaderboardButtonText={cmsData?.myProfile?.leaderboardButtonText}
        />
        <div className="flex flex-col gap-[24px] md:gap-[40px]">
          <UserAddressCard
            addressTextField={cmsData?.myProfile?.addressTextField}
            addClickableText={cmsData?.myProfile?.addClickableText}
            setAsDefault={cmsData?.myProfile?.setAsDefault}
          />
          <ReferAFriend
            referToFriendHeader={cmsData?.myProfile?.referToFriendHeader}
            referNowButtonText={cmsData?.myProfile?.referNowButtonText}
            prevButtonText={cmsData?.myProfile?.prevButtonText}
            nextButtonText={cmsData?.myProfile?.nextButtonText}
            user={cmsData?.myProfile?.user}
            sendReminder={cmsData?.myProfile?.sendReminder}
            status={cmsData?.myProfile?.status}
            referAnother={cmsData?.myProfile?.referAnother}
            myReferrals={cmsData?.myProfile?.myReferrals}
            pending={cmsData?.myProfile?.pending}
            accepted={cmsData?.myProfile?.accepted}
          />
          <HelpUsToKnowYourBetter
            id={"qna"}
            prevButtonText={cmsData?.myProfile?.prevButtonText}
            nextButtonText={cmsData?.myProfile?.nextButtonText}
          />
          <UserGeneratedJokecComponent
            myJokeText={cmsData?.myProfile?.myJokes}
            hallOfLameText={cmsData?.myProfile?.hallOfLameText}
          />
        </div>
      </div>

      {/* Coin Animation for Profile Completion */}
      <CoinAnimation isVisible={isAnimating} animationKey={animationKey} />
    </ScreenWrapper>
  );
};

export default ProfilePage;
