import * as React from "react"
import { cn } from "@/lib/utils"

export interface OTPInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  error?: boolean
}

export function OTPInput({ length = 6, value, onChange, disabled, error }: OTPInputProps) {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value
    if (/[^0-9]/.test(val)) return // Only allow numbers

    const newValue = value.split("")
    newValue[index] = val.slice(-1) // Take only the last character entered
    
    const stringValue = newValue.join("")
    onChange(stringValue)

    // Move to next input
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!value[index] && index > 0) {
        // If current is empty, move to previous and delete
        const newValue = value.split("")
        newValue[index - 1] = ""
        onChange(newValue.join(""))
        inputRefs.current[index - 1]?.focus()
      } else {
        // If current has value, just delete it
        const newValue = value.split("")
        newValue[index] = ""
        onChange(newValue.join(""))
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length).replace(/[^0-9]/g, "")
    if (pastedData) {
      onChange(pastedData)
      // Focus on the next empty input or the last one
      const nextIndex = Math.min(pastedData.length, length - 1)
      inputRefs.current[nextIndex]?.focus()
    }
  }

  return (
    <div className="flex justify-between gap-2 sm:gap-3" onPaste={handlePaste}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          disabled={disabled}
          className={cn(
            "w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold bg-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all",
            error ? "border-error focus:ring-error" : "border-border/60 focus:ring-primary",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
      ))}
    </div>
  )
}
