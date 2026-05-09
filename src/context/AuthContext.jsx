import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  observeAuth,
  getUserProfile,
  logout as logoutService
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe = observeAuth(
      async (firebaseUser) => {
        if (!firebaseUser) {
          setCurrentUser(null);
          setLoading(false);
          return;
        }

        const profile =
          await getUserProfile(firebaseUser.uid);

        setCurrentUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          ...profile,
        });

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  async function logout() {
  try {
    await logoutService();
  } catch (error) {
    console.error(error);
  }
}

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}