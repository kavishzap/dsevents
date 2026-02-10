'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ConcertsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  
  // Initial concerts data
  const initialConcerts = [
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
      image: '/assets/concerts/IMG_4471.JPG.jpeg',
      title: 'Lorem ipsum dolor sit'
    },
    { 
      id: 5,
      image: '/assets/concerts/poster.png',
      title: 'Lorem ipsum dolor sit'
    },
  ]

  const [concerts, setConcerts] = useState(initialConcerts)
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

    if (isLeftSwipe && currentSlide < concerts.length - 1) {
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
    setCurrentSlide((prev) => (prev === concerts.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? concerts.length - 1 : prev - 1))
  }

  // Auto-shuffling animation with sliding effect (desktop only - md and above)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    const setupDesktopSliding = () => {
      // Clear any existing interval
      if (interval) clearInterval(interval)
      
      // Only run on desktop (768px and above)
      if (window.innerWidth >= 768) {
        interval = setInterval(() => {
          setIsSliding(true)
          
          setTimeout(() => {
            setConcerts((prevConcerts) => {
              // Rotate array: move first item to the end
              const newConcerts = [...prevConcerts]
              const firstItem = newConcerts.shift()
              if (firstItem) {
                newConcerts.push(firstItem)
              }
              return newConcerts
            })
            setIsSliding(false)
          }, 500) // Match transition duration
        }, 3000) // Shuffle every 3 seconds
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
          setCurrentSlide((prev) => (prev === concerts.length - 1 ? 0 : prev + 1))
        }, 4000) // Change slide every 4 seconds on mobile
      }
    }

    setupMobileCarousel()
    window.addEventListener('resize', setupMobileCarousel)

    return () => {
      if (interval) clearInterval(interval)
      window.removeEventListener('resize', setupMobileCarousel)
    }
  }, [concerts.length])

  return (
    <section className="bg-white py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-3xl font-bold text-red-800 mb-3 md:mb-4">
          What do we provide as an entertainment company?
        </h2>
        <h3 className="text-lg md:text-2xl font-bold text-gray-700 mb-6 md:mb-8 drop-shadow-sm">Concerts:</h3>
        
        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div 
            className="flex overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {concerts.map((concert, index) => (
              <div
                key={concert.id}
                className="min-w-full flex flex-col transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                <div className="relative w-full rounded-lg overflow-hidden">
                  <div className="relative w-full" style={{ paddingBottom: '150%' }}>
                    <Image
                      src={concert.image}
                      alt={concert.title}
                      fill
                      className="object-cover object-center"
                      sizes="100vw"
                    />
                  </div>
                </div>
                <p className="text-center text-gray-700 text-sm mt-2 md:mt-3">
                  {concert.title}
                </p>
              </div>
            ))}
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {concerts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-rose-700 w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {concerts.map((concert, index) => {
            const isCenter = index === centerIndex
            const isHovered = hoveredIndex === index
            const showOverlay = !isCenter && !isHovered
            
            return (
              <div
                key={`${concert.id}-${index}`}
                className={`flex flex-col transition-all duration-500 ease-in-out ${
                  isSliding ? 'transform -translate-x-full' : 'transform translate-x-0'
                }`}
                style={{
                  transitionDelay: isSliding ? `${index * 50}ms` : '0ms'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative w-full rounded-lg overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="relative w-full" style={{ paddingBottom: '150%' }}>
                    <Image
                      src={concert.image}
                      alt={concert.title}
                      fill
                      className="object-cover object-center transition-all duration-300"
                      sizes="(max-width: 768px) 33vw, 20vw"
                    />
                    {/* Overlay - shown on all except center, removed on hover */}
                    {showOverlay && (
                      <div className="absolute inset-0 bg-black/30 transition-all duration-300"></div>
                    )}
                  </div>
                </div>
                {/* Title below image */}
                <p className="text-center text-gray-700 text-sm md:text-base mt-2 md:mt-3">
                  {concert.title}
                </p>
              </div>
            )
          })}
        </div>

        {/* UPCOMING CONCERTS Button */}
        <div className="flex justify-center mt-12 md:mt-16">
          <button className="px-8 py-4 rounded-full bg-rose-700 hover:bg-rose-800 transition-colors duration-300 flex items-center gap-3">
            <span className="text-white text-lg md:text-xl font-semibold uppercase tracking-wide">
              Explore More
            </span>
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

