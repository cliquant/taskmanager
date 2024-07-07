import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Loading from '@/components/Loading';
import Register from '@/pages/auth/register';
import Login from '@/pages/auth/login';
import DashboardIndex from '@/pages/dashboard/index';
import Logout from '@/pages/auth/logout';
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider, useAuth } from '@/context/AuthContext';

const AppContent: React.FC = () => {
  const { authData, checkAuth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setLoading(false);
    };
    verifyAuth();
  }, [checkAuth]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={authData ? "/dashboard" : "/login"} replace />} />
      <Route path="/login" element={authData ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/register" element={authData ? <Navigate to="/dashboard" replace /> : <Register />} />
      <Route path="/dashboard" element={authData ? <DashboardIndex /> : <Navigate to="/login" replace />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;