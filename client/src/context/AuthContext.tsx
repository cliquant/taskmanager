import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface AuthData {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  groupId: number;
}

interface AuthContextProps {
  authData: AuthData | null;
  setAuthData: (data: AuthData) => void;
  clearAuthData: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  authData: null,
  setAuthData: () => {},
  clearAuthData: () => {}
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authData, setAuthDataState] = useState<AuthData | null>(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const groupId = localStorage.getItem('groupId');

    if (token && email && firstName && lastName && groupId) {
      return { token, email, firstName, lastName, groupId: Number(groupId) };
    }
    return null;
  });

  const setAuthData = useCallback((data: AuthData) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('email', data.email);
    localStorage.setItem('firstName', data.firstName);
    localStorage.setItem('lastName', data.lastName);
    localStorage.setItem('groupId', data.groupId.toString());
    setAuthDataState(data);
  }, []);

  const clearAuthData = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('groupId');
    setAuthDataState(null);
  }, []);

  return (
    <AuthContext.Provider value={{ authData, setAuthData, clearAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);