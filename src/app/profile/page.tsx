'use client'

import AnnouncingWinnerTimer from '@/components/AnnouncingWinnerTimer'
import HelpUsToKnowYourBetter from '@/components/common/HelpUsToKnowYourBetter'
import ReferAFriend from '@/components/common/ReferAFriend'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import UserAddressCard from '@/components/common/UserAddressCard'
import UserComicsCoinsAndRankCard from '@/components/common/UserComicsCoinsAndRankCard'
import ProfileCard from '@/components/ProfileCard'
import UserGeneratedJokecComponent from '@/components/UserGeneratedJokecComponent'
import React, { useEffect, useState } from 'react'
import { BreakTheIceExitPopup } from '@/components/ExitPopUps'
import useAppSelector from '@/hooks/useSelector'
import { useRouter } from 'next/navigation'
import { updateBreakTheIceModal } from '@/store/profile/profile.slice'
import useAppDispatch from '@/hooks/useDispatch'

const ProfilePage = () => {

  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user,breakTheIceModal } = useAppSelector(state => state.profile)

  return (
    <ScreenWrapper>
      <div className='flex flex-col gap-2'>
        <ProfileCard />
        <UserComicsCoinsAndRankCard />
        <div className='flex flex-col gap-[24px] md:gap-[40px]'>
          <UserAddressCard />
          <ReferAFriend />
          <HelpUsToKnowYourBetter />
          <UserGeneratedJokecComponent />
        </div>
      </div>
      {breakTheIceModal && (
        <BreakTheIceExitPopup
          open={breakTheIceModal}
          onClose={() => {
            dispatch(updateBreakTheIceModal({ breakTheIceModal: false }))
          }}
        />
      )}
    </ScreenWrapper>
  )
}

export default ProfilePage
