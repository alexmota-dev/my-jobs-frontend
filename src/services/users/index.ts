import { api } from "../../api";
import { Experience } from "../types/Experience";
import { Users } from "../types/Users";
import mockUsers from "./mockUsers";

export type DTOCreateUser = {
  name: string;
  email: string;
  description: string;
  category: string;
};

export type DTOUpdateUser = {
  name?: string;
  email?: string;
  description?: string;
  category?: string;
};

const findById = async (id: number) => {
  return new Promise<{
    id: number;
    name: string;
    email: string;
    description: string;
    category: string;
  }>((resolve, reject) => {
    const user = mockUsers.find((user) => user.id === id);
    if (user) {
      resolve(user);
    } else {
      reject(new Error("User not found"));
    }
  });
};

const findAll = async () => {

  const { data } = await api.get(`/users/list`);

  const formattedData: Users[] = data.map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    description: user.description,
    experiences: user.experiences as Experience[],
    category: user.category
  }));

  return formattedData;
};

export const userService = {
  findById,
  findAll,
};
