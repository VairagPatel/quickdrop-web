import { Rider } from '../types';

interface MiniMapProps {
  riders: Rider[];
}

export default function MiniMap({ riders }: MiniMapProps) {
  // Generate random positions for riders (in production, use real coordinates)
  const getRiderPosition = (index: number) => {
    const positions = [
      { x: 20, y: 30 },
      { x: 45, y: 60 },
      { x: 70, y: 25 },
      { x: 35, y: 75 },
      { x: 80, y: 50 },
      { x: 15, y: 65 },
      { x: 60, y: 40 },
      { x: 50, y: 80 },
    ];
    return positions[index % positions.length];
  };

  return (
    <div className="bg-[#12121f] border border-[#1c1c2e] rounded-xl p-6">
      <h3 className="text-lg font-bold text-[#E8E8F5] mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
        Fleet Map
      </h3>
      <div className="relative w-full h-64 bg-[#080810] rounded-lg overflow-hidden">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(#1c1c2e 1px, transparent 1px),
              linear-gradient(90deg, #1c1c2e 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Rider dots */}
        {riders.slice(0, 8).map((rider, index) => {
          const pos = getRiderPosition(index);
          const isBusy = (rider.active_order_count || 0) > 0;
          
          return (
            <div
              key={rider.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
            >
              {/* Pulse effect */}
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  backgroundColor: isBusy ? '#FF5C28' : '#00D97E',
                  opacity: 0.4,
                }}
              />
              {/* Dot */}
              <div
                className="relative w-3 h-3 rounded-full border-2 border-[#080810]"
                style={{
                  backgroundColor: isBusy ? '#FF5C28' : '#00D97E',
                }}
              />
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#0e0e1c] border border-[#1c1c2e] rounded text-xs text-[#E8E8F5] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {rider.name}
                <div className="text-[#6B6B8A] text-xs">
                  {isBusy ? `${rider.active_order_count} active` : 'Idle'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00D97E]" />
          <span className="text-[#6B6B8A]">Idle</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FF5C28]" />
          <span className="text-[#6B6B8A]">Busy</span>
        </div>
      </div>
    </div>
  );
}
