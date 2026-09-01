"use client"

import * as React from "react"
import Link from "next/link"
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

const signupSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/, "Please enter a valid mobile number."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
})

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true)
    try {
      await authApi.register(data)
      // Store phone temporarily for OTP screen (in a real app, use Context/State/URL)
      sessionStorage.setItem("verifyPhone", data.phone)
      toast.success("Account created!", {
        description: "Please verify your mobile number to continue.",
      })
      router.push("/verify-otp")
    } catch (error: any) {
      toast.error("Registration Failed", {
        description: error.message || "An error occurred during registration.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold font-heading text-foreground">Create Account</h2>
        <p className="text-muted-foreground mt-2">Start your placement preparation journey today.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            id="fullName" 
            placeholder="Alex Student" 
            {...register("fullName")}
            disabled={isLoading}
            className={errors.fullName ? "border-error focus-visible:ring-error" : ""}
          />
          {errors.fullName && <p className="text-xs text-error">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">College Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="alex@college.edu" 
            {...register("email")}
            disabled={isLoading}
            className={errors.email ? "border-error focus-visible:ring-error" : ""}
          />
          {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Mobile Number</Label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder="+91 9876543210" 
            {...register("phone")}
            disabled={isLoading}
            className={errors.phone ? "border-error focus-visible:ring-error" : ""}
          />
          {errors.phone && <p className="text-xs text-error">{errors.phone.message}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
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
            <Label htmlFor="confirmPassword">Confirm Password</Label>
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
        </div>

        <Button type="submit" className="w-full h-11 text-base mt-2" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <span>Already have an account?</span>
        <Link href="/login" className="font-semibold text-primary hover:underline hover:underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  )
}
