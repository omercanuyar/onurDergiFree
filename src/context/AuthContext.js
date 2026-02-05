import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const ADMIN_CREDENTIALS = {
  username: 'ATAsagun55',
  passwordHash: '8a9f2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a'
};

const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'onur190tibbiyeli_salt_2024');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authToken = sessionStorage.getItem('adminAuthToken');
      const authTime = sessionStorage.getItem('adminAuthTime');
      
      if (authToken && authTime) {
        const elapsed = Date.now() - parseInt(authTime, 10);
        const SESSION_DURATION = 2 * 60 * 60 * 1000;
        
        if (elapsed < SESSION_DURATION) {
          setIsAuthenticated(true);
        } else {
          sessionStorage.removeItem('adminAuthToken');
          sessionStorage.removeItem('adminAuthTime');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    if (username !== ADMIN_CREDENTIALS.username) {
      return { success: false, error: 'Geçersiz kullanıcı adı veya şifre' };
    }

    const hashedPassword = await hashPassword(password);
    const expectedHash = await hashPassword('AbAtaturk55188161!');
    
    if (hashedPassword === expectedHash) {
      const token = crypto.randomUUID();
      sessionStorage.setItem('adminAuthToken', token);
      sessionStorage.setItem('adminAuthTime', Date.now().toString());
      setIsAuthenticated(true);
      return { success: true };
    }

    return { success: false, error: 'Geçersiz kullanıcı adı veya şifre' };
  };

  const logout = () => {
    sessionStorage.removeItem('adminAuthToken');
    sessionStorage.removeItem('adminAuthTime');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
