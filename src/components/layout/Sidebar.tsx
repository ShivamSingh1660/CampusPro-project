"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  BookOpen,
  Code2,
  FileBadge2,
  Users,
  BarChart3,
  Calendar,
  Bookmark,
  Bot,
  User,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Jobs & Internships", href: "#", icon: Briefcase },
  { name: "Applications", href: "#", icon: FileText },
  { name: "Preparation", href: "/preparation", icon: BookOpen },
  { name: "Coding", href: "#", icon: Code2 },
  { name: "Resume Builder", href: "#", icon: FileBadge2 },
  { name: "Mock Interview", href: "#", icon: Users },
  { name: "Analytics", href: "#", icon: BarChart3 },
  { name: "Calendar", href: "#", icon: Calendar },
  { name: "Bookmarks", href: "#", icon: Bookmark },
  { name: "AI Assistant", href: "#", icon: Bot },
]

const bottomItems = [
  { name: "Profile", href: "#", icon: User },
  { name: "Settings", href: "#", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col border-r border-border/40 bg-surface transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-border/40">
        {!collapsed && (
          <Link href="/" className="font-heading text-xl font-bold text-primary flex items-center gap-2 truncate">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CP</span>
            </div>
            CampusPro
          </Link>
        )}
        {collapsed && (
          <div className="mx-auto h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">CP</span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        <nav className="space-y-1 px-3">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors relative group",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {!collapsed && <span>{item.name}</span>}
                {isActive && !collapsed && (
                  <span className="absolute right-2 h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="border-t border-border/40 p-4">
        <nav className="space-y-1">
          {bottomItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground group"
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0 group-hover:text-foreground" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mt-4 flex w-full items-center justify-center rounded-lg bg-secondary py-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <div className="flex items-center gap-2"><ChevronLeft className="h-4 w-4"/> <span>Collapse</span></div>}
        </button>
      </div>
    </aside>
  )
}
