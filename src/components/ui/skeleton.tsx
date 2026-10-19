import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

/** Full-height placeholder shown while a lazy section loads. */
function SectionSkeleton() {
  return (
    <div className="min-h-screen py-10 space-y-6" aria-hidden="true">
      <Skeleton className="h-10 w-48 bg-primary/20" />
      <div className="grid gap-6 sm:grid-cols-2">
        <Skeleton className="aspect-video bg-primary/10" />
        <Skeleton className="aspect-video bg-primary/10" />
      </div>
    </div>
  )
}

export { Skeleton, SectionSkeleton }
