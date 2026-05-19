interface BarChartProps {
  data: { hour: string; count: number }[];
}

export default function BarChart({ data }: BarChartProps) {
  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="bg-[#12121f] border border-[#1c1c2e] rounded-xl p-6">
      <h3 className="text-lg font-bold text-[#E8E8F5] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
        Orders per Hour
      </h3>
      <div className="flex items-end justify-between gap-2 h-48">
        {data.map((item, index) => {
          const height = (item.count / maxCount) * 100;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col items-center justify-end h-40">
                <span className="text-xs text-[#6B6B8A] font-mono mb-1">
                  {item.count}
                </span>
                <div
                  className="w-full rounded-t-lg transition-all duration-300 hover:opacity-80"
                  style={{
                    height: `${height}%`,
                    backgroundColor: '#FF5C28',
                    minHeight: item.count > 0 ? '8px' : '0',
                  }}
                />
              </div>
              <span className="text-xs text-[#6B6B8A] font-mono">
                {item.hour}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
