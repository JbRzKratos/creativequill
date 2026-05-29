import { useState, useEffect, useRef } from 'react'
import {
  motion,
  AnimatePresence,
  useTransform,
  useMotionValueEvent,
  useScroll,
  useSpring,
  type MotionValue,
} from 'framer-motion'

const PROCESS_STEPS = [
  { 
    num: '01', 
    phase: 'Phase 1: Audit',
    title: 'Voice Audit',   
    desc: 'We analyze your current content, competitors, and target audience to align our first draft with your unique brand voice.',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop'
  },
  { 
    num: '02', 
    phase: 'Phase 2: Talk',
    title: 'Connect & Discovery',        
    desc: 'Discover your story through a discovery call. We explore your brand narrative, business goals, and audience challenges.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600&auto=format&fit=crop'
  },
  { 
    num: '03', 
    phase: 'Phase 3: Research',
    title: 'Brand Immersion',     
    desc: 'We deep-dive into your brand world, outlining competitor gaps, audience behavior, and specific messaging guidelines.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop'
  },
  { 
    num: '04', 
    phase: 'Phase 4: Plan',
    title: 'Roadmap & Strategy',     
    desc: 'Our strategists construct a roadmap featuring narrative frameworks, content topics, and styling details.',
    image: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=600&auto=format&fit=crop'
  },
  { 
    num: '05', 
    phase: 'Phase 5: Create',
    title: 'High-Value Delivery',        
    desc: 'Get publication-ready assets in 48 hours, fully researched and polished to perfection by our expert copywriters.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop'
  },
  { 
    num: '06', 
    phase: 'Phase 6: Perfect',
    title: 'Iterate & Refine',         
    desc: 'We run structured revision rounds to fine-tune your assets, ensuring every single word meets your expectations.',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop'
  },
]
const NUM_STEPS = PROCESS_STEPS.length

