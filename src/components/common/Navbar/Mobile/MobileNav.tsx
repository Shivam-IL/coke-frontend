'use client'
import React, { useState, useRef, useEffect } from 'react'
import { ILogoAndProfileImageProps } from '@/interfaces'
import Image from 'next/image'
import { Bell, ChevronDown } from 'lucide-react'
import hamburgerMenu from '../../../../../public/other-svgs/hamburger-menu.svg'
import Sidebar from './Sidebar'
import { ROUTES_WHICH_DOES_NOT_NEED_DEFAULT_NAVBAR_FOR_MOBILE } from '../../../../constants/index'
import { usePathname } from 'next/navigation'

const MobileNav: React.FC<ILogoAndProfileImageProps> = ({
  spriteLogo,
  profileImage
}) => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState('en')
  const [isVisible, setIsVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const langDropdownRef = useRef<HTMLDivElement>(null)
  const isLoggedIn = true // This should come from your auth state management

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const isScrollingDown = currentScrollPos > prevScrollPos

      setIsVisible(!isScrollingDown || currentScrollPos < 10)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLangDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isSidebarOpen])

  const languages = [
    { value: 'en', id: '1', label: 'ENGLISH' },
    { value: 'hi', id: '2', label: 'हिन्दी' },
    { value: 'te', id: '3', label: 'తెలుగు' },
    { value: 'or', id: '4', label: 'ଓରିୟା' },
    { value: 'ba', id: '5', label: 'বাংলা' },
    { value: 'mr', id: '6', label: 'मराठी' },
    { value: 'kn', id: '7', label: 'ಕನ್ನಡ' },
    { value: 'bho', id: '9', label: 'भोজपुरी' },
    { value: 'mai', id: '10', label: 'मैथिली' }
  ]

  const getSelectedLanguageLabel = () => {
    return (
      languages.find(lang => lang.value === selectedLang)?.label || 'ENGLISH'
    )
  }

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleSidebarClose = () => {
    setIsSidebarOpen(false)
  }

  const pathName = usePathname()

  const handleHideNavbarForMobile = () => {
    for (const route of ROUTES_WHICH_DOES_NOT_NEED_DEFAULT_NAVBAR_FOR_MOBILE) {
      if (window.location.pathname === route) {
        return true
      } else if (pathName.startsWith(route)) {
        return true
      }
    }
    return false
  }

  return (
    <>
      <div
        className={`w-full ${
          handleHideNavbarForMobile() ? 'hidden' : 'block'
        } bg-white fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className='container mx-auto px-[17px] pb-[20px] pt-[17.45px] flex items-center relative'>
          {/* Menu */}
          <div className='absolute left-[17px]'>
            <button
              onClick={handleSidebarToggle}
              className={`p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 transform hover:scale-110 ${
                isSidebarOpen ? 'bg-gray-100 scale-110' : ''
              }`}
              aria-label='Open menu'
            >
              <Image
                src={hamburgerMenu}
                alt='hamburger-menu'
                className={`transition-transform duration-200 ${
                  isSidebarOpen ? 'rotate-90' : ''
                }`}
              />
            </button>
          </div>

          {/* Logo - Centered */}
          <div className='flex-1 flex justify-center'>
            <Image src={spriteLogo} alt='Sprite Logo' />
          </div>

          <div className='flex items-center gap-4 absolute right-[17px]'>
            {/* Bell Icon Conditional Rendering */}
            {isLoggedIn ? (
              <div className='relative'>
                <Bell className='h-6 w-6' />
                <div className='absolute -top-0.5 right-0 bg-yellow text-black rounded-full w-[12px] h-[12px] flex items-center justify-center text-[6.86px] font-semibold'>
                  10
                </div>
              </div>
            ) : (
              ''
            )}

            {/* Language Selector */}
            <div className='relative' ref={langDropdownRef}>
              <div
                className='w-[66px] border border-black px-1 py-0.5 flex justify-between items-center cursor-pointer rounded'
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              >
                <span className='mr-1 text-[10px]'>
                  {getSelectedLanguageLabel()}
                </span>
                <ChevronDown className='h-4 w-4' />
              </div>

              {isLangDropdownOpen && (
                <div className='absolute top-full right-0 mt-1 w-auto min-w-full rounded-md shadow-md z-20 bg-white text-xs'>
                  {languages.map(lang => (
                    <div
                      key={lang.id}
                      className='px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm'
                      onClick={() => {
                        setSelectedLang(lang.value)
                        setIsLangDropdownOpen(false)
                      }}
                    >
                      {lang.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Component */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
        spriteLogo={spriteLogo}
      />
    </>
  )
}

export default MobileNav
