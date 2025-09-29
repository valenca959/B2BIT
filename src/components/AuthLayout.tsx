import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function AuthLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setIsChecking(false);
  }, []);

  if (isChecking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl text-b2bit-primary">Carregando...</p>
      </div>
    ); 
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
}