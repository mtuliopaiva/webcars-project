import { useState, useEffect } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

import { auth } from '../config/firebaseConfig';

export interface EmailPasswordCredentials {
  email: string;
  password: string;
}

export interface AuthHook {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUpWithEmailPassword: (credentials: EmailPasswordCredentials) => Promise<void>;
  signInWithEmailPassword: (credentials: EmailPasswordCredentials) => Promise<void>;
  signOut: () => Promise<void>;
}

const useAuthentication = (): AuthHook => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);

  const signUpWithEmailPassword: (credentials: EmailPasswordCredentials) => Promise<void> = async (credentials) => {
    const auth = getAuth();

    try {
      await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
      console.log("Sucess");
    } catch (error: any) {
      console.error('Error creating user:', error.message);
    }
  };

  const signInWithEmailPassword: (credentials: EmailPasswordCredentials) => Promise<void> = async (credentials) => {
    const auth = getAuth();
    try {
      setLoading(true);
      await signInWithEmailAndPasswordFirebase(auth, credentials.email, credentials.password);
      setError(null); // Limpa qualquer erro anterior em caso de sucesso.
      console.log("Sucesso");
    } catch (error: any) {
      console.error('Erro ao autenticar com e-mail e senha:', error.message);
      setError('Credenciais inválidas. Por favor, tente novamente.'); 
    } finally {
      setLoading(false);
    }
  };

  const signOut: () => Promise<void> = async () => {
    const auth = getAuth();
    try {
      await auth.signOut();
      setError(null);
    } catch (error: any) {
      console.error('Erro no logout:', error.message);
      setError('Erro ao fazer logout. Por favor, tente novamente.');
    }
  };

  return {
    user,
    loading,
    error,
    signUpWithEmailPassword,
    signInWithEmailPassword,
    signOut,
  };
};

export default useAuthentication;
