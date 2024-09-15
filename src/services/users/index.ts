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
  return new Promise<
    {
      id: number;
      name: string;
      email: string;
      description: string;
      category: string;
    }[]
  >((resolve) => {
    resolve(mockUsers);
  });
};

export const userService = {
  findById,
  findAll,
};
