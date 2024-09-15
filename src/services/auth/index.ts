import { api } from "../../api";
import { ResponseLogin } from "../types/response/ResponseLogin";
import { ResponseRegister } from "../types/response/ResponseRegister";

const login = async (email: string, password: string): Promise<ResponseLogin> => {
  try {
    const data = { email, password };

    const dataResponse = await api.post(`/auths/login`, data);
    console.log("RESPONSE DO LOGIN NO ATUSERVICE");
    console.log(dataResponse);

    const response =  {
      token: dataResponse?.data.token,
      message: dataResponse?.data.message,
      user: {
        name: dataResponse?.data.user.name,
        email: dataResponse?.data.user.email,
      },
      error: dataResponse?.data.error,
      status: dataResponse?.status,
    }

    return response;
  } catch (erroException) {
    console.error("Error logging in:", erroException);

    const response =  {
      token: "",
      message: "",
      user: {
        name: "",
        email: "",
      },
      error: erroException,
      status: 400
    }

    return response;
  }
};


const register = async (email: string, password: string): Promise<ResponseRegister> => {
  try {
    const data = { email, password };

    const dataResponse = await api.post(`/auths/login`, data);
    console.log("RESPONSE DO LOGIN NO ATUSERVICE");
    console.log(dataResponse);

    const response =  {
      message: dataResponse?.data.message,
      user: {
        id: dataResponse?.data.user.id,
        name: dataResponse?.data.user.name,
        email: dataResponse?.data.user.email,
      },
      error: dataResponse?.data.error,
      status: dataResponse?.status,
    }

    return response;
  } catch (erroException) {
    console.error("Error logging in:", erroException);

    const response =  {
      message: "",
      user: {
        id: 0,
        name: "",
        email: "",
      },
      error: erroException,
      status: 400
    }

    return response;
  }
};

/*"user": {
    "id": 5,
    "name": "Alek",
    "email": "alek1@gmail.com",
    "password": "$2b$10$.SNjigrgeTymeAw22ZgNVeYhFEuD8/JSAOCYut816EVKNvstydKk6",
    "description": null,
    "categoriaId": 1,
    "createdAt": "2024-09-15T21:03:22.613Z"
  }*/

export const authService = {
  login,
  register
}