import React, { useState } from 'react'
import AktivGroteskText from '../common/AktivGroteskText'
import SvgIcons from '../common/SvgIcons'
import { ICONS_NAMES } from '@/constants'
import { Checkbox } from '../ui/checkbox'

const AddressCard = () => {
  const [defaultAddress, setDefaultAddress] = useState<boolean>(false)
  return (
    <div className='flex flex-col gap-[10px] md:gap-[28px] border-b-[1px] border-[#CDCDCD] pt-4 pb-4 md:pt-0 md:pb-[23px]'>
      <div className='flex flex-col gap-[5px] md:gap-[16px]'>
        <div className='flex justify-between items-start gap-2 md:gap-4'>
          <AktivGroteskText
            fontSize='text-[14px] md:text-[24px]'
            fontWeight='font-[400]'
            text='H.No. 2343, Rohini sector -3 , New Delhi -110085'
          />
          <button>
            <SvgIcons name={ICONS_NAMES.PENCIL} className='w-[13px] h-[15px] md:w-[20px] md:h-[23px]' />
          </button>
        </div>
        <AktivGroteskText
          fontSize='text-[14px] md:text-[24px]'
          fontWeight='font-[400]'
          text='+91 - 9867362878'
        />
      </div>
      <div className='flex justify-between items-center gap-2'>
        <div className='flex items-center gap-2'>
          <Checkbox
            checked={defaultAddress}
            className='w-[16px] h-[16px] md:w-[19px] md:h-[19px]'
            onCheckedChange={() => setDefaultAddress(!defaultAddress)}
          />
          <AktivGroteskText
            fontSize='text-[12px] md:text-[20px]'
            fontWeight='font-[400]'
            text='Set as Default'
          />
        </div>
        <button>
          <SvgIcons name={ICONS_NAMES.TRASH} className='w-[15px] h-[15px] md:w-[24px] md:h-[24px]' />
        </button>
      </div>
    </div>
  )
}

export default AddressCard
