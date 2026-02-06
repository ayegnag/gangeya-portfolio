import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const LiveEditor = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const [cursorLine, setCursorLine] = useState<number>(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const handleCursorChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget
    const cursorPos = textarea.selectionStart
    const textBeforeCursor = textarea.value.substring(0, cursorPos)
    const lineNumber = textBeforeCursor.split('\n').length - 1
    setCursorLine(lineNumber)
  }

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (previewRef.current) {
      previewRef.current.scrollTop = e.currentTarget.scrollTop
      previewRef.current.scrollLeft = e.currentTarget.scrollLeft
    }
  }

  const lines = value.split('\n')

  return (
    <div className="relative h-full">
      {/* Hidden textarea for input */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyUp={handleCursorChange}
        onClick={handleCursorChange}
        onScroll={handleScroll}
        className="absolute inset-0 w-full h-full p-4 font-mono text-sm bg-transparent text-transparent resize-none border-0 focus-visible:ring-0 outline-none z-10 leading-relaxed"
        style={{ 
          caretColor: 'var(--foreground)',
          lineHeight: '1.75rem' // Fixed line height
        }}
      />
      
      {/* Rendered preview overlay */}
      <div 
        ref={previewRef}
        className="absolute inset-0 w-full h-full p-4 overflow-auto pointer-events-none"
      >
        {lines.map((line, index) => {
          const isCurrentLine = index === cursorLine
          
          return (
            <div 
              key={index} 
              className="font-mono text-sm"
              style={{ 
                minHeight: '1.75rem', // Match textarea line height
                lineHeight: '1.75rem'
              }}
            >
              {isCurrentLine ? (
                // Show raw markdown on cursor line
                <span className="text-foreground inline-block" style={{ lineHeight: '1.75rem' }}>
                  {line || '\u00A0'}
                </span>
              ) : (
                // Show rendered markdown on other lines - constrained to single line height
                <div 
                  className="prose prose-sm dark:prose-invert max-w-none overflow-hidden"
                  style={{ 
                    height: '1.75rem',
                    lineHeight: '1.75rem'
                  }}
                >
                  <div className="[&>*]:my-0 [&>*]:leading-[1.75rem] [&_h1]:text-lg [&_h2]:text-base [&_h3]:text-sm [&_h1]:leading-[1.75rem] [&_h2]:leading-[1.75rem] [&_h3]:leading-[1.75rem]">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {line || '\u00A0'}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}