'use client'

import AktivGroteskText from '@/components/common/AktivGroteskText'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import UgcComponent from '@/components/UgcComponent'
import React from 'react'
import { useRouter } from 'next/navigation'


const UserGeneratedJokes = () => {
  const router = useRouter()
  return (
    <ScreenWrapper>
      <div>
        <div className='flex flex-col gap-[4px] md:gap-[12px]'>
          <div className='flex justify-between items-center'>
            <AktivGroteskText
              fontSize='text-[16px] md:text-[30px] uppercase'
              fontWeight='font-[700]'
              text='Joke Box'
            />
            <button onClick={() => router.push('/hall-of-lame-leaderboard')}>
              <AktivGroteskText
                fontSize='text-[12px] md:text-[20px]'
                fontWeight='font-[400]'
                className='text-[#11A64B]'
                text='Hall of Lame >'
              />
            </button>
          </div>
          <AktivGroteskText
            fontSize='text-[12px] md:text-[20px]'
            fontWeight='font-[400]'
            text='Jokes For you, Created By You'
          />
        </div>
        <UgcComponent />
      </div>
    </ScreenWrapper>
  )
}

export default UserGeneratedJokes
