"use client"

import React, { useState, useEffect, Suspense, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft, ChevronRight, Clock, Target, Flag, 
  CheckCircle2, XCircle, AlertCircle, RefreshCw,
  ListOrdered
} from "lucide-react"
import { MOCK_APTITUDE_QUESTIONS, AptitudeQuestion } from "@/lib/mock-aptitude"

function PracticeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const categoryParam = searchParams.get('category')
  const modeParam = searchParams.get('mode') // "timed", "mixed", or null

  const questions = useMemo(() => {
    let qs = [...MOCK_APTITUDE_QUESTIONS]
    if (categoryParam) {
      qs = qs.filter(q => q.category === categoryParam)
    }
    // Limit to 20 for practice session
    return qs.slice(0, 20)
  }, [categoryParam])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [reviewMarked, setReviewMarked] = useState<Record<number, boolean>>({})
  
  const [sessionState, setSessionState] = useState<"practice" | "results" | "review">("practice")
  
  // Timer State (30 mins = 1800s if timed)
  const isTimed = modeParam === "timed"
  const [timeLeft, setTimeLeft] = useState(isTimed ? 1800 : 0) // if not timed, count up
  const [timeSpent, setTimeSpent] = useState(0)

  useEffect(() => {
    if (sessionState !== "practice") return;

    const interval = setInterval(() => {
      if (isTimed) {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval)
            handleSubmit() // Auto submit when time is up
            return 0
          }
          return prev - 1
        })
      } else {
        setTimeSpent(prev => prev + 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isTimed, sessionState])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const handleSelectOption = (optIndex: number) => {
    const qId = questions[currentIndex].id
    setAnswers(prev => ({ ...prev, [qId]: optIndex }))
  }

  const toggleReviewMark = () => {
    const qId = questions[currentIndex].id
    setReviewMarked(prev => ({ ...prev, [qId]: !prev[qId] }))
  }

  const goNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(prev => prev + 1)
  }

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1)
  }

  const handleSubmit = () => {
    const totalTime = isTimed ? (1800 - timeLeft) : timeSpent
    setTimeSpent(totalTime)
    setSessionState("results")
  }

  const resetSession = () => {
    setAnswers({})
    setReviewMarked({})
    setCurrentIndex(0)
    setTimeLeft(isTimed ? 1800 : 0)
    setTimeSpent(0)
    setSessionState("practice")
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <Target className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold">No questions found</h2>
        <p className="text-muted-foreground mt-2 mb-6">Could not load questions for this category.</p>
        <Button onClick={() => router.push('/aptitude')}>Go Back</Button>
      </div>
    )
  }

  // --- RESULTS VIEW ---
  if (sessionState === "results") {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach(q => {
      const userAns = answers[q.id]
      if (userAns === undefined) unanswered++
      else if (userAns === q.correctAnswer) correct++
      else incorrect++
    })

    const accuracy = ((correct / (correct + incorrect)) * 100) || 0
    const score = correct

    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in pb-12 pt-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-success/10 rounded-full mb-2">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Practice Complete!</h1>
          <p className="text-muted-foreground">Here's how you performed in this session.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="bg-card">
            <CardContent className="p-4 text-center">
              <p className="text-sm font-medium text-muted-foreground mb-1">Score</p>
              <p className="text-3xl font-bold text-foreground">{score}<span className="text-lg text-muted-foreground">/{questions.length}</span></p>
            </CardContent>
          </Card>
          <Card className="bg-success/5 border-success/20">
            <CardContent className="p-4 text-center">
              <p className="text-sm font-medium text-success mb-1">Accuracy</p>
              <p className="text-3xl font-bold text-success">{accuracy.toFixed(0)}%</p>
            </CardContent>
          </Card>
          <Card className="bg-error/5 border-error/20">
            <CardContent className="p-4 text-center">
              <p className="text-sm font-medium text-error mb-1">Incorrect</p>
              <p className="text-3xl font-bold text-error">{incorrect}</p>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-4 text-center">
              <p className="text-sm font-medium text-muted-foreground mb-1">Time Taken</p>
              <p className="text-3xl font-bold text-foreground">{formatTime(timeSpent)}</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button size="lg" onClick={() => { setSessionState("review"); setCurrentIndex(0); }} className="w-full sm:w-auto">
            <ListOrdered className="mr-2 h-5 w-5" /> Review Answers
          </Button>
          <Button size="lg" variant="outline" onClick={resetSession} className="w-full sm:w-auto">
            <RefreshCw className="mr-2 h-5 w-5" /> Retry Practice
          </Button>
          <Button size="lg" variant="ghost" onClick={() => router.push('/aptitude')} className="w-full sm:w-auto">
            Back to Hub
          </Button>
        </div>
      </div>
    )
  }

  // --- REVIEW VIEW ---
  if (sessionState === "review") {
    const q = questions[currentIndex]
    const userAns = answers[q.id]
    const isCorrect = userAns === q.correctAnswer
    const isUnanswered = userAns === undefined

    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-12 pt-4">
        <div className="flex items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
          <Button variant="ghost" onClick={() => setSessionState("results")} size="sm" className="text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Results
          </Button>
          <div className="font-medium">
            Question {currentIndex + 1} of {questions.length}
          </div>
          <div className="w-24"></div> {/* Spacer for balance */}
        </div>

        <Card className="border-border">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="secondary" className="font-normal">{q.topic}</Badge>
              {isUnanswered ? (
                <Badge variant="outline" className="text-muted-foreground border-muted-foreground/30"><AlertCircle className="h-3 w-3 mr-1" /> Unanswered</Badge>
              ) : isCorrect ? (
                <Badge variant="success" className="bg-success/20 text-success border-success/30 hover:bg-success/20"><CheckCircle2 className="h-3 w-3 mr-1" /> Correct</Badge>
              ) : (
                <Badge variant="destructive" className="bg-error/20 text-error border-error/30 hover:bg-error/20"><XCircle className="h-3 w-3 mr-1" /> Incorrect</Badge>
              )}
            </div>
            <CardTitle className="text-lg leading-relaxed mt-2 font-medium">{q.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {q.options.map((opt, idx) => {
              let btnClass = "border-border bg-card text-foreground"
              
              if (idx === q.correctAnswer) {
                btnClass = "border-success bg-success/10 text-success ring-1 ring-success"
              } else if (idx === userAns && !isCorrect) {
                btnClass = "border-error bg-error/10 text-error"
              }

              return (
                <div key={idx} className={`w-full p-4 rounded-lg border text-left text-sm ${btnClass}`}>
                  <span className="font-medium mr-3">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                  {idx === q.correctAnswer && <CheckCircle2 className="inline h-4 w-4 ml-2 float-right" />}
                  {idx === userAns && !isCorrect && <XCircle className="inline h-4 w-4 ml-2 float-right" />}
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card className="bg-info/5 border-info/20 shadow-sm">
          <CardContent className="p-6">
            <h4 className="font-bold text-info mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Explanation
            </h4>
            <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">{q.explanation}</p>
          </CardContent>
        </Card>

        <div className="flex justify-between mt-6">
          <Button onClick={goPrev} disabled={currentIndex === 0} variant="outline">
            <ChevronLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          <Button onClick={goNext} disabled={currentIndex === questions.length - 1}>
            Next <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    )
  }

  // --- PRACTICE VIEW (Default) ---
  const q = questions[currentIndex]
  const answeredCount = Object.keys(answers).length

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-6rem)]">
      
      {/* Left: Main Question Area */}
      <div className="flex-1 flex flex-col min-h-0 bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/20">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg bg-background w-8 h-8 flex items-center justify-center rounded border border-border shadow-sm">
              {currentIndex + 1}
            </span>
            <Badge variant="outline" className="font-normal bg-background text-muted-foreground">{q.topic}</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleReviewMark}
              className={reviewMarked[q.id] ? "text-warning hover:text-warning/80 bg-warning/10" : "text-muted-foreground hover:text-foreground"}
            >
              <Flag className={`h-4 w-4 mr-1.5 ${reviewMarked[q.id] ? "fill-warning" : ""}`} />
              <span className="hidden sm:inline">{reviewMarked[q.id] ? "Marked" : "Mark for Review"}</span>
            </Button>
            
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-mono text-sm font-bold ${isTimed && timeLeft < 300 ? 'bg-error/10 text-error' : 'bg-background border border-border text-foreground'}`}>
              <Clock className="h-4 w-4" />
              {isTimed ? formatTime(timeLeft) : formatTime(timeSpent)}
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <h2 className="text-xl md:text-2xl font-medium leading-relaxed text-foreground mb-8">
            {q.question}
          </h2>
          
          <div className="space-y-3 max-w-3xl">
            {q.options.map((opt, idx) => {
              const isSelected = answers[q.id] === idx
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 md:p-5 rounded-xl border-2 text-left text-sm md:text-base transition-all ${
                    isSelected 
                      ? 'border-primary bg-primary/5 text-foreground ring-2 ring-primary/20 ring-offset-1 ring-offset-background' 
                      : 'border-border/60 bg-background text-muted-foreground hover:border-primary/40 hover:bg-secondary/30'
                  }`}
                >
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-3 text-xs font-bold ${
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </button>
              )
            })}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-border bg-secondary/20 flex items-center justify-between">
          <Button onClick={goPrev} disabled={currentIndex === 0} variant="outline" className="bg-background">
            <ChevronLeft className="h-4 w-4 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Previous</span>
          </Button>
          
          <div className="flex-1 px-8 hidden md:flex items-center gap-3">
            <Progress value={(answeredCount / questions.length) * 100} className="h-2 bg-border [&>div]:bg-primary" />
            <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{answeredCount} / {questions.length} answered</span>
          </div>

          <Button onClick={goNext} disabled={currentIndex === questions.length - 1} className={currentIndex === questions.length - 1 ? 'hidden' : 'flex'}>
            <span className="hidden sm:inline">Next</span> <ChevronRight className="h-4 w-4 ml-1 sm:ml-2" />
          </Button>
          
          {currentIndex === questions.length - 1 && (
            <Button onClick={handleSubmit} variant="default" className="bg-success hover:bg-success/90 text-success-foreground">
              Submit Test
            </Button>
          )}
        </div>

      </div>

      {/* Right: Question Palette (Desktop side, Mobile bottom drawer/stack) */}
      <div className="w-full lg:w-72 shrink-0 bg-card rounded-xl border border-border shadow-sm flex flex-col min-h-0">
        <div className="p-4 border-b border-border bg-secondary/20">
          <h3 className="font-semibold flex items-center gap-2">
            <ListOrdered className="h-4 w-4 text-muted-foreground" />
            Question Palette
          </h3>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-4 gap-2">
            {questions.map((q, idx) => {
              const isAns = answers[q.id] !== undefined;
              const isMarked = reviewMarked[q.id];
              const isCurr = idx === currentIndex;
              
              let btnClass = "border-border/60 bg-background text-muted-foreground hover:border-primary/50";
              if (isCurr) {
                btnClass = "border-primary bg-primary/10 text-primary ring-1 ring-primary";
              } else if (isMarked) {
                btnClass = "border-warning bg-warning/10 text-warning";
              } else if (isAns) {
                btnClass = "border-success/50 bg-success/10 text-success";
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative aspect-square rounded-lg border flex items-center justify-center text-sm font-medium transition-all ${btnClass}`}
                >
                  {idx + 1}
                  {isMarked && !isCurr && <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-warning"></div>}
                </button>
              )
            })}
          </div>

          <div className="mt-8 space-y-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded border border-success/50 bg-success/10"></div> Answered
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded border border-warning bg-warning/10"></div> Marked for Review
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded border border-border/60 bg-background"></div> Unanswered
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded border border-primary bg-primary/10"></div> Current
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-border">
          <Button onClick={handleSubmit} variant="secondary" className="w-full font-medium">
            Submit Assessment
          </Button>
        </div>
      </div>

    </div>
  )
}

export default function PracticePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center"><Target className="h-8 w-8 animate-pulse text-primary mx-auto mb-4" />Loading practice session...</div>}>
      <PracticeContent />
    </Suspense>
  )
}

// Dummy icon for import that was missing in earlier imports
import { BookOpen } from "lucide-react"
