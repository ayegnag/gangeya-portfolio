import ImageGallery from '@/features/frames/components/imageGallery'
import ImageGalleryModular from '@/features/frames/components/imageGalleryModular'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hobbies/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    {/* <ImageGallery /> */}
    <ImageGalleryModular/>
  </div>
}
