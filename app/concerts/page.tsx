'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export default function ConcertsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const aboutEventText = "At <span class=\"font-bold\">DS Events</span>, we bring life to your celebrations with our top-tier DJ services, ensuring that every event is filled with the perfect beats, seamless transitions, and an electric atmosphere. Whether you're hosting a <span class=\"font-bold\">birthday party, engagement ceremony, wedding reception, corporate event, or any other special gathering</span>, our skilled DJs are here to make it unforgettable."

  const charityEventText = "At <span class=\"font-bold\">DS Events</span>, we elevate charity fund-raising events with the right ambience, energy, and execution. From inspiring moments to seamless flow, we help create events that connect people and drive meaningful impact."

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white pt-20 md:pt-24">
        <div className="mx-auto max-w-7xl px-4 md:px-4 lg:px-8 py-6 md:py-10 lg:py-16">
          {/* Title */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
              <span className="text-red-600">BOLLYWOOD DHAMAKA</span>
            </h1>
          </div>

          {/* Main Content: Image Left, About Event Right */}
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-2 md:gap-8 lg:gap-12 items-center">
            {/* Single Image - Left Side (4/5 width) */}
            <div className="w-full lg:col-span-4 relative h-[300px] md:h-[500px] lg:h-auto rounded-lg overflow-hidden order-1 lg:order-1">
              <div className="relative w-full">
                <Image
                  src="/assets/shane/dhamaka.png"
                  alt="Bollywood Dhamaka"
                  width={0}
                  height={0}
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="w-full h-[300px] md:h-[500px] lg:h-auto object-cover md:object-contain hover:scale-105 transition-all duration-300"
                  priority
                />
              </div>
            </div>

            {/* About Event Section - Right Side (1/5 width) */}
            <div className="w-full lg:col-span-1 flex flex-col justify-center order-2 lg:order-2 px-4 md:px-0">
              <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-4 md:mb-6">
                About Event
              </h2>
              <div className="flex-1">
                <p
                  className="text-gray-700 text-base md:text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: aboutEventText }}
                />
              </div>
            </div>
          </div>

          {/* CHRISTMAS JAM Section */}
          <div className="mt-16 md:mt-20">
            {/* Title and Subtitle */}
            <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
                <span className="text-red-600">CHRISTMAS JAM</span>
              </h1>
            </div>

            {/* Main Content: Image Left, About Event Right */}
            <div className="flex flex-col lg:grid lg:grid-cols-5 gap-2 md:gap-8 lg:gap-12 items-center">
              {/* Single Image - Left Side (4/5 width) */}
              <div className="w-full lg:col-span-4 relative h-[300px] md:h-[500px] lg:h-auto rounded-lg overflow-hidden order-1 lg:order-1">
                <div className="relative w-full">
                  <Image
                    src="/assets/shane/chri.png"
                    alt="Christmas Jam"
                    width={0}
                    height={0}
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    className="w-full h-[300px] md:h-[500px] lg:h-auto object-cover md:object-contain hover:scale-105 transition-all duration-300"
                    priority
                  />
                </div>
              </div>

              {/* About Event Section - Right Side (1/5 width) */}
              <div className="w-full lg:col-span-1 flex flex-col justify-center order-2 lg:order-2 px-4 md:px-0">
                <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-4 md:mb-6">
                  Charity Fund Raising Event
                </h2>
                <div className="flex-1">
                  <p
                    className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: charityEventText }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}

