import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'student' | 'teacher' | 'registrar' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: Record<string, User & { password: string }> = {
  'alumno@terciariourquiza.edu.ar': {
    id: '1',
    email: 'alumno@terciariourquiza.edu.ar',
    name: 'Juan Pérez',
    role: 'student',
    password: 'demo123'
  },
  'docente@terciariourquiza.edu.ar': {
    id: '2',
    email: 'docente@terciariourquiza.edu.ar',
    name: 'María González',
    role: 'teacher',
    password: 'demo123'
  },
  'bedelia@terciariourquiza.edu.ar': {
    id: '3',
    email: 'bedelia@terciariourquiza.edu.ar',
    name: 'Carlos Rodríguez',
    role: 'registrar',
    password: 'demo123'
  },
  'admin@terciariourquiza.edu.ar': {
    id: '4',
    email: 'admin@terciariourquiza.edu.ar',
    name: 'Ana Martínez',
    role: 'admin',
    password: 'demo123'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Validate institutional email
    if (!email.endsWith('@terciariourquiza.edu.ar')) {
      throw new Error('Debe utilizar un correo institucional (@terciariourquiza.edu.ar)');
    }

    const mockUser = mockUsers[email];
    if (!mockUser || mockUser.password !== password) {
      throw new Error('Credenciales incorrectas');
    }

    const { password: _, ...userWithoutPassword } = mockUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
