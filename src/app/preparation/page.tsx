"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Code2, Calculator, Server, MonitorPlay, Users, MessageSquare, 
  Search, BookOpen, Database, Cpu, Network, Blocks, FileCode2,
  CheckCircle2, Circle, ArrowRight, PlayCircle, Trophy, Target,
  Check, Play
} from "lucide-react"

const CATEGORIES = [
  { id: 'dsa', name: 'DSA & Coding', type: 'Technical', progress: 40, completed: 12, total: 30, icon: Code2, desc: 'Data structures and problem solving' },
  { id: 'aptitude', name: 'Aptitude', type: 'Aptitude', progress: 60, completed: 15, total: 25, icon: Calculator, desc: 'Quantitative and logical reasoning' },
  { id: 'core', name: 'Core CS', type: 'Technical', progress: 55, completed: 22, total: 40, icon: Server, desc: 'DBMS, OS, Networks, and OOP' },
  { id: 'tech-int', name: 'Technical Interview', type: 'Technical', progress: 20, completed: 4, total: 20, icon: MonitorPlay, desc: 'System design and live coding' },
  { id: 'hr-int', name: 'HR Interview', type: 'Soft Skills', progress: 70, completed: 7, total: 10, icon: Users, desc: 'Behavioral and situational questions' },
  { id: 'comm', name: 'Communication', type: 'Soft Skills', progress: 80, completed: 16, total: 20, icon: MessageSquare, desc: 'Spoken and written professional English' }
]

const CORE_CS = [
  { name: 'DBMS', progress: 65, count: '13/20', icon: Database },
  { name: 'Operating Systems', progress: 45, count: '9/20', icon: Cpu },
  { name: 'Computer Networks', progress: 20, count: '3/15', icon: Network },
  { name: 'Object-Oriented Prog.', progress: 90, count: '18/20', icon: Blocks },
  { name: 'Software Engineering', progress: 10, count: '1/10', icon: FileCode2 },
]

const CONTINUE_LEARNING = [
  { title: 'DBMS — SQL & Normalization', progress: 65, icon: Database, colorClass: 'text-primary' },
  { title: 'Dynamic Programming', progress: 30, icon: Code2, colorClass: 'text-warning' },
  { title: 'Operating Systems', progress: 45, icon: Cpu, colorClass: 'text-info' },
  { title: 'HR Interview Basics', progress: 20, icon: Users, colorClass: 'text-success' },
]

const ROADMAP = [
  { id: 1, step: 'Foundation', status: 'completed' },
  { id: 2, step: 'DSA & Problem Solving', status: 'current' },
  { id: 3, step: 'Core CS', status: 'current' },
  { id: 4, step: 'Technical Interview', status: 'upcoming' },
  { id: 5, step: 'HR & Communication', status: 'upcoming' },
  { id: 6, step: 'Placement Ready', status: 'upcoming' },
]

const FILTERS = ["All", "Technical", "Aptitude", "Soft Skills"]

