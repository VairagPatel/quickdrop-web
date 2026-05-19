import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import LiveIndicator from '../components/LiveIndicator';
import { Package, AlertTriangle } from 'lucide-react';

export default function Store() {
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: api.getProducts,
    refetchInterval: 5000,
  });

  const lowStockProducts = products.filter(p => p.stock < 10);
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#E8E8F5] mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
              Store Inventory
            </h1>
            <p className="text-[#6B6B8A]">Manage product stock and pricing</p>
          </div>
          <LiveIndicator />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#12121f] border border-[#1c1c2e] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Package size={20} className="text-[#3B82F6]" />
              <span className="text-[#6B6B8A] text-sm">Total Products</span>
            </div>
            <div className="text-3xl font-bold text-[#E8E8F5] font-mono">{totalProducts}</div>
          </div>

          <div className="bg-[#12121f] border border-[#1c1c2e] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle size={20} className="text-[#EF4444]" />
              <span className="text-[#6B6B8A] text-sm">Low Stock Items</span>
            </div>
            <div className="text-3xl font-bold text-[#EF4444] font-mono">{lowStockProducts.length}</div>
          </div>

          <div className="bg-[#12121f] border border-[#1c1c2e] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Package size={20} className="text-[#00D97E]" />
              <span className="text-[#6B6B8A] text-sm">Inventory Value</span>
            </div>
            <div className="text-3xl font-bold text-[#00D97E] font-mono">₹{totalValue.toFixed(0)}</div>
          </div>
        </div>

        {/* Low Stock Alert */}
        {lowStockProducts.length > 0 && (
          <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertTriangle size={20} className="text-[#EF4444] mt-0.5" />
            <div>
              <h3 className="text-[#EF4444] font-medium mb-1">Low Stock Alert</h3>
              <p className="text-[#6B6B8A] text-sm">
                {lowStockProducts.length} product{lowStockProducts.length !== 1 ? 's' : ''} running low on stock (less than 10 units)
              </p>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-[#12121f] border border-[#1c1c2e] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0e0e1c]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B8A] uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B8A] uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B8A] uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B8A] uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[#6B6B8A] uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const isLowStock = product.stock < 10;
                  
                  return (
                    <tr
                      key={product.id}
                      className={`border-b border-[#1c1c2e] hover:bg-[#0e0e1c] transition-colors ${
                        isLowStock ? 'bg-[#EF4444]/5' : ''
                      }`}
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#0e0e1c] flex items-center justify-center">
                            <Package size={20} className="text-[#6B6B8A]" />
                          </div>
                          <span className="text-[#E8E8F5] font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-[#6B6B8A]">{product.category}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-[#E8E8F5] font-mono">₹{product.price.toFixed(2)}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`font-mono font-medium ${
                            isLowStock ? 'text-[#EF4444]' : 'text-[#E8E8F5]'
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {isLowStock ? (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#EF4444]/20 text-[#EF4444]">
                            Low Stock
                          </span>
                        ) : product.stock === 0 ? (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#6B6B8A]/20 text-[#6B6B8A]">
                            Out of Stock
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#00D97E]/20 text-[#00D97E]">
                            In Stock
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
