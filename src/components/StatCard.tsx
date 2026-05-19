import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  delta?: number;
  color?: string;
}

export default function StatCard({ icon: Icon, label, value, delta, color = '#FF5C28' }: StatCardProps) {
  const deltaColor = delta && delta > 0 ? '#00D97E' : delta && delta < 0 ? '#EF4444' : '#6B6B8A';

  return (
    <div className="bg-[#12121f] border border-[#1c1c2e] rounded-xl p-6 hover:border-[#FF5C28]/30 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[#6B6B8A] text-sm mb-2">{label}</p>
          <h3 
            className="text-3xl font-bold text-[#E8E8F5] mb-2 font-mono"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {value}
          </h3>
          {delta !== undefined && (
            <div className="flex items-center gap-1">
              <span 
                className="text-sm font-medium font-mono"
                style={{ color: deltaColor }}
              >
                {delta > 0 ? '+' : ''}{delta}%
              </span>
              <span className="text-xs text-[#6B6B8A]">vs last hour</span>
            </div>
          )}
        </div>
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </div>
  );
}