export default function PreparationHubPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [tasks, setTasks] = useState([
    { id: 1, title: "Solve 2 DSA problems", completed: false },
    { id: 2, title: "Complete 10 aptitude questions", completed: true },
    { id: 3, title: "Revise DBMS normalization", completed: false },
    { id: 4, title: "Practice 5 HR questions", completed: false },
  ])

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  // Filter categories based on search and active filter
  const filteredCategories = CATEGORIES.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase()) || cat.desc.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilter === "All" || cat.type === activeFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold font-heading tracking-tight flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            Preparation Hub
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">Build the skills you need to crack your next opportunity.</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-5 shadow-sm min-w-[250px]">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Overall Progress</p>
            <p className="text-2xl font-bold text-foreground">42%</p>
          </div>
          <Progress value={42} className="h-3 flex-1 bg-secondary [&>div]:bg-primary" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-2 rounded-xl border border-border shadow-sm">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search topics..." 
                className="pl-9 bg-background border-transparent focus-visible:ring-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex overflow-x-auto w-full sm:w-auto gap-2 pb-2 sm:pb-0 scrollbar-hide">
              {FILTERS.map(filter => (
                <Badge 
                  key={filter} 
                  variant={activeFilter === filter ? "default" : "secondary"}
                  className="cursor-pointer whitespace-nowrap px-3 py-1.5 text-sm"
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </Badge>
              ))}
            </div>
          </div>

          {/* Categories Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold tracking-tight">Modules</h2>
              <span className="text-sm text-muted-foreground">{filteredCategories.length} available</span>
            </div>
            
            {filteredCategories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredCategories.map(cat => (
                  <CategoryCard key={cat.id} category={cat} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-xl border border-border border-dashed">
                <Search className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-foreground">No modules found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your search or filters.</p>
                <Button variant="outline" className="mt-4" onClick={() => {setSearchQuery(""); setActiveFilter("All")}}>Clear Filters</Button>
              </div>
            )}
          </div>

          {/* Core CS Section */}
          <Card className="border-border shadow-sm bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                Core CS Deep Dive
              </CardTitle>
              <CardDescription>Master the fundamental subjects required for technical rounds.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CORE_CS.map((subject, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-border/60 bg-background hover:border-primary/40 transition-colors group">
                    <div className="flex justify-between items-start mb-3">
                      <div className="p-2 rounded-lg bg-secondary text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <subject.icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="text-[10px] font-medium bg-background">{subject.count} topics</Badge>
                    </div>
                    <h4 className="font-semibold text-sm mb-3 truncate">{subject.name}</h4>
                    <div className="flex items-center gap-3">
                      <Progress value={subject.progress} className="h-1.5 flex-1 bg-secondary [&>div]:bg-primary" />
                      <span className="text-xs font-medium text-muted-foreground w-8 text-right">{subject.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Column (Sidebar metrics & tools) */}
        <div className="space-y-8">
          
          {/* Continue Learning */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <PlayCircle className="h-5 w-5 text-primary" />
                Continue Learning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {CONTINUE_LEARNING.map((item, idx) => (
                <div key={idx} className="group relative flex flex-col p-3 rounded-xl border border-border/50 hover:border-border hover:bg-secondary/20 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-1.5 rounded-md bg-secondary/80 ${item.colorClass}`}>
                      <item.icon className="h-4 w-4" />
                    </div>
                    <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">{item.title}</h4>
                  </div>
                  <div className="flex items-center gap-3 mt-1 pl-[38px]">
                    <Progress value={item.progress} className="h-1 flex-1 bg-secondary [&>div]:bg-primary/70 group-hover:[&>div]:bg-primary" />
                    <span className="text-[10px] font-medium text-muted-foreground">{item.progress}%</span>
                  </div>
                  <Button size="icon" variant="ghost" className="absolute right-2 top-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Today's Practice */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-warning" />
                Today's Practice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks.map(task => (
                <div 
                  key={task.id} 
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer hover:bg-secondary/30 ${task.completed ? 'bg-secondary/20 border-transparent opacity-70' : 'border-border'}`}
                  onClick={() => toggleTask(task.id)}
                >
                  <div className="mt-0.5">
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {task.title}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Learning Roadmap */}
          <Card className="border-border shadow-sm overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-info" />
                Your Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 pb-6">
              <div className="relative pl-6 space-y-6">
                {/* Vertical connecting line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border/50 rounded-full z-0"></div>
                
                {ROADMAP.map((item, idx) => {
                  const isCompleted = item.status === 'completed';
                  const isCurrent = item.status === 'current';
                  
                  return (
                    <div key={item.id} className="relative z-10 flex items-center gap-4 group">
                      <div className={`
                        flex items-center justify-center w-6 h-6 rounded-full border-2 bg-background
                        ${isCompleted ? 'border-success text-success' : 
                          isCurrent ? 'border-primary ring-4 ring-primary/10 text-primary' : 
                          'border-muted text-muted-foreground'}
                        transition-all duration-300
                      `}>
                        {isCompleted ? <Check className="h-3 w-3" /> : 
                         isCurrent ? <Play className="h-2.5 w-2.5 ml-0.5 fill-current" /> : 
                         <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground"></span>}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium transition-colors ${
                          isCompleted ? 'text-foreground' : 
                          isCurrent ? 'text-primary font-bold' : 
                          'text-muted-foreground'
                        }`}>
                          {item.step}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}

function CategoryCard({ category }: { category: any }) {
  return (
    <Card className="flex flex-col border-border/60 hover:border-primary/50 transition-all hover:shadow-md group overflow-hidden bg-card/80 backdrop-blur-sm">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-1">
          <div className="p-2.5 rounded-xl bg-secondary/80 text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
            <category.icon className="h-6 w-6" />
          </div>
          <Badge variant="outline" className="font-normal text-xs bg-background/50">{category.type}</Badge>
        </div>
        <CardTitle className="text-lg mt-2">{category.name}</CardTitle>
        <CardDescription className="line-clamp-1">{category.desc}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto pt-0 pb-5 space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-muted-foreground font-medium">{category.completed} / {category.total} topics</span>
            <span className="font-bold text-foreground">{category.progress}%</span>
          </div>
          <Progress value={category.progress} className="h-2 bg-secondary/60 [&>div]:bg-primary group-hover:[&>div]:bg-primary/90" />
        </div>
        <Button variant="secondary" className="w-full bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-colors group-hover:shadow-sm">
          Continue
        </Button>
      </CardContent>
    </Card>
  )
}
