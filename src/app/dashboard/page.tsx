import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Target, TrendingUp, Calendar as CalendarIcon, Code2, Briefcase, ChevronRight, Clock } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading tracking-tight">Welcome back, Alex! 👋</h1>
          <p className="text-muted-foreground mt-1">Here is your daily preparation overview.</p>
        </div>
        <Button>Resume Practice</Button>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Placement Readiness" 
          value="78%" 
          trend="+5% this week" 
          icon={<Target className="h-5 w-5 text-primary" />} 
          progress={78}
        />
        <MetricCard 
          title="Active Applications" 
          value="12" 
          trend="3 pending responses" 
          icon={<Briefcase className="h-5 w-5 text-info" />} 
        />
        <MetricCard 
          title="Upcoming Interviews" 
          value="2" 
          trend="Next in 3 days" 
          icon={<CalendarIcon className="h-5 w-5 text-warning" />} 
        />
        <MetricCard 
          title="Coding Streak" 
          value="14 Days" 
          trend="Top 10% of users" 
          icon={<TrendingUp className="h-5 w-5 text-success" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Coding Progress */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Coding Mastery</CardTitle>
                <CardDescription>Your problem-solving progress by difficulty.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-success font-medium">Easy</span>
                    <span className="text-muted-foreground">45/150</span>
                  </div>
                  <Progress value={30} className="h-2 bg-success/20 [&>div]:bg-success" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-warning font-medium">Medium</span>
                    <span className="text-muted-foreground">22/300</span>
                  </div>
                  <Progress value={7} className="h-2 bg-warning/20 [&>div]:bg-warning" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-error font-medium">Hard</span>
                    <span className="text-muted-foreground">5/100</span>
                  </div>
                  <Progress value={5} className="h-2 bg-error/20 [&>div]:bg-error" />
                </div>
              </div>
              <div className="mt-8 rounded-lg border border-border bg-secondary/50 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-background shadow-sm border border-border">
                    <Code2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Daily Challenge</h4>
                    <p className="text-xs text-muted-foreground">Two Sum (Array)</p>
                  </div>
                </div>
                <Button size="sm">Solve Now</Button>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Jobs */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended For You</CardTitle>
              <CardDescription>Based on your profile and skills.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Frontend Engineer Intern", company: "Google", location: "Remote", match: "95%" },
                { title: "Software Development Engineer 1", company: "Amazon", location: "Seattle, WA", match: "88%" },
                { title: "Full Stack Developer", company: "StartupX", location: "San Francisco, CA", match: "82%" },
              ].map((job, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-secondary/20 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border border-border shadow-sm">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {job.company[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium group-hover:text-primary transition-colors">{job.title}</h4>
                      <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="success" className="bg-success/15 text-success hover:bg-success/20">{job.match} Match</Badge>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
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
            <CardHeader>
              <CardTitle>Today's Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5"><Clock className="h-4 w-4 text-warning" /></div>
                <div>
                  <p className="text-sm font-medium">Complete React Assessment</p>
                  <p className="text-xs text-muted-foreground">Due in 4 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5"><Clock className="h-4 w-4 text-muted-foreground" /></div>
                <div>
                  <p className="text-sm font-medium">Review Resume feedback</p>
                  <p className="text-xs text-muted-foreground">From career coach</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5"><Clock className="h-4 w-4 text-muted-foreground" /></div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground line-through">Daily Coding Challenge</p>
                  <p className="text-xs text-muted-foreground">Completed at 9:00 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weak Areas */}
          <Card>
            <CardHeader>
              <CardTitle>Focus Areas</CardTitle>
              <CardDescription>Topics needing improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Dynamic Programming</span>
                    <span className="text-error font-medium">Weak</span>
                  </div>
                  <Progress value={25} className="h-1.5 bg-error/20 [&>div]:bg-error" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">System Design</span>
                    <span className="text-warning font-medium">Average</span>
                  </div>
                  <Progress value={45} className="h-1.5 bg-warning/20 [&>div]:bg-warning" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Graphs</span>
                    <span className="text-warning font-medium">Average</span>
                  </div>
                  <Progress value={60} className="h-1.5 bg-warning/20 [&>div]:bg-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}

function MetricCard({ title, value, trend, icon, progress }: { title: string, value: string, trend: string, icon: React.ReactNode, progress?: number }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="p-2 bg-secondary rounded-md">{icon}</div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold">{value}</span>
          <p className="text-xs text-muted-foreground">{trend}</p>
        </div>
        {progress !== undefined && (
          <Progress value={progress} className="h-1.5 mt-4" />
        )}
      </CardContent>
    </Card>
  )
}
