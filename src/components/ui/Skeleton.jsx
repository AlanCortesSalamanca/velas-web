export function ProductCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-3 rounded-2xl bg-white/60 p-4">
      <div className="aspect-[4/5] rounded-xl bg-gradient-to-br from-sage-100 to-sage-200/50" />
      <div className="space-y-2.5">
        <div className="h-3 w-20 rounded-full bg-sage-200/70" />
        <div className="h-4 w-3/4 rounded-lg bg-sage-200/70" />
        <div className="h-3 w-full rounded-lg bg-sage-100/70" />
      </div>
      <div className="h-4 w-24 rounded-lg bg-sage-200/70" />
      <div className="h-11 w-full rounded-xl bg-sage-200/70" />
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="grid animate-pulse gap-12 lg:grid-cols-2 lg:gap-20">
      <div className="space-y-4">
        <div className="aspect-[4/5] w-full rounded-3xl bg-gradient-to-br from-sage-100 to-sage-200/50" />
        <div className="flex gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 w-20 rounded-xl bg-sage-200/70 sm:h-24 sm:w-24" />
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <div className="h-5 w-24 rounded-full bg-sage-200/70" />
        <div className="h-10 w-4/5 rounded-xl bg-sage-200/70" />
        <div className="h-7 w-32 rounded-xl bg-sage-200/70" />
        <div className="h-4 w-full rounded-lg bg-sage-100/70" />
        <div className="h-4 w-5/6 rounded-lg bg-sage-100/70" />
        <div className="h-4 w-3/4 rounded-lg bg-sage-100/70" />
        <div className="mt-8 h-28 rounded-2xl bg-sage-100/70" />
        <div className="mt-8 grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-sage-100/70" />
          ))}
        </div>
        <div className="h-14 w-full rounded-xl bg-sage-200/70" />
      </div>
    </div>
  );
}
