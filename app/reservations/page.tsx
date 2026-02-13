'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
interface Event {
  start_date: string
  end_date: string
}

export default function ReservationsPage() {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedDateRange, setSelectedDateRange] = useState<[Date | null, Date | null]>([null, null])
    const [endOnSameDate, setEndOnSameDate] = useState(true)
    const [selectedServices, setSelectedServices] = useState<string[]>([])
    const [eventDescription, setEventDescription] = useState('')
    const [specialRequests, setSpecialRequests] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [blockedDates, setBlockedDates] = useState<Date[]>([])

    useEffect(() => {
        window.scrollTo(0, 0)
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        try {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
            const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

            if (!supabaseUrl || !supabaseKey) {
                console.error('Supabase credentials not found')
                return
            }

            const response = await fetch(
                `${supabaseUrl}/rest/v1/events?select=start_date,end_date&status=in.(confirmed,completed)&order=start_date.desc`,
                {
                    method: 'GET',
                    headers: {
                        'apikey': supabaseKey,
                        'Authorization': `Bearer ${supabaseKey}`,
                        'Content-Type': 'application/json',
                        'Prefer': 'return=minimal'
                    }
                }
            )

            if (!response.ok) {
                console.error('Error fetching events:', response.statusText)
                return
            }

            const data: Event[] = await response.json()

            if (data && Array.isArray(data)) {
                // Convert event date ranges to blocked dates
                // Server already filters for confirmed/completed events
                const dates: Date[] = []
                data.forEach((event) => {
                    // Extract date part (YYYY-MM-DD) from ISO string to avoid timezone issues
                    const startDateStr = event.start_date.split('T')[0] // "2026-02-28"
                    const endDateStr = event.end_date.split('T')[0] // "2026-03-02"
                    
                    // Parse date strings (YYYY-MM-DD format)
                    const [startYear, startMonth, startDay] = startDateStr.split('-').map(Number)
                    const [endYear, endMonth, endDay] = endDateStr.split('-').map(Number)
                    
                    // Create dates in local timezone
                    const start = new Date(startYear, startMonth - 1, startDay)
                    const end = new Date(endYear, endMonth - 1, endDay)
                    
                    // Add all dates in the range
                    const currentDate = new Date(start)
                    while (currentDate <= end) {
                        // Create a new date object for each date to avoid reference issues
                        const dateToAdd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
                        dates.push(dateToAdd)
                        currentDate.setDate(currentDate.getDate() + 1)
                    }
                })
                setBlockedDates(dates)
            }
        } catch (error) {
            console.error('Error fetching events:', error)
        }
    }

    const isDateBlocked = (date: Date): boolean => {
        if (blockedDates.length === 0) {
            return false
        }
        
        // Normalize the date to compare only year, month, day
        const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        const normalizedDateStr = `${normalizedDate.getFullYear()}-${String(normalizedDate.getMonth() + 1).padStart(2, '0')}-${String(normalizedDate.getDate()).padStart(2, '0')}`
        
        return blockedDates.some(blockedDate => {
            const normalizedBlocked = new Date(blockedDate.getFullYear(), blockedDate.getMonth(), blockedDate.getDate())
            const normalizedBlockedStr = `${normalizedBlocked.getFullYear()}-${String(normalizedBlocked.getMonth() + 1).padStart(2, '0')}-${String(normalizedBlocked.getDate()).padStart(2, '0')}`
            return normalizedDateStr === normalizedBlockedStr
        })
    }

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

        // Check if date is selected (single date or date range)
        const hasDate = endOnSameDate ? selectedDate : (selectedDateRange[0] && selectedDateRange[1])
        
        if (!fullName || !email || !phone || !hasDate || selectedServices.length === 0) {
            return
        }

        setIsSubmitting(true)

        let dateString = ''
        if (endOnSameDate && selectedDate) {
            dateString = selectedDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        } else if (!endOnSameDate && selectedDateRange[0] && selectedDateRange[1]) {
            const startDate = selectedDateRange[0].toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
            const endDate = selectedDateRange[1].toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
            dateString = `${startDate} - ${endDate}`
        }

        // Create properly formatted WhatsApp message
        let whatsappMessage = `*Reservation Request*\n\n`
        whatsappMessage += `*CONTACT INFORMATION*\n`
        whatsappMessage += `Full Name: ${fullName}\n`
        whatsappMessage += `Email: ${email}\n`
        whatsappMessage += `Phone: ${phone}\n\n`
        whatsappMessage += `*RESERVATION DETAILS*\n`
        whatsappMessage += `Selected Date: ${dateString}\n`
        whatsappMessage += `Selected Services: ${selectedServices.join(', ')}\n\n`
        
        if (eventDescription) {
            whatsappMessage += `*EVENT DESCRIPTION*\n`
            whatsappMessage += `${eventDescription}\n\n`
        }
        
        if (specialRequests) {
            whatsappMessage += `*SPECIAL REQUESTS*\n`
            whatsappMessage += `${specialRequests}\n\n`
        }
        
        whatsappMessage += `Thank you for your time and consideration.\n\n`
        whatsappMessage += `Best regards,\n${fullName}`

        // Create WhatsApp link (using phone number from contacts: +23058393719)
        // Remove spaces and special characters from phone number
        const phoneNumber = '23058393719'
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`

        // Open WhatsApp
        window.open(whatsappLink, '_blank')

        // Reset form after a delay
        setTimeout(() => {
            setIsSubmitting(false)
            setFullName('')
            setEmail('')
            setPhone('')
            setSelectedDate(null)
            setSelectedDateRange([null, null])
            setSelectedServices([])
            setEventDescription('')
            setSpecialRequests('')
        }, 2000)
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
                            {/* User Details */}
                            <div>
                                <label className="block text-xl md:text-2xl font-bold text-gray-800 mb-4">
                                    Your Details
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            required
                                            placeholder="Enter your full name"
                                            className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none text-lg transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="your.email@example.com"
                                            className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none text-lg transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        placeholder="+230 5XXX XXXX"
                                        className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none text-lg transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Select Date */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <label className="block text-xl md:text-2xl font-bold text-gray-800">
                                        Select Date
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={endOnSameDate}
                                            onChange={(e) => {
                                                setEndOnSameDate(e.target.checked)
                                                if (e.target.checked) {
                                                    // Reset date range when switching to single date
                                                    setSelectedDateRange([null, null])
                                                } else {
                                                    // Reset single date when switching to date range
                                                    setSelectedDate(null)
                                                }
                                            }}
                                            className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-600 focus:ring-2"
                                        />
                                        <span className="text-base md:text-lg font-medium text-gray-700">
                                            End on same date
                                        </span>
                                    </label>
                                </div>
                                <div className="w-full">
                                    {endOnSameDate ? (
                                        <Calendar
                                            key={`single-${blockedDates.length}`}
                                            onChange={(value) => {
                                                const selected = value as Date
                                                // Prevent selecting blocked dates
                                                if (!isDateBlocked(selected)) {
                                                    setSelectedDate(selected)
                                                } else {
                                                    alert('This date is already booked. Please select another date.')
                                                }
                                            }}
                                            value={selectedDate}
                                            minDate={new Date()}
                                            selectRange={false}
                                            className="w-full border-2 border-gray-300 rounded-lg p-4 shadow-lg"
                                            tileDisabled={({ date, view }) => {
                                                if (view === 'month') {
                                                    return isDateBlocked(date)
                                                }
                                                return false
                                            }}
                                            tileClassName={({ date, view }) => {
                                                if (view === 'month') {
                                                    if (isDateBlocked(date)) {
                                                        return 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                                                    }
                                                    if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
                                                        return 'bg-red-600 text-white rounded-lg'
                                                    }
                                                    return 'hover:bg-red-100 rounded-lg'
                                                }
                                                return ''
                                            }}
                                            tileContent={({ date, view }) => {
                                                if (view === 'month' && isDateBlocked(date)) {
                                                    return (
                                                        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                                                            <span className="text-[8px] md:text-[10px] font-bold text-red-600 bg-white px-1 rounded border border-red-600">
                                                                TAKEN
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                                return null
                                            }}
                                        />
                                    ) : (
                                        <Calendar
                                            key={`range-${blockedDates.length}`}
                                            onChange={(value) => {
                                                const range = value as [Date, Date] | Date
                                                if (Array.isArray(range)) {
                                                    const [start, end] = range
                                                    // Check if any date in the range is blocked
                                                    if (start && end) {
                                                        const currentDate = new Date(start)
                                                        let hasBlockedDate = false
                                                        while (currentDate <= end) {
                                                            if (isDateBlocked(currentDate)) {
                                                                hasBlockedDate = true
                                                                break
                                                            }
                                                            currentDate.setDate(currentDate.getDate() + 1)
                                                        }
                                                        if (!hasBlockedDate) {
                                                            setSelectedDateRange([start, end])
                                                        } else {
                                                            alert('Some dates in this range are already booked. Please select another date range.')
                                                            setSelectedDateRange([null, null])
                                                        }
                                                    } else if (start) {
                                                        setSelectedDateRange([start, null])
                                                    }
                                                }
                                            }}
                                            value={selectedDateRange}
                                            minDate={new Date()}
                                            selectRange={true}
                                            className="w-full border-2 border-gray-300 rounded-lg p-4 shadow-lg"
                                            tileDisabled={({ date, view }) => {
                                                if (view === 'month') {
                                                    return isDateBlocked(date)
                                                }
                                                return false
                                            }}
                                            tileClassName={({ date, view }) => {
                                                if (view === 'month') {
                                                    if (isDateBlocked(date)) {
                                                        return 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                                                    }
                                                    // Highlight range
                                                    if (selectedDateRange[0] && selectedDateRange[1]) {
                                                        const dateStr = date.toDateString()
                                                        const startStr = selectedDateRange[0].toDateString()
                                                        const endStr = selectedDateRange[1].toDateString()
                                                        if (dateStr === startStr || dateStr === endStr || 
                                                            (date >= selectedDateRange[0] && date <= selectedDateRange[1])) {
                                                            return 'bg-red-600 text-white rounded-lg'
                                                        }
                                                    } else if (selectedDateRange[0] && date.toDateString() === selectedDateRange[0].toDateString()) {
                                                        return 'bg-red-400 text-white rounded-lg'
                                                    }
                                                    return 'hover:bg-red-100 rounded-lg'
                                                }
                                                return ''
                                            }}
                                            tileContent={({ date, view }) => {
                                                if (view === 'month' && isDateBlocked(date)) {
                                                    return (
                                                        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                                                            <span className="text-[8px] md:text-[10px] font-bold text-red-600 bg-white px-1 rounded border border-red-600">
                                                                TAKEN
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                                return null
                                            }}
                                        />
                                    )}
                                </div>
                                {endOnSameDate && selectedDate && (
                                    <p className="mt-4 text-lg text-gray-700 font-medium">
                                        Selected: {selectedDate.toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                )}
                                {!endOnSameDate && selectedDateRange[0] && selectedDateRange[1] && (
                                    <p className="mt-4 text-lg text-gray-700 font-medium">
                                        Selected Range: {selectedDateRange[0].toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })} - {selectedDateRange[1].toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                )}
                                {!endOnSameDate && selectedDateRange[0] && !selectedDateRange[1] && (
                                    <p className="mt-4 text-lg text-gray-500 font-medium">
                                        Select end date...
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
                                    disabled={isSubmitting || !fullName || !email || !phone || (endOnSameDate ? !selectedDate : (!selectedDateRange[0] || !selectedDateRange[1])) || selectedServices.length === 0}
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
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                            </svg>
                                            Send WhatsApp
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

