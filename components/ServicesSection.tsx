'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState('DJ')
  const descriptionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (descriptionRef.current) {
      const element = descriptionRef.current
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - 50 // 100px offset from top
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }, [selectedService])

  const splitServiceName = (name: string) => {
    if (name.includes(' ')) {
      return name.split(' ')
    }
    // Split longer words into multiple lines to match design
    if (name === 'KARAOKE') {
      return ['KAR', 'AOKE']
    }
    if (name === 'UNPLUGGED') {
      return ['UN', 'PLUG', 'GED']
    }
    // For DJ, LIVE, SONO, LIGHTS - keep on one line
    return [name]
  }

  const services = [
    { 
      name: 'DJ', 
      image: '/assets/overlay/1-17.png',
      description: 'At DS Events, we bring life to your celebrations with our top-tier DJ services, ensuring that every event is filled with the perfect beats, seamless transitions, and an electric atmosphere. Whether you\'re hosting a birthday party, engagement ceremony, wedding reception, corporate event, or any other special gathering, our skilled DJs are here to make it unforgettable.'
    },
    { 
      name: 'LIVE', 
      image: '/assets/overlay/2-17.png',
      description: 'Looking for a power-packed live music experience that will captivate your audience? Divesh & The Band from DS Events bring electrifying performances that blend soulful melodies, high-energy beats, and crowd-pumping anthems. Whether it\'s a wedding reception, engagement party, corporate gala, birthday celebration, or a grand musical event, our live band delivers a one-of-a-kind experience that will leave your guests mesmerized!'
    },
    { 
      name: 'KARAOKE', 
      image: '/assets/overlay/3-17.png',
      description: 'We don\'t just provide music—we create interactive entertainment experiences! Our Karaoke Services are perfect for any occasion, adding a fun, engaging, and unforgettable touch to your event. Whether you\'re hosting a birthday party, engagement celebration, wedding reception, corporate event, or a casual get-together, our karaoke setup will turn your guests into the stars of the night.'
    },
    { 
      name: 'UNPLUGGED', 
      image: '/assets/overlay/4-17.png',
      description: ''
    },
    { 
      name: 'SONO', 
      image: '/assets/overlay/5-17.png',
      description: ''
    },
    { 
      name: 'LIGHTS', 
      image: '/assets/overlay/6-17.png',
      description: ''
    },
  ]

  const selectedServiceData = services.find(s => s.name === selectedService) || services[0]

  return (
    <section className="bg-white py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* Left Column - Services Overview */}
          <div className="lg:col-span-2">
            <h2 className="text-xl md:text-3xl font-bold text-red-800 mb-3 md:mb-4">
              What do we provide as an entertainment company?
            </h2>
            <h3 className="text-lg md:text-2xl font-bold text-gray-700 mb-6 md:mb-8 drop-shadow-sm">Services:</h3>
            
            {/* Services Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16">
              {services.map((service, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedService(service.name)}
                  className="relative w-full rounded-lg overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] animate-gentle-bounce"
                >
                  {/* Pulsing border effect - always visible */}
                  <div className="absolute inset-0 rounded-lg border-2 border-red-600 opacity-30 animate-pulse-border pointer-events-none z-10"></div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-lg bg-red-600/0 animate-pulse-glow pointer-events-none"></div>
                  
                  <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover object-center transition-all duration-300 group-hover:brightness-110 group-hover:scale-105"
                      sizes="(max-width: 768px) 33vw, 33vw"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase text-center px-1 md:px-2 leading-tight transition-all duration-300 group-hover:drop-shadow-2xl group-hover:brightness-110 group-hover:scale-110">
                      {splitServiceName(service.name).map((word, i) => (
                        <span key={i} className="block">{word}</span>
                      ))}
                    </span>
                  </div>
                  
                  {/* Animated click indicator - pulsing arrow/pointer */}
                  <div className="absolute top-3 right-3 pointer-events-none z-20">
                    <svg className="w-5 h-5 text-red-600 animate-bounce-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 15l-2-5M9.396 9.396a2.5 2.5 0 114.243 2.5M15 15l-4.243-4.243a2.5 2.5 0 00-3.536 0L4.05 19.95M15 15l-2.121-2.121" />
                    </svg>
                  </div>
                  
                  {/* Pulsing dots indicator at corners */}
                  <div className="absolute top-2 left-2 w-2 h-2 bg-red-600 rounded-full opacity-70 animate-pulse-delay-1"></div>
                  <div className="absolute bottom-2 right-2 w-2 h-2 bg-red-600 rounded-full opacity-70 animate-pulse-delay-2"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Highlighted Service Detail */}
          <div ref={descriptionRef} className="flex flex-col md:flex-row lg:col-span-1 mt-8 md:mt-0 md:min-h-[600px]">
            {/* Vertical Separator */}
            <div className="hidden md:block w-1 bg-red-800 mr-8 h-[700px] flex-shrink-0"></div>
            <div className="md:hidden w-full h-1 bg-red-800 mb-6"></div>
            
            {/* Content */}
            <div className="flex-1 flex flex-col md:pt-[102px] md:pb-0 md:min-h-[600px]">
              <h2 key={`title-${selectedService}`} className="text-4xl md:text-6xl lg:text-7xl font-bold text-red-600 mb-4 md:mb-6 uppercase animate-fade-in">{selectedServiceData.name}</h2>
              <div className="flex-1 pr-2">
                {selectedServiceData.description ? (
                  <p key={`desc-${selectedService}`} className="text-gray-700 text-base md:text-lg lg:text-2xl leading-relaxed animate-fade-in">
                    {selectedServiceData.description}
                  </p>
                ) : (
                  <p key={`desc-${selectedService}`} className="text-gray-700 text-base md:text-lg lg:text-2xl leading-relaxed animate-fade-in">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Explore More Button */}
        <div className="flex justify-center mt-12 md:mt-16">
          <button className="flex items-center gap-2 text-rose-700 hover:text-rose-800 transition-colors duration-300 underline decoration-2 underline-offset-4">
            <span className="text-sm md:text-base font-medium uppercase tracking-wide">
              Explore more
            </span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

