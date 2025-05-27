import { Dialog, DialogContent } from '@/components/ui/dialog'
import { IReferNowModal } from '@/interfaces'
import React, { useState } from 'react'
import SvgIcons from '../SvgIcons'
import {
  BRO_CODE_WE_FOLLOW,
  GET_ONE_FRIEND_LAUGHING,
  ICONS_NAMES,
  REFER_NOW
} from '@/constants'
import AktivGroteskText from '../AktivGroteskText'
import Input from '@/components/Input'
import GreenCTA from '@/components/GreenCTA'

const ReferNowModal: React.FC<IReferNowModal> = ({ open, setOpen }) => {
  const [referPhoneNumber, setReferPhoneNumber] = useState<string>('')

  const handleChange = (key: string, value: string) => {
    setReferPhoneNumber(value)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-[343px] md:max-w-[401px] gap-0 rounded-[10px] p-0'>
        <div className='flex justify-end pt-[12px]  pr-[16px] md:pr-[18px]'>
          <button onClick={() => setOpen(false)} className='p-0 self-end'>
            <SvgIcons name={ICONS_NAMES.CROSS} className='w-[13px] h-[13px] md:w-[14px] md:h-[12px]' />
          </button>
        </div>
        <div className='w-full px-[22px] md:px-[16px] pt-[29.78px] md:pt-[18px] pb-[23px] flex flex-col gap-[30px] md:gap-[24px]'>
          <div className=' relative flex flex-col gap-[8px] md:gap-[12px] text-center items-center'>
            <AktivGroteskText
              text={BRO_CODE_WE_FOLLOW}
              fontSize='text-[20px] md:text-[24px]'
              fontWeight='font-[700]'
            />
            <AktivGroteskText
              text={GET_ONE_FRIEND_LAUGHING}
              fontSize='text-[16px] md:text-[20px]'
              fontWeight='font-[400]'
            />
          </div>
          <div className='flex flex-col gap-[28px]'>
            <Input
              name='referPhoneNumber'
              type='text'
              value={referPhoneNumber}
              fontSize='text-[14px] md:text-[16px]'
              onChange={handleChange}
              
              placeholder='Enter Phone Number'
            />
            <GreenCTA text={REFER_NOW} fontSize='text-[16px] md:text-[20px]' paddingClass='py-[16px] md:py-[14px] px-[24px]' onClick={() => {
                setOpen(false)
            }} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReferNowModal
