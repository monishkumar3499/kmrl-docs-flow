import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'staff';
  department?: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, department?: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock credentials
const CREDENTIALS = {
  admin: { email: 'kmrladmin@gmail.com', password: 'AdminPass@123' },
  departments: {
    operations: { email: 'kmrl.operations@gmail.com', password: 'OpsPass@123' },
    engineering: { email: 'kmrl.engineering@gmail.com', password: 'EngPass@123' },
    finance: { email: 'kmrl.finance@gmail.com', password: 'FinPass@123' },
    hr: { email: 'kmrl.hr@gmail.com', password: 'HRPass@123' },
    safety: { email: 'kmrl.safety@gmail.com', password: 'SafePass@123' },
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('kmrl-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, department?: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check admin credentials
    if (email === CREDENTIALS.admin.email && password === CREDENTIALS.admin.password) {
      const adminUser: User = {
        id: 'admin-1',
        email,
        role: 'admin',
        name: 'KMRL Administrator'
      };
      setUser(adminUser);
      localStorage.setItem('kmrl-user', JSON.stringify(adminUser));
      setIsLoading(false);
      return true;
    }

    // Check department credentials
    if (department) {
      const deptKey = department.toLowerCase().replace(/\s+/g, '').replace('&', '') as keyof typeof CREDENTIALS.departments;
      const deptCreds = CREDENTIALS.departments[deptKey];
      
      if (deptCreds && email === deptCreds.email && password === deptCreds.password) {
        const staffUser: User = {
          id: `staff-${deptKey}`,
          email,
          role: 'staff',
          department,
          name: `${department} Staff`
        };
        setUser(staffUser);
        localStorage.setItem('kmrl-user', JSON.stringify(staffUser));
        setIsLoading(false);
        return true;
      }
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kmrl-user');
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