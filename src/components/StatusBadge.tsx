import { OrderStatus } from '../types';

interface StatusBadgeProps {
  status: OrderStatus;
}

const statusConfig = {
  pending: { label: 'Pending', color: '#FBBF24', bg: '#FBBF2420' },
  picking: { label: 'Picking', color: '#3B82F6', bg: '#3B82F620' },
  dispatched: { label: 'Dispatched', color: '#FF5C28', bg: '#FF5C2820' },
  delivered: { label: 'Delivered', color: '#00D97E', bg: '#00D97E20' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-medium font-mono"
      style={{
        color: config.color,
        backgroundColor: config.bg,
      }}
    >
      {config.label}
    </span>
  );
}
