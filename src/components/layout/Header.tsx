import * as React from "react"
import { Search, Bell } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border/40 bg-surface/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-4 lg:hidden">
        {/* Mobile menu toggle can go here */}
        <span className="font-heading text-xl font-bold text-primary">CampusPro</span>
      </div>
      
      <div className="hidden lg:flex flex-1 items-center gap-4 md:gap-8">
        <form className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search jobs, mock interviews, preparation material..."
            className="w-full bg-secondary pl-9 md:w-[300px] lg:w-[400px]"
          />
        </form>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button className="relative rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
        </button>
        <Avatar className="h-8 w-8 cursor-pointer border border-border">
          <AvatarImage src="https://github.com/shadcn.png" alt="@student" />
          <AvatarFallback>ST</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
