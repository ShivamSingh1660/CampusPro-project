import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, Briefcase, Code2, Clock } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Copy */}
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Badge variant="outline" className="mb-6 bg-surface border-border text-foreground px-3 py-1 shadow-sm">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                Built for students who want to be placement-ready.
              </span>
            </Badge>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-heading tracking-tight text-foreground leading-[1.1]">
              Your Career. <br />
              <span className="text-primary">Your Preparation.</span> <br />
              One Platform.
            </h1>
            
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              Discover opportunities, prepare smarter, build a professional resume and become interview-ready.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto h-12 px-8 rounded-full shadow-lg shadow-primary/20 text-base">
                  Get Started
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 rounded-full text-base bg-surface">
                  Explore Platform
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Dashboard Visual */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none lg:mr-0 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
            {/* Decorative background elements for the visual */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-info rounded-[2rem] blur-lg opacity-20 dark:opacity-40 animate-pulse" />
            
            <div className="relative bg-surface/80 backdrop-blur-xl border border-border/50 rounded-[2rem] shadow-2xl p-6 overflow-hidden">
              {/* Header inside the mockup */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/40">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                    <span className="text-primary font-bold">AL</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Welcome, Alex 👋</p>
                    <p className="text-xs text-muted-foreground">Placement Readiness: 78%</p>
                  </div>
                </div>
                <Badge variant="success" className="bg-success/15 text-success border-0">On Track</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card className="bg-background/50 border-border/50 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Target className="h-5 w-5 text-primary" />
                      <span className="text-xs font-medium text-success">+5%</span>
                    </div>
                    <p className="text-2xl font-bold">78%</p>
                    <p className="text-xs text-muted-foreground">Overall Readiness</p>
                    <Progress value={78} className="h-1.5 mt-3" />
                  </CardContent>
                </Card>
                <Card className="bg-background/50 border-border/50 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Briefcase className="h-5 w-5 text-info" />
                      <span className="text-xs font-medium text-muted-foreground">3 pending</span>
                    </div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-muted-foreground">Active Applications</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" /> Today's Focus
                </h3>
                
                <div className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-background/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Code2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Daily Coding Challenge</p>
                      <p className="text-xs text-muted-foreground">Two Sum (Array)</p>
                    </div>
                  </div>
                  <Button size="sm" variant="secondary" className="h-7 text-xs px-3">Solve</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-background/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-warning/10">
                      <Briefcase className="h-4 w-4 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Google Internship</p>
                      <p className="text-xs text-muted-foreground">Complete OA by tomorrow</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">Pending</Badge>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
