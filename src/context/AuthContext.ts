import { createContext, useContext, ReactNode } from 'react';
import useAuthentication, { AuthHook } from '../hooks/useAuthentication';

interface AuthContextProps {
  auth: AuthHook;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode; value: AuthHook }> = ({ children, value }) => {
    return <AuthContext.Provider value={{ auth: value as any }}>{children}</AuthContext.Provider>;
  };
  

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context.auth;
};
