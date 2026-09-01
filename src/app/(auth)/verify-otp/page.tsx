"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authApi } from "@/lib/api/auth"

import { Button } from "@/components/ui/button"
import { OTPInput } from "@/components/ui/OTPInput"
import { Loader2 } from "lucide-react"

export default function VerifyOtpPage() {
  const router = useRouter()
  const [otp, setOtp] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [isResending, setIsResending] = React.useState(false)
  const [timeLeft, setTimeLeft] = React.useState(42)
  const [error, setError] = React.useState(false)
  
  const phone = typeof window !== "undefined" ? sessionStorage.getItem("verifyPhone") || "+91 ******1234" : "+91 ******1234"

  React.useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleVerify = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (otp.length !== 6) {
      setError(true)
      toast.error("Please enter a 6-digit OTP.")
      return
    }

    setIsLoading(true)
    setError(false)
    try {
      await authApi.verifyOtp({ otp })
      toast.success("Phone verified successfully!")
      router.push("/setup")
    } catch (error: any) {
      setError(true)
      toast.error("Verification Failed", {
        description: error.message || "Invalid OTP code.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    if (timeLeft > 0) return
    setIsResending(true)
    try {
      await authApi.sendOtp({ phone })
      toast.success("New OTP sent to your mobile number.")
      setTimeLeft(60)
    } catch (error: any) {
      toast.error("Failed to resend OTP", {
        description: error.message || "Please try again later.",
      })
    } finally {
      setIsResending(false)
    }
  }

  // Auto-submit when 6 digits are entered
  React.useEffect(() => {
    if (otp.length === 6) {
      handleVerify()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp])

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[400px] mx-auto text-center">
      <div className="mb-8">
        <h2 className="text-2xl font-bold font-heading text-foreground">Verify your mobile number</h2>
        <p className="text-muted-foreground mt-2">Enter the 6-digit code sent to <span className="font-semibold text-foreground">{phone}</span></p>
      </div>

      <form onSubmit={handleVerify} className="space-y-8">
        <div className="flex justify-center">
          <OTPInput
            length={6}
            value={otp}
            onChange={(val) => {
              setOtp(val)
              setError(false)
            }}
            disabled={isLoading}
            error={error}
          />
        </div>

        <Button type="submit" className="w-full h-11 text-base" disabled={isLoading || otp.length !== 6}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify OTP"
          )}
        </Button>
      </form>

      <div className="mt-8 text-sm text-muted-foreground">
        {timeLeft > 0 ? (
          <p>Resend OTP in <span className="font-semibold text-foreground">00:{timeLeft.toString().padStart(2, "0")}</span></p>
        ) : (
          <button 
            onClick={handleResend}
            disabled={isResending}
            className="font-semibold text-primary hover:underline hover:underline-offset-4 disabled:opacity-50"
          >
            {isResending ? "Resending..." : "Resend OTP"}
          </button>
        )}
      </div>
    </div>
  )
}
