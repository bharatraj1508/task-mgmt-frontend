"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { User } from "@/interface/user";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User;

  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("T");
    console.log(token);

    if (token) {
      //   try {
      //     const decodedToken: any = jwt.decode(token);
      //     const currentTime = Math.floor(Date.now() / 1000);

      //     if (
      //       decodedToken &&
      //       decodedToken.exp &&
      //       decodedToken.exp > currentTime
      //     ) {
      //       setIsAuthenticated(true);
      //       setUser(decodedToken);
      //     } else {
      //       throw new Error("Token expired");
      //     }
      //   } catch (error) {
      //     console.error("Invalid token", error);
      //     router.push("/login");
      //   }
      setIsAuthenticated(true);
    } else {
      router.push("/login");
    }
  }, [router]);

  //   const login = (token: string) => {
  //     localStorage.setItem("T", token);
  //     const decodedToken: any = jwt.decode(token);
  //     setIsAuthenticated(true);
  //     setUser(decodedToken);
  //   };

  const logout = () => {
    localStorage.removeItem("T");
    setIsAuthenticated(false);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
