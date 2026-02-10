'use client'

import { useEffect, useState, useRef } from 'react'

export function useParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset * speed)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return offset
}

export function useSectionParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0)
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return
      
      const rect = elementRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate parallax based on element position
      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrolled = window.pageYOffset
        const elementTop = elementRef.current.offsetTop
        const elementHeight = elementRef.current.offsetHeight
        const parallaxValue = (scrolled - elementTop + windowHeight) * speed
        setOffset(parallaxValue)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return [elementRef, offset] as const
}

export function useScrollFade() {
  const [isVisible, setIsVisible] = useState(false)
  const [ref, setRef] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(ref)

    return () => {
      if (ref) observer.unobserve(ref)
    }
  }, [ref])

  return [setRef, isVisible] as const
}

