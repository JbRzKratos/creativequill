import { useState, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'
import { useStickyHorizontalScroll } from '@/hooks/useStickyHorizontalScroll'

const PROCESS_STEPS = [
  { num: '01', title: 'Voice Audit',   desc: "Before we write anything, we study your existing content, competitors, and audience tone. So our first draft already sounds like you, not like us." },
  { num: '02', title: 'Connect',        desc: "Discover your story through our contact form, email, or phone for an initial discovery call. We'll explore your brand narrative, business objectives, and audience challenges." },
  { num: '03', title: 'Understand',     desc: "We immerse ourselves in your brand world — analyzing target audiences, competitive positioning, voice guidelines, and content goals. Deep discovery ensures every word aligns with your strategic vision." },
  { num: '04', title: 'Strategize',     desc: "Our strategists develop a tailored content roadmap with narrative frameworks, topic clusters, and tonal architecture designed to captivate your audience and amplify your message." },
  { num: '05', title: 'Deliver',        desc: "Receive publication-ready content within 48 hours, professionally written, thoroughly researched, and polished to perfection. Every piece is optimized for engagement and ready to publish." },
  { num: '06', title: 'Refine',         desc: "Your satisfaction drives our process. We offer multiple revision rounds to fine-tune content until it perfectly captures your vision and exceeds your expectations." },
]
const NUM_STEPS = PROCESS_STEPS.length  // 6

export function ProcessSection() {
  const { outerRef, x, scrollYProgress } = useStickyHorizontalScroll(NUM_STEPS)
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)

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
          // Height = numSteps × 65vh gives enough vertical scroll room
          // to traverse all steps before the section unsticks
          height: `${NUM_STEPS * 65}vh`,
          position: 'relative',
        }}
      >
        {/* ── STICKY INNER CONTAINER ── */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: 'var(--cq-parchment)',
          }}
        >
          {/* ── SECTION HEADER (fixed within sticky, doesn't move horizontally) ── */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              padding: 'calc(var(--header-height, 4rem) + 32px) 48px 0',
              zIndex: 10,
            }}
          >
            {/* Section label badge — same style as hero badge */}
            <span className="badge-label">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>
              </svg>
              OUR PROCESS
            </span>

            {/* Section H2 */}
            <h2
              className="font-display text-4xl md:text-5xl mt-3 text-balance font-normal"
              style={{ color: 'var(--cq-ink)', letterSpacing: 'var(--tracking-tight)' }}
            >
              Your Story. Our Craft. <em>Results That Matter.</em>
            </h2>

            {/* Step counter: "Step 01 / 06" — updates dynamically */}
            <StepCounter
              scrollYProgress={scrollYProgress}
              numSteps={NUM_STEPS}
            />
          </div>

          {/* ── HORIZONTAL STEPS STRIP ── */}
          <motion.div
            style={{
              x,  // Framer Motion translates this horizontally
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              height: '100%',
              // Total width = numSteps × 100vw so each step occupies one full viewport
              width: `${NUM_STEPS * 100}vw`,
              willChange: 'transform',
            }}
          >
            {PROCESS_STEPS.map((step, index) => (
              <ProcessStepCard
                key={step.num}
                step={step}
                index={index}
                scrollYProgress={scrollYProgress}
                numSteps={NUM_STEPS}
              />
            ))}
          </motion.div>

          {/* ── BOTTOM PROGRESS BAR ── */}
          <ProgressBar scrollYProgress={scrollYProgress} />

          {/* ── DOT NAVIGATION ── */}
          <StepDots scrollYProgress={scrollYProgress} numSteps={NUM_STEPS} />

          {/* ── SCROLL HINT (shows briefly on section entry, fades after) ── */}
          <ScrollHint />
        </div>
      </div>

      {/* ── MOBILE: Swipeable Cards Carousel ── */}
      <section
        className="block lg:hidden section-md"
        style={{ backgroundColor: 'var(--cq-parchment)', overflow: 'hidden' }}
      >
        <div className="container-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="badge-label self-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>
            </svg>
            OUR PROCESS
          </span>
          <h2 className="font-display text-4xl mt-3 mb-8 text-center font-normal" style={{ color: 'var(--cq-ink)' }}>
            Your Story. Our Craft. <em>Results That Matter.</em>
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
          <style>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.num}
              className="mobile-process-card"
              style={{
                flex: '0 0 82vw',
                maxWidth: '320px',
                scrollSnapAlign: 'center',
                backgroundColor: 'var(--cq-parchment-mid)',
                border: '1px solid var(--cq-parchment-deep)',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
              }}
            >
              <div>
                {/* Step watermark number */}
                <div
                  className="font-display"
                  style={{
                    fontSize: '64px',
                    fontWeight: 300,
                    color: 'var(--cq-parchment-deep)',
                    lineHeight: 1,
                    marginBottom: '4px',
                    userSelect: 'none',
                  }}
                >
                  {step.num}
                </div>

                {/* Step title */}
                <h3
                  className="font-display"
                  style={{
                    fontSize: '22px',
                    fontWeight: 400,
                    color: 'var(--cq-ink)',
                    letterSpacing: 'var(--tracking-tight)',
                    lineHeight: 1.2,
                    marginBottom: '12px',
                  }}
                >
                  {step.title}
                </h3>

                {/* Divider */}
                <div
                  style={{
                    width: '32px',
                    height: '1px',
                    background: 'var(--cq-forest)',
                    marginBottom: '12px',
                  }}
                />

                {/* Step description */}
                <p
                  className="font-light"
                  style={{
                    fontSize: '14px',
                    color: 'var(--cq-ink-mid)',
                    lineHeight: 1.6,
                  }}
                >
                  {step.desc}
                </p>
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
                  ? 'var(--cq-forest)'
                  : 'var(--cq-parchment-deep)',
                transition: 'width 250ms ease, background 250ms ease',
              }}
            />
          ))}
        </div>
      </section>
    </>
  )
}

