import { Search, BrainCircuit, Code, MessagesSquare, CheckCircle2 } from "lucide-react"

export function Roadmap() {
  const steps = [
    { name: "Discover", icon: <Search className="h-5 w-5" />, label: "Jobs", desc: "Find the right roles" },
    { name: "Prepare", icon: <BrainCircuit className="h-5 w-5" />, label: "Aptitude", desc: "Sharpen logic & math" },
    { name: "Practice", icon: <Code className="h-5 w-5" />, label: "Coding & Tech", desc: "Master technical skills" },
    { name: "Interview", icon: <MessagesSquare className="h-5 w-5" />, label: "HR & Tech Mock", desc: "Gain confidence" },
    { name: "Get Ready", icon: <CheckCircle2 className="h-5 w-5" />, label: "Resume", desc: "Apply and succeed" },
  ]

  return (
    <section id="preparation" className="py-24 bg-background relative overflow-hidden border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-foreground">
            The Complete Preparation Journey
          </h2>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-border/60 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="mb-4 bg-surface p-1 rounded-full relative">
                  {/* Subtle pulsing background ring on hover */}
                  <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
                  
                  <div className="relative h-16 w-16 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {step.icon}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold font-heading mb-1">{step.name}</h3>
                
                <div className="mt-4 p-4 rounded-xl bg-card border border-border/50 shadow-sm w-full group-hover:border-primary/40 transition-colors">
                  <p className="font-semibold text-sm text-foreground mb-1">{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>

                {/* Connector Arrow for Mobile/Tablet */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden mt-8 text-border">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
