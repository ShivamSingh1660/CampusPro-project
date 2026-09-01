import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Check, Server, MemoryStick } from "lucide-react"

export function CodingPreview() {
  return (
    <section id="coding" className="py-24 bg-surface border-t border-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 text-foreground">
              Practice like the real thing.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Solve coding problems with a focused editor, test cases, submissions and detailed results. Build your muscle memory for technical interviews.
            </p>
            <div className="flex items-center gap-4">
              <Button size="lg">Start Practicing</Button>
              <Button variant="outline" size="lg">View Problem Set</Button>
            </div>
          </div>

          <div className="relative rounded-xl border border-border/50 bg-[#1e1e1e] text-[#d4d4d4] shadow-2xl overflow-hidden font-mono text-sm w-full h-[500px] flex flex-col">
            {/* Fake IDE Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#404040]">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-white">1. Two Sum</span>
                <Badge variant="success" className="bg-success/20 text-success border-0 px-2 py-0 text-[10px]">Easy</Badge>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="h-7 text-xs bg-[#3d3d3d] hover:bg-[#4d4d4d] text-white">
                  <Play className="h-3 w-3 mr-1 text-success" /> Run Code
                </Button>
                <Button size="sm" className="h-7 text-xs bg-primary hover:bg-primary/90 text-white">
                  Submit
                </Button>
              </div>
            </div>

            {/* Fake IDE Body */}
            <div className="flex flex-1 overflow-hidden">
              {/* Problem Description (Left Pane) */}
              <div className="w-[40%] border-r border-[#404040] p-4 overflow-y-auto hidden sm:block bg-[#1e1e1e]">
                <p className="mb-4 text-[#d4d4d4]">Given an array of integers <code className="bg-[#2d2d2d] px-1 py-0.5 rounded text-primary-foreground/80">nums</code> and an integer <code className="bg-[#2d2d2d] px-1 py-0.5 rounded text-primary-foreground/80">target</code>, return indices of the two numbers such that they add up to target.</p>
                <div className="bg-[#2d2d2d] p-3 rounded mb-4">
                  <p><span className="text-white font-semibold">Input:</span> nums = [2,7,11,15], target = 9</p>
                  <p><span className="text-white font-semibold">Output:</span> [0,1]</p>
                </div>
              </div>

              {/* Code Editor (Right Pane) */}
              <div className="flex-1 flex flex-col relative bg-[#1e1e1e]">
                <div className="flex items-center px-4 py-1.5 bg-[#1e1e1e] border-b border-[#2d2d2d]">
                  <span className="text-xs text-[#858585]">Solution.ts</span>
                </div>
                <div className="p-4 overflow-auto flex-1 font-mono text-[13px] leading-relaxed">
                  <div className="flex">
                    <div className="text-[#858585] text-right pr-4 select-none flex flex-col">
                      <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span>
                    </div>
                    <div className="text-[#d4d4d4]">
                      <p><span className="text-[#569cd6]">function</span> <span className="text-[#dcdcaa]">twoSum</span>(nums: <span className="text-[#4ec9b0]">number</span>[], target: <span className="text-[#4ec9b0]">number</span>): <span className="text-[#4ec9b0]">number</span>[] {'{'}</p>
                      <p className="pl-4"><span className="text-[#569cd6]">const</span> map <span className="text-[#d4d4d4]">=</span> <span className="text-[#569cd6]">new</span> <span className="text-[#4ec9b0]">Map</span>&lt;<span className="text-[#4ec9b0]">number</span>, <span className="text-[#4ec9b0]">number</span>&gt;();</p>
                      <p className="pl-4"><span className="text-[#569cd6]">for</span> (<span className="text-[#569cd6]">let</span> i <span className="text-[#d4d4d4]">=</span> <span className="text-[#b5cea8]">0</span>; i &lt; nums.<span className="text-[#4ec9b0]">length</span>; i<span className="text-[#d4d4d4]">++</span>) {'{'}</p>
                      <p className="pl-8"><span className="text-[#569cd6]">const</span> diff <span className="text-[#d4d4d4]">=</span> target <span className="text-[#d4d4d4]">-</span> nums[i];</p>
                      <p className="pl-8"><span className="text-[#569cd6]">if</span> (map.<span className="text-[#dcdcaa]">has</span>(diff)) <span className="text-[#569cd6]">return</span> [map.<span className="text-[#dcdcaa]">get</span>(diff)<span className="text-[#569cd6]">!</span>, i];</p>
                      <p className="pl-8">map.<span className="text-[#dcdcaa]">set</span>(nums[i], i);</p>
                      <p className="pl-4">{'}'}</p>
                      <p><span className="text-[#569cd6]">return</span> [];</p>
                      <p>{'}'}</p>
                    </div>
                  </div>
                </div>

                {/* Submissions Result Pane Overlay */}
                <div className="absolute bottom-0 w-full h-[140px] bg-[#2d2d2d] border-t border-[#404040] shadow-[0_-10px_20px_rgba(0,0,0,0.3)] animate-in slide-in-from-bottom-full duration-700 delay-500 flex flex-col">
                  <div className="px-4 py-2 border-b border-[#404040] flex items-center justify-between bg-[#252526]">
                    <span className="text-xs font-semibold text-white">Test Result</span>
                    <span className="text-[10px] text-[#858585]">Just now</span>
                  </div>
                  <div className="p-4 flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Check className="h-5 w-5 text-success" />
                      <span className="text-success font-bold text-lg">Accepted</span>
                    </div>
                    <div className="flex items-center gap-6 text-xs">
                      <div className="flex items-center gap-2 bg-[#1e1e1e] px-3 py-1.5 rounded">
                        <Server className="h-3 w-3 text-[#858585]" />
                        <span className="text-[#858585]">Runtime:</span>
                        <span className="text-white font-medium">54 ms</span>
                      </div>
                      <div className="flex items-center gap-2 bg-[#1e1e1e] px-3 py-1.5 rounded">
                        <MemoryStick className="h-3 w-3 text-[#858585]" />
                        <span className="text-[#858585]">Memory:</span>
                        <span className="text-white font-medium">44.8 MB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
