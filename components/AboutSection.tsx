export default function AboutSection() {
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

          {/* Client Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Ascencia */}
            <div className="flex flex-col items-center justify-center p-4">
              <div className="w-full h-24 md:h-32 flex items-center justify-center mb-2">
                <img 
                  src="/assets/clients/1.jpg" 
                  alt="Ascencia" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            {/* Absa */}
            <div className="flex flex-col items-center justify-center p-4">
              <div className="w-full h-24 md:h-32 flex items-center justify-center mb-2">
                <img 
                  src="/assets/clients/ABSA_Group_Limited_Logo.svg.png" 
                  alt="Absa" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            {/* Kendra by Ascencia */}
            <div className="flex flex-col items-center justify-center p-4">
              <div className="w-full h-24 md:h-32 flex items-center justify-center mb-2">
                <img 
                  src="/assets/clients/334780421_145944098370932_7320452367223027754_n.jpg" 
                  alt="Kendra by Ascencia" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            {/* Tribeca Mall */}
            <div className="flex flex-col items-center justify-center p-4">
              <div className="w-full h-24 md:h-32 flex items-center justify-center mb-2">
                <img 
                  src="/assets/clients/logo-init.png" 
                  alt="Tribeca Mall" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            {/* Le Suffren Hotel & Marina */}
            <div className="flex flex-col items-center justify-center p-4">
              <div className="w-full h-24 md:h-32 flex items-center justify-center mb-2">
                <img 
                  src="/assets/clients/326265811_700416474971239_8330579743167453708_n.jpg" 
                  alt="Le Suffren Hotel & Marina" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            {/* Mont Choisy Coral Azur Beach Resort */}
            <div className="flex flex-col items-center justify-center p-4">
              <div className="w-full h-24 md:h-32 flex items-center justify-center mb-2">
                <img 
                  src="/assets/clients/5d70d7de11914b8f5e217597f836903d.jpg" 
                  alt="Mont Choisy Coral Azur Beach Resort" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            {/* IQEQ */}
            <div className="flex flex-col items-center justify-center p-4">
              <div className="w-full h-24 md:h-32 flex items-center justify-center mb-2">
                <img 
                  src="/assets/clients/IQEQ_Lockup_Stacked_RGB.jpg" 
                  alt="IQEQ" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            {/* ICHOS PRODUCTION */}
            <div className="flex flex-col items-center justify-center p-4">
              <div className="w-full h-24 md:h-32 flex items-center justify-center mb-2">
                <img 
                  src="/assets/clients/ichos-logo-01.svg" 
                  alt="ICHOS PRODUCTION" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Know More About Us Button */}
          <div className="flex justify-center mt-12 md:mt-16">
            <button className="px-8 py-4 rounded-full bg-rose-700 hover:bg-rose-800 transition-colors duration-300 flex items-center gap-3">
              <span className="text-white text-lg md:text-xl font-semibold uppercase tracking-wide">
                Know More About Us
              </span>
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

