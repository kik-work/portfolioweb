import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-muted shimmer rounded-2xl", className)}
      {...props}
    />
  )
}

/** Full-height placeholder shown while a lazy section loads. */
function SectionSkeleton() {
  return (
    <div className="shell min-h-screen py-24 space-y-8" aria-hidden="true">
      <Skeleton className="h-14 w-72 max-w-full" />
      <Skeleton className="h-6 w-96 max-w-full" />
      <div className="grid gap-6 sm:grid-cols-2">
        <Skeleton className="aspect-video rounded-3xl" />
        <Skeleton className="aspect-video rounded-3xl" />
      </div>
    </div>
  )
}

export { Skeleton, SectionSkeleton }
