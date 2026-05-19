import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/orders', label: 'Orders', icon: ShoppingBag },
  { path: '/store', label: 'Store', icon: Package },
  { path: '/fleet', label: 'Fleet', icon: Users },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-[#0e0e1c] border-r border-[#1c1c2e] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#1c1c2e]">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🛵</span>
          <h1 className="text-2xl font-bold text-[#E8E8F5]" style={{ fontFamily: 'Syne, sans-serif' }}>
            QuickDrop
          </h1>
        </div>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-4 border-b border-[#1c1c2e]">
          <div className="text-sm text-[#E8E8F5] font-medium">{user.name}</div>
          <div className="text-xs text-[#6B6B8A] font-mono mt-1">{user.role}</div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#FF5C28] text-white'
                      : 'text-[#6B6B8A] hover:bg-[#12121f] hover:text-[#E8E8F5]'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer with Logout */}
      <div className="p-4 border-t border-[#1c1c2e] space-y-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#6B6B8A] hover:bg-[#12121f] hover:text-[#E8E8F5] transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
        <div className="text-xs text-[#6B6B8A] font-mono">
          v1.0.0 • Admin Panel
        </div>
      </div>
    </aside>
  );
}
