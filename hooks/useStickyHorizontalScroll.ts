import { useRef } from 'react'
import { useScroll, useTransform, MotionValue } from 'framer-motion'

interface UseStickyHorizontalScrollReturn {
  outerRef: React.RefObject<HTMLDivElement | null>
  x: MotionValue<string>
  scrollYProgress: MotionValue<number>
}

export function useStickyHorizontalScroll(
  numSteps: number
): UseStickyHorizontalScrollReturn {
  const outerRef = useRef<HTMLDivElement>(null)

  // Track scroll progress across the full outer container
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  // Map scroll progress 0→1 to x translation: 0 → -(numSteps-1) * 100vw
  // Using percentage strings so it's responsive to any screen width
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `-${(numSteps - 1) * 100}vw`]
  )

  return { outerRef, x, scrollYProgress }
}
