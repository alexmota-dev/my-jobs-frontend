import { api } from "../../api";
import { DTOCreateBook, DTOUpdateBook } from "../dtos";

export const findById = async (id: string) => {
  const response = await api.get(`/book/${id}`);
  return response.data;
};

export const findAll = async () => {
  const response = await api.get("/Book");
  return response.data;
};

export const create = async (book: DTOCreateBook) => {
  const response = await api.post("/book", book);
  return response.data;
};

export const update = async (id: string, book: DTOUpdateBook) => {
  try {
    const response = await api.put(`book/${id}`, book);
    return response;
  } catch (error: unknown) {
    console.error(`Error updating book: ${error as Error}.message}`);
    throw new Error(`Failed to update book`);
  }
};

export const remove = async (id: string) => {
  const response = await api.delete(`/book/${id}`);
  return response;
};
