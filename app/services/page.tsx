'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export default function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const description =
    "At DS Events, we bring life to your celebrations with our top-tier DJ services, ensuring that every event is filled with the perfect beats, seamless transitions, and an electric atmosphere. Whether you're hosting a birthday party, engagement ceremony, wedding reception, corporate event, or any other special gathering, our skilled DJs are here to make it unforgettable."

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white pt-20 md:pt-24">
        <div className="mx-auto max-w-7xl px-4 md:px-4 lg:px-8 py-6 md:py-10 lg:py-16">
          {/* Title */}
          <div className="mb-1 md:mb-2">
            <h1 className="text-2xl font-extrabold md:text-3xl lg:text-4xl">
              <span className="text-red-600">DJ SHANE B</span>
              <span className="text-gray-600"> | ARTISTS</span>
            </h1>
          </div>

          {/* Simple Layout: Image Left, Text Right */}
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-2 md:gap-8 lg:gap-12 items-center">
            {/* Image - Full width on mobile, 4/5 on desktop */}
            <div className="w-full lg:col-span-4 relative h-[300px] md:h-[500px] lg:h-auto rounded-lg overflow-hidden order-1 lg:order-1">
              <div className="relative w-full">
                <Image
                  src="/assets/shane/DJ Shane pack-17.png"
                  alt="DJ Shane B"
                  width={0}
                  height={0}
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="w-full h-[300px] md:h-[500px] lg:h-auto object-cover md:object-contain hover:scale-105 transition-all duration-300"
                  priority
                />
              </div>
            </div>

            {/* Text - Below image on mobile, Right side on desktop (1/5) */}
            <div className="w-full lg:col-span-1 flex flex-col justify-center order-2 lg:order-2 px-4 md:px-0">
              <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed">
                At <span className="font-bold">DS Events</span>, we bring life to your celebrations with our top-tier DJ services, ensuring that every event is filled with the perfect beats, seamless transitions, and an electric atmosphere. Whether you're hosting a <span className="font-bold">birthday party, engagement ceremony, wedding reception, corporate event, or any other special gathering</span>, our skilled DJs are here to make it unforgettable.
              </p>
            </div>
          </div>

          {/* Live Band Section */}
          <div className="mt-16 md:mt-20">
            {/* Title */}
            <div className="mb-1 md:mb-2">
              <h1 className="text-2xl font-extrabold md:text-3xl lg:text-4xl">
                <span className="text-red-600">LIVE BAND ANIMATIONS</span>
                <span className="text-gray-600"> | ARTISTS</span>
              </h1>
            </div>

            {/* Simple Layout: Image Left, Text Right */}
            <div className="flex flex-col lg:grid lg:grid-cols-5 gap-2 md:gap-8 lg:gap-12 items-center">
              {/* Image - Full width on mobile, 4/5 on desktop */}
              <div className="w-full lg:col-span-4 relative h-[300px] md:h-[500px] lg:h-auto rounded-lg overflow-hidden order-1 lg:order-1">
                <div className="relative w-full">
                  <Image
                    src="/assets/shane/Live Pack-17.png"
                    alt="Live Band"
                    width={0}
                    height={0}
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    className="w-full h-[300px] md:h-[500px] lg:h-auto object-cover md:object-contain hover:scale-105 transition-all duration-300"
                    priority
                  />
                </div>
              </div>

              {/* Text - Below image on mobile, Right side on desktop (1/5) */}
              <div className="w-full lg:col-span-1 flex flex-col justify-center order-2 lg:order-2 px-4 md:px-0">
                <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed">
                  <span className="font-bold">Divesh & The Band</span> from <span className="font-bold">DS Events</span> bring electrifying performances that blend soulful melodies, high-energy beats, and crowd-pumping anthems. Whether it's a <span className="font-bold">wedding reception, engagement party, corporate gala, birthday celebration, or a grand musical event</span>, our live band delivers a one-of-a-kind experience that will leave your guests mesmerized!
                </p>
              </div>
            </div>
          </div>

          {/* Karaoke Show Section */}
          <div className="mt-16 md:mt-20">
            {/* Title */}
            <div className="mb-1 md:mb-2">
              <h1 className="text-2xl font-extrabold md:text-3xl lg:text-4xl">
                <span className="text-red-600">KARAOKE SHOW</span>
                <span className="text-gray-600"> | ARTISTS</span>
              </h1>
            </div>

            {/* Simple Layout: Image Left, Text Right */}
            <div className="flex flex-col lg:grid lg:grid-cols-5 gap-2 md:gap-8 lg:gap-12 items-center">
              {/* Image - Full width on mobile, 4/5 on desktop */}
              <div className="w-full lg:col-span-4 relative h-[300px] md:h-[500px] lg:h-auto rounded-lg overflow-hidden order-1 lg:order-1">
                <div className="relative w-full">
                  <Image
                    src="/assets/shane/DS Event Website-17.png"
                    alt="Karaoke Show"
                    width={0}
                    height={0}
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    className="w-full h-[300px] md:h-[500px] lg:h-auto object-cover md:object-contain hover:scale-105 transition-all duration-300"
                    priority
                  />
                </div>
              </div>

              {/* Text - Below image on mobile, Right side on desktop (1/5) */}
              <div className="w-full lg:col-span-1 flex flex-col justify-center order-2 lg:order-2 px-4 md:px-0">
                <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed">
                  Our <span className="font-bold">Karaoke Services</span> are perfect for any occasion, adding a fun, engaging, and unforgettable touch to your event. Whether you're hosting a <span className="font-bold">birthday party</span>, engagement celebration, <span className="font-bold">wedding reception</span>, <span className="font-bold">corporate event</span>, or a casual <span className="font-bold">get-together</span>, our karaoke setup will turn your guests into the stars of the night.
                </p>
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
