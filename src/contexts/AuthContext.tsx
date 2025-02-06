
import { createContext, useContext, ReactNode } from "react";
import { useUser, useAuth as useClerkAuth, SignIn, SignUp } from "@clerk/clerk-react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerkAuth();

  const login = async () => {
    // Handled by Clerk UI Components
  };

  const loginWithGoogle = async () => {
    // Handled by Clerk UI Components
  };

  const signup = async () => {
    // Handled by Clerk UI Components
  };

  const logout = async () => {
    await signOut();
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated: !!isSignedIn, 
        user, 
        login, 
        loginWithGoogle, 
        signup, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
