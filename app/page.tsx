import Navbar from '@/components/Navbar'
import ServicesSection from '@/components/ServicesSection'
import ExperienceBanner from '@/components/ExperienceBanner'
import ConcertsSection from '@/components/ConcertsSection'
import MusicBanner from '@/components/MusicBanner'
import AboutSection from '@/components/AboutSection'
import AtmosphereBanner from '@/components/AtmosphereBanner'
import ContactsSection from '@/components/ContactsSection'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function Home() {
  return (
    <>
    <main className="relative min-h-screen overflow-hidden">
      {/* Hero Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Hero Image - Replace with your image path */}
        <Image
          src="/assets/hero.jpg"
          alt="DS Events Background"
          fill
          className="object-cover w-full h-full object-[center_30%]"
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

      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-8">
        {/* Main Slogan */}
        <h1 className="mb-12 mt-32 text-center text-4xl font-bold text-white sm:text-5xl md:text-5xl lg:text-6xl tracking-tight">
          <span className="block md:inline">CREATING EXPERIENCES.</span>
          <span className="hidden md:inline"> </span>
          <span className="block md:inline">NOT JUST EVENTS.</span>
        </h1>

        {/* Search Bar */}
        <div className="relative w-full flex justify-center">
          <div className="flex items-center rounded-full bg-black/20 backdrop-blur-md px-6 py-4 shadow-2xl max-w-sm">
            <svg
              className="mr-4 h-6 w-6 text-white flex-shrink-0"
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
            <span className="text-white text-lg font-light uppercase tracking-wider">
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
    </>
  )
}
