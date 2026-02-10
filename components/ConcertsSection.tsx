'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ConcertsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
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
      image: '/assets/concerts/concert3.jpg',
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

  // Auto-shuffling animation with sliding effect
  useEffect(() => {
    const interval = setInterval(() => {
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

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-white py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-3xl font-bold text-red-800 mb-3 md:mb-4">
          What do we provide as an entertainment company?
        </h2>
        <h3 className="text-lg md:text-2xl font-bold text-gray-700 mb-6 md:mb-8 drop-shadow-sm">Concerts:</h3>
        
        {/* Concerts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
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
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 33vw, 20vw"
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

