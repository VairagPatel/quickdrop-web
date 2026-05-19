import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by AuthContext
      console.error('Login failed:', err);
    }
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
        className="w-full border rounded-2xl p-8 shadow-2xl"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div 
            style={{ 
              color: '#FF5C28',
              fontFamily: "'Syne', sans-serif",
              fontSize: '2.5rem',
              fontWeight: '700'
            }}
            className="flex items-center justify-center gap-2 mb-2"
          >
            <span className="text-5xl">🛵</span>
            <span>QuickDrop</span>
          </div>
        </div>

        {/* Welcome Heading */}
        <h1 
          style={{
            color: '#E8E8F5',
            fontFamily: "'Syne', sans-serif",
            fontSize: '1.875rem',
            fontWeight: '600'
          }}
          className="text-center mb-8"
        >
          Welcome back
        </h1>

        {/* Error Message */}
        {error && (
          <div 
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              borderColor: 'rgba(239, 68, 68, 0.3)',
              color: '#ef4444'
            }}
            className="mb-6 p-3 rounded-lg border text-sm text-center"
          >
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label 
              htmlFor="email"
              style={{
                color: '#6B6B8A',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
              className="block mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              style={{
                backgroundColor: '#080810',
                borderColor: '#1c1c2e',
                color: '#E8E8F5',
                fontFamily: "'JetBrains Mono', monospace"
              }}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF5C28] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="your@email.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <label 
              htmlFor="password"
              style={{
                color: '#6B6B8A',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
              className="block mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              style={{
                backgroundColor: '#080810',
                borderColor: '#1c1c2e',
                color: '#E8E8F5',
                fontFamily: "'JetBrains Mono', monospace"
              }}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF5C28] focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="••••••••"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: '#FF5C28',
              color: '#E8E8F5',
              fontFamily: "'Syne', sans-serif",
              fontWeight: '600',
              fontSize: '1rem'
            }}
            className="w-full py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
          >
            {isLoading ? (
              <>
                <svg 
                  className="animate-spin h-5 w-5" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Logging in...</span>
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Footer Text */}
        <p 
          style={{
            color: '#6B6B8A',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem'
          }}
          className="text-center mt-6"
        >
          Admin & Store Manager Access Only
        </p>
      </div>
    </div>
  );
};

export default Login;
