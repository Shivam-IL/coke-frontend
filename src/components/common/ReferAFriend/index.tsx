import React, { useState } from 'react'
import AktivGroteskText from '../AktivGroteskText'
import {
  ICONS_NAMES,
  MY_REFERRAL,
  REFER_A_FRIEND_TEXT,
  REFER_ANOTHER,
  REFER_NOW,
  SEND_REMINDER,
  STATUS,
  USER
} from '@/constants'
import GreenCTA from '@/components/GreenCTA'
import SvgIcons from '../SvgIcons'
import ReferNowModal from '../ReferNowModal'

const ReferAFriend = () => {
  const data: any[] = [1]
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      {data?.length === 0 && (
        <div className='flex justify-between items-center p-[16px] bg-white rounded-[5px]'>
          <AktivGroteskText
            text={REFER_A_FRIEND_TEXT}
            fontSize='text-[16px] md:text-[28px]'
            fontWeight='font-[700]'
          />
          <div>
            <GreenCTA
              paddingClass='p-[10px] px-[20px]'
              text={REFER_NOW}
              onClick={() => {}}
            />
          </div>
        </div>
      )}
      {data?.length > 0 && (
        <div className='flex flex-col gap-[16px] md:gap-[24px]'>
          <AktivGroteskText
            text={MY_REFERRAL}
            fontSize='text-[16px] md:text-[28px]'
            fontWeight='font-[700]'
          />
          <div className='flex justify-between px-[12px] py-[12px] md:px-[41px] md:py-[28px] bg-[#FFE200] rounded-[5px] md:rounded-[20px]'>
            <AktivGroteskText
              text={USER}
              fontSize='text-[12px] md:text-[28px]'
              fontWeight='font-[700]'
            />
            <AktivGroteskText
              text={STATUS}
              fontSize='text-[12px] md:text-[28px]'
              fontWeight='font-[700]'
            />
          </div>
          <div className='flex flex-col gap-[8px] md:gap-[20px]'>
            <div className='bg-white flex justify-between items-center px-[8px] py-[8px] md:py-[23px] md:px-[45px] rounded-[5px] md:rounded-[20px]'>
              <div className='flex items-center gap-[16px] md:gap-[24px]'>
                <SvgIcons
                  name={ICONS_NAMES.USER}
                  className='w-[21px] h-[21px] md:w-[34px] md:h-[41px]'
                />
                <AktivGroteskText
                  text='+91-XXXXXX8888'
                  fontSize='text-[12px] md:text-[28px]'
                  fontWeight='font-[400]'
                />
              </div>
              <AktivGroteskText
                text='Pending'
                fontSize='text-[12px] md:text-[28px]'
                fontWeight='font-[400]'
              />
            </div>
          </div>
          <div className='w-full flex justify-center gap-[12px] md:gap-[28px] md:pt-[40px]'>
            <button className='px-[24px] box-border py-[8px] md:py-[20px] md:px-[60px] relative border-[1px] md:border-[3px] border-[#00953B] rounded-[100px]'>
              <AktivGroteskText
                text={SEND_REMINDER}
                fontSize='text-[14px] md:text-[24px]'
                fontWeight='font-[700]'
              />
            </button>
            <GreenCTA
              className=''
              fontSize='text-[14px] md:text-[24px]'
              fontWeight='font-[700]'
              paddingClass='px-[20px] py-[8px] md:py-[20px] md:px-[60px]'
              text={REFER_ANOTHER}
              onClick={() => {
                setOpen(true)
              }}
            />
          </div>
        </div>
      )}
      {open && <ReferNowModal  open={open} setOpen={setOpen} />}
    </>
  )
}

export default ReferAFriend
