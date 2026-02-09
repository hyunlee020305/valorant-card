export function Spinner({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-gray-700" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#FF4655] animate-spin" />
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="w-full max-w-[800px] aspect-video rounded-xl bg-white/5 animate-pulse flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Spinner />
        <p className="text-sm text-gray-500">Generating card...</p>
      </div>
    </div>
  );
}
