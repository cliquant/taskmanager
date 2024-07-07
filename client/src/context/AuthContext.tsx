import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface AuthData {
  email: string;
  firstName: string;
  lastName: string;
  groupId: number;
}

interface AuthContextProps {
  authData: AuthData | null;
  setAuthData: (data: AuthData) => void;
  clearAuthData: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  authData: null,
  setAuthData: () => {},
  clearAuthData: () => {},
  checkAuth: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authData, setAuthDataState] = useState<AuthData | null>(null);

  const setAuthData = useCallback((data: AuthData) => {
    setAuthDataState(data);
  }, []);

  const clearAuthData = useCallback(() => {
    setAuthDataState(null);
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const response = await axios.get('/api/v1/auth/profile');
      if (response.data.user) {
        setAuthData(response.data.user);
      } else {
        clearAuthData();
      }
    } catch {
      clearAuthData();
    }
  }, [setAuthData, clearAuthData]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ authData, setAuthData, clearAuthData, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);