export default function LiveIndicator() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="w-2 h-2 bg-[#00D97E] rounded-full animate-pulse"></div>
        <div className="absolute inset-0 w-2 h-2 bg-[#00D97E] rounded-full animate-ping"></div>
      </div>
      <span className="text-sm text-[#6B6B8A] font-mono">LIVE</span>
    </div>
  );
}
