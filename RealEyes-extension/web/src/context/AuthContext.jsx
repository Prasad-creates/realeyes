import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API_BASE = import.meta.env.DEV 
  ? 'http://localhost:5001' 
  : 'https://realeyes-final.onrender.com';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'RealEyes User', email: 'user@realeyes.ai' });
  const [token, setToken] = useState('unrestricted_access_token');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data));
    setToken(res.data.token);
    setUser(res.data);
  };

  const register = async (name, email, password) => {
    const res = await axios.post(`${API_BASE}/api/auth/register`, { name, email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data));
    setToken(res.data.token);
    setUser(res.data);
  };

  const googleLogin = async (credential) => {
    const res = await axios.post(`${API_BASE}/api/auth/google`, { credential });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data));
    setToken(res.data.token);
    setUser(res.data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, googleLogin, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
