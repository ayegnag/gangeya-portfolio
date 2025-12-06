import { ArrowRightIcon } from "lucide-react";
import { Link } from '@tanstack/react-router'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound({ className }: { className?: string }) {
  console.log("Not found - loaded!")
  return (
    <div
      className={cn(
        "flex h-[calc(100svh-5.5rem)] flex-col items-center justify-center",
        className
      )}
    >
      {/* <svg
        className="h-28 w-full text-border"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 514 258"
        fill="none"
      >
        <path
          d="M65 193v64h128v-64H65Zm0 0H1V65h64m0 128V65m384 0H321v128h128m0-128V1H257v256h192v-64m0-128v128m0-128h64v128h-64M65 65h128V1H65v64Z"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg> */}
      <svg className="h-28 w-full text-border" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
        <path xmlns="http://www.w3.org/2000/svg" d="M 97.396 97.396 L 292.188 97.396 L 292.188 194.792 L 243.49 194.792 L 243.49 146.094 L 97.396 146.094 Z M 48.698 146.094 L 97.396 146.094 L 97.396 389.584 L 48.698 389.584 Z M 97.396 389.584 L 243.49 389.584 L 243.49 438.282 L 97.396 438.282 Z M 194.792 243.49 L 292.188 243.49 L 292.188 389.584 L 389.584 389.584 L 389.584 97.396 L 438.282 97.396 L 438.282 438.282 L 243.49 438.282 L 243.49 292.188 L 194.792 292.188 Z"
          fill="none"
          stroke="rgba(138, 138, 138, 0.7)"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>


      <h1 className="mt-8 mb-6 font-mono text-8xl font-medium">404</h1>

      <Button variant="default" asChild>
        <Link to="/">
          Go to Home
          <ArrowRightIcon />
        </Link>
      </Button>
    </div>
  );
}
