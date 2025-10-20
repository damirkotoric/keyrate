export default function BrokersLoading() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <div className="h-10 w-32 bg-muted animate-pulse rounded" />
      </div>

      {/* Search Bar Skeleton */}
      <div className="h-10 w-full bg-muted animate-pulse rounded" />

      {/* Table Skeleton */}
      <div className="bg-card rounded-lg border">
        <div className="border-b p-4">
          <div className="flex gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 w-32 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border-b p-4">
            <div className="flex gap-4">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="h-4 w-32 bg-muted animate-pulse rounded" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

