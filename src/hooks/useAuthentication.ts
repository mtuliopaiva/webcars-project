import { useState, useEffect } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

interface EmailPasswordCredentials {
  email: string;
  password: string;
}

export interface AuthHook {
  user: User | null;
  loading: boolean;
  signInWithEmailPassword: (credentials: EmailPasswordCredentials) => Promise<void>;
  signOut: () => Promise<void>;
}

const useAuthentication = (): AuthHook => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const auth = getAuth();

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

  const signInWithEmailPassword = async (credentials: EmailPasswordCredentials) => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPasswordFirebase(auth, credentials.email, credentials.password);
    } catch (error: any) {
      console.error('Erro ao autenticar com e-mail e senha:', error.message);
    }
  };

  const signOut = async () => {
    const auth = getAuth();
    try {
      await auth.signOut();
    } catch (error: any) {
      console.error('Erro no logout:', error.message);
    }
  };

  return {
    user,
    loading,
    signInWithEmailPassword,
    signOut,
  };
};

export default useAuthentication;