function ProcessStepCard({
  step,
  index,
  scrollYProgress,
  numSteps,
}: {
  step: typeof PROCESS_STEPS[0]
  index: number
  scrollYProgress: MotionValue<number>
  numSteps: number
}) {
  // Calculate when this step is "active" based on scroll progress
  const stepFraction = 1 / numSteps
  const stepStart = index * stepFraction
  const stepEnd = (index + 1) * stepFraction

  // Opacity: this card is fully visible when its step is active
  // We customize ranges for the first and last step to prevent out-of-bounds WAAPI offsets
  const range = 
    index === 0
      ? [0, stepEnd - stepFraction * 0.2, stepEnd]
      : index === numSteps - 1
      ? [stepStart, stepStart + stepFraction * 0.2, 1]
      : [stepStart - stepFraction * 0.2, stepStart, stepEnd - stepFraction * 0.2, stepEnd];

  const outputRange = 
    index === 0
      ? [1, 1, 0.3]
      : index === numSteps - 1
      ? [0.3, 1, 1]
      : [0.3, 1, 1, 0.3];

  const opacity = useTransform(scrollYProgress, range, outputRange)

  return (
    <motion.div
      style={{
        opacity,
        width: '100vw',
        height: '100vh',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'calc(var(--header-height, 4rem) + 160px) 48px 80px',  // top padding accounts for fixed header
        position: 'relative',
      }}
    >
      {/* Step card inner */}
      <div
        style={{
          maxWidth: '560px',
          width: '100%',
        }}
      >
        {/* Large step number — faint watermark */}
        <div
          className="font-display"
          style={{
            fontSize: '120px',
            fontWeight: 300,
            color: 'var(--cq-parchment-deep)',
            lineHeight: 1,
            marginBottom: '-20px',  // pulls title up, creates overlap effect
            userSelect: 'none',
          }}
        >
          {step.num}
        </div>

        {/* Step title */}
        <h3
          className="font-display"
          style={{
            fontSize: '40px',
            fontWeight: 400,
            color: 'var(--cq-ink)',
            letterSpacing: 'var(--tracking-tight)',
            lineHeight: 1.1,
            marginBottom: '20px',
          }}
        >
          {step.title}
        </h3>

        {/* Divider line */}
        <div
          style={{
            width: '40px',
            height: '1px',
            background: 'var(--cq-forest)',
            marginBottom: '20px',
          }}
        />

        {/* Description */}
        <p
          className="font-light"
          style={{
            fontSize: '17px',
            color: 'var(--cq-ink-mid)',
            lineHeight: 1.7,
            maxWidth: '440px',
          }}
        >
          {step.desc}
        </p>
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
          color: 'var(--cq-forest)',
          fontStyle: 'italic',
        }}
      >
        {String(currentStep).padStart(2, '0')}
      </span>
      <span
        style={{
          fontSize: '12px',
          color: 'var(--cq-ink-faint)',
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
        background: 'var(--cq-parchment-deep)',
      }}
    >
      <motion.div
        style={{
          scaleX,
          transformOrigin: 'left center',
          height: '100%',
          background: 'var(--cq-forest)',
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
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              color: 'var(--cq-ink-faint)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-body)',
            }}
          >
            Scroll to explore
          </span>
          <span style={{ color: 'var(--cq-ink-faint)', fontSize: '14px' }}>↓</span>
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
        position: 'absolute',
        bottom: '24px',
        right: '48px',
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
              ? 'var(--cq-forest)'
              : 'var(--cq-parchment-deep)',
            transition: 'width 300ms ease, background 300ms ease',
          }}
        />
      ))}
    </div>
  )
}
