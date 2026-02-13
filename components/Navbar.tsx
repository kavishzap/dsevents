'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false)
  const [isMobileEventDropdownOpen, setIsMobileEventDropdownOpen] = useState(false)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Check if we're on a non-hero page (like /services)
    const isNonHeroPage = pathname !== '/'
    if (isNonHeroPage) {
      setIsScrolled(true) // Always show background on non-hero pages
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      // Only update scroll state on home page
      if (pathname === '/') {
        setIsScrolled(currentScrollY > 50)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
    }
  }, [pathname])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsMobileEventDropdownOpen(false)
  }

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-8 lg:px-12 md:py-6 transition-all duration-300 ${
          isScrolled ? 'backdrop-blur-md shadow-lg' : ''
        }`}
      >
        {/* Background Image Layer */}
        {isScrolled && (
          <div 
            className="absolute inset-0 -z-20"
            style={{
              backgroundImage: `url('/assets/hero.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-black/70"></div>
            {/* Gradient Overlays matching hero */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-transparent to-orange-900/50"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
          </div>
        )}
        
        {/* Navbar Content */}
        <div className="relative z-10 flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex items-center">
          <Image
            src="/assets/DS Events Logo without BG WHITE.png"
            alt="DS Events & Shows"
            width={60}
            height={30}
            className="h-auto w-auto"
            priority
          />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
          <Link href="/" className={`px-4 py-2 font-normal hover:bg-white/10 transition-colors text-sm lg:text-base ${
            pathname === '/' ? 'underline decoration-2 underline-offset-4 text-white' : 'text-white'
          }`}>
            Home
          </Link>
          <Link href="/services" className={`px-4 py-2 font-normal hover:bg-white/10 transition-colors text-sm lg:text-base ${
            pathname === '/services' ? 'underline decoration-2 underline-offset-4 text-white' : 'text-white'
          }`}>
            Services
          </Link>
          {/* Event Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => {
              if (dropdownTimeoutRef.current) {
                clearTimeout(dropdownTimeoutRef.current)
              }
              setIsEventDropdownOpen(true)
            }}
            onMouseLeave={() => {
              dropdownTimeoutRef.current = setTimeout(() => {
                setIsEventDropdownOpen(false)
              }, 200) // 200ms delay before closing
            }}
          >
            <button
              className={`px-4 py-2 font-normal hover:bg-white/10 transition-colors text-sm lg:text-base flex items-center gap-1 ${
                pathname === '/concerts' || pathname === '/charity-events' ? 'underline decoration-2 underline-offset-4 text-white' : 'text-white'
              }`}
            >
              Event
              <svg 
                className={`w-4 h-4 transition-transform ${isEventDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isEventDropdownOpen && (
              <div 
                className="absolute top-full left-0 mt-1 bg-black/95 backdrop-blur-md shadow-lg rounded-lg overflow-hidden min-w-[180px] z-50"
                onMouseEnter={() => {
                  if (dropdownTimeoutRef.current) {
                    clearTimeout(dropdownTimeoutRef.current)
                  }
                }}
                onMouseLeave={() => {
                  dropdownTimeoutRef.current = setTimeout(() => {
                    setIsEventDropdownOpen(false)
                  }, 200)
                }}
              >
                <Link 
                  href="/concerts" 
                  className={`block px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors ${
                    pathname === '/concerts' ? 'bg-white/10' : ''
                  }`}
                >
                  Concerts
                </Link>
                <Link 
                  href="/charity-events" 
                  className={`block px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors ${
                    pathname === '/charity-events' ? 'bg-white/10' : ''
                  }`}
                >
                  Charity Events
                </Link>
              </div>
            )}
          </div>
          <Link href="/about" className={`px-4 py-2 font-normal hover:bg-white/10 transition-colors text-sm lg:text-base ${
            pathname === '/about' ? 'underline decoration-2 underline-offset-4 text-white' : 'text-white'
          }`}>
            About us
          </Link>
          <Link 
            href="/#contacts" 
            onClick={(e) => {
              if (pathname === '/') {
                // Already on homepage, prevent default and scroll
                e.preventDefault()
                const element = document.getElementById('contacts')
                if (element) {
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                  const offsetPosition = elementPosition - 100 // 100px offset from top
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  })
                }
              }
              // If not on homepage, let Link handle navigation to /#contacts
            }}
            className="text-white font-normal hover:text-gray-300 transition-colors text-sm lg:text-base cursor-pointer"
          >
            Contacts
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden relative z-[100]">
          <button 
            onClick={toggleMobileMenu}
            className="text-white relative z-[100] p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[70] md:hidden bg-black/50"
          onClick={closeMobileMenu}
        />
      )}
      <div
        className={`fixed inset-0 z-[80] md:hidden pointer-events-none transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar */}
        <div 
          className="absolute left-0 top-0 h-full w-64 bg-black/95 backdrop-blur-md shadow-2xl flex flex-col pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Logo at top */}
          <div className="flex justify-center items-center p-6 pt-8 pb-4">
            <Link href="/" onClick={closeMobileMenu}>
              <Image
                src="/DS Events Logo without BG.png"
                alt="DS Events & Shows"
                width={120}
                height={60}
                className="h-auto w-auto"
                priority
              />
            </Link>
          </div>
          <div className="flex flex-col p-6 pt-4 flex-1">
            <Link 
              href="/" 
              onClick={closeMobileMenu}
              className={`px-4 py-3 mb-2 font-normal hover:bg-white/10 transition-colors text-base text-center text-white ${
                pathname === '/' ? 'border border-white' : 'border border-transparent'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/services" 
              onClick={closeMobileMenu}
              className={`px-4 py-3 mb-2 font-normal hover:bg-white/10 transition-colors text-base text-center text-white ${
                pathname === '/services' ? 'border border-white' : 'border border-transparent'
              }`}
            >
              Services
            </Link>
            {/* Mobile Event Dropdown */}
            <div className="mb-2">
              <button
                onClick={() => setIsMobileEventDropdownOpen(!isMobileEventDropdownOpen)}
                className={`w-full px-4 py-3 font-normal hover:bg-white/10 transition-colors text-base text-center text-white flex items-center justify-center gap-2 ${
                  pathname === '/concerts' || pathname === '/charity-events' ? 'border border-white' : 'border border-transparent'
                }`}
              >
                Event
                <svg 
                  className={`w-4 h-4 transition-transform ${isMobileEventDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMobileEventDropdownOpen && (
                <div className="pl-4 mt-1">
                  <Link 
                    href="/concerts" 
                    onClick={closeMobileMenu}
                    className={`block px-4 py-2 mb-1 font-normal hover:bg-white/10 transition-colors text-sm text-left text-white ${
                      pathname === '/concerts' ? 'bg-white/10 border border-white' : 'border border-transparent'
                    }`}
                  >
                    Concerts
                  </Link>
                  <Link 
                    href="/charity-events" 
                    onClick={closeMobileMenu}
                    className={`block px-4 py-2 mb-1 font-normal hover:bg-white/10 transition-colors text-sm text-left text-white ${
                      pathname === '/charity-events' ? 'bg-white/10 border border-white' : 'border border-transparent'
                    }`}
                  >
                    Charity Events
                  </Link>
                </div>
              )}
            </div>
            <Link 
              href="/about" 
              onClick={closeMobileMenu}
              className={`px-4 py-3 mb-2 font-normal hover:bg-white/10 transition-colors text-base text-center text-white ${
                pathname === '/about' ? 'border border-white' : 'border border-transparent'
              }`}
            >
              About us
            </Link>
            <Link 
              href="/#contacts" 
              onClick={(e) => {
                closeMobileMenu()
                if (pathname === '/') {
                  // Already on homepage, prevent default and scroll
                  e.preventDefault()
                  const element = document.getElementById('contacts')
                  if (element) {
                    setTimeout(() => {
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                      const offsetPosition = elementPosition - 100 // 100px offset from top
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      })
                    }, 300)
                  }
                }
                // If not on homepage, let Link handle navigation to /#contacts
              }}
              className="px-4 py-3 mb-2 text-white font-normal hover:bg-white/10 transition-colors text-base text-center cursor-pointer border border-transparent"
            >
              Contacts
            </Link>
          </div>
          
          {/* Developed By Section */}
          <div className="flex flex-col items-center gap-2 px-6 pb-4">
            <p className="text-white/90 text-xs font-medium">Developed by:</p>
            <Image
              src="/dev.png"
              alt="Developer"
              width={50}
              height={30}
              className="h-auto w-auto opacity-95"
              priority={false}
            />
          </div>
          
          {/* Copyright */}
          <div className="p-6 pt-0">
            <p className="text-white/60 text-xs text-center">
              © {new Date().getFullYear()} DS Events. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

