import { api } from "../../api";
import { UserDataAPI } from "../types/UserDataAPI";
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

const findAllUsers = async () => {
  const { data } = await api.get(`/users/list`);

  const formattedData: Users[] = data.users.map((user: UserDataAPI) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    experiences: user.professionalExperiences,
    Category: user.categoria,
  }));

  return formattedData;
};

const findFrindesUsers = async () => {
  const { data } = await api.get(`/friends/friends`);

  console.log("findFrindesUsers", data);

  const formattedData: Users[] = data.users.map((user: UserDataAPI) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    experiences: user.professionalExperiences,
    Category: user.categoria,
  }));

  return formattedData;
};

const findUsersRecomendation = async (id: number) => {
  const { data } = await api.get(`/graph/recommendations/${id}`);

  console.log("findUsersRecomendation", data);


  const formattedData: Users[] = data.users.map((user: UserDataAPI) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    experiences: user.professionalExperiences,
    Category: user.categoria,
  }));

  return formattedData;
};


const findReceivedFriends = async (id: number) => {
  const { data } = await api.get(`/graph/recommendations/${id}`);

  console.log("BUSCANDO PEDIDOS DE AMIZADE", data);

  const formattedData: Users[] = data.users.map((user: UserDataAPI) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    experiences: user.professionalExperiences,
    Category: user.categoria,
  }));

  return formattedData;
};

const acceptFriend = async (userId: number, friendId: number) => {
  const body = {
    userId: userId,
    friendId: friendId,
  };

  const { data } = await api.post(`/friends/aceept`, body);

  console.log("acceptFriend", data);

  const formattedData: Users[] = data.users.map((user: UserDataAPI) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    experiences: user.professionalExperiences,
    Category: user.categoria,
  }));

  return formattedData;
};

const friendshipRequest = async (userId: number, friendId: number) => {
  const body = {
    userId: userId,
    friendId: friendId,
  };

  const { data } = await api.post(`/friends/request`, body);

  console.log("friendshipRequest", data);

  return data;
};

export const userService = {
  findById,
  findAllUsers,
  findFrindesUsers,
  findUsersRecomendation,
  findReceivedFriends,
  acceptFriend,
  friendshipRequest
};
