import React, { useState, createContext, useContext } from 'react'

const AccordionContext = createContext<{
  openValue: string | null
  setOpenValue: (val: string | null) => void
} | null>(null)

export function Accordion({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
  type?: string
  collapsible?: boolean
}) {
  const [openValue, setOpenValue] = useState<string | null>(null)
  return (
    <AccordionContext.Provider value={{ openValue, setOpenValue }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  )
}

const AccordionItemContext = createContext<string | null>(null)

export function AccordionItem({
  children,
  value,
  className,
}: {
  children: React.ReactNode
  value: string
  className?: string
}) {
  return (
    <AccordionItemContext.Provider value={value}>
      <div className={className}>{children}</div>
    </AccordionItemContext.Provider>
  )
}

export function AccordionTrigger({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const accordion = useContext(AccordionContext)
  const value = useContext(AccordionItemContext)
  if (!accordion || !value) return null
  const isOpen = accordion.openValue === value

  return (
    <button
      onClick={() => accordion.setOpenValue(isOpen ? null : value)}
      className={`w-full flex items-center justify-between py-4 text-left cursor-pointer transition-all ${className || ''}`}
      aria-expanded={isOpen}
      style={{ background: 'none', border: 'none' }}
    >
      {children}
      <span
        style={{
          transition: 'transform 0.2s',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          fontSize: '0.75rem',
        }}
      >
        ▼
      </span>
    </button>
  )
}

export function AccordionContent({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const accordion = useContext(AccordionContext)
  const value = useContext(AccordionItemContext)
  if (!accordion || !value) return null
  const isOpen = accordion.openValue === value

  if (!isOpen) return null
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}
