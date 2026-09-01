"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { authApi } from "@/lib/api/auth"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from "lucide-react"
const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
})

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [otp, setOtp] = React.useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (otp.length < 4) {
      toast.error("Please enter a valid verification code.")
      return
    }

    setIsLoading(true)
    try {
      await authApi.resetPassword({ ...data, otp })
      toast.success("Password reset successful!", {
        description: "You can now login with your new password.",
      })
      router.push("/login")
    } catch (error: any) {
      toast.error("Reset Failed", {
        description: error.message || "An error occurred.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold font-heading text-foreground">Reset Password</h2>
        <p className="text-muted-foreground mt-2">Enter the verification code and your new password.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="verificationCode">Verification Code</Label>
          <Input 
            id="verificationCode"
            placeholder="Enter code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"}
              placeholder="••••••••" 
              {...register("password")}
              disabled={isLoading}
              className={errors.password ? "border-error focus-visible:ring-error pr-10" : "pr-10"}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-error">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <div className="relative">
            <Input 
              id="confirmPassword" 
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••" 
              {...register("confirmPassword")}
              disabled={isLoading}
              className={errors.confirmPassword ? "border-error focus-visible:ring-error pr-10" : "pr-10"}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-xs text-error">{errors.confirmPassword.message}</p>}
        </div>

        <Button type="submit" className="w-full h-11 text-base mt-2" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resetting Password...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </div>
  )
}
