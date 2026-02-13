'use client'

import { useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import ServicesSection from '@/components/ServicesSection'
import ExperienceBanner from '@/components/ExperienceBanner'
import ConcertsSection from '@/components/ConcertsSection'
import MusicBanner from '@/components/MusicBanner'
import AboutSection from '@/components/AboutSection'
import AtmosphereBanner from '@/components/AtmosphereBanner'
import ContactsSection from '@/components/ContactsSection'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import Image from 'next/image'
import { useParallax } from '@/hooks/useParallax'

export default function Home() {
  const heroImageRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const parallaxOffset = useParallax(0.3)

  // Scroll to top on page load, or to contacts section if hash is present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#contacts') {
        // Wait for page to load, then scroll to contacts with offset
        setTimeout(() => {
          const element = document.getElementById('contacts')
          if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementPosition - 100 // 100px offset from top
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          }
        }, 500)
      } else {
        window.scrollTo(0, 0)
        // Also handle mobile browser address bar issues
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 100)
      }
    }
  }, [])

  // Apply parallax effect to hero image
  useEffect(() => {
    if (heroImageRef.current) {
      heroImageRef.current.style.transform = `translateY(${parallaxOffset}px)`
    }
    if (heroContentRef.current) {
      heroContentRef.current.style.transform = `translateY(${parallaxOffset * 0.5}px)`
    }
  }, [parallaxOffset])

  return (
    <>
    {/* Navbar */}
    <Navbar />
    <main className="relative min-h-screen overflow-hidden">
      {/* Hero Background Image with Overlay */}
      <div ref={heroImageRef} className="absolute inset-0 z-0 will-change-transform">
        {/* Hero Image - Replace with your image path */}
        <Image
          src="/assets/hero.jpg"
          alt="DS Events Background"
          fill
          className="object-cover w-full h-full object-[center_30%] scale-110"
          priority
          quality={90}
        />
        {/* Black opacity overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        {/* Gradient Overlays for Dramatic Lighting Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-transparent to-orange-900/50"></div>
        {/* Smoky effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
      </div>

      {/* Hero Content */}
      <div ref={heroContentRef} className="relative z-10 flex min-h-screen flex-col items-center justify-center px-8 will-change-transform">
        {/* Main Slogan */}
        <h1 className="mb-12 mt-32 text-center text-4xl font-bold text-white sm:text-5xl md:text-5xl lg:text-6xl tracking-tight">
          <span className="block md:inline">CREATING EXPERIENCES.</span>
          <span className="hidden md:inline"> </span>
          <span className="block md:inline">NOT JUST EVENTS.</span>
        </h1>

        {/* Search Bar */}
        <div className="relative w-full flex justify-center">
          <div className="group flex items-center rounded-full bg-black/20 backdrop-blur-md px-6 py-4 shadow-2xl max-w-sm cursor-pointer transition-all duration-300">
            <svg
              className="mr-4 h-6 w-6 text-white flex-shrink-0 transition-all duration-300 group-hover:scale-125 group-hover:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="text-white text-lg font-light uppercase tracking-[0.3em] transition-all duration-300 group-hover:scale-110 group-hover:text-red-400 group-hover:tracking-[0.4em]">
              SHOWTIME
            </span>
          </div>
        </div>
      </div>
    </main>
    <ServicesSection />
    <ExperienceBanner />
    <ConcertsSection />
    <MusicBanner />
    <AboutSection />
    <AtmosphereBanner />
    <ContactsSection />
    <Footer />
    <ScrollToTop />
    </>
  )
}
