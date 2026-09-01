import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-24 bg-primary/5 border-t border-border/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background/0 to-background/0 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-foreground tracking-tight">
          Start building your placement advantage.
        </h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Prepare consistently. Track your progress. Be ready when the opportunity arrives.
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-lg shadow-primary/25">
            Get Started for Free
          </Button>
        </Link>
      </div>
    </section>
  )
}
