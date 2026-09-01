import { LandingNavbar } from "@/components/landing/Navbar"
import { Hero } from "@/components/landing/Hero"
import { ValueProps } from "@/components/landing/ValueProps"
import { Roadmap } from "@/components/landing/Roadmap"
import { CodingPreview } from "@/components/landing/CodingPreview"
import { ResumePreview } from "@/components/landing/ResumePreview"
import { InterviewPreview } from "@/components/landing/InterviewPreview"
import { DashboardVisual } from "@/components/landing/DashboardVisual"
import { CTA } from "@/components/landing/CTA"
import { Footer } from "@/components/landing/Footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
      <LandingNavbar />
      
      <main className="flex-1 flex flex-col">
        <Hero />
        <ValueProps />
        <Roadmap />
        <CodingPreview />
        <ResumePreview />
        <InterviewPreview />
        <DashboardVisual />
        <CTA />
      </main>

      <Footer />
    </div>
  )
}
