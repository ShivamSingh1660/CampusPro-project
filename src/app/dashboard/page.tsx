"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Target, Calendar as CalendarIcon, Code2, Briefcase, Clock, 
  CheckCircle2, Circle, Bookmark, BookmarkCheck, PlayCircle, BookOpen, 
  AlertCircle, FileText, ArrowRight, Activity, Zap
} from "lucide-react"

export default function DashboardPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Solve 2 coding problems", category: "DSA", completed: false, time: "30 mins" },
    { id: 2, title: "Complete aptitude practice", category: "Quant", completed: true, time: "45 mins" },
    { id: 3, title: "Revise DBMS normal forms", category: "Technical", completed: false, time: "1 hour" },
    { id: 4, title: "Practice HR questions", category: "Soft Skills", completed: false, time: "20 mins" },
  ]);

  const [bookmarkedJobs, setBookmarkedJobs] = useState<number[]>([]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const toggleBookmark = (id: number) => {
    if (bookmarkedJobs.includes(id)) {
      setBookmarkedJobs(bookmarkedJobs.filter(jobId => jobId !== id));
    } else {
      setBookmarkedJobs([...bookmarkedJobs, id]);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading tracking-tight">Good afternoon, Alex! 👋</h1>
          <p className="text-muted-foreground mt-1">Ready to take the next step in your career journey?</p>
        </div>
        <div className="flex items-center gap-3 bg-secondary/50 px-4 py-2 rounded-full border border-border">
          <Activity className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Profile 85% Complete</span>
          <Link href="/dashboard/profile" className="text-primary font-semibold text-sm hover:underline ml-2">Complete</Link>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Applications" 
          value="12" 
          trend="3 pending responses" 
          icon={<Briefcase className="h-5 w-5 text-info" />} 
        />
        <MetricCard 
          title="Interviews" 
          value="2" 
          trend="Next in 3 days" 
          icon={<CalendarIcon className="h-5 w-5 text-warning" />} 
        />
        <MetricCard 
          title="Coding Problems" 
          value="145" 
          trend="+12 this week" 
          icon={<Code2 className="h-5 w-5 text-primary" />} 
        />
        <MetricCard 
          title="Preparation Streak" 
          value="14 Days" 
          trend="Top 10% of users" 
          icon={<Zap className="h-5 w-5 text-success" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Placement Readiness Card */}
          <Card className="border-primary/20 shadow-sm relative overflow-hidden bg-card/50 backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <CardHeader className="relative pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">Placement Readiness</CardTitle>
                  <CardDescription className="text-base mt-1 text-foreground/80">You're on a strong track! Keep it up.</CardDescription>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-bold text-primary">78%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <Progress value={78} className="h-3 bg-primary/20 [&>div]:bg-primary mb-6" />
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <ReadinessItem label="Coding" value={85} colorClass="text-success" />
                <ReadinessItem label="Aptitude" value={60} colorClass="text-warning" />
                <ReadinessItem label="Technical" value={75} colorClass="text-primary" />
                <ReadinessItem label="Communication" value={90} colorClass="text-success" />
                <ReadinessItem label="Resume" value={100} colorClass="text-info" />
              </div>
            </CardContent>
          </Card>

          {/* Continue Preparation */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold tracking-tight">Continue Preparation</h3>
              <Button variant="ghost" size="sm" className="gap-1">View All <ArrowRight className="h-4 w-4" /></Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PrepCard title="DSA" progress={65} count="45/150 topics" icon={<Code2 className="h-5 w-5" />} />
              <PrepCard title="DBMS" progress={80} count="24/30 topics" icon={<BookOpen className="h-5 w-5" />} />
              <PrepCard title="Operating Systems" progress={40} count="12/30 topics" icon={<Target className="h-5 w-5" />} />
              <PrepCard title="Computer Networks" progress={20} count="5/25 topics" icon={<Activity className="h-5 w-5" />} />
              <PrepCard title="Aptitude" progress={50} count="10/20 topics" icon={<PlayCircle className="h-5 w-5" />} />
              <PrepCard title="HR Interview" progress={10} count="1/10 topics" icon={<Briefcase className="h-5 w-5" />} />
            </div>
          </div>

          {/* Recommended Jobs */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle>Recommended Jobs & Internships</CardTitle>
                <Button variant="outline" size="sm">Browse All</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: 101, title: "Software Engineer Intern", company: "TechNova", location: "Remote", type: "Internship", skills: ["React", "Node.js", "TypeScript"] },
                { id: 102, title: "SDE 1", company: "Amazon", location: "Seattle, WA", type: "Full-time", skills: ["Java", "AWS", "DSA"] },
                { id: 103, title: "Frontend Developer", company: "Stripe", location: "San Francisco, CA", type: "Full-time", skills: ["React", "CSS", "Next.js"] },
              ].map((job) => (
                <div key={job.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-border/50 hover:border-primary/40 hover:bg-secondary/20 transition-all group">
                  <div className="flex items-start gap-4 mb-4 sm:mb-0">
                    <Avatar className="h-12 w-12 border border-border shadow-sm">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {job.company[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">{job.title}</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        {job.company} <span className="w-1 h-1 rounded-full bg-border"></span> {job.location}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">{job.type}</Badge>
                        {job.skills.map(skill => (
                          <Badge key={skill} variant="outline" className="text-xs text-muted-foreground">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => toggleBookmark(job.id)}
                      className={bookmarkedJobs.includes(job.id) ? "text-primary hover:text-primary/80" : "text-muted-foreground hover:text-foreground"}
                    >
                      {bookmarkedJobs.includes(job.id) ? <BookmarkCheck className="h-5 w-5 fill-primary/20" /> : <Bookmark className="h-5 w-5" />}
                    </Button>
                    <Button className="w-full sm:w-auto">Apply Now</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>

        {/* Right Column (Sidebar metrics) */}
        <div className="space-y-8">
          
          {/* Today's Tasks */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Today's Tasks
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
                    <p className={`text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-border h-4">{task.category}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {task.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weak Areas */}
          <Card className="border-error/20 bg-error/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-error/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <CardHeader className="pb-2 relative">
              <CardTitle className="flex items-center gap-2 text-error">
                <AlertCircle className="h-5 w-5" />
                Weak Areas
              </CardTitle>
              <CardDescription>Topics needing attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 relative">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">Dynamic Programming</span>
                </div>
                <Progress value={25} className="h-1.5 bg-error/20 [&>div]:bg-error" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">DBMS Queries</span>
                </div>
                <Progress value={35} className="h-1.5 bg-error/20 [&>div]:bg-error" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">Quantitative Aptitude</span>
                </div>
                <Progress value={40} className="h-1.5 bg-warning/20 [&>div]:bg-warning" />
              </div>
              <Button variant="outline" className="w-full mt-4 border-error/30 text-error hover:bg-error/10 hover:text-error bg-background/50">
                Practice Now
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Upcoming</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center justify-center bg-secondary rounded-md p-2 w-12 text-center border border-border/50">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Sep</span>
                  <span className="text-lg font-bold text-foreground leading-tight">15</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Mock Interview</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">System Design • 10:00 AM</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center justify-center bg-secondary rounded-md p-2 w-12 text-center border border-border/50">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Sep</span>
                  <span className="text-lg font-bold text-foreground leading-tight">18</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">TCS NQT Assessment</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Online Proctored • 2:00 PM</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center justify-center bg-error/10 text-error rounded-md p-2 w-12 text-center border border-error/20">
                  <span className="text-xs font-semibold uppercase">Sep</span>
                  <span className="text-lg font-bold leading-tight">20</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Amazon Application</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Deadline approaching</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative border-l border-border ml-3 space-y-6">
                <ActivityItem 
                  icon={<Code2 className="h-4 w-4 text-primary" />} 
                  title="Solved 'Two Sum'" 
                  time="2 hours ago" 
                />
                <ActivityItem 
                  icon={<BookOpen className="h-4 w-4 text-info" />} 
                  title="Completed React Hooks module" 
                  time="5 hours ago" 
                />
                <ActivityItem 
                  icon={<Bookmark className="h-4 w-4 text-warning" />} 
                  title="Bookmarked Software Engineer Intern at TechNova" 
                  time="1 day ago" 
                />
                <ActivityItem 
                  icon={<FileText className="h-4 w-4 text-success" />} 
                  title="Updated Resume v2" 
                  time="2 days ago" 
                />
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}

function MetricCard({ title, value, trend, icon }: { title: string, value: string, trend: string, icon: React.ReactNode }) {
  return (
    <Card className="hover:border-primary/30 transition-colors bg-card/50 backdrop-blur-sm shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="p-2 bg-secondary/50 rounded-md border border-border/50">{icon}</div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold">{value}</span>
          <p className="text-xs text-muted-foreground">{trend}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function ReadinessItem({ label, value, colorClass }: { label: string, value: number, colorClass: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-secondary/30 border border-border/50 text-center transition-all hover:bg-secondary/50">
      <span className="text-xs font-medium text-muted-foreground mb-2 whitespace-nowrap">{label}</span>
      <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-background border border-border shadow-sm">
        <svg className="w-10 h-10 transform -rotate-90">
          <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="none" className="text-secondary" />
          <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="none" 
            strokeDasharray="100" strokeDashoffset={100 - value} 
            className={colorClass} 
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-xs font-bold">{value}%</span>
      </div>
    </div>
  )
}

function PrepCard({ title, progress, count, icon }: { title: string, progress: number, count: string, icon: React.ReactNode }) {
  return (
    <div className="flex flex-col p-5 rounded-xl border border-border bg-card/50 hover:border-primary/40 transition-all group shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          {icon}
        </div>
        <Badge variant="secondary" className="bg-secondary/50 font-normal text-[10px]">{count}</Badge>
      </div>
      <h4 className="font-semibold text-foreground mb-1.5">{title}</h4>
      <div className="flex items-center justify-between gap-3 mt-auto pt-2">
        <Progress value={progress} className="h-1.5 flex-1 bg-primary/10 [&>div]:bg-primary" />
        <span className="text-xs font-medium text-muted-foreground w-6 text-right">{progress}%</span>
      </div>
    </div>
  )
}

function ActivityItem({ icon, title, time }: { icon: React.ReactNode, title: string, time: string }) {
  return (
    <div className="relative pl-6">
      <div className="absolute -left-[17px] top-0.5 p-1.5 bg-background border border-border rounded-full z-10 shadow-sm">
        {icon}
      </div>
      <p className="text-sm font-medium text-foreground leading-snug">{title}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{time}</p>
    </div>
  )
}
