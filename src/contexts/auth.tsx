import React, { createContext, useEffect, useState } from "react";
import { UserLogin } from "../services/types/UserLogin";
import { api } from "../api";
import { UserRegister } from "../services/types/UserRegister";
import { defaults } from "./apiDefaults";

interface AuthContextData {
  signed: boolean;
  user: object | null;
  login: (userData: UserLogin) => Promise<void>;
  register: (userData: UserRegister) => Promise<void>;
  logout: () => void;
  // register: (name:string, email: string, password:string) => Promise<any>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    const storagedUser = sessionStorage.getItem("@App:user");
    const storagedToken = sessionStorage.getItem("@App:token");

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  async function login(userData: UserLogin) {
    // const response = await api.post("/auth/login", userData);

    //Remover responseMock apos integração
    const responseMock = new Promise<{ data: any; status: number }>((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: {
              id: 1,
              email: userData.email,
              password: userData.password
            },
            token: "test"
          },
          status: 200
        });
      }, 1000);
    });

    const responseMock2 = await responseMock;

    if (responseMock2.status !== 200) return responseMock2.data;
    if (responseMock2.status === 200 && responseMock2.data) {
      setUser(responseMock2.data.user);
      api.defaults.headers.Authorization = `Bearer ${responseMock2.data.token}`;

      sessionStorage.setItem("@App:user", JSON.stringify(responseMock2.data.user));
      sessionStorage.setItem("@App:token", responseMock2.data.token);
    }
  }

  async function register(userData: UserRegister) {
  //const response = await api.post("/auth/register", userData);

  console.log("userData - register", userData);

  const responseMock = new Promise<{ data: any; status: number }>((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          user: {
            id: 1,
            name: userData.name,
            email: userData.email,
            password: userData.password
          },
          token: "test"
        },
        status: 200
      });
    }, 1000);
  });

  const responseMock2 = await responseMock;

  if (responseMock2.status !== 200) return responseMock2.data;
  if (responseMock2.status === 200 && responseMock2.data) {
    setUser(responseMock2.data.user);
    api.defaults.headers.Authorization = `Bearer ${responseMock2.data.token}`;

    sessionStorage.setItem("@App:user", JSON.stringify(responseMock2.data.user));
    sessionStorage.setItem("@App:token", responseMock2.data.token);
  }
}

  function logout() {
    setUser(null);
    sessionStorage.removeItem("@App:user");
    sessionStorage.removeItem("@App:token");
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
