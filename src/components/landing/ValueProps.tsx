import { Briefcase, BookOpen, FileBadge2, Users } from "lucide-react"

export function ValueProps() {
  const features = [
    {
      num: "01",
      title: "Jobs & Internships",
      desc: "Discover relevant opportunities and keep your applications organized.",
      icon: <Briefcase className="h-6 w-6" />,
      color: "bg-info/10 text-info border-info/20",
    },
    {
      num: "02",
      title: "Smart Preparation",
      desc: "Practice aptitude, technical questions, coding and interview topics.",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-success/10 text-success border-success/20",
    },
    {
      num: "03",
      title: "Professional Resume",
      desc: "Build and maintain an ATS-friendly professional resume.",
      icon: <FileBadge2 className="h-6 w-6" />,
      color: "bg-primary/10 text-primary border-primary/20",
    },
    {
      num: "04",
      title: "Interview Practice",
      desc: "Practice technical and HR interviews and understand where you need to improve.",
      icon: <Users className="h-6 w-6" />,
      color: "bg-warning/10 text-warning border-warning/20",
    },
  ]

  return (
    <section id="features" className="py-24 bg-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-foreground">
            Everything you need to get placement-ready.
          </h2>
          <p className="text-lg text-muted-foreground">
            A complete ecosystem of tools tailored for students stepping into the professional world.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => (
            <div 
              key={feat.num}
              className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute top-4 right-4 text-4xl font-black text-muted-foreground/10 group-hover:text-primary/10 transition-colors pointer-events-none select-none">
                {feat.num}
              </div>
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center border ${feat.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feat.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                {feat.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
