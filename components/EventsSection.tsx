'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useScrollFade } from '@/hooks/useParallax'
import { motion, AnimatePresence } from 'framer-motion'

export default function EventsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  
  // Initial events data
  const initialEvents = [
    { 
      id: 1,
      image: '/assets/concerts/IMG_5149.JPG.jpeg',
      title: 'Lorem ipsum dolor sit'
    },
    { 
      id: 2,
      image: '/assets/concerts/IMG_6080.JPG.jpeg',
      title: 'Lorem ipsum dolor sit'
    },
    { 
      id: 3,
      image: '/assets/concerts/PHOTO-2023-08-31-14-22-47.jpg',
      title: 'Lorem ipsum dolor sit'
    },
    { 
      id: 4,
      image: '/assets/concerts/IMG_4471.JPG',
      title: 'Lorem ipsum dolor sit'
    },
    { 
      id: 5,
      image: '/assets/concerts/poster.png',
      title: 'Lorem ipsum dolor sit'
    },
  ]

  const [events, setEvents] = useState(initialEvents)
  const [isSliding, setIsSliding] = useState(false)
  const centerIndex = 2 // Third item (0-indexed)

  // Handle touch events for mobile carousel
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentSlide < events.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  // Navigate carousel
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === events.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? events.length - 1 : prev - 1))
  }

  // Auto-shuffling animation with smooth framer-motion transitions (desktop only - md and above)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    const setupDesktopSliding = () => {
      // Clear any existing interval
      if (interval) clearInterval(interval)
      
      // Only run on desktop (768px and above)
      if (window.innerWidth >= 768) {
        interval = setInterval(() => {
          setIsSliding(true)
          
          // Smooth transition with framer-motion
          setTimeout(() => {
            setEvents((prevEvents) => {
              // Rotate array: move first item to the end
              const newEvents = [...prevEvents]
              const firstItem = newEvents.shift()
              if (firstItem) {
                newEvents.push(firstItem)
              }
              return newEvents
            })
            setIsSliding(false)
          }, 600) // Slightly longer for smoother animation
        }, 4000) // Shuffle every 4 seconds for better UX
      }
    }

    setupDesktopSliding()
    window.addEventListener('resize', setupDesktopSliding)

    return () => {
      if (interval) clearInterval(interval)
      window.removeEventListener('resize', setupDesktopSliding)
    }
  }, [])

  // Auto-advance carousel on mobile only (below md breakpoint)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    const setupMobileCarousel = () => {
      // Clear any existing interval
      if (interval) clearInterval(interval)
      
      // Only run on mobile (below 768px)
      if (window.innerWidth < 768) {
        interval = setInterval(() => {
          setCurrentSlide((prev) => (prev === events.length - 1 ? 0 : prev + 1))
        }, 4000) // Change slide every 4 seconds on mobile
      }
    }

    setupMobileCarousel()
    window.addEventListener('resize', setupMobileCarousel)

    return () => {
      if (interval) clearInterval(interval)
      window.removeEventListener('resize', setupMobileCarousel)
    }
  }, [events.length])

  const [setSectionRef, isSectionVisible] = useScrollFade()

  return (
    <section ref={setSectionRef} className={`relative bg-white py-8 md:py-16 px-4 md:px-8 transition-all duration-1000 overflow-hidden ${isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Scattered Musical Icons Background */}
      <div className="absolute inset-0 pointer-events-none opacity-15 md:opacity-10">
        {/* Microphone Icons */}
        <svg className="absolute top-10 left-10 w-8 h-8 md:w-12 md:h-12 text-red-600 rotate-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
        </svg>
        <svg className="absolute top-32 right-20 w-6 h-6 md:w-10 md:h-10 text-red-600 -rotate-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
        </svg>
        <svg className="absolute bottom-20 left-32 w-7 h-7 md:w-11 md:h-11 text-red-600 rotate-45" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
        </svg>

        {/* Headphone Icons */}
        <svg className="absolute top-24 right-10 w-8 h-8 md:w-12 md:h-12 text-red-600 -rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
        </svg>
        <svg className="absolute bottom-32 right-32 w-6 h-6 md:w-10 md:h-10 text-red-600 rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
        </svg>

        {/* Music Note Icons */}
        <svg className="absolute top-16 left-1/4 w-6 h-6 md:w-9 md:h-9 text-red-600 rotate-45" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
        <svg className="absolute top-48 right-1/4 w-7 h-7 md:w-10 md:h-10 text-red-600 -rotate-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
        <svg className="absolute bottom-16 left-1/3 w-5 h-5 md:w-8 md:h-8 text-red-600 rotate-90" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>

        {/* DJ Turntable/Vinyl Icons */}
        <svg className="absolute top-1/3 left-12 w-8 h-8 md:w-12 md:h-12 text-red-600" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="12" r="3" fill="currentColor"/>
          <circle cx="12" cy="12" r="1" fill="white"/>
        </svg>
        <svg className="absolute bottom-1/4 right-16 w-6 h-6 md:w-10 md:h-10 text-red-600 rotate-45" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="12" r="3" fill="currentColor"/>
          <circle cx="12" cy="12" r="1" fill="white"/>
        </svg>

        {/* Speaker Icons */}
        <svg className="absolute top-20 right-1/3 w-7 h-7 md:w-11 md:h-11 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
        </svg>
        <svg className="absolute bottom-24 left-20 w-6 h-6 md:w-9 md:h-9 text-red-600 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
        </svg>

        {/* Guitar Icons */}
        <svg className="absolute top-1/2 right-8 w-7 h-7 md:w-10 md:h-10 text-red-600 rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
        </svg>
        <svg className="absolute bottom-12 left-1/2 w-6 h-6 md:w-9 md:h-9 text-red-600 -rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-6 md:mb-8 drop-shadow-sm">Events:</h3>
        
        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div 
            className="flex overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  duration: 0.6
                }}
                className="min-w-full flex flex-col"
              >
                <motion.div 
                  className="relative w-full rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="relative w-full" style={{ paddingBottom: '150%' }}>
                    <Image
                      src={events[currentSlide].image}
                      alt={events[currentSlide].title}
                      fill
                      className="object-cover object-center"
                      sizes="100vw"
                    />
                  </div>
                </motion.div>
                <motion.p 
                  className="text-center text-gray-700 text-sm mt-2 md:mt-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {events[currentSlide].title}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {events.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full ${
                  index === currentSlide ? 'bg-rose-700' : 'bg-gray-300'
                }`}
                animate={{ 
                  width: index === currentSlide ? 24 : 8,
                  scale: index === currentSlide ? 1.2 : 1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {events.map((event, index) => {
            const isCenter = index === centerIndex
            const isHovered = hoveredIndex === index
            const showOverlay = !isCenter && !isHovered
            
            return (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: index * 0.05
                  }
                }}
                whileHover={{ 
                  scale: isCenter ? 1.05 : 1.08,
                  y: -10,
                  zIndex: 10,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex flex-col"
              >
                <motion.div 
                  className="relative w-full rounded-lg overflow-hidden cursor-pointer"
                  style={{ paddingBottom: '150%' }}
                  whileHover={{ 
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                  }}
                >
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 33vw, 20vw"
                      priority={index < 3}
                    />
                  </motion.div>
                  {/* Overlay - shown on all except center, removed on hover */}
                  {showOverlay && (
                    <motion.div 
                      className="absolute inset-0 bg-black/30 z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  {/* Center indicator */}
                  {isCenter && (
                    <motion.div
                      className="absolute inset-0 border-4 border-red-500 rounded-lg pointer-events-none z-20"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }}
                    />
                  )}
                </motion.div>
                {/* Title below image */}
                <motion.p 
                  className="text-center text-gray-700 text-sm md:text-base mt-2 md:mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                >
                  {event.title}
                </motion.p>
              </motion.div>
            )
          })}
        </div>

        {/* Explore More Button */}
        <div className="flex justify-center mt-12 md:mt-16">
          <Link href="/charity-events" className="flex items-center gap-2 text-rose-700 hover:text-rose-800 transition-colors duration-300 underline decoration-2 underline-offset-4">
            <span className="text-sm md:text-base font-medium uppercase tracking-wide">
              Explore More
            </span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

