import { Mic, Video, CircleStop, ThumbsUp, Lightbulb, MessageSquareText } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function InterviewPreview() {
  return (
    <section id="interviews" className="py-24 bg-surface border-t border-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-foreground">
          Walk into interviews prepared.
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Practice Technical and HR interviews with our AI mock interviewer. Get instant, actionable feedback on your answers.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Badge variant="outline" className="px-4 py-2 text-sm bg-background">Technical Interview</Badge>
          <Badge variant="outline" className="px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">HR Interview</Badge>
          <Badge variant="outline" className="px-4 py-2 text-sm bg-background">AI Mock Interview</Badge>
        </div>

        <div className="max-w-4xl mx-auto relative text-left">
          {/* Decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative bg-card rounded-2xl border border-border/50 shadow-2xl overflow-hidden flex flex-col md:flex-row">
            
            {/* Interview Question Area */}
            <div className="flex-1 p-6 md:p-8 md:border-r border-border/40 bg-surface/50">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <BotIcon className="h-4 w-4 text-primary" />
                </div>
                <span className="font-semibold">AI Interviewer</span>
              </div>
              
              <h3 className="text-2xl font-bold font-heading text-foreground mb-4">
                "Tell me about yourself and why you're interested in this role."
              </h3>
              
              <div className="bg-background rounded-xl p-4 border border-border/50 mt-8 mb-6 relative">
                <div className="absolute -top-3 left-4 bg-background px-2 text-xs text-muted-foreground font-medium">Your Answer</div>
                <p className="text-foreground text-sm leading-relaxed">
                  "I'm a final year computer science student with a passion for frontend development. During my internship at TechCorp, I built a dashboard that improved data processing by 30%. I'm interested in this role because..."
                </p>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/40 text-muted-foreground">
                  <Mic className="h-4 w-4 text-success" />
                  <span className="text-xs font-medium">Recording (0:45)</span>
                  <div className="flex-1" />
                  <button className="h-8 w-8 rounded-full bg-error/10 flex items-center justify-center hover:bg-error/20 transition-colors">
                    <CircleStop className="h-4 w-4 text-error" />
                  </button>
                </div>
              </div>
            </div>

            {/* AI Feedback Area */}
            <div className="w-full md:w-80 bg-background p-6 md:p-8 flex flex-col justify-center">
              <h4 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-warning" /> Instant Feedback
              </h4>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Communication</span>
                    <span className="text-success font-bold">Good</span>
                  </div>
                  <Progress value={85} className="h-2 bg-success/20 [&>div]:bg-success" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Relevance</span>
                    <span className="text-primary font-bold">Excellent</span>
                  </div>
                  <Progress value={92} className="h-2 bg-primary/20 [&>div]:bg-primary" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Confidence</span>
                    <span className="text-warning font-bold">Needs Polish</span>
                  </div>
                  <Progress value={60} className="h-2 bg-warning/20 [&>div]:bg-warning" />
                  <p className="text-xs text-muted-foreground mt-1">Try to reduce the use of filler words like "um".</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}

function BotIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  )
}