export function ProcessSection() {
  const outerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [maxScroll, setMaxScroll] = useState(0)
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const calculateScroll = () => {
      if (containerRef.current) {
        const scrollWidth = containerRef.current.scrollWidth
        const clientWidth = window.innerWidth
        // Translate by the total overflow width
        setMaxScroll(Math.max(0, scrollWidth - clientWidth))
      }
    }
    
    const timer = setTimeout(calculateScroll, 200)
    
    window.addEventListener('resize', calculateScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', calculateScroll)
    }
  }, [])

  useEffect(() => {
    // Only snap on desktop screens
    if (typeof window === 'undefined' || window.innerWidth < 1024) return

    let snapTimeout: ReturnType<typeof setTimeout>
    let isSnapping = false
    let targetY = 0

    const resetSnapping = () => {
      isSnapping = false
    }

    const handleScroll = () => {
      if (!outerRef.current) return

      if (isSnapping) {
        if (Math.abs(window.scrollY - targetY) < 3) {
          isSnapping = false
        }
        return
      }

      if (snapTimeout) clearTimeout(snapTimeout)

      snapTimeout = setTimeout(() => {
        if (!outerRef.current) return

        const rect = outerRef.current.getBoundingClientRect()
        const start = window.scrollY + rect.top
        const range = outerRef.current.offsetHeight - window.innerHeight

        const currentProgress = (window.scrollY - start) / range
        if (currentProgress < 0.02 || currentProgress > 0.98) return

        const closestStep = Math.round(currentProgress * (NUM_STEPS - 1))
        const targetProgress = closestStep / (NUM_STEPS - 1)

        targetY = start + targetProgress * range

        if (Math.abs(window.scrollY - targetY) > 5) {
          isSnapping = true
          window.scrollTo({
            top: targetY,
            behavior: 'smooth'
          })
        }
      }, 250) // Snap 250ms after user stops scrolling
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('wheel', resetSnapping, { passive: true })
    window.addEventListener('touchmove', resetSnapping, { passive: true })
    window.addEventListener('keydown', resetSnapping, { passive: true })

    return () => {
      if (snapTimeout) clearTimeout(snapTimeout)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', resetSnapping)
      window.removeEventListener('touchmove', resetSnapping)
      window.removeEventListener('keydown', resetSnapping)
    }
  }, [maxScroll])

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  // Smooth spring physics for butter-smooth translation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 24,
    mass: 0.8,
    restDelta: 0.001
  })

  // Map smooth progress to horizontal translation
  const x = useTransform(smoothProgress, [0, 1], [0, -maxScroll])

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const index = Math.min(NUM_STEPS - 1, Math.floor(latest * NUM_STEPS))
    setActiveIndex(index)
  })

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const scrollLeft = target.scrollLeft
    const cardEl = target.querySelector('.mobile-process-card')
    if (!cardEl) return
    const cardWidth = cardEl.getBoundingClientRect().width
    const gap = 16
    const stepWidth = cardWidth + gap
    const index = Math.round(scrollLeft / stepWidth)
    setMobileActiveIndex(Math.min(NUM_STEPS - 1, Math.max(0, index)))
  }

  return (
    <>
      {/* ── DESKTOP: Sticky horizontal scroll ── */}
      <div
        className="hidden lg:block"
        ref={outerRef}
        style={{
          height: `${NUM_STEPS * 50}vh`,
          position: 'relative',
          backgroundColor: 'var(--cq-night)',
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: 'var(--cq-night)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* ── SECTION HEADER ── */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              padding: 'calc(var(--header-height, 4rem) + 40px) 80px 0',
              zIndex: 10,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <div>
              <span 
                className="badge-label" 
                style={{ 
                  color: 'var(--cq-parchment)', 
                  borderColor: 'rgba(250, 247, 240, 0.2)' 
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#4db896' }}>
                  <path d="M12 3l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>
                </svg>
                OUR PROCESS
              </span>
              <h2
                className="font-display text-4xl md:text-5xl mt-3 font-normal"
                style={{ color: 'var(--cq-parchment)', letterSpacing: 'var(--tracking-tight)' }}
              >
                Your Story. Our Craft. <em style={{ fontStyle: 'italic', opacity: 0.9 }}>Results That Matter.</em>
              </h2>
            </div>
            
            <StepCounter scrollYProgress={scrollYProgress} numSteps={NUM_STEPS} />
          </div>

          {/* ── CENTRAL INTERACTIVE WRAPPER (centers glass box and cards vertically together) ── */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              zIndex: 20,
              marginTop: '60px', // Prevents any overlap with absolute header
            }}
          >
            {/* ── FIXED GLASSMORPHIC TEXT CONTAINER (slides under it) ── */}
            <div
              style={{
                position: 'absolute',
                left: '80px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '420px',
                height: '480px',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                background: 'rgba(18, 16, 14, 0.45)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                zIndex: 30,
                padding: '48px 40px',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                pointerEvents: 'none', // Allow cursor interactions to pass to card hover states underneath if needed
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Header info */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span 
                      style={{ 
                        fontSize: '64px', 
                        fontFamily: 'var(--font-display)',
                        fontWeight: 200, 
                        color: '#4db896',
                        lineHeight: 1 
                      }}
                    >
                      {PROCESS_STEPS[activeIndex].num}
                    </span>
                    <span 
                      style={{ 
                        fontSize: '10px', 
                        letterSpacing: '0.12em', 
                        textTransform: 'uppercase',
                        color: 'var(--cq-parchment)',
                        opacity: 0.6,
                        border: '0.5px solid rgba(250, 247, 240, 0.3)',
                        borderRadius: '20px',
                        padding: '4px 12px',
                        background: 'rgba(250, 247, 240, 0.08)',
                        fontWeight: 500,
                      }}
                    >
                      {PROCESS_STEPS[activeIndex].phase.split(':')[1].trim()}
                    </span>
                  </div>

                  {/* Body info */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: '32px',
                        fontWeight: 300,
                        color: 'var(--cq-parchment)',
                        lineHeight: 1.15,
                      }}
                    >
                      {PROCESS_STEPS[activeIndex].title}
                    </h3>
                    <p
                      className="font-light"
                      style={{
                        fontSize: '14px',
                        color: 'rgba(250, 247, 240, 0.75)',
                        lineHeight: 1.7,
                      }}
                    >
                      {PROCESS_STEPS[activeIndex].desc}
                    </p>
                    
                    <div 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '6px',
                        marginTop: '8px',
                        color: '#4db896',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                      }}
                    >
                      <span>Active Phase</span>
                      <span>→</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── HORIZONTAL CARDS STRIP (SLIDES UNDER GLASS CARD) ── */}
            <div style={{ overflow: 'hidden', width: '100%', zIndex: 20 }}>
              <motion.div
                ref={containerRef}
                style={{
                  x,
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '40px',
                  paddingLeft: '540px', // padding aligns first card exactly next to the glass card
                  paddingRight: '160px',
                  width: 'max-content',
                  willChange: 'transform',
                }}
              >
                {PROCESS_STEPS.map((step) => (
                  <ProcessCard key={step.num} step={step} />
                ))}
              </motion.div>
            </div>
          </div>

          {/* ── BOTTOM PROGRESS BAR ── */}
          <ProgressBar scrollYProgress={scrollYProgress} />

          {/* ── BOTTOM CONTROLS ── */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '80px',
              right: '80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 20,
            }}
          >
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <ScrollHint />
            </div>

            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <StepDots scrollYProgress={scrollYProgress} numSteps={NUM_STEPS} />
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE: Swipeable Cards Carousel ── */}
      <section
        className="block lg:hidden section-md"
        style={{ backgroundColor: 'var(--cq-night)', overflow: 'hidden' }}
      >
        <div className="container-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span 
            className="badge-label self-center"
            style={{ 
              color: 'var(--cq-parchment)', 
              borderColor: 'rgba(250, 247, 240, 0.2)' 
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#4db896' }}>
              <path d="M12 3l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>
            </svg>
            OUR PROCESS
          </span>
          <h2 
            className="font-display text-4xl mt-3 mb-8 text-center font-normal" 
            style={{ color: 'var(--cq-parchment)', letterSpacing: 'var(--tracking-tight)' }}
          >
            Your Story. Our Craft. <em style={{ fontStyle: 'italic', opacity: 0.9 }}>Results That Matter.</em>
          </h2>
        </div>

        {/* Swipe container */}
        <div
          onScroll={handleMobileScroll}
          className="no-scrollbar"
          style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            paddingLeft: '24px',
            paddingRight: '24px',
            paddingBottom: '8px',
          }}
        >
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.num}
              className="mobile-process-card"
              style={{
                flex: '0 0 82vw',
                maxWidth: '320px',
                height: '380px',
                scrollSnapAlign: 'center',
                backgroundColor: 'var(--cq-night-mid, #1E1A16)',
                border: '1px solid var(--cq-night-border, rgba(255, 255, 255, 0.1))',
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '24px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${step.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.25,
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(18, 16, 14, 0.95) 0%, rgba(18, 16, 14, 0.6) 60%, rgba(18, 16, 14, 0.2) 100%)',
                  zIndex: 1,
                }}
              />

              <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span 
                    className="font-display"
                    style={{
                      fontSize: '36px',
                      fontWeight: 300,
                      color: '#4db896',
                      lineHeight: 1,
                    }}
                  >
                    {step.num}
                  </span>
                  <span 
                    style={{ 
                      fontSize: '8px', 
                      letterSpacing: '0.1em', 
                      textTransform: 'uppercase',
                      color: 'var(--cq-parchment)',
                      opacity: 0.5,
                      border: '0.5px solid rgba(250, 247, 240, 0.2)',
                      borderRadius: '20px',
                      padding: '1px 6px',
                      background: 'rgba(250, 247, 240, 0.05)',
                    }}
                  >
                    {step.phase.split(':')[1].trim()}
                  </span>
                </div>

                <div>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: '20px',
                      fontWeight: 400,
                      color: 'var(--cq-parchment)',
                      marginBottom: '8px',
                      lineHeight: 1.2,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-light"
                    style={{
                      fontSize: '12.5px',
                      color: 'rgba(250, 247, 240, 0.75)',
                      lineHeight: 1.5,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Dot Navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '24px',
            marginBottom: '16px',
          }}
        >
          {Array.from({ length: NUM_STEPS }).map((_, i) => (
            <div
              key={i}
              style={{
                width: i === mobileActiveIndex ? '16px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === mobileActiveIndex
                  ? '#4db896'
                  : 'rgba(250, 247, 240, 0.2)',
                transition: 'width 250ms ease, background 250ms ease',
              }}
            />
          ))}
        </div>
      </section>
    </>
  )
}

