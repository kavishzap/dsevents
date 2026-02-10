import Image from 'next/image'

export default function AtmosphereBanner() {
  return (
    <section className="relative w-full min-h-[300px] overflow-hidden">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/KDT-87.jpg"
          alt="DS Events Background"
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

      {/* Content */}
      <div className="relative z-10 flex min-h-[300px] flex-col items-center justify-center px-8">
        <h2 className="text-center text-4xl font-bold text-white sm:text-5xl md:text-5xl lg:text-6xl tracking-tight">
          <span className="block md:inline">CRAFTING ATMOSPHERES</span>
          <span className="hidden md:inline"> </span>
          <span className="block md:inline">THAT INSPIRE.</span>
        </h2>
      </div>
    </section>
  )
}

