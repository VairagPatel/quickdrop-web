import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('qd_token');
    if (storedToken) {
      try {
        // Decode the base64 encoded user data
        const userData = JSON.parse(atob(storedToken));
        setUser(userData);
        setToken(storedToken);
      } catch (err) {
        localStorage.removeItem('qd_token');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Get CSRF token
      const csrfResponse = await fetch(`${API_URL}/api/auth/csrf`, {
        credentials: 'include',
      });
      const { csrfToken } = await csrfResponse.json();

      // Step 2: Sign in with credentials
      const response = await fetch(`${API_URL}/api/auth/callback/credentials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include',
        body: new URLSearchParams({
          email,
          password,
          csrfToken,
          callbackUrl: '/',
          json: 'true',
        }).toString(),
      });

      const data = await response.json();

      if (data.error || !response.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      // Step 3: Get session to retrieve user info
      const sessionResponse = await fetch(`${API_URL}/api/auth/session`, {
        credentials: 'include',
      });
      const session = await sessionResponse.json();

      if (!session || !session.user) {
        throw new Error('Failed to retrieve session');
      }

      // Create a simple token from session (for localStorage)
      const token = btoa(JSON.stringify(session.user));
      
      // Save token and user
      localStorage.setItem('qd_token', token);
      setToken(token);
      setUser(session.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Call NextAuth signout endpoint
    fetch(`${API_URL}/api/auth/signout`, {
      method: 'POST',
      credentials: 'include',
    }).catch(() => {
      // Ignore errors, we're logging out anyway
    });

    // Clear local state
    localStorage.removeItem('qd_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
