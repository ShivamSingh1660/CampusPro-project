"use client"

import React, { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { MOCK_PROBLEMS, Problem } from "@/lib/mock-problems"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ChevronLeft, ChevronRight, Bookmark, BookmarkCheck, 
  CheckCircle2, Circle, Play, Send, Check, Loader2,
  Terminal, Code2
} from "lucide-react"

export default function ProblemDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [problem, setProblem] = useState<Problem | null>(null)
  const [language, setLanguage] = useState("javascript")
  const [code, setCode] = useState("")
  const [activeTestCase, setActiveTestCase] = useState(0)
  
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionResult, setExecutionResult] = useState<string | null>(null)

  const [bookmarked, setBookmarked] = useState(false)
  const [solved, setSolved] = useState(false)

  // Find problem and siblings
  const currentIndex = MOCK_PROBLEMS.findIndex(p => p.slug === slug)
  const prevProblem = currentIndex > 0 ? MOCK_PROBLEMS[currentIndex - 1] : null
  const nextProblem = currentIndex < MOCK_PROBLEMS.length - 1 ? MOCK_PROBLEMS[currentIndex + 1] : null

  useEffect(() => {
    const p = MOCK_PROBLEMS.find(p => p.slug === slug)
    if (p) {
      setProblem(p)
      setCode(p.starterCode["javascript"] || "")
      setLanguage("javascript")
      setBookmarked(p.bookmarked)
      setSolved(p.solved)
      setActiveTestCase(0)
      setExecutionResult(null)
    }
  }, [slug])

  if (!problem) {
    return <div className="p-8 text-center">Problem not found.</div>
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value
    setLanguage(lang)
    setCode(problem.starterCode[lang] || "")
  }

  const handleRunCode = () => {
    setIsExecuting(true)
    setExecutionResult(null)
    // Fake execution delay
    setTimeout(() => {
      setIsExecuting(false)
      setExecutionResult("Code execution will be available soon. (Local Mock)")
    }, 1500)
  }

  const getDifficultyColor = (diff: string) => {
    if (diff === "Easy") return "text-success bg-success/10 border-success/20";
    if (diff === "Medium") return "text-warning bg-warning/10 border-warning/20";
    if (diff === "Hard") return "text-error bg-error/10 border-error/20";
    return "";
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] -mt-6 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden bg-background">
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.push('/coding')} className="gap-1 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Problems</span>
          </Button>
        </div>

        <div className="flex items-center gap-2 bg-secondary/50 rounded-lg p-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-muted-foreground"
            disabled={!prevProblem}
            onClick={() => prevProblem && router.push(`/coding/${prevProblem.slug}`)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Prev
          </Button>
          <span className="text-xs font-medium text-muted-foreground px-2">
            {currentIndex + 1} / {MOCK_PROBLEMS.length}
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-muted-foreground"
            disabled={!nextProblem}
            onClick={() => nextProblem && router.push(`/coding/${nextProblem.slug}`)}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-8 w-8 ${solved ? 'text-success' : 'text-muted-foreground'}`}
            onClick={() => setSolved(!solved)}
            title={solved ? "Mark as unsolved" : "Mark as solved"}
          >
            {solved ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-8 w-8 ${bookmarked ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setBookmarked(!bookmarked)}
            title="Bookmark"
          >
            {bookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT: Problem Description */}
        <div className="w-full lg:w-1/2 flex flex-col border-r border-border bg-background overflow-y-auto custom-scrollbar">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold">{problem.id}. {problem.title}</h1>
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <span className={`text-xs uppercase font-bold px-2 py-0.5 rounded border ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
              <span className="text-sm text-muted-foreground border-l border-border pl-3">
                Acceptance: {problem.acceptance}%
              </span>
            </div>

            <div className="prose prose-sm dark:prose-invert max-w-none mb-8">
              <div className="text-foreground whitespace-pre-wrap">{problem.description}</div>
            </div>

            <div className="space-y-6 mb-8">
              {problem.examples.map((ex, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="font-semibold text-sm">Example {i + 1}:</h3>
                  <div className="bg-secondary/50 border border-border rounded-lg p-4 font-mono text-sm space-y-1">
                    <div><span className="text-muted-foreground">Input:</span> {ex.input}</div>
                    <div><span className="text-muted-foreground">Output:</span> {ex.output}</div>
                    {ex.explanation && <div><span className="text-muted-foreground">Explanation:</span> {ex.explanation}</div>}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h3 className="font-semibold text-sm mb-3">Constraints:</h3>
              <ul className="list-disc pl-5 space-y-1.5">
                {problem.constraints.map((c, i) => (
                  <li key={i} className="text-sm text-muted-foreground">
                    <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground font-mono text-xs">{c}</code>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Code2 className="h-4 w-4 text-muted-foreground" /> Related Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {problem.topics.map(t => (
                  <Badge key={t} variant="secondary" className="font-normal">{t}</Badge>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT: Code Editor & Test Cases */}
        <div className="w-full lg:w-1/2 flex flex-col bg-[#0d0d12]">
          
          {/* Editor Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#0d0d12]">
            <div className="flex items-center gap-2">
              <select 
                value={language}
                onChange={handleLanguageChange}
                className="bg-[#1a1a24] text-white/90 border border-white/10 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="h-7 text-white/70 hover:text-white hover:bg-white/10" onClick={handleRunCode} disabled={isExecuting}>
                {isExecuting ? <Loader2 className="h-3 w-3 mr-1.5 animate-spin" /> : <Play className="h-3 w-3 mr-1.5" />}
                Run Code
              </Button>
              <Button size="sm" className="h-7 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm" onClick={handleRunCode} disabled={isExecuting}>
                <Send className="h-3 w-3 mr-1.5" />
                Submit
              </Button>
            </div>
          </div>

          {/* Fake Editor Area */}
          <div className="flex-1 relative overflow-hidden bg-[#0d0d12] border-b border-white/10 flex">
            {/* Line numbers */}
            <div className="py-4 px-2 text-right border-r border-white/5 bg-[#0d0d12] text-white/20 select-none font-mono text-[13px] leading-6 min-w-[40px]">
              {code.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            {/* Text area */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
              className="flex-1 w-full p-4 bg-transparent text-white/90 font-mono text-[13px] leading-6 resize-none focus:outline-none custom-scrollbar"
              style={{ tabSize: 4 }}
            />
          </div>

          {/* Test Cases Panel */}
          <div className="h-1/3 min-h-[200px] flex flex-col bg-[#0d0d12]">
            <div className="flex items-center px-4 py-2 border-b border-white/10 bg-[#15151e]">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="h-6 text-xs text-white/90 hover:bg-white/10 bg-white/5">
                  <Terminal className="h-3 w-3 mr-1.5" /> Test Cases
                </Button>
                {executionResult && (
                  <Button variant="ghost" size="sm" className="h-6 text-xs text-warning hover:bg-warning/20 hover:text-warning">
                    Result
                  </Button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {executionResult ? (
                <div className="text-warning font-mono text-sm bg-warning/10 border border-warning/20 rounded p-3">
                  {executionResult}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {problem.testCases.map((tc, idx) => (
                      <button
                        key={tc.id}
                        onClick={() => setActiveTestCase(idx)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                          activeTestCase === idx 
                            ? 'bg-white/10 text-white' 
                            : 'bg-transparent text-white/50 hover:bg-white/5 hover:text-white/80'
                        }`}
                      >
                        Case {idx + 1}
                      </button>
                    ))}
                  </div>
                  
                  {problem.testCases[activeTestCase] && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs text-white/50 font-medium">Input:</label>
                        <textarea
                          readOnly
                          className="w-full bg-[#1a1a24] border border-white/10 rounded-md p-2 text-white/90 font-mono text-xs resize-none focus:outline-none"
                          rows={problem.testCases[activeTestCase].input.split('\n').length}
                          value={problem.testCases[activeTestCase].input}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-white/50 font-medium">Expected Output:</label>
                        <div className="w-full bg-[#1a1a24] border border-white/10 rounded-md p-2 text-white/90 font-mono text-xs">
                          {problem.testCases[activeTestCase].expectedOutput}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
