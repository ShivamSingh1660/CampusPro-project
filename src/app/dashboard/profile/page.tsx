"use client"

import * as React from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Loader2, UploadCloud, User, GraduationCap, Briefcase, Link as LinkIcon, Trophy } from "lucide-react"
import { authApi } from "@/lib/api/auth"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: "Alex Student",
    college: "National Institute of Technology",
    degree: "B.Tech",
    branch: "Computer Science",
    gradYear: "2025",
    cgpa: "8.5",
    skills: "React, Node.js, Next.js",
    preferredRole: "Frontend Engineer",
    preferredLocation: "Remote",
    projects: "CampusPro - Built a placement platform.",
    certifications: "AWS Certified Developer",
    achievements: "Winner of Hackathon 2023",
    github: "github.com/alexstudent",
    linkedin: "linkedin.com/in/alexstudent",
    codingProfiles: "leetcode.com/alexstudent",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await authApi.updateProfile(formData)
      toast.success("Profile updated successfully!")
    } catch (error) {
      toast.error("Failed to update profile.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold font-heading tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your personal and professional information.</p>
      </div>

      <div className="grid gap-6">
        
        {/* Personal Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Personal Information</CardTitle>
            <CardDescription>Your basic identity on the platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-full bg-secondary border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer transition-colors shrink-0">
                <UploadCloud className="h-5 w-5 mb-1" />
                <span className="text-[10px] font-medium">Photo</span>
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><GraduationCap className="h-5 w-5 text-info" /> Education</CardTitle>
            <CardDescription>Your academic background.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="college">College / University</Label>
              <Input id="college" name="college" value={formData.college} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="degree">Degree</Label>
                <Input id="degree" name="degree" value={formData.degree} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branch">Branch</Label>
                <Input id="branch" name="branch" value={formData.branch} onChange={handleChange} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gradYear">Graduation Year</Label>
                <Input id="gradYear" name="gradYear" type="number" value={formData.gradYear} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cgpa">CGPA</Label>
                <Input id="cgpa" name="cgpa" type="number" step="0.1" value={formData.cgpa} onChange={handleChange} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Career & Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5 text-success" /> Career & Skills</CardTitle>
            <CardDescription>What you know and what you are looking for.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="skills">Technical Skills (Comma separated)</Label>
              <Input id="skills" name="skills" value={formData.skills} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferredRole">Preferred Job Role</Label>
                <Input id="preferredRole" name="preferredRole" value={formData.preferredRole} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredLocation">Preferred Location</Label>
                <Input id="preferredLocation" name="preferredLocation" value={formData.preferredLocation} onChange={handleChange} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5 text-warning" /> Projects & Achievements</CardTitle>
            <CardDescription>Showcase your work and accolades.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projects">Projects</Label>
              <Input id="projects" name="projects" value={formData.projects} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="certifications">Certifications</Label>
              <Input id="certifications" name="certifications" value={formData.certifications} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="achievements">Achievements</Label>
              <Input id="achievements" name="achievements" value={formData.achievements} onChange={handleChange} />
            </div>
          </CardContent>
        </Card>

        {/* Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><LinkIcon className="h-5 w-5 text-primary" /> Web Links</CardTitle>
            <CardDescription>Your presence across the web.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="github">GitHub Profile</Label>
                <Input id="github" name="github" value={formData.github} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="codingProfiles">Coding Profiles (LeetCode, HackerRank, etc.)</Label>
              <Input id="codingProfiles" name="codingProfiles" value={formData.codingProfiles} onChange={handleChange} />
            </div>
          </CardContent>
          <CardFooter className="border-t border-border/40 bg-surface/50 pt-6 mt-6 flex justify-end">
            <Button onClick={handleSave} disabled={isLoading} className="w-full sm:w-auto min-w-[120px]">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>

      </div>
    </div>
  )
}
