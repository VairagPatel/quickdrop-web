import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import LiveIndicator from '../components/LiveIndicator';
import { User, Phone, Mail } from 'lucide-react';

export default function Fleet() {
  const { data: riders = [] } = useQuery({
    queryKey: ['riders'],
    queryFn: api.getRiders,
    refetchInterval: 5000,
  });

  const activeRiders = riders.filter(r => (r.active_order_count || 0) > 0);
  const idleRiders = riders.filter(r => (r.active_order_count || 0) === 0);

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#E8E8F5] mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
              Fleet Management
            </h1>
            <p className="text-[#6B6B8A]">Monitor and manage delivery riders</p>
          </div>
          <LiveIndicator />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#12121f] border border-[#1c1c2e] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <User size={20} className="text-[#3B82F6]" />
              <span className="text-[#6B6B8A] text-sm">Total Riders</span>
            </div>
            <div className="text-3xl font-bold text-[#E8E8F5] font-mono">{riders.length}</div>
          </div>

          <div className="bg-[#12121f] border border-[#1c1c2e] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5C28]" />
              <span className="text-[#6B6B8A] text-sm">Active Riders</span>
            </div>
            <div className="text-3xl font-bold text-[#FF5C28] font-mono">{activeRiders.length}</div>
          </div>

          <div className="bg-[#12121f] border border-[#1c1c2e] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-[#00D97E]" />
              <span className="text-[#6B6B8A] text-sm">Idle Riders</span>
            </div>
            <div className="text-3xl font-bold text-[#00D97E] font-mono">{idleRiders.length}</div>
          </div>
        </div>

        {/* Riders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {riders.map((rider) => {
            const isBusy = (rider.active_order_count || 0) > 0;
            
            return (
              <div
                key={rider.id}
                className="bg-[#12121f] border border-[#1c1c2e] rounded-xl p-6 hover:border-[#FF5C28]/30 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#0e0e1c] flex items-center justify-center">
                      <User size={24} className="text-[#6B6B8A]" />
                    </div>
                    <div>
                      <h3 className="text-[#E8E8F5] font-medium">{rider.name}</h3>
                      <p className="text-xs text-[#6B6B8A] font-mono">ID: {rider.id.slice(0, 8)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isBusy ? 'bg-[#FF5C28]' : 'bg-[#00D97E]'
                      }`}
                    />
                    <span className="text-xs text-[#6B6B8A]">
                      {isBusy ? 'Busy' : 'Idle'}
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  {rider.email && (
                    <div className="flex items-center gap-2 text-sm text-[#6B6B8A]">
                      <Mail size={14} />
                      <span className="truncate">{rider.email}</span>
                    </div>
                  )}
                  {rider.phone && (
                    <div className="flex items-center gap-2 text-sm text-[#6B6B8A]">
                      <Phone size={14} />
                      <span>{rider.phone}</span>
                    </div>
                  )}
                </div>

                {/* Active Orders */}
                <div className="pt-4 border-t border-[#1c1c2e]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B6B8A]">Active Orders</span>
                    <span
                      className={`text-lg font-bold font-mono ${
                        isBusy ? 'text-[#FF5C28]' : 'text-[#6B6B8A]'
                      }`}
                    >
                      {rider.active_order_count || 0}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {riders.length === 0 && (
          <div className="bg-[#12121f] border border-[#1c1c2e] rounded-xl p-12 text-center">
            <User size={48} className="text-[#6B6B8A] mx-auto mb-4" />
            <p className="text-[#6B6B8A]">No riders found</p>
          </div>
        )}
      </div>
    </div>
  );
}
