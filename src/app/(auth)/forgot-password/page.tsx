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
import { Loader2, ArrowLeft } from "lucide-react"

const forgotPasswordSchema = z.object({
  identifier: z.string().min(1, "Please enter your email or mobile number."),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true)
    try {
      await authApi.forgotPassword(data)
      toast.success("Verification code sent!", {
        description: "Please check your email/mobile for the reset code.",
      })
      router.push("/reset-password")
    } catch (error: any) {
      toast.error("Failed to send code", {
        description: error.message || "An error occurred.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link href="/login" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to login
      </Link>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold font-heading text-foreground">Forgot Password</h2>
        <p className="text-muted-foreground mt-2">Enter your email or mobile number to receive a verification code.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="identifier">Email or Mobile Number</Label>
          <Input 
            id="identifier" 
            placeholder="alex@college.edu or +91 9876543210" 
            {...register("identifier")}
            disabled={isLoading}
            className={errors.identifier ? "border-error focus-visible:ring-error" : ""}
          />
          {errors.identifier && <p className="text-xs text-error">{errors.identifier.message}</p>}
        </div>

        <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending code...
            </>
          ) : (
            "Send Verification Code"
          )}
        </Button>
      </form>
    </div>
  )
}
