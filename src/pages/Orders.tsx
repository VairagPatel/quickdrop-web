import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useState } from 'react';
import OrderRow from '../components/OrderRow';
import OrderDetailPanel from '../components/OrderDetailPanel';
import LiveIndicator from '../components/LiveIndicator';
import { OrderStatus } from '../types';
import { Filter } from 'lucide-react';

export default function Orders() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');

  const { data: orders = [] } = useQuery({
    queryKey: ['orders'],
    queryFn: api.getOrders,
    refetchInterval: 5000,
  });

  const { data: selectedOrder } = useQuery({
    queryKey: ['order', selectedOrderId],
    queryFn: () => api.getOrder(selectedOrderId!),
    enabled: !!selectedOrderId,
  });

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(o => o.status === statusFilter);

  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    picking: orders.filter(o => o.status === 'picking').length,
    dispatched: orders.filter(o => o.status === 'dispatched').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#E8E8F5] mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
              Orders
            </h1>
            <p className="text-[#6B6B8A]">Manage and track all delivery orders</p>
          </div>
          <LiveIndicator />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-[#6B6B8A]">
            <Filter size={18} />
            <span className="text-sm font-medium">Filter by status:</span>
          </div>
          <div className="flex gap-2">
            {(['all', 'pending', 'picking', 'dispatched', 'delivered'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-[#FF5C28] text-white'
                    : 'bg-[#12121f] text-[#6B6B8A] hover:bg-[#1c1c2e] hover:text-[#E8E8F5]'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                <span className="ml-2 font-mono">({statusCounts[status]})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-[#12121f] border border-[#1c1c2e] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0e0e1c]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B8A] uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B8A] uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B8A] uppercase tracking-wider">
                    Area
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B8A] uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B8A] uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B8A] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B8A] uppercase tracking-wider">
                    ETA
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <OrderRow
                      key={order.id}
                      order={order}
                      onClick={() => setSelectedOrderId(order.id)}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-[#6B6B8A]">
                      No orders found for this filter
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Detail Panel */}
      {selectedOrder && (
        <OrderDetailPanel
          order={selectedOrder}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </div>
  );
}
