'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState('LIVE')
  const descriptionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
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

  const selectedServiceData = services.find(s => s.name === selectedService) || services[1]

  return (
    <section className="bg-white py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
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
                  className="relative w-full rounded-lg overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 33vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase text-center px-1 md:px-2 leading-tight">
                      {splitServiceName(service.name).map((word, i) => (
                        <span key={i} className="block">{word}</span>
                      ))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Highlighted Service Detail */}
          <div ref={descriptionRef} className="flex flex-col md:flex-row lg:col-span-1 mt-8 md:mt-0 min-h-[300px]">
            {/* Vertical Separator */}
            <div className="hidden md:block w-1 bg-red-800 mr-8 h-full min-h-[300px]"></div>
            <div className="md:hidden w-full h-1 bg-red-800 mb-6"></div>
            
            {/* Content */}
            <div className="flex-1 flex flex-col">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-red-600 mb-4 md:mb-6 uppercase">{selectedServiceData.name}</h2>
              <div className="overflow-y-auto max-h-[400px] pr-2">
                {selectedServiceData.description ? (
                  <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed">
                    {selectedServiceData.description}
                  </p>
                ) : (
                  <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

