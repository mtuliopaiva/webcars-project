// AuthContext.ts

import { createContext, useContext, ReactNode } from 'react';

interface AuthContextProps {
  auth: any;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode; value: any }> = ({ children, value }) => {
  return <AuthContext.Provider value={{ auth: value }}>{children}</AuthContext.Provider>;

};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context.auth;
};
