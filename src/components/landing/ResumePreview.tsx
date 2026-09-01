import { CheckCircle2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ResumePreview() {
  const benefits = [
    "Professional templates",
    "Live preview",
    "ATS-friendly structure",
    "PDF export in one click"
  ]

  return (
    <section id="resume" className="py-24 bg-background border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* Left: Resume Visual */}
          <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="absolute inset-0 bg-primary/5 rounded-[2rem] transform -rotate-3 scale-105" />
            
            <div className="relative w-full max-w-[400px] aspect-[1/1.414] bg-white rounded shadow-2xl border border-border overflow-hidden">
              <div className="p-6 md:p-8 flex flex-col h-full bg-white text-slate-900">
                {/* Resume Header */}
                <div className="text-center border-b border-slate-300 pb-4 mb-4">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900 uppercase tracking-widest">Alex Student</h3>
                  <p className="text-[10px] md:text-xs text-slate-600 mt-1">San Francisco, CA • alex@example.com • linkedin.com/in/alex</p>
                </div>
                
                {/* Resume Body */}
                <div className="flex-1 text-[8px] md:text-[10px] space-y-4">
                  <section>
                    <h4 className="font-bold border-b border-slate-300 pb-1 mb-2 text-slate-800 uppercase tracking-wider">Education</h4>
                    <div className="flex justify-between font-semibold">
                      <span>University of Technology</span>
                      <span>2020 - 2024</span>
                    </div>
                    <p className="text-slate-700 italic mb-1">B.S. in Computer Science • GPA: 3.8/4.0</p>
                  </section>

                  <section>
                    <h4 className="font-bold border-b border-slate-300 pb-1 mb-2 text-slate-800 uppercase tracking-wider">Experience</h4>
                    <div className="mb-2">
                      <div className="flex justify-between font-semibold">
                        <span>Software Engineering Intern</span>
                        <span>Summer 2023</span>
                      </div>
                      <p className="text-slate-700 italic mb-1">Tech Innovations Inc.</p>
                      <ul className="list-disc pl-3 text-slate-600 space-y-0.5">
                        <li>Developed responsive web applications using React and Next.js</li>
                        <li>Improved rendering performance by 25% through code splitting</li>
                        <li>Collaborated with design team to implement new design system</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h4 className="font-bold border-b border-slate-300 pb-1 mb-2 text-slate-800 uppercase tracking-wider">Projects</h4>
                    <div>
                      <span className="font-semibold">CampusPro Platform</span>
                      <ul className="list-disc pl-3 text-slate-600 space-y-0.5 mt-1">
                        <li>Full-stack career preparation platform serving 10k+ students</li>
                        <li>Built with Next.js, FastAPI, and PostgreSQL</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h4 className="font-bold border-b border-slate-300 pb-1 mb-2 text-slate-800 uppercase tracking-wider">Skills</h4>
                    <p className="text-slate-600"><span className="font-semibold">Languages:</span> JavaScript, TypeScript, Python, Java, SQL</p>
                    <p className="text-slate-600"><span className="font-semibold">Technologies:</span> React, Next.js, Node.js, Express, Tailwind CSS</p>
                  </section>
                </div>
              </div>

              {/* Decorative PDF Download button overlay */}
              <div className="absolute bottom-4 right-4 h-10 w-10 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <Download className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Right: Copy */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 text-foreground">
              Build a resume you're proud to send.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Don't let formatting issues cost you an interview. Use our professional builder to create a resume that passes ATS parsers and impresses recruiters.
            </p>
            
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  </div>
                  <span className="font-medium text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="h-12 px-8">Build Your Resume</Button>
          </div>

        </div>
      </div>
    </section>
  )
}
