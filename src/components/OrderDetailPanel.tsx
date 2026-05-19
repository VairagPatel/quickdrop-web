import { X, User, MapPin, Package, Clock } from 'lucide-react';
import { OrderWithDetails } from '../types';
import StatusBadge from './StatusBadge';

interface OrderDetailPanelProps {
  order: OrderWithDetails;
  onClose: () => void;
}

export default function OrderDetailPanel({ order, onClose }: OrderDetailPanelProps) {
  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-[#0e0e1c] border-l border-[#1c1c2e] shadow-2xl z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-[#0e0e1c] border-b border-[#1c1c2e] p-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#E8E8F5]" style={{ fontFamily: 'Syne, sans-serif' }}>
          Order Details
        </h2>
        <button
          onClick={onClose}
          className="text-[#6B6B8A] hover:text-[#E8E8F5] transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Order ID & Status */}
        <div>
          <div className="text-sm text-[#6B6B8A] mb-2">Order ID</div>
          <div className="text-lg font-mono text-[#E8E8F5] mb-3">#{order.id.slice(0, 8)}</div>
          <StatusBadge status={order.status} />
        </div>

        {/* Customer */}
        <div className="bg-[#12121f] border border-[#1c1c2e] rounded-lg p-4">
          <div className="flex items-center gap-2 text-[#6B6B8A] mb-3">
            <User size={16} />
            <span className="text-sm">Customer</span>
          </div>
          <div className="text-[#E8E8F5] font-medium">{order.customer?.name || 'Unknown'}</div>
          <div className="text-sm text-[#6B6B8A] mt-1">{order.customer?.phone || 'N/A'}</div>
        </div>

        {/* Delivery Address */}
        <div className="bg-[#12121f] border border-[#1c1c2e] rounded-lg p-4">
          <div className="flex items-center gap-2 text-[#6B6B8A] mb-3">
            <MapPin size={16} />
            <span className="text-sm">Delivery Address</span>
          </div>
          <div className="text-[#E8E8F5] text-sm">{order.delivery_address}</div>
        </div>

        {/* Rider */}
        {order.rider && (
          <div className="bg-[#12121f] border border-[#1c1c2e] rounded-lg p-4">
            <div className="flex items-center gap-2 text-[#6B6B8A] mb-3">
              <User size={16} />
              <span className="text-sm">Assigned Rider</span>
            </div>
            <div className="text-[#E8E8F5] font-medium">{order.rider.name}</div>
            <div className="text-sm text-[#6B6B8A] mt-1">{order.rider.phone || 'N/A'}</div>
          </div>
        )}

        {/* Items */}
        <div className="bg-[#12121f] border border-[#1c1c2e] rounded-lg p-4">
          <div className="flex items-center gap-2 text-[#6B6B8A] mb-3">
            <Package size={16} />
            <span className="text-sm">Items ({order.order_items?.length || 0})</span>
          </div>
          <div className="space-y-3">
            {order.order_items?.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-[#E8E8F5] text-sm">{item.product?.name || 'Unknown'}</div>
                  <div className="text-xs text-[#6B6B8A] mt-1">Qty: {item.quantity}</div>
                </div>
                <div className="text-[#E8E8F5] font-mono text-sm">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="bg-[#FF5C28]/10 border border-[#FF5C28]/30 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-[#E8E8F5] font-medium">Total Amount</span>
            <span className="text-2xl font-bold text-[#FF5C28] font-mono">
              ₹{order.total_amount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Timestamps */}
        <div className="bg-[#12121f] border border-[#1c1c2e] rounded-lg p-4">
          <div className="flex items-center gap-2 text-[#6B6B8A] mb-3">
            <Clock size={16} />
            <span className="text-sm">Timeline</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#6B6B8A]">Created</span>
              <span className="text-[#E8E8F5] font-mono">
                {order.created_at ? new Date(order.created_at).toLocaleTimeString() : 'N/A'}
              </span>
            </div>
            {order.updated_at && (
              <div className="flex justify-between">
                <span className="text-[#6B6B8A]">Updated</span>
                <span className="text-[#E8E8F5] font-mono">
                  {new Date(order.updated_at).toLocaleTimeString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
