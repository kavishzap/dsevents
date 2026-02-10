'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const clients = [
    { id: 1, image: '/assets/clients/1.jpg', alt: 'Ascencia' },
    { id: 2, image: '/assets/clients/ABSA_Group_Limited_Logo.svg.png', alt: 'Absa' },
    { id: 3, image: '/assets/clients/334780421_145944098370932_7320452367223027754_n.jpg', alt: 'Kendra by Ascencia' },
    { id: 4, image: '/assets/clients/logo-init.png', alt: 'Tribeca Mall' },
    { id: 5, image: '/assets/clients/326265811_700416474971239_8330579743167453708_n.jpg', alt: 'Le Suffren Hotel & Marina' },
    { id: 6, image: '/assets/clients/5d70d7de11914b8f5e217597f836903d.jpg', alt: 'Mont Choisy Coral Azur Beach Resort' },
    { id: 7, image: '/assets/clients/IQEQ_Lockup_Stacked_RGB.jpg', alt: 'IQEQ' },
    { id: 8, image: '/assets/clients/ichos-logo-01.svg', alt: 'ICHOS PRODUCTION' },
  ]

  // Handle touch events for mobile carousel
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentSlide < clients.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  // Auto-advance carousel on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (!isMobile) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === clients.length - 1 ? 0 : prev + 1))
    }, 3000)

    return () => clearInterval(interval)
  }, [clients.length])

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white pt-20 md:pt-24">
        <section className="bg-white py-8 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-red-800 mb-3 md:mb-4">
              About Us:
            </h2>
            
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

            {/* Growth Chart Section */}
            <div className="mt-12 md:mt-16">
              <h2 className="text-2xl md:text-3xl font-bold text-red-800 mb-2 md:mb-3">
                Chart representing their growth?
              </h2>
              <p className="text-gray-700 text-base md:text-lg mb-6 md:mb-8">
                The graph below shows the overall growth of the company in terms of numbers of customers gained throughout the year.
              </p>
              
              {/* Chart Container */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-3 md:p-6 lg:p-8 overflow-hidden">
                <div className="w-full">
                  {/* Growth Chart - ApexCharts */}
                  {typeof window !== 'undefined' && (
                    <Chart
                      type="line"
                      series={[{
                        name: 'Customers gained',
                        data: [10, 25, 45, 70, 90, 100]
                      }]}
                      options={{
                        chart: {
                          type: 'line',
                          height: 400,
                          animations: {
                            enabled: true,
                            easing: 'easeinout',
                            speed: 1500,
                            animateGradually: {
                              enabled: true,
                              delay: 150
                            },
                            dynamicAnimation: {
                              enabled: true,
                              speed: 350
                            }
                          },
                          toolbar: {
                            show: false
                          }
                        },
                        stroke: {
                          curve: 'smooth',
                          width: 3,
                          colors: ['#ef4444']
                        },
                        markers: {
                          size: 6,
                          colors: ['#ef4444'],
                          strokeColors: '#fff',
                          strokeWidth: 2,
                          hover: {
                            size: 8
                          }
                        },
                        dataLabels: {
                          enabled: false
                        },
                        xaxis: {
                          categories: ['2021', '2022', '2023', '2024', '2025', '2026'],
                          title: {
                            text: 'Years',
                            style: {
                              color: '#374151',
                              fontSize: '14px',
                              fontWeight: 600
                            }
                          },
                          labels: {
                            style: {
                              colors: '#374151',
                              fontSize: '12px'
                            }
                          },
                          axisBorder: {
                            show: true,
                            color: '#374151',
                            width: 2
                          },
                          axisTicks: {
                            show: true,
                            color: '#374151'
                          }
                        },
                        yaxis: {
                          title: {
                            text: 'Customers gained',
                            style: {
                              color: '#374151',
                              fontSize: '16px',
                              fontWeight: 700
                            },
                            offsetX: -5
                          },
                          min: 0,
                          max: 100,
                          labels: {
                            show: false
                          },
                          axisBorder: {
                            show: true,
                            color: '#374151',
                            width: 2
                          },
                          axisTicks: {
                            show: true,
                            color: '#374151'
                          }
                        },
                        colors: ['#ef4444'],
                        grid: {
                          borderColor: '#e5e7eb',
                          strokeDashArray: 4
                        },
                        tooltip: {
                          y: {
                            formatter: function (val: number) {
                              return val + " customers"
                            }
                          }
                        }
                      }}
                      height={400}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Bar Chart Section */}
            <div className="mt-12 md:mt-16">
              <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  As per my personal analysis, i believe that the results are quite in our favour. The market value is convicing for a 10 top position.
                </p>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  Below shows a bar chart that roughly defines where the company is situated amongst the currently most recognised and appreciated companies that deal with the similar type of entertainment.
                </p>
              </div>
              
              {/* Company Comparison Bar Chart Container */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-3 md:p-6 lg:p-8 overflow-hidden">
                <div className="w-full">
                  {/* Company Comparison Chart - ApexCharts */}
                  {typeof window !== 'undefined' && (
                    <Chart
                      type="bar"
                      series={[{
                        name: 'Level of trust',
                        data: [32, 65, 78, 49, 12]
                      }]}
                      options={{
                        chart: {
                          type: 'bar',
                          height: 400,
                          animations: {
                            enabled: true,
                            easing: 'easeinout',
                            speed: 1500,
                            animateGradually: {
                              enabled: true,
                              delay: 150
                            }
                          },
                          toolbar: {
                            show: false
                          }
                        },
                        plotOptions: {
                          bar: {
                            borderRadius: 4,
                            columnWidth: '60%',
                            dataLabels: {
                              position: 'top'
                            },
                            colors: {
                              ranges: [{
                                from: 65,
                                to: 65,
                                color: '#ef4444'
                              }]
                            }
                          }
                        },
                        dataLabels: {
                          enabled: false
                        },
                        xaxis: {
                          categories: ['Company 1', 'DS Events', 'Company 2', 'Company 3', 'Company 4'],
                          title: {
                            text: 'Companies',
                            style: {
                              color: '#374151',
                              fontSize: '14px',
                              fontWeight: 600
                            }
                          },
                          labels: {
                            style: {
                              colors: '#374151',
                              fontSize: '12px'
                            }
                          },
                          axisBorder: {
                            show: true,
                            color: '#374151',
                            width: 2
                          },
                          axisTicks: {
                            show: true,
                            color: '#374151'
                          }
                        },
                        yaxis: {
                          title: {
                            text: 'Level of trust',
                            style: {
                              color: '#374151',
                              fontSize: '14px',
                              fontWeight: 600
                            },
                            offsetX: -10
                          },
                          min: 0,
                          max: 100,
                          labels: {
                            style: {
                              colors: '#374151',
                              fontSize: '12px'
                            }
                          },
                          axisBorder: {
                            show: true,
                            color: '#374151',
                            width: 2
                          },
                          axisTicks: {
                            show: true,
                            color: '#374151'
                          }
                        },
                        colors: ['#9ca3af', '#ef4444', '#9ca3af', '#9ca3af', '#9ca3af'],
                        grid: {
                          borderColor: '#e5e7eb',
                          strokeDashArray: 4
                        },
                        tooltip: {
                          y: {
                            formatter: function (val: number) {
                              return val + "%"
                            }
                          }
                        }
                      }}
                      height={400}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Target Audience Section */}
            <div className="mt-12 md:mt-16">
              <h2 className="text-2xl md:text-3xl font-bold text-red-800 mb-4 md:mb-6">
                Our target audience would mainly be
              </h2>
              
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <ol className="list-decimal list-inside space-y-2 text-gray-700 text-base md:text-lg">
                  <li>Event Planners</li>
                  <li>Corporate</li>
                  <li>Business Owners</li>
                  <li>Government related functions</li>
                  <li>Music Lovers</li>
                </ol>
                
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mt-4">
                  Futhermore, no matter the type of audience that approaches us for our services, we always deliver our best to ensure that the client is fully satisfied for the special day. We pay attention to all details because this is the only way to be as competitive as others in this field.
                </p>
              </div>
              
              {/* Target Audience Bar Chart Container */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-3 md:p-6 lg:p-8 overflow-hidden">
                <div className="w-full">
                  {/* Target Audience Chart - ApexCharts */}
                  {typeof window !== 'undefined' && (
                    <Chart
                      type="bar"
                      series={[{
                        name: 'Level of trust',
                        data: [55, 22, 82, 42, 72]
                      }]}
                      options={{
                        chart: {
                          type: 'bar',
                          height: 400,
                          animations: {
                            enabled: true,
                            easing: 'easeinout',
                            speed: 1500,
                            animateGradually: {
                              enabled: true,
                              delay: 150
                            }
                          },
                          toolbar: {
                            show: false
                          }
                        },
                        plotOptions: {
                          bar: {
                            borderRadius: 4,
                            columnWidth: '60%',
                            dataLabels: {
                              position: 'top'
                            }
                          }
                        },
                        dataLabels: {
                          enabled: false
                        },
                        xaxis: {
                          categories: ['Events Planner', 'Corporate', 'Business Owners', 'Govt. Functions', 'Music Lovers'],
                          title: {
                            text: 'Audience Type',
                            style: {
                              color: '#374151',
                              fontSize: '14px',
                              fontWeight: 600
                            }
                          },
                          labels: {
                            style: {
                              colors: '#374151',
                              fontSize: '11px'
                            },
                            rotate: -15,
                            rotateAlways: false
                          },
                          axisBorder: {
                            show: true,
                            color: '#374151',
                            width: 2
                          },
                          axisTicks: {
                            show: true,
                            color: '#374151'
                          }
                        },
                        yaxis: {
                          title: {
                            text: 'Level of trust',
                            style: {
                              color: '#374151',
                              fontSize: '14px',
                              fontWeight: 600
                            },
                            offsetX: -10
                          },
                          min: 0,
                          max: 100,
                          labels: {
                            style: {
                              colors: '#374151',
                              fontSize: '12px'
                            }
                          },
                          axisBorder: {
                            show: true,
                            color: '#374151',
                            width: 2
                          },
                          axisTicks: {
                            show: true,
                            color: '#374151'
                          }
                        },
                        colors: ['#9ca3af', '#9ca3af', '#3b82f6', '#9ca3af', '#9ca3af'],
                        grid: {
                          borderColor: '#e5e7eb',
                          strokeDashArray: 4
                        },
                        tooltip: {
                          y: {
                            formatter: function (val: number) {
                              return val + "%"
                            }
                          }
                        }
                      }}
                      height={400}
                    />
                  )}
                </div>
              </div>
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

              {/* Mobile Carousel */}
              <div className="md:hidden relative overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {clients.map((client) => (
                    <div key={client.id} className="min-w-full flex flex-col items-center justify-center p-4">
                      <div className="w-full h-32 flex items-center justify-center">
                        <Image 
                          src={client.image} 
                          alt={client.alt}
                          width={200}
                          height={128}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Navigation Dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {clients.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide ? 'bg-rose-700 w-6' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-4 gap-6 md:gap-8">
                {clients.map((client) => (
                  <div key={client.id} className="flex flex-col items-center justify-center p-4 group cursor-pointer">
                    <div className="w-full h-32 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:brightness-110">
                      <Image 
                        src={client.image} 
                        alt={client.alt}
                        width={200}
                        height={128}
                        className="max-w-full max-h-full object-contain transition-all duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vision for the Future Section */}
        <section className="bg-white py-8 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 mb-6 md:mb-8 uppercase">
              VISION FOR THE FUTURE
            </h2>
            
            <div className="space-y-4 md:space-y-6">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Building on their success, DS Events aims to solidify its position as a leading entertainment provider. By consistently delivering exceptional performances and expanding their reach, the company aspires to set new benchmarks in the live music and events industry.
              </p>
              
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Moreover, DS Events is on a mission to become a trailblazer in the entertainment industry, not just as performers but as creators of opportunities and platforms that shape the future of live entertainment. With our eyes set on bigger milestones, here's how we envision our growth and success :
              </p>
              
              {/* Section 1: Taking on Bigger Projects */}
              <div className="mt-8 md:mt-10">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
                  1. Taking on Bigger Projects
                </h3>
                
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                  We aspire to be part of larger-scale events, including international music festivals, grand corporate galas, and televised performances. By continuously enhancing the quality and scale of our productions, DS Events aims to attract prestigious clients and establish itself as a trusted name in high-profile entertainment.
                </p>
                
                <h4 className="text-lg md:text-xl font-bold text-red-600 mb-3 md:mb-4">
                  Carving the Path:
                </h4>
                
                <ol className="list-decimal list-inside space-y-3 text-gray-700 text-base md:text-lg leading-relaxed ml-4">
                  <li className="font-bold">
                    <span className="font-normal">Collaborating with established event planners and international brands.</span>
                  </li>
                  <li className="font-bold">
                    <span className="font-normal">Investing in cutting-edge stage design, lighting, and sound equipment to elevate our aesthetics.</span>
                  </li>
                  <li className="font-bold">
                    <span className="font-normal">Expanding our repertoire to appeal to global audiences and different cultures.</span>
                  </li>
                </ol>
              </div>
              
              {/* Section 2: Building Our Own Label */}
              <div className="mt-8 md:mt-10">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
                  2. Building Our Own Label
                </h3>
                
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                  One of our core goals is to create a record label under the DS Events brand. This initiative aims to support local talent, provide a platform for original music, and help budding artists gain recognition on both national and international stages.
                </p>
                
                <h4 className="text-lg md:text-xl font-bold text-red-600 mb-3 md:mb-4">
                  Carving the Path:
                </h4>
                
                <ol className="list-decimal list-inside space-y-3 text-gray-700 text-base md:text-lg leading-relaxed ml-4">
                  <li className="font-bold">
                    <span className="font-normal">Partnering with local artists to produce and release original music.</span>
                  </li>
                  <li className="font-bold">
                    <span className="font-normal">Establishing a robust online presence with digital distribution strategies.</span>
                  </li>
                  <li className="font-bold">
                    <span className="font-normal">Hosting talent scouting events, open mic nights, and competitions to discover fresh talent.</span>
                  </li>
                  <li className="font-bold">
                    <span className="font-normal">Leveraging partnerships with streaming platforms and media outlets for maximum exposure.</span>
                  </li>
                </ol>
              </div>
              
              {/* Section 3: Supporting Local Talent */}
              <div className="mt-8 md:mt-10">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
                  3. Supporting Local Talent
                </h3>
                
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                  We believe in the potential of the local music and entertainment industry. By fostering collaboration and providing resources, DS Events seeks to uplift emerging artists and help them build sustainable careers.
                </p>
                
                <h4 className="text-lg md:text-xl font-bold text-red-600 mb-3 md:mb-4">
                  Carving the Path:
                </h4>
                
                <ol className="list-decimal list-inside space-y-3 text-gray-700 text-base md:text-lg leading-relaxed ml-4">
                  <li className="font-bold">
                    <span className="font-normal">Offering mentorship programs and professional workshops in music, stage presence, and production.</span>
                  </li>
                  <li className="font-bold">
                    <span className="font-normal">Featuring local talent in DS Events productions and live shows.</span>
                  </li>
                  <li className="font-bold">
                    <span className="font-normal">Creating platforms like "DS Academy" to showcase new artists through online content, live events, and collaborations.</span>
                  </li>
                </ol>
              </div>
              
              {/* Section 4: Growing Our Team */}
              <div className="mt-8 md:mt-10">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
                  4. Growing Our Team
                </h3>
                
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                  To keep up with the increasing demand for our services, we aim to grow our team by bringing in skilled professionals who share our passion for excellence. This expansion will ensure we deliver even more effective and seamless experiences for our clients.
                </p>
                
                <h4 className="text-lg md:text-xl font-bold text-red-600 mb-3 md:mb-4">
                  Carving the Path:
                </h4>
                
                <ol className="list-decimal list-inside space-y-3 text-gray-700 text-base md:text-lg leading-relaxed ml-4">
                  <li className="font-bold">
                    <span className="font-normal">Recruiting talent across key roles, including event coordinators, sound engineers, and marketing specialists.</span>
                  </li>
                  <li className="font-bold">
                    <span className="font-normal">Providing training and development opportunities for our team to stay ahead in a competitive industry.</span>
                  </li>
                  <li className="font-bold">
                    <span className="font-normal">Building a diverse, inclusive team that reflects our commitment to creativity and innovation.</span>
                  </li>
                </ol>
              </div>
              
              {/* Section 5: Staying True to Our Values */}
              <div className="mt-8 md:mt-10">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
                  5. Staying True to Our Values
                </h3>
                
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  Amid our growth, DS Events remains committed to our core values: passion, authenticity, and connection. Every performance and every project will continue to reflect the joy and energy that first inspired us.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}

