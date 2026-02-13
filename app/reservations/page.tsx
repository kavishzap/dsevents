'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export default function ReservationsPage() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedServices, setSelectedServices] = useState<string[]>([])
    const [eventDescription, setEventDescription] = useState('')
    const [specialRequests, setSpecialRequests] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const services = [
        {
            name: 'DJ',
            description: 'At DS Events, we bring life to your celebrations with our top-tier DJ services, ensuring that every event is filled with the perfect beats, seamless transitions, and an electric atmosphere. Whether you\'re hosting a birthday party, engagement ceremony, wedding reception, corporate event, or any other special gathering, our skilled DJs are here to make it unforgettable.'
        },
        {
            name: 'LIVE',
            description: 'Looking for a power-packed live music experience that will captivate your audience? Divesh & The Band from DS Events bring electrifying performances that blend soulful melodies, high-energy beats, and crowd-pumping anthems. Whether it\'s a wedding reception, engagement party, corporate gala, birthday celebration, or a grand musical event, our live band delivers a one-of-a-kind experience that will leave your guests mesmerized!'
        },
        {
            name: 'KARAOKE',
            description: 'We don\'t just provide music—we create interactive entertainment experiences! Our Karaoke Services are perfect for any occasion, adding a fun, engaging, and unforgettable touch to your event. Whether you\'re hosting a birthday party, engagement celebration, wedding reception, corporate event, or a casual get-together, our karaoke setup will turn your guests into the stars of the night.'
        },
        {
            name: 'UNPLUGGED',
            description: 'Experience the raw, intimate power of acoustic music with our Unplugged services. Perfect for elegant gatherings, intimate celebrations, and events where you want to create a warm, personal atmosphere. Our acoustic performances bring a sophisticated touch to any occasion.'
        },
        {
            name: 'SONO',
            description: 'Professional sound system services for all your event needs. We provide high-quality audio equipment and expert sound engineering to ensure crystal-clear sound at your event, whether it\'s a small gathering or a large-scale celebration.'
        },
        {
            name: 'LIGHTS',
            description: 'Transform your event with our professional lighting services. From ambient mood lighting to dynamic stage lighting, we create the perfect atmosphere to match your event\'s theme and energy. Our lighting solutions enhance every moment of your celebration.'
        },
    ]

    const handleServiceToggle = (serviceName: string) => {
        setSelectedServices(prev =>
            prev.includes(serviceName)
                ? prev.filter(s => s !== serviceName)
                : [...prev, serviceName]
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!selectedDate || selectedServices.length === 0) {
            return
        }

        setIsSubmitting(true)

        const dateString = selectedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })

        // Create email content
        const emailSubject = `Reservation Request - ${selectedServices.join(', ')} - ${dateString}`
        const emailBody = `
Services: ${selectedServices.join(', ')}
Date: ${dateString}

Event Description:
${eventDescription}

Special Requests:
${specialRequests}
    `.trim()

        // Create mailto link
        const mailtoLink = `mailto:ds.events2102@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

        // Open email client
        window.location.href = mailtoLink

        // Reset form after a delay
        setTimeout(() => {
            setIsSubmitting(false)
            setSelectedDate(null)
            setSelectedServices([])
            setEventDescription('')
            setSpecialRequests('')
        }, 1000)
    }

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-white pt-20 md:pt-24">

                {/* Reservation Form Section */}
                <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
                            Make a Reservation
                        </h1>
                        <p className="text-xl md:text-2xl text-black/90">
                            Book your event with DS Events & Shows
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Select Date */}
                            <div>
                                <label className="block text-xl md:text-2xl font-bold text-gray-800 mb-4">
                                    Select Date
                                </label>
                                <div className="w-full">
                                    <Calendar
                                        onChange={(value) => setSelectedDate(value as Date)}
                                        value={selectedDate}
                                        minDate={new Date()}
                                        className="w-full border-2 border-gray-300 rounded-lg p-4 shadow-lg"
                                        tileClassName={({ date, view }) => {
                                            if (view === 'month') {
                                                if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
                                                    return 'bg-red-600 text-white rounded-lg'
                                                }
                                                return 'hover:bg-red-100 rounded-lg'
                                            }
                                            return ''
                                        }}
                                    />
                                </div>
                                {selectedDate && (
                                    <p className="mt-4 text-lg text-gray-700 font-medium">
                                        Selected: {selectedDate.toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                )}
                            </div>

                            {/* Select Services (Multi-select) */}
                            <div>
                                <label className="block text-xl md:text-2xl font-bold text-gray-800 mb-4">
                                    Select Services
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {services.map((service) => (
                                        <div key={service.name} className="border-2 border-gray-300 rounded-lg p-4 hover:border-red-600 transition-colors">
                                            <label className="flex items-start gap-4 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedServices.includes(service.name)}
                                                    onChange={() => handleServiceToggle(service.name)}
                                                    className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-600 focus:ring-2 flex-shrink-0"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-xl font-bold text-gray-800">{service.name}</span>
                                                        {selectedServices.includes(service.name) && (
                                                            <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">Selected</span>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                                        {service.description}
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {selectedServices.length === 0 && (
                                    <p className="mt-2 text-red-600 text-sm">Please select at least one service</p>
                                )}
                            </div>

                            {/* Event Description */}
                            <div>
                                <label htmlFor="eventDescription" className="block text-xl md:text-2xl font-bold text-gray-800 mb-4">
                                    Event Description
                                </label>
                                <textarea
                                    id="eventDescription"
                                    value={eventDescription}
                                    onChange={(e) => setEventDescription(e.target.value)}
                                    required
                                    rows={6}
                                    placeholder="Please describe your event in detail..."
                                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none text-lg transition-colors resize-y"
                                />
                            </div>

                            {/* Special Requests */}
                            <div>
                                <label htmlFor="specialRequests" className="block text-xl md:text-2xl font-bold text-gray-800 mb-4">
                                    Special Requests
                                </label>
                                <textarea
                                    id="specialRequests"
                                    value={specialRequests}
                                    onChange={(e) => setSpecialRequests(e.target.value)}
                                    rows={4}
                                    placeholder="Any special requests or additional information..."
                                    className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none text-lg transition-colors resize-y"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !selectedDate || selectedServices.length === 0}
                                    className="w-full md:w-auto px-12 py-4 bg-red-600 text-white text-lg font-bold rounded-lg hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Send Email
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>

            <Footer />
            <ScrollToTop />
        </>
    )
}

