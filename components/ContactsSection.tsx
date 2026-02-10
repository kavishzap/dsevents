'use client'

import Image from 'next/image'
import { useScrollFade } from '@/hooks/useParallax'

export default function ContactsSection() {
    const [setSectionRef, isSectionVisible] = useScrollFade()
    
    return (
        <section ref={setSectionRef} className={`relative bg-white py-8 md:py-16 px-4 md:px-8 transition-all duration-1000 overflow-hidden ${isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Scattered Musical Icons Background */}
            <div className="absolute inset-0 pointer-events-none opacity-15 md:opacity-10">
                {/* Microphone Icons */}
                <svg className="absolute top-10 left-10 w-8 h-8 md:w-12 md:h-12 text-red-600 rotate-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
                <svg className="absolute top-32 right-20 w-6 h-6 md:w-10 md:h-10 text-red-600 -rotate-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
                <svg className="absolute bottom-20 left-32 w-7 h-7 md:w-11 md:h-11 text-red-600 rotate-45" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>

                {/* Headphone Icons */}
                <svg className="absolute top-24 right-10 w-8 h-8 md:w-12 md:h-12 text-red-600 -rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                </svg>
                <svg className="absolute bottom-32 right-32 w-6 h-6 md:w-10 md:h-10 text-red-600 rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                </svg>

                {/* Music Note Icons */}
                <svg className="absolute top-16 left-1/4 w-6 h-6 md:w-9 md:h-9 text-red-600 rotate-45" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
                <svg className="absolute top-48 right-1/4 w-7 h-7 md:w-10 md:h-10 text-red-600 -rotate-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
                <svg className="absolute bottom-16 left-1/3 w-5 h-5 md:w-8 md:h-8 text-red-600 rotate-90" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>

                {/* DJ Turntable/Vinyl Icons */}
                <svg className="absolute top-1/3 left-12 w-8 h-8 md:w-12 md:h-12 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" fill="currentColor"/>
                    <circle cx="12" cy="12" r="1" fill="white"/>
                </svg>
                <svg className="absolute bottom-1/4 right-16 w-6 h-6 md:w-10 md:h-10 text-red-600 rotate-45" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" fill="currentColor"/>
                    <circle cx="12" cy="12" r="1" fill="white"/>
                </svg>

                {/* Speaker Icons */}
                <svg className="absolute top-20 right-1/3 w-7 h-7 md:w-11 md:h-11 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
                </svg>
                <svg className="absolute bottom-24 left-20 w-6 h-6 md:w-9 md:h-9 text-red-600 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
                </svg>

                {/* Guitar Icons */}
                <svg className="absolute top-1/2 right-8 w-7 h-7 md:w-10 md:h-10 text-red-600 rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                </svg>
                <svg className="absolute bottom-12 left-1/2 w-6 h-6 md:w-9 md:h-9 text-red-600 -rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                </svg>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <h2 className="text-xl md:text-3xl font-bold text-red-800 mb-3 md:mb-4">
                    Contact Us:
                </h2>

                {/* Contact Names Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
                    <h4 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Mr DIVESH BHIKEEA <span className="text-red-600">| CEO</span>
                    </h4>
                    <h4 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Mr SHANAND BHIKEEA <span className="text-red-600">| DIRECTOR</span>
                    </h4>
                </div>

                {/* Contact Profiles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* Mr. DIVESH BHIKEEA | CEO */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-64 flex-shrink-0">
                            <div className="relative w-full" style={{ paddingBottom: '160%' }}>
                                <Image
                                    src="/assets/contact/test.png"
                                    alt="Mr. DIVESH BHIKEEA"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <p className="text-gray-600 text-sm md:text-base mb-6 md:mb-8 italic">
                                Please reach me on the following details;
                            </p>
                            <div className="space-y-4 text-gray-700">
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <a href="tel:+23058393719" className="text-base md:text-lg font-medium hover:text-red-600 transition-colors">+ 230 (5) 839 3719</a>
                                </div>
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a href="mailto:ds.events2102@gmail.com" className="text-base md:text-lg hover:text-red-600 transition-colors">ds.events2102@gmail.com</a>
                                </div>
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    <a href="" target="_blank" rel="noopener noreferrer" className="text-base md:text-lg hover:text-red-600 transition-colors"><span className="font-semibold">Facebook Portfolio:</span> DS Events & Shows</a>
                                </div>
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                                    </svg>
                                    <a href="" target="_blank" rel="noopener noreferrer" className="text-base md:text-lg hover:text-red-600 transition-colors"><span className="font-semibold">TikTok Account:</span> Divesh Bhikeea/DS Events</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mr. SHANAND BHIKEEA | DIRECTOR */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-64 flex-shrink-0">
                            <div className="relative w-full" style={{ paddingBottom: '160%' }}>
                                <Image
                                    src="/assets/contact/image.png"
                                    alt="Mr. SHANAND BHIKEEA"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <p className="text-gray-600 text-sm md:text-base mb-6 md:mb-8 italic">
                                Please reach me on the following details;
                            </p>
                            <div className="space-y-4 text-gray-700">
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <a href="tel:+23057732834" className="text-base md:text-lg font-medium hover:text-red-600 transition-colors">+ 230 (5) 773 2834</a>
                                </div>
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a href="mailto:shane.bhikeea@gmail.com" className="text-base md:text-lg hover:text-red-600 transition-colors">shane.bhikeea@gmail.com</a>
                                </div>
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    <a href="" target="_blank" rel="noopener noreferrer" className="text-base md:text-lg hover:text-red-600 transition-colors"><span className="font-semibold">Facebook:</span> Shane Bhikeea</a>
                                </div>
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                                    </svg>
                                    <a href="" target="_blank" rel="noopener noreferrer" className="text-base md:text-lg hover:text-red-600 transition-colors"><span className="font-semibold">TikTok Account:</span> Shane.B</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

