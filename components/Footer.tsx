import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="relative w-full min-h-[400px] overflow-hidden">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/KDT-87.jpg"
          alt="DS Events Footer Background"
          fill
          className="object-cover w-full h-full object-[center_30%]"
          priority={false}
          quality={90}
        />
        {/* Black opacity overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        {/* Gradient Overlays for Dramatic Lighting Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-transparent to-orange-900/50"></div>
        {/* Smoky effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 flex min-h-[400px] flex-col items-center justify-center px-8 pb-0 mt-5">
        <h2 className="text-center text-4xl font-bold text-white sm:text-5xl md:text-5xl lg:text-6xl tracking-tight mb-4">
          <span className="block md:inline">CREATING EXPERIENCES.</span>
          <span className="hidden md:inline"> </span>
          <span className="block md:inline">NOT JUST EVENTS.</span>
        </h2>
        
        {/* Developed By Section */}
        <div className="flex flex-col items-center gap-1 mt-2">
          <p className="text-white/80 text-sm md:text-base">Developed by:</p>
          <Image
            src="/dev.png"
            alt="Developer"
            width={80}
            height={50}
            className="h-auto w-auto opacity-90"
            priority={false}
          />
          <p className="text-white/60 text-xs md:text-sm mt-1">
            © {new Date().getFullYear()} DS Events. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

