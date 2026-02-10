'use client'

import { useState, useEffect } from 'react'

export default function AboutSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const clients = [
    { id: 1, image: '/assets/clients/1.jpg', alt: 'Ascencia' },
    { id: 2, image: '/assets/clients/ABSA_Group_Limited_Logo.svg.png', alt: 'Absa' },
    { id: 3, image: '/assets/clients/334780421_145944098370932_7320452367223027754_n.jpg', alt: 'Kendra by Ascencia' },
    { id: 4, image: '/assets/clients/logo-init.png', alt: 'Tribeca Mall' },
    { id: 5, image: '/assets/clients/326265811_700416474971239_8330579743167453708_n.jpg', alt: 'Le Suffren Hotel & Marina' },
    { id: 6, image: '/assets/clients/5d70d7de11914b8f5e217597f836903d.jpg', alt: 'Mont Choisy Coral Azur Beach Resort' },
    { id: 7, image: '/assets/clients/IQEQ_Lockup_Stacked_RGB.jpg', alt: 'IQEQ' },
    { id: 8, image: '/assets/clients/ichos-logo-01.svg', alt: 'ICHOS PRODUCTION' },
  ]

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

    if (isLeftSwipe && currentSlide < clients.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  // Auto-advance carousel on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (!isMobile) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === clients.length - 1 ? 0 : prev + 1))
    }, 3000)

    return () => clearInterval(interval)
  }, [clients.length])

  return (
    <section className="bg-white py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-3xl font-bold text-red-800 mb-3 md:mb-4">
          What do we provide as an entertainment company?
        </h2>
        <h3 className="text-lg md:text-2xl font-bold text-gray-700 mb-6 md:mb-8 drop-shadow-sm">About Us:</h3>
        
        <div className="space-y-4 md:space-y-6">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            DS Events has been existing since Dec 2021, however, was active and started to gain audience around Nov 2023.
          </p>
          
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Moreover, DS Events is a dynamic company specializing in the entertainment industry, with a strong focus on delivering
            unforgettable live music experiences for events of all scales. From its humble beginnings as a talented band primarily performing at weddings and on social media platforms, DS Events has charted an impressive growth
            trajectory.
          </p>
          
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Starting as a passionate group of musicians, the band quickly gained recognition for its ability to infuse life into weddings and intimate gatherings. Their versatility, commitment to quality, and ability to connect with
            audiences set them apart, earning a loyal following on social platforms.
          </p>
        </div>

        {/* Our Major Clients Section */}
        <div className="mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-red-800 mb-6 md:mb-8 uppercase">
            OUR MAJOR CLIENTS
          </h2>
          
          <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Driven by a vision to reach wider audiences, DS Events evolved into a full-fledged entertainment company. Today, it organizes and performs at high-profile events, catering to prestigious clients like Ascencia and Absa Bank of Mauritius, amongst others.
            </p>
            
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              These collaborations highlight the company's reputation for professionalism, reliability, and top-tier performances that resonate with diverse audiences.
            </p>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {clients.map((client) => (
                <div key={client.id} className="min-w-full flex flex-col items-center justify-center p-4">
                  <div className="w-full h-32 flex items-center justify-center">
                    <img 
                      src={client.image} 
                      alt={client.alt} 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {clients.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-rose-700 w-6' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-4 gap-6 md:gap-8">
            {clients.map((client) => (
              <div key={client.id} className="flex flex-col items-center justify-center p-4 group cursor-pointer">
                <div className="w-full h-32 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:brightness-110">
                  <img 
                    src={client.image} 
                    alt={client.alt} 
                    className="max-w-full max-h-full object-contain transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Know More About Us Button */}
          <div className="flex justify-center mt-12 md:mt-16">
            <button className="flex items-center gap-2 text-rose-700 hover:text-rose-800 transition-colors duration-300 underline decoration-2 underline-offset-4">
              <span className="text-sm md:text-base font-medium uppercase tracking-wide">
                Know More About Us
              </span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

