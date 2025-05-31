import React, { useState } from 'react'
import AktivGroteskText from '../AktivGroteskText'
import {
  ICONS_NAMES,
  MY_REFERRAL,
  REFER_A_FRIEND_TEXT,
  REFER_ANOTHER,
  REFER_NOW,
  REFER_NOW_MODAL_DATA,
  REFFERAL_STATUS_POPUP_DATA,
  SEND_REMINDER,
  STATUS,
  USER
} from '@/constants'
import GreenCTA from '@/components/GreenCTA'
import SvgIcons from '../SvgIcons'
import ReferNowModal from '../ReferNowModal'
import { useRouter } from 'next/navigation'
import CustomPopupWrapper from '../CustomPopupWrapper'

const ReferAFriend = () => {
  const data: any[] = [1]
  const [open, setOpen] = useState<boolean>(false)
  const [open2, setOpen2] = useState<boolean>(false)
  const [open3, setOpen3] = useState<boolean>(false)

  const [referStatus1, setReferStatus1] = useState<boolean>(false)
  const [referStatus2, setReferStatus2] = useState<boolean>(false)
  const [referStatus3, setReferStatus3] = useState<boolean>(false)
  const [phoneNumber, setPhoneNumber] = useState<string>('')

  const handleChange = (key: string, value: string) => {
    setPhoneNumber(value)
  }

  const router = useRouter()
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
              className='leading-tight'
              fontSize='text-[14px] md:text-[24px]'
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
          <div className='flex justify-between px-[12px] py-[12px] md:px-[35px] md:py-[24px] bg-[#FFE200] rounded-[5px] md:rounded-[20px]'>
            <AktivGroteskText
              text={USER}
              fontSize='text-[12px] md:text-[20px]'
              fontWeight='font-[700]'
            />
            <AktivGroteskText
              text={STATUS}
              fontSize='text-[12px] md:text-[20px]'
              fontWeight='font-[700]'
            />
          </div>
          <div className='flex flex-col gap-[8px] md:gap-[20px]'>
            <div className='bg-white flex justify-between items-center px-[8px] py-[8px] md:py-[18px] md:px-[45px] rounded-[5px] md:rounded-[20px]'>
              <div className='flex items-center gap-[16px] md:gap-[24px]'>
                <SvgIcons
                  name={ICONS_NAMES.USER}
                  className='w-[21px] h-[21px] md:w-[24px] md:h-[28px]'
                />
                <AktivGroteskText
                  text='+91-XXXXXX8888'
                  fontSize='text-[12px] md:text-[20px]'
                  fontWeight='font-[400]'
                />
              </div>
              <AktivGroteskText
                text='Pending'
                fontSize='text-[12px] md:text-[20px]'
                fontWeight='font-[400]'
              />
            </div>
          </div>
          <div className='w-full flex justify-center gap-[12px] md:gap-[28px] md:pt-[40px]'>
            <button
              onClick={() => {
                router.push('/send-reminder')
              }}
              className='px-[24px] box-border py-[8px] md:py-[20px] md:px-[60px] relative border-[1px] md:border-[3px] border-[#00953B] rounded-[100px]'
            >
              <AktivGroteskText
                text={SEND_REMINDER}
                className='leading-tight'
                fontSize='text-[14px] md:text-[20px]'
                fontWeight='font-[700]'
              />
            </button>
            <GreenCTA
              className='leading-tight'
              fontSize='text-[14px] md:text-[20px]'
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
      {open && (
        <ReferNowModal
          title={REFER_NOW_MODAL_DATA.DEFAULT.title}
          subtitle={REFER_NOW_MODAL_DATA.DEFAULT.subtitle}
          ctaText={REFER_NOW_MODAL_DATA.DEFAULT.ctaText}
          phoneNumber={phoneNumber}
          onChange={handleChange}
          open={open}
          onClose={() => {
            setOpen(false)
            setOpen2(true)
          }}
        />
      )}
      {open2 && (
        <ReferNowModal
          title={REFER_NOW_MODAL_DATA.PRANK_US.title}
          subtitle={REFER_NOW_MODAL_DATA.PRANK_US.subtitle}
          ctaText={REFER_NOW_MODAL_DATA.PRANK_US.ctaText}
          phoneNumber={phoneNumber}
          onChange={handleChange}
          open={open2}
          onClose={() => {
            setOpen2(false)
            setOpen3(true)
          }}
        />
      )}
      {open3 && (
        <ReferNowModal
          title={REFER_NOW_MODAL_DATA.SELF_LOVE.title}
          subtitle={REFER_NOW_MODAL_DATA.SELF_LOVE.subtitle}
          ctaText={REFER_NOW_MODAL_DATA.SELF_LOVE.ctaText}
          phoneNumber={phoneNumber}
          onChange={handleChange}
          open={open3}
          onClose={() => {
            setOpen3(false)
            setReferStatus1(true)
          }}
        />
      )}
      {referStatus1 && (
        <CustomPopupWrapper
          open={referStatus1}
          onClose={() => {
            setReferStatus1(false)
            setReferStatus2(true)
          }}
          icon={REFFERAL_STATUS_POPUP_DATA.EASY.ICON}
          title={REFFERAL_STATUS_POPUP_DATA.EASY.TITLE}
          subtitle={REFFERAL_STATUS_POPUP_DATA.EASY.SUB_TITLE}
        >
          <div className='flex flex-col gap-[20px]'>
            <AktivGroteskText
              fontSize='text-[16px]'
              fontWeight='font-[700]'
              className='text-[#00953B] text-center'
              text={REFFERAL_STATUS_POPUP_DATA.EASY.SECOND_TEXT}
            />
            <AktivGroteskText
              fontSize='text-[12px]'
              fontWeight='font-[400] text-center'
              text={REFFERAL_STATUS_POPUP_DATA.EASY.THIRD_TEXT}
            />
          </div>
        </CustomPopupWrapper>
      )}
      {referStatus2 && (
        <CustomPopupWrapper
          open={referStatus2}
          onClose={() => {
            setReferStatus2(false)
          }}
          icon={REFFERAL_STATUS_POPUP_DATA.PAST_ON_US.ICON}
          title={REFFERAL_STATUS_POPUP_DATA.PAST_ON_US.TITLE}
          subtitle={REFFERAL_STATUS_POPUP_DATA.PAST_ON_US.SUB_TITLE}
          singleButton={REFFERAL_STATUS_POPUP_DATA.PAST_ON_US.SINGLE_BUTTON}
          singleButtonText={
            REFFERAL_STATUS_POPUP_DATA.PAST_ON_US.SINGLE_BUTTON_TEXT
          }
          singleButtonOnClick={() => {
            setReferStatus2(false)
            setReferStatus3(true)
          }}
        />
      )}
      {referStatus3 && (
        <CustomPopupWrapper
          open={referStatus3}
          onClose={() => {
            setReferStatus3(false)
          }}
          icon={REFFERAL_STATUS_POPUP_DATA.TRUE_COLORS.ICON}
          title={REFFERAL_STATUS_POPUP_DATA.TRUE_COLORS.TITLE}
          subtitle={REFFERAL_STATUS_POPUP_DATA.TRUE_COLORS.SUB_TITLE}
          singleButton={REFFERAL_STATUS_POPUP_DATA.TRUE_COLORS.SINGLE_BUTTON}
          singleButtonText={
            REFFERAL_STATUS_POPUP_DATA.TRUE_COLORS.SINGLE_BUTTON_TEXT
          }
          singleButtonOnClick={() => {
            setReferStatus3(false)
          }}
        />
      )}
    </>
  )
}

export default ReferAFriend
