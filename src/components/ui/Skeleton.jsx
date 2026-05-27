export function ProductCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-3">
      <div className="aspect-[4/5] rounded-lg bg-sage-200" />
      <div className="space-y-2">
        <div className="h-3 w-16 rounded-full bg-sage-200" />
        <div className="h-4 w-3/4 rounded bg-sage-200" />
        <div className="h-3 w-full rounded bg-sage-100" />
      </div>
      <div className="h-4 w-20 rounded bg-sage-200" />
      <div className="h-9 w-full rounded-lg bg-sage-200" />
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="grid animate-pulse gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="space-y-4">
        <div className="aspect-[4/5] w-full rounded-2xl bg-sage-200" />
        <div className="flex gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 w-16 rounded-lg bg-sage-200 sm:h-20 sm:w-20" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-5 w-20 rounded-full bg-sage-200" />
        <div className="h-8 w-3/4 rounded bg-sage-200" />
        <div className="h-6 w-24 rounded bg-sage-200" />
        <div className="h-4 w-full rounded bg-sage-100" />
        <div className="h-4 w-5/6 rounded bg-sage-100" />
        <div className="h-4 w-2/3 rounded bg-sage-100" />
        <div className="mt-6 h-24 rounded-xl bg-sage-100" />
        <div className="mt-6 grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 rounded-lg bg-sage-100" />
          ))}
        </div>
        <div className="h-12 w-full rounded-lg bg-sage-200" />
      </div>
    </div>
  );
}
