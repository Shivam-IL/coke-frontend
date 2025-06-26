import React, { useCallback, useEffect, useState } from 'react'
import CustomPopupWrapper from '../CustomPopupWrapper'
import { GA_EVENTS, ICONS_NAMES } from '@/constants'
import { triggerGAEvent } from '@/utils/gTagEvents'
import ReportPopup from '../ReportPopup'
import { usePathname, useRouter } from 'next/navigation'
import { useSendReportToGluedin } from '@/api/hooks/GluedinHooks'
import { useSendReport } from '@/api/hooks/ReportHooks'
import {
  BaseCDPEventPayload,
  CDPEventPayloadBuilder
} from '@/api/utils/cdpEvents'
import { useSendCDPEvent } from '@/api/hooks/CDPHooks'

const isValidUrl = (url: string) => {
  const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
  return regex.test(url)
}

const ReportPopupComponent = ({
  open,
  onClose,
  setOpen,
  assetId,
  userId,
  actingUserId
}: {
  open: boolean
  onClose: () => void
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  assetId: string
  userId: string
  actingUserId: string
}) => {
  const [refferalLink, setRefferalLink] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [open2, setOpen2] = useState<boolean>(false)
  const { mutate: sendReportToGluedin, data: reportData } =
    useSendReportToGluedin()
  const { mutate: sendReport } = useSendReport()
  const pathName = usePathname()

  const handleChange = (key: string, value: string) => {
    setRefferalLink(value)
  }
  const { mutate: sendCDPEvent } = useSendCDPEvent()

  const submitReport = () => {
    //validate refferal link
    if (refferalLink.length === 0) {
      setError('Please enter a valid URL')
      return
    }
    //validate url
    if (!isValidUrl(refferalLink)) {
      setError('Please enter a valid URL')
      return
    }

    // Call both APIs simultaneously
    sendReportToGluedin({
      assetId,
      reason: refferalLink,
      userId: userId,
      actingUserId: actingUserId
    })

    sendReport({
      assetId,
      information: refferalLink
    })
  }

  const triggerReportCDPEvent = useCallback(() => {
    if (userId) {
      const payload: BaseCDPEventPayload =
        CDPEventPayloadBuilder.buildJokeReportedPayload({
          user_identifier: userId
        })
      sendCDPEvent(payload)
    }
  }, [sendCDPEvent, userId])

  useEffect(() => {
    if (reportData?.ok) {
      triggerReportCDPEvent()
      setOpen?.(false)
      setOpen2(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportData])

  const router = useRouter()

  useEffect(()=>{
    return ()=>{
      setOpen?.(false)
      setOpen2(false)
      onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
      {open && (
        <ReportPopup
          title={
            'Please provide a link below so we can verify if this joke is plagiarised.'
          }
          ctaText={'Submit'}
          placeholder={'Source URL*'}
          refferalLink={refferalLink}
          onChange={handleChange}
          open={open}
          onSubmit={() => {
            triggerGAEvent(GA_EVENTS.SPRITE_J24_REFER_NOW)
            submitReport()
          }}
          error={error}
          onClose={() => {
            onClose()
            setOpen?.(false)
            setOpen2(false)
            setRefferalLink('')
          }}
        />
      )}
      {open2 && (
        <CustomPopupWrapper
          icon={ICONS_NAMES.CRYING}
          title={'We heard you!'}
          subtitle={"Thand Rakh, we'll get this sorted soon."}
          singleButtonText={'Explore More'}
          singleButton={true}
          singleButtonOnClick={() => {
            if (pathName === '/user-generated-jokes') {
              setOpen2(false)
              setOpen?.(false)
              onClose()
              return
            }
            router.push('/user-generated-jokes')
          }}
          open={open2}
          onClose={() => {
            onClose()
            setOpen?.(false)
            setOpen2(false)
            setRefferalLink('')
          }}
        />
      )}
    </>
  )
}

export default ReportPopupComponent
