"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Target, CheckCircle2, TrendingUp, Flame, Search, 
  Calculator, Brain, MessageSquare, ArrowRight, Clock,
  ListOrdered
} from "lucide-react"
import { MOCK_APTITUDE_QUESTIONS } from "@/lib/mock-aptitude"

const CATEGORIES = [
  {
    id: "Quantitative Aptitude",
    name: "Quantitative Aptitude",
    icon: Calculator,
    desc: "Percentages, Time & Work, Interest, Ratio",
    progress: 45,
    accuracy: 72,
    color: "text-primary",
    topics: ["Percentages", "Profit & Loss", "Ratio & Proportion", "Time & Work", "Time, Speed & Distance", "Simple & Compound Interest", "Averages", "Number System", "Permutation & Combination", "Probability"]
  },
  {
    id: "Logical Reasoning",
    name: "Logical Reasoning",
    icon: Brain,
    desc: "Number Series, Puzzles, Syllogism, Directions",
    progress: 60,
    accuracy: 85,
    color: "text-warning",
    topics: ["Number Series", "Coding-Decoding", "Blood Relations", "Direction Sense", "Syllogism", "Seating Arrangement", "Puzzles"]
  },
  {
    id: "Verbal Ability",
    name: "Verbal Ability",
    icon: MessageSquare,
    desc: "Comprehension, Grammar, Vocabulary",
    progress: 30,
    accuracy: 65,
    color: "text-info",
    topics: ["Reading Comprehension", "Sentence Correction", "Synonyms & Antonyms", "Para Jumbles", "Grammar", "Vocabulary"]
  }
]

export default function AptitudeHubPage() {
  const [searchQuery, setSearchQuery] = useState("")
  
  const filteredCategories = CATEGORIES.filter(cat => {
    const searchMatch = cat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        cat.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return searchMatch
  })

  // Get total questions per category from mock data to show realistic numbers
  const getCategoryCount = (catName: string) => {
    return MOCK_APTITUDE_QUESTIONS.filter(q => q.category === catName).length * 15 // Multiplied to look realistic
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold font-heading tracking-tight flex items-center gap-3">
            <Target className="h-8 w-8 text-primary" />
            Aptitude Practice
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">Build speed, accuracy, and confidence for placement assessments.</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-sm border-border hover:border-primary/20 transition-colors">
          <CardContent className="p-4 flex flex-col gap-1">
            <div className="flex justify-between items-center text-muted-foreground mb-1">
              <span className="text-sm font-medium">Attempted</span>
              <ListOrdered className="h-4 w-4 text-primary" />
            </div>
            <span className="text-2xl font-bold">342</span>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border hover:border-primary/20 transition-colors">
          <CardContent className="p-4 flex flex-col gap-1">
            <div className="flex justify-between items-center text-muted-foreground mb-1">
              <span className="text-sm font-medium">Correct</span>
              <CheckCircle2 className="h-4 w-4 text-success" />
            </div>
            <span className="text-2xl font-bold">256</span>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border hover:border-primary/20 transition-colors">
          <CardContent className="p-4 flex flex-col gap-1">
            <div className="flex justify-between items-center text-muted-foreground mb-1">
              <span className="text-sm font-medium">Accuracy</span>
              <TrendingUp className="h-4 w-4 text-info" />
            </div>
            <span className="text-2xl font-bold">74.8%</span>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border hover:border-primary/20 transition-colors">
          <CardContent className="p-4 flex flex-col gap-1">
            <div className="flex justify-between items-center text-muted-foreground mb-1">
              <span className="text-sm font-medium">Current Streak</span>
              <Flame className="h-4 w-4 text-warning" />
            </div>
            <span className="text-2xl font-bold">8 Days</span>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Categories & Search) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Question Bank</h2>
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search topics (e.g. Ratio)..." 
                className="pl-9 bg-card border-border shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredCategories.length > 0 ? (
              filteredCategories.map(cat => (
                <Card key={cat.id} className="flex flex-col border-border/60 hover:border-primary/40 hover:shadow-md transition-all group overflow-hidden bg-card/80 backdrop-blur-sm">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className={`p-2.5 rounded-xl bg-secondary/80 ${cat.color} group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300`}>
                        <cat.icon className="h-6 w-6" />
                      </div>
                      <Badge variant="outline" className="font-medium text-[10px] bg-background/50">
                        ~{getCategoryCount(cat.name)} Qs
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{cat.name}</CardTitle>
                    <CardDescription className="line-clamp-1">{cat.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto pt-0 pb-5 space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-muted-foreground font-medium">Completion</span>
                          <span className="font-bold text-foreground">{cat.progress}%</span>
                        </div>
                        <Progress value={cat.progress} className="h-1.5 bg-secondary/60 [&>div]:bg-primary" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-muted-foreground font-medium">Accuracy</span>
                          <span className="font-bold text-foreground">{cat.accuracy}%</span>
                        </div>
                        <Progress value={cat.accuracy} className={`h-1.5 bg-secondary/60 ${cat.accuracy > 75 ? '[&>div]:bg-success' : cat.accuracy > 50 ? '[&>div]:bg-warning' : '[&>div]:bg-error'}`} />
                      </div>
                    </div>
                    <Link href={`/aptitude/practice?category=${encodeURIComponent(cat.name)}`}>
                      <Button variant="secondary" className="w-full mt-2 bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-colors group-hover:shadow-sm">
                        Practice Category
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 bg-card rounded-xl border border-border border-dashed">
                <Search className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-foreground">No categories found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your search query.</p>
                <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>Clear Search</Button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Practice Modes) */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">Practice Modes</h2>
          
          <Card className="border-border hover:border-primary/40 transition-colors group overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Clock className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">Timed Assessment</CardTitle>
              </div>
              <CardDescription className="mt-2 text-xs">Simulate real placement test environment with a 30-minute timer and mixed topics.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/aptitude/practice?mode=timed">
                <Button className="w-full gap-2">
                  Start Test <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-border hover:border-info/40 transition-colors group overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-info/10 text-info group-hover:bg-info group-hover:text-info-foreground transition-colors">
                  <ListOrdered className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">Mixed Practice</CardTitle>
              </div>
              <CardDescription className="mt-2 text-xs">Practice 20 random questions across Quantitative, Logical, and Verbal topics at your own pace.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/aptitude/practice?mode=mixed">
                <Button variant="secondary" className="w-full gap-2 group-hover:bg-info group-hover:text-info-foreground transition-colors">
                  Mixed Practice <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Flame className="h-4 w-4 text-warning" /> Daily Goal
            </h4>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Solve 20 questions</span>
              <span className="text-xs font-bold">12/20</span>
            </div>
            <Progress value={60} className="h-1.5 [&>div]:bg-warning" />
          </div>

        </div>

      </div>
    </div>
  )
}
