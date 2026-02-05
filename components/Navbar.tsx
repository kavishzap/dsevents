import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-8 lg:px-12">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/assets/DS Events Logo without BG WHITE.png"
          alt="DS Events & Shows"
          width={60}
          height={30}
          className="h-auto w-auto"
          priority
        />
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
        <Link href="/" className="px-4 py-2 border-2 border-white rounded-full text-white font-medium hover:bg-white/10 transition-colors text-sm lg:text-base">
          Home
        </Link>
        <Link href="/services" className="text-white font-medium hover:text-gray-300 transition-colors text-sm lg:text-base">
          Services
        </Link>
        <Link href="/concerts" className="text-white font-medium hover:text-gray-300 transition-colors text-sm lg:text-base">
          Concerts
        </Link>
        <Link href="/about" className="text-white font-medium hover:text-gray-300 transition-colors text-sm lg:text-base">
          About us
        </Link>
        <Link href="/contacts" className="text-white font-medium hover:text-gray-300 transition-colors text-sm lg:text-base">
          Contacts
        </Link>
        <Link href="/login" className="text-white font-medium hover:text-gray-300 transition-colors text-sm lg:text-base">
          Log In
        </Link>
      </div>
      
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  )
}

