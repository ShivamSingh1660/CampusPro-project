import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"

export function DashboardVisual() {
  return (
    <section className="py-24 bg-background relative border-t border-border/40 overflow-hidden">
      <div className="absolute top-0 w-full h-[300px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-foreground">
          Everything comes together here.
        </h2>
        <p className="text-lg text-muted-foreground mb-16 max-w-2xl mx-auto">
          Your personalized dashboard tracks your complete journey and provides actionable insights.
        </p>
        
        <div className="relative mx-auto max-w-5xl">
          {/* Main big dashboard frame */}
          <div className="bg-surface/80 backdrop-blur-md rounded-2xl border border-border shadow-2xl p-4 md:p-8 flex flex-col md:flex-row gap-8 text-left">
            
            {/* Left Big Metric */}
            <div className="w-full md:w-1/3 flex flex-col justify-center items-center md:items-start border-b md:border-b-0 md:border-r border-border/50 pb-8 md:pb-0 md:pr-8">
              <h3 className="text-lg font-semibold mb-2">Overall Readiness</h3>
              <div className="relative h-40 w-40 flex items-center justify-center my-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-secondary" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="283" strokeDashoffset="62" className="text-primary transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-foreground">78%</span>
                </div>
              </div>
              <p className="text-sm text-center md:text-left text-muted-foreground">
                You are highly prepared! <br/> <strong className="text-foreground">Focus on SQL and DBMS this week.</strong>
              </p>
            </div>

            {/* Right Breakdown */}
            <div className="w-full md:w-2/3 flex flex-col justify-center space-y-6">
              <h3 className="text-lg font-semibold mb-2 hidden md:block">Skill Breakdown</h3>
              
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">Coding</span>
                    <span className="font-bold">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">Aptitude</span>
                    <span className="font-bold text-success">81%</span>
                  </div>
                  <Progress value={81} className="h-2 bg-success/20 [&>div]:bg-success" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">Technical Knowledge</span>
                    <span className="font-bold text-warning">65%</span>
                  </div>
                  <Progress value={65} className="h-2 bg-warning/20 [&>div]:bg-warning" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">Communication</span>
                    <span className="font-bold text-info">76%</span>
                  </div>
                  <Progress value={76} className="h-2 bg-info/20 [&>div]:bg-info" />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}
