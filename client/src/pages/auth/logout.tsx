import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

const Logout: React.FC = () => {
  const { clearAuthData } = useAuth();

  useEffect(() => {
    async function logout() {
      await axios.post('/api/v1/auth/logout');
      clearAuthData();
    }
    logout();
  }, [clearAuthData]);

  return <Navigate to="/login" replace />;
};

export default Logout;