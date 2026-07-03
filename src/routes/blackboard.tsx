import { createFileRoute } from '@tanstack/react-router'
import Blackboard from '@/features/blackboard/components/blackboard'
// NOTE: Excalidraw's CSS is intentionally NOT imported here. It's loaded lazily
// alongside the Excalidraw component (features/blackboard/components/blackboard.tsx)
// so its ~145 KB doesn't become a render-blocking, ~99%-unused global stylesheet.
import { Suspense } from 'react'

export const Route = createFileRoute('/blackboard')({
  staticData: {
    hideHeader: false,
    hideFooter: true,
  },
  // Disable SSR for this route
  ssr: false,
  component: Blackboard,
})

// function BlackboardPage() {
//   return (
//     <Suspense
//       fallback={
//         <div className="h-full w-full flex items-center justify-center bg-background">
//           <div className="text-center space-y-2">
//             <div className="text-2xl">⏳</div>
//             <p className="text-sm text-muted-foreground">Loading blackboard...</p>
//           </div>
//         </div>
//       }
//     >
//       <Blackboard />
//     </Suspense>
//   )
// }

// const metadata = {
//   title: "Blackboard",
//   description: "A versatile space for jotting down ideas, sketching diagrams, and brainstorming concepts. Whether you're a developer, designer, or creative thinker, the blackboard is your canvas for visualizing thoughts and collaborating with others.",
// };

