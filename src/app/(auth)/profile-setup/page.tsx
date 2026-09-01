"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authApi } from "@/lib/api/auth"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Loader2, UploadCloud, Building2, BookOpen, Briefcase, GraduationCap, Code2, MapPin } from "lucide-react"

export default function SetupPage() {
  const router = useRouter()
  const [step, setStep] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(false)
  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  // Standard React state for this multi-step form to keep it simple and flexible
  const [formData, setFormData] = React.useState({
    name: "Alex Student", // Prefilled from auth
    college: "",
    degree: "",
    branch: "",
    gradYear: "",
    cgpa: "",
    skills: "",
    preferredRole: "",
    preferredLocation: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await authApi.updateProfile(formData)
      toast.success("Profile setup complete!", {
        description: "Welcome to CampusPro dashboard.",
      })
      router.push("/dashboard")
    } catch (error: any) {
      toast.error("Setup Failed", {
        description: error.message || "An error occurred.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-lg mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold font-heading text-foreground">Let's set up your profile</h2>
        <p className="text-muted-foreground mt-2 mb-6">Complete your profile to get personalized recommendations.</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium text-muted-foreground">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm mb-6 min-h-[300px]">
        
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg"><GraduationCap className="h-5 w-5 text-primary" /></div>
              <h3 className="text-lg font-semibold">Personal Information</h3>
            </div>
            
            <div className="flex flex-col items-center gap-4 mb-6 pb-6 border-b border-border/40">
              <div className="h-24 w-24 rounded-full bg-secondary border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer transition-colors">
                <UploadCloud className="h-6 w-6 mb-1" />
                <span className="text-xs font-medium">Upload Photo</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-info/10 rounded-lg"><Building2 className="h-5 w-5 text-info" /></div>
              <h3 className="text-lg font-semibold">Education</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="college">College / University</Label>
                <Input id="college" name="college" placeholder="E.g. National Institute of Technology" value={formData.college} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Input id="degree" name="degree" placeholder="E.g. B.Tech" value={formData.degree} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Input id="branch" name="branch" placeholder="E.g. Computer Science" value={formData.branch} onChange={handleChange} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gradYear">Graduation Year</Label>
                  <Input id="gradYear" name="gradYear" placeholder="2025" type="number" value={formData.gradYear} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cgpa">Current CGPA</Label>
                  <Input id="cgpa" name="cgpa" placeholder="8.5" type="number" step="0.1" value={formData.cgpa} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-warning/10 rounded-lg"><Code2 className="h-5 w-5 text-warning" /></div>
              <h3 className="text-lg font-semibold">Skills & Expertise</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="skills">Technical Skills (Comma separated)</Label>
              <Input 
                id="skills" 
                name="skills" 
                placeholder="React, Node.js, Python, SQL..." 
                value={formData.skills} 
                onChange={handleChange} 
              />
              <p className="text-xs text-muted-foreground mt-2">These help us recommend the best roles for you.</p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-success/10 rounded-lg"><Briefcase className="h-5 w-5 text-success" /></div>
              <h3 className="text-lg font-semibold">Career Preferences</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="preferredRole">Preferred Role</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="preferredRole" name="preferredRole" placeholder="Frontend Developer, Data Scientist..." className="pl-9" value={formData.preferredRole} onChange={handleChange} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="preferredLocation">Preferred Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="preferredLocation" name="preferredLocation" placeholder="Bangalore, Remote..." className="pl-9" value={formData.preferredLocation} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/40">
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={() => router.push("/dashboard")} disabled={isLoading}>
          Skip for now
        </Button>
        
        <div className="flex gap-2 ml-auto">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack} disabled={isLoading}>Back</Button>
          )}
          
          {step < totalSteps ? (
            <Button onClick={handleNext} className="w-32">Continue</Button>
          ) : (
            <Button onClick={handleSubmit} className="w-40" disabled={isLoading}>
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
              ) : "Complete Setup"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
