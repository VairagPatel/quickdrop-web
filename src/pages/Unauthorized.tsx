import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div 
      style={{ 
        backgroundColor: '#080810',
        fontFamily: "'JetBrains Mono', monospace"
      }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div 
        style={{
          backgroundColor: '#12121f',
          borderColor: '#1c1c2e',
          maxWidth: '420px'
        }}
        className="w-full border rounded-2xl p-8 shadow-2xl text-center"
      >
        <div className="text-6xl mb-4">🚫</div>
        <h1 
          style={{
            color: '#E8E8F5',
            fontFamily: "'Syne', sans-serif",
            fontSize: '1.875rem',
            fontWeight: '600'
          }}
          className="mb-4"
        >
          Access Denied
        </h1>
        <p 
          style={{
            color: '#6B6B8A',
            fontFamily: "'JetBrains Mono', monospace"
          }}
          className="mb-6"
        >
          You don't have permission to access this page.
        </p>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#FF5C28',
            color: '#E8E8F5',
            fontFamily: "'Syne', sans-serif",
            fontWeight: '600'
          }}
          className="px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
