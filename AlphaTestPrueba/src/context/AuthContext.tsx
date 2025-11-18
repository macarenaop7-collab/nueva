import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCBjUH4zs5vFZ9ruuwlrhgOpAOanI3zHHs",
  authDomain: "alphatest-final.firebaseapp.com",
  projectId: "alphatest-final",
  storageBucket: "alphatest-final.firebasestorage.app",
  messagingSenderId: "509147450646",
  appId: "1:509147450646:web:aa31592c00602849029437"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Crear contexto
interface AuthContextType {
  user: User | null;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: async () => {}
});

// Proveedor del contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}