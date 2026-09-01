import Link from "next/link"
import { Briefcase, BookOpen, FileBadge2, Users, Code2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const features = [
    { title: "Jobs & Internships", icon: <Briefcase className="h-5 w-5" /> },
    { title: "Smart Preparation", icon: <BookOpen className="h-5 w-5" /> },
    { title: "Coding Practice", icon: <Code2 className="h-5 w-5" /> },
    { title: "Resume Builder", icon: <FileBadge2 className="h-5 w-5" /> },
    { title: "Mock Interviews", icon: <Users className="h-5 w-5" /> },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left: Brand Visual (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between bg-primary/5 p-12 border-r border-border/40 relative overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-30" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-info/10 rounded-full blur-[80px] opacity-20" />
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-md">
              <span className="text-primary-foreground font-bold text-lg">CP</span>
            </div>
            <span className="font-heading text-2xl font-bold text-primary">CampusPro</span>
          </Link>
          <ThemeToggle />
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold font-heading mb-4 text-foreground leading-tight">
            Everything you need to become placement-ready.
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of students preparing for their dream careers on one unified platform.
          </p>
          
          <div className="space-y-4">
            {features.map((feat) => (
              <div key={feat.title} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center text-primary shadow-sm">
                  {feat.icon}
                </div>
                <span className="font-medium text-foreground">{feat.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CampusPro. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right: Authentication Form Container */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-16 py-12 relative">
        <div className="absolute top-4 right-4 lg:hidden">
          <ThemeToggle />
        </div>
        
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="lg:hidden flex items-center justify-center gap-2 mb-10 mt-4">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground font-bold text-sm">CP</span>
          </div>
          <span className="font-heading text-xl font-bold text-primary">CampusPro</span>
        </div>

        <div className="mx-auto w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}
