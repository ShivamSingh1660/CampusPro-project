import Link from "next/link"

export function Footer() {
  const links = [
    { name: "Product", href: "#" },
    { name: "Preparation", href: "#preparation" },
    { name: "Coding", href: "#coding" },
    { name: "Resume", href: "#resume" },
    { name: "Interviews", href: "#interviews" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ]

  return (
    <footer className="bg-surface border-t border-border/40 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CP</span>
            </div>
            <span className="font-heading text-xl font-bold text-primary">CampusPro</span>
          </Link>
          <p className="text-sm text-muted-foreground mt-2">
            Built for students, focused on careers.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-4 md:gap-8">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

      </div>
    </footer>
  )
}
