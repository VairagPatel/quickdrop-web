import { Order } from '../types';
import StatusBadge from './StatusBadge';
import { Clock } from 'lucide-react';

interface OrderRowProps {
  order: Order;
  onClick?: () => void;
}

export default function OrderRow({ order, onClick }: OrderRowProps) {
  const getETA = (createdAt?: string) => {
    if (!createdAt) return '10 min';
    const created = new Date(createdAt);
    const now = new Date();
    const elapsed = Math.floor((now.getTime() - created.getTime()) / 60000);
    const remaining = Math.max(0, 10 - elapsed);
    return `${remaining} min`;
  };

  const formatAddress = (address: string) => {
    const parts = address.split(',');
    return parts[parts.length - 2]?.trim() || address;
  };

  return (
    <tr
      onClick={onClick}
      className="border-b border-[#1c1c2e] hover:bg-[#12121f] cursor-pointer transition-colors"
    >
      <td className="px-4 py-4">
        <span className="text-[#E8E8F5] font-mono text-sm">
          #{order.id.slice(0, 8)}
        </span>
      </td>
      <td className="px-4 py-4">
        <span className="text-[#E8E8F5]">{order.customer_name || 'Unknown'}</span>
      </td>
      <td className="px-4 py-4">
        <span className="text-[#6B6B8A] text-sm">
          {formatAddress(order.delivery_address)}
        </span>
      </td>
      <td className="px-4 py-4">
        <span className="text-[#E8E8F5] font-mono">{order.items_count || 0}</span>
      </td>
      <td className="px-4 py-4">
        <span className="text-[#E8E8F5] font-mono">₹{order.total_amount.toFixed(2)}</span>
      </td>
      <td className="px-4 py-4">
        <StatusBadge status={order.status} />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2 text-[#6B6B8A]">
          <Clock size={14} />
          <span className="text-sm font-mono">{getETA(order.created_at)}</span>
        </div>
      </td>
    </tr>
  );
}
