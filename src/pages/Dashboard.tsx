import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';
import LiveIndicator from '../components/LiveIndicator';
import { Package, TrendingUp, Users, Truck } from 'lucide-react';

export default function Dashboard() {
  const { data: orders = [] } = useQuery({
    queryKey: ['orders'],
    queryFn: api.getOrders,
    refetchInterval: 5000,
  });

  const { data: riders = [] } = useQuery({
    queryKey: ['riders'],
    queryFn: api.getRiders,
    refetchInterval: 10000,
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: api.getProducts,
  });

  // Calculate stats
  const totalOrders = orders.length;
  const activeOrders = orders.filter(o => o.status === 'dispatched' || o.status === 'picking').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const activeRiders = riders.filter(r => (r.active_order_count || 0) > 0).length;

  // Generate hourly data for the last 12 hours
  const generateHourlyData = () => {
    const now = new Date();
    const hourlyData = [];
    
    for (let i = 11; i >= 0; i--) {
      const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
      const hourStr = hour.getHours().toString().padStart(2, '0') + ':00';
      
      // Count orders created in this hour (simplified - in real app would check timestamps)
      const count = Math.floor(Math.random() * 15) + 2; // Mock data
      
      hourlyData.push({ hour: hourStr, count });
    }
    
    return hourlyData;
  };

  const hourlyData = generateHourlyData();

  // Recent orders for quick view
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#E8E8F5] mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
              Dashboard
            </h1>
            <p className="text-[#6B6B8A]">Real-time overview of your delivery operations</p>
          </div>
          <LiveIndicator />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Package}
            label="Total Orders"
            value={totalOrders}
            delta={12}
            color="#FF5C28"
          />
          <StatCard
            icon={TrendingUp}
            label="Active Orders"
            value={activeOrders}
            delta={8}
            color="#00D97E"
          />
          <StatCard
            icon={Users}
            label="Total Revenue"
            value={`₹${totalRevenue.toLocaleString()}`}
            delta={15}
            color="#3B82F6"
          />
          <StatCard
            icon={Truck}
            label="Active Riders"
            value={`${activeRiders}/${riders.length}`}
            color="#A855F7"
          />
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Bar Chart */}
          <div className="lg:col-span-2">
            <BarChart data={hourlyData} />
          </div>

          {/* Quick Stats */}
          <div className="bg-[#12121f] border border-[#1c1c2e] rounded-xl p-6">
            <h3 className="text-lg font-bold text-[#E8E8F5] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#6B6B8A] text-sm">Pending Orders</span>
                <span className="text-[#E8E8F5] font-bold font-mono">
                  {orders.filter(o => o.status === 'pending').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B6B8A] text-sm">Picking Orders</span>
                <span className="text-[#E8E8F5] font-bold font-mono">
                  {orders.filter(o => o.status === 'picking').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B6B8A] text-sm">Dispatched Orders</span>
                <span className="text-[#E8E8F5] font-bold font-mono">
                  {orders.filter(o => o.status === 'dispatched').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B6B8A] text-sm">Delivered Today</span>
                <span className="text-[#00D97E] font-bold font-mono">
                  {orders.filter(o => o.status === 'delivered').length}
                </span>
              </div>
              <div className="h-px bg-[#1c1c2e] my-4" />
              <div className="flex items-center justify-between">
                <span className="text-[#6B6B8A] text-sm">Total Products</span>
                <span className="text-[#E8E8F5] font-bold font-mono">
                  {products.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B6B8A] text-sm">Avg Order Value</span>
                <span className="text-[#E8E8F5] font-bold font-mono">
                  ₹{totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-[#12121f] border border-[#1c1c2e] rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#1c1c2e]">
            <h3 className="text-lg font-bold text-[#E8E8F5]" style={{ fontFamily: 'Syne, sans-serif' }}>
              Recent Orders
            </h3>
          </div>
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
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B8A] uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="border-t border-[#1c1c2e] hover:bg-[#1c1c2e]/30 transition-colors">
                      <td className="px-4 py-3 text-sm font-mono text-[#E8E8F5]">
                        #{order.id.slice(0, 8)}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#E8E8F5]">
                        {order.customer_name || 'Unknown'}
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-[#E8E8F5]">
                        ₹{order.total_amount}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'delivered'
                              ? 'bg-[#00D97E]/20 text-[#00D97E]'
                              : order.status === 'dispatched'
                              ? 'bg-[#3B82F6]/20 text-[#3B82F6]'
                              : order.status === 'picking'
                              ? 'bg-[#F59E0B]/20 text-[#F59E0B]'
                              : 'bg-[#6B6B8A]/20 text-[#6B6B8A]'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-12 text-center text-[#6B6B8A]">
                      No orders yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
