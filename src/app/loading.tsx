export default function Loading() {
  return (
    <div className="min-h-screen bg-darker flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-violet-500/20" />
          <div className="absolute inset-0 rounded-full border-2 border-t-violet-500 animate-spin" />
        </div>
        <p className="text-gray-600 text-sm">Loading...</p>
      </div>
    </div>
  );
}