import { createFileRoute } from '@tanstack/react-router'
import Blackboard from '@/features/blackboard/components/blackboard'
import '@excalidraw/excalidraw/index.css'

export const Route = createFileRoute('/blackboard')({
  component: Blackboard,
  // Disable SSR for this route
  ssr: false,
})