function ProcessCard({ step }: { step: typeof PROCESS_STEPS[0] }) {
  return (
    <motion.div
      style={{
        flexShrink: 0,
        width: '450px',
        height: '560px',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: 'var(--cq-night-mid, #1E1A16)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '40px 36px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
      }}
      className="group cursor-pointer"
      whileHover={{ y: -8, borderColor: 'rgba(250, 247, 240, 0.2)' }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
        style={{
          backgroundImage: `url(${step.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35,
          zIndex: 0,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(18, 16, 14, 0.9) 0%, rgba(18, 16, 14, 0.4) 50%, rgba(18, 16, 14, 0.1) 100%)',
          zIndex: 1,
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span 
            className="font-display" 
            style={{ 
              fontSize: '44px', 
              fontWeight: 200, 
              color: 'rgba(250, 247, 240, 0.15)',
              lineHeight: 1,
            }}
          >
            {step.num}
          </span>
        </div>

        <div>
          <h3
            className="font-display"
            style={{
              fontSize: '28px',
              fontWeight: 300,
              color: 'var(--cq-parchment)',
              lineHeight: 1.2,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            {step.title}
          </h3>
        </div>
      </div>
    </motion.div>
  )
}

function StepCounter({
  scrollYProgress,
  numSteps,
}: {
  scrollYProgress: MotionValue<number>
  numSteps: number
}) {
  const [currentStep, setCurrentStep] = useState(1)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const step = Math.min(
      numSteps,
      Math.floor(latest * numSteps) + 1
    )
    setCurrentStep(step)
  })

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginTop: '12px',
      }}
    >
      <span
        className="font-display"
        style={{
          fontSize: '14px',
          color: '#4db896',
          fontStyle: 'italic',
        }}
      >
        {String(currentStep).padStart(2, '0')}
      </span>
      <span
        style={{
          fontSize: '12px',
          color: 'rgba(250, 247, 240, 0.4)',
          letterSpacing: '0.06em',
        }}
      >
        / {String(numSteps).padStart(2, '0')}
      </span>
    </div>
  )
}

function ProgressBar({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'rgba(250, 247, 240, 0.1)',
      }}
    >
      <motion.div
        style={{
          scaleX,
          transformOrigin: 'left center',
          height: '100%',
          background: '#4db896',
        }}
      />
    </div>
  )
}

function ScrollHint() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              color: 'rgba(250, 247, 240, 0.4)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-body)',
            }}
          >
            Scroll to explore
          </span>
          <span style={{ color: 'rgba(250, 247, 240, 0.4)', fontSize: '14px' }}>↓</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function StepDots({
  scrollYProgress,
  numSteps,
}: {
  scrollYProgress: MotionValue<number>
  numSteps: number
}) {
  const [activeIndex, setActiveIndex] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setActiveIndex(Math.min(numSteps - 1, Math.floor(latest * numSteps)))
  })

  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
      }}
    >
      {Array.from({ length: numSteps }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === activeIndex ? '20px' : '6px',
            height: '6px',
            borderRadius: '3px',
            background: i === activeIndex
              ? '#4db896'
              : 'rgba(250, 247, 240, 0.2)',
            transition: 'width 300ms ease, background 300ms ease',
          }}
        />
      ))}
    </div>
  )
}
