'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setIsScrolled(currentScrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
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
          <Link href="/" className="px-4 py-2 border border-white rounded-full text-white font-normal hover:bg-white/10 transition-colors text-sm lg:text-base">
            Home
          </Link>
          <Link href="/services" className="text-white font-normal hover:text-gray-300 transition-colors text-sm lg:text-base">
            Services
          </Link>
          <Link href="/concerts" className="text-white font-normal hover:text-gray-300 transition-colors text-sm lg:text-base">
            Concerts
          </Link>
          <Link href="/about" className="text-white font-normal hover:text-gray-300 transition-colors text-sm lg:text-base">
            About us
          </Link>
          <Link href="/contacts" className="text-white font-normal hover:text-gray-300 transition-colors text-sm lg:text-base">
            Contacts
          </Link>
          <Link href="/login" className="text-white font-normal hover:text-gray-300 transition-colors text-sm lg:text-base">
            Log In
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden relative z-10">
          <button 
            onClick={toggleMobileMenu}
            className="text-white z-50"
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
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar */}
        <div className="absolute left-0 top-0 h-full w-64 bg-black/95 backdrop-blur-md shadow-2xl flex flex-col">
          <div className="flex flex-col p-6 pt-20 flex-1">
            <Link 
              href="/" 
              onClick={closeMobileMenu}
              className="px-4 py-3 mb-2 border border-white rounded-full text-white font-normal hover:bg-white/10 transition-colors text-base text-center"
            >
              Home
            </Link>
            <Link 
              href="/services" 
              onClick={closeMobileMenu}
              className="px-4 py-3 mb-2 text-white font-normal hover:bg-white/10 transition-colors text-base text-center rounded-lg"
            >
              Services
            </Link>
            <Link 
              href="/concerts" 
              onClick={closeMobileMenu}
              className="px-4 py-3 mb-2 text-white font-normal hover:bg-white/10 transition-colors text-base text-center rounded-lg"
            >
              Concerts
            </Link>
            <Link 
              href="/about" 
              onClick={closeMobileMenu}
              className="px-4 py-3 mb-2 text-white font-normal hover:bg-white/10 transition-colors text-base text-center rounded-lg"
            >
              About us
            </Link>
            <Link 
              href="/contacts" 
              onClick={closeMobileMenu}
              className="px-4 py-3 mb-2 text-white font-normal hover:bg-white/10 transition-colors text-base text-center rounded-lg"
            >
              Contacts
            </Link>
            <Link 
              href="/login" 
              onClick={closeMobileMenu}
              className="px-4 py-3 text-white font-normal hover:bg-white/10 transition-colors text-base text-center rounded-lg"
            >
              Log In
            </Link>
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

