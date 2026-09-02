"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { MOCK_PROBLEMS } from "@/lib/mock-problems"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Code2, Target, CheckCircle2, Circle, Search, ArrowUpDown, 
  Bookmark, BookmarkCheck, Flame, BarChart2
} from "lucide-react"

const TOPICS = ["All", "Arrays", "Strings", "Hashing", "Linked List", "Stack", "Queue", "Binary Search", "Trees", "Graphs", "Dynamic Programming", "Greedy"]
const STATUSES = ["All", "Solved", "Unsolved"]
const SORTS = ["Default", "Difficulty", "Problem Number", "Acceptance"]

export default function CodingPracticePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTopic, setActiveTopic] = useState("All")
  const [activeStatus, setActiveStatus] = useState("All")
  const [activeSort, setActiveSort] = useState("Default")
  
  // Local state for bookmarks and solved status so UI works
  const [problems, setProblems] = useState(MOCK_PROBLEMS)

  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    setProblems(problems.map(p => p.id === id ? { ...p, bookmarked: !p.bookmarked } : p));
  }

  const toggleSolved = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    setProblems(problems.map(p => p.id === id ? { ...p, solved: !p.solved } : p));
  }

  const filteredAndSortedProblems = useMemo(() => {
    let result = problems.filter(p => {
      // Search
      const searchMatch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      
      // Topic
      const topicMatch = activeTopic === "All" || p.topics.includes(activeTopic)
      
      // Status
      const statusMatch = activeStatus === "All" || 
                          (activeStatus === "Solved" && p.solved) ||
                          (activeStatus === "Unsolved" && !p.solved)
                          
      return searchMatch && topicMatch && statusMatch
    })

    // Sort
    if (activeSort === "Problem Number") {
      result = result.sort((a, b) => a.id - b.id)
    } else if (activeSort === "Difficulty") {
      const diffMap = { "Easy": 1, "Medium": 2, "Hard": 3 }
      result = result.sort((a, b) => diffMap[a.difficulty] - diffMap[b.difficulty])
    } else if (activeSort === "Acceptance") {
      result = result.sort((a, b) => b.acceptance - a.acceptance) // Highest first
    }

    return result;
  }, [problems, searchQuery, activeTopic, activeStatus, activeSort])

  const solvedCount = problems.filter(p => p.solved).length;
  const totalCount = problems.length;
  const progressPercent = Math.round((solvedCount / totalCount) * 100) || 0;

  const getDifficultyColor = (diff: string) => {
    if (diff === "Easy") return "text-success bg-success/10 border-success/20";
    if (diff === "Medium") return "text-warning bg-warning/10 border-warning/20";
    if (diff === "Hard") return "text-error bg-error/10 border-error/20";
    return "";
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold font-heading tracking-tight flex items-center gap-3">
            <Code2 className="h-8 w-8 text-primary" />
            Coding Practice
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">Sharpen your problem-solving skills with structured practice.</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-sm border-border">
          <CardContent className="p-4 flex flex-col gap-1">
            <div className="flex justify-between items-center text-muted-foreground mb-1">
              <span className="text-sm font-medium">Solved</span>
              <CheckCircle2 className="h-4 w-4 text-success" />
            </div>
            <span className="text-2xl font-bold">{solvedCount}</span>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border">
          <CardContent className="p-4 flex flex-col gap-1">
            <div className="flex justify-between items-center text-muted-foreground mb-1">
              <span className="text-sm font-medium">Attempted</span>
              <Target className="h-4 w-4 text-info" />
            </div>
            <span className="text-2xl font-bold">{solvedCount + 2}</span>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border">
          <CardContent className="p-4 flex flex-col gap-1">
            <div className="flex justify-between items-center text-muted-foreground mb-1">
              <span className="text-sm font-medium">Current Streak</span>
              <Flame className="h-4 w-4 text-warning" />
            </div>
            <span className="text-2xl font-bold">5 Days</span>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border">
          <CardContent className="p-4 flex flex-col gap-1">
            <div className="flex justify-between items-center text-muted-foreground mb-1">
              <span className="text-sm font-medium">Progress</span>
              <BarChart2 className="h-4 w-4 text-primary" />
            </div>
            <span className="text-2xl font-bold">{progressPercent}%</span>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Search</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search problems..." 
                className="pl-9 bg-card border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Status</h3>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map(status => (
                <Badge 
                  key={status} 
                  variant={activeStatus === status ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => setActiveStatus(status)}
                >
                  {status}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Sort By</h3>
            <div className="flex flex-wrap gap-2">
              {SORTS.map(sort => (
                <Badge 
                  key={sort} 
                  variant={activeSort === sort ? "default" : "outline"}
                  className={`cursor-pointer ${activeSort !== sort ? 'border-border text-muted-foreground hover:bg-secondary' : ''}`}
                  onClick={() => setActiveSort(sort)}
                >
                  {sort}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Topics</h3>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map(topic => (
                <Badge 
                  key={topic} 
                  variant={activeTopic === topic ? "default" : "secondary"}
                  className="cursor-pointer font-normal bg-card border-border hover:bg-secondary"
                  onClick={() => setActiveTopic(topic)}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>

        </div>

        {/* Problem List Main */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <h2 className="text-lg font-semibold">{filteredAndSortedProblems.length} Problems Found</h2>
          </div>

          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
            {filteredAndSortedProblems.length > 0 ? (
              <div className="divide-y divide-border">
                {filteredAndSortedProblems.map((problem) => (
                  <Link href={`/coding/${problem.slug}`} key={problem.id}>
                    <div className="p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors group">
                      
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <button 
                          onClick={(e) => toggleSolved(problem.id, e)}
                          className="mt-0.5 text-muted-foreground hover:text-success transition-colors shrink-0"
                        >
                          {problem.solved ? 
                            <CheckCircle2 className="h-5 w-5 text-success" /> : 
                            <Circle className="h-5 w-5" />
                          }
                        </button>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors truncate flex items-center gap-2">
                            {problem.id}. {problem.title}
                          </h4>
                          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                            <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <span className="hidden sm:inline">Topics:</span>
                              <div className="flex gap-1">
                                {problem.topics.slice(0, 2).map(t => (
                                  <span key={t} className="bg-secondary px-1.5 rounded">{t}</span>
                                ))}
                                {problem.topics.length > 2 && <span className="bg-secondary px-1.5 rounded">+{problem.topics.length - 2}</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 shrink-0 ml-4">
                        <div className="hidden sm:flex flex-col items-end">
                          <span className="text-xs text-muted-foreground">Acceptance</span>
                          <span className="text-sm font-medium">{problem.acceptance}%</span>
                        </div>
                        <button 
                          onClick={(e) => toggleBookmark(problem.id, e)}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {problem.bookmarked ? 
                            <BookmarkCheck className="h-5 w-5 text-primary" /> : 
                            <Bookmark className="h-5 w-5" />
                          }
                        </button>
                      </div>

                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-foreground">No problems found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your filters or search query.</p>
                <Button variant="outline" className="mt-4" onClick={() => {setSearchQuery(""); setActiveTopic("All"); setActiveStatus("All")}}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
