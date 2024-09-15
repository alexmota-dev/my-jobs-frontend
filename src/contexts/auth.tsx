import React, { createContext, useEffect, useState } from "react";
import { UserLogin } from "../services/types/UserLogin";
import { api } from "../api";
import { UserRegister } from "../services/types/UserRegister";
import { defaults } from "./apiDefaults";
import { authService } from "../services/auth";
import { ResponseLogin } from "../services/types/response/ResponseLogin";
import { UserLoginResponse } from "../services/types/UserLoginResponse";
import { ResponseRegister } from "../services/types/response/ResponseRegister";

interface AuthContextData {
  signed: boolean;
  user: object | null;
  login: (userData: UserLogin) => Promise<ResponseLogin | void>;
  register: (userData: UserRegister) => Promise<ResponseRegister |void>;
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
  const [user, setUser] = useState<UserLoginResponse | null>(null);

  useEffect(() => {
    const storagedUser = sessionStorage.getItem("@App:user");
    const storagedToken = sessionStorage.getItem("@App:token");

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  async function login(userData: UserLogin) {
    const response = await authService.login(userData.email, userData.password);

    if (response.status && response.status !== 200) {
      return response;
    }

    if (isResponseLogin(response)) {
      if (response.user) {
        setUser(response.user);
        api.defaults.headers.Authorization = `Bearer ${response.token}`;

        sessionStorage.setItem("@App:user", JSON.stringify(response.user));
      }
    } else {
      // Handle the case when the response is not of type ResponseLogin
    }
  }

  function isResponseLogin(response: any): response is ResponseLogin {
    return "token" in response;
  }

  async function register(userData: UserRegister) {
    const response = await api.post("/users/register", userData);

    console.log("RESPONSE REGISTER");
    console.log(response);

    if (response.status && response.status !== 201) {
      return response;
    }

    if (isResponseRegister(response)) {
      if (response) {
        return response;
      }
    }
  }

  function isResponseRegister(response: any): response is ResponseRegister {
    return "user" in response;
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
