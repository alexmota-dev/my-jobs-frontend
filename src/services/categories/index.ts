import { api } from "../../api";
import { Category } from "../types/Category";

const categoriesMock: Category[] = [
  {
    id: 1,
    nome: "Tecnologia"
  },
  {
    id: 2,
    nome: "Culinária"
  },
  {
    id: 3,
    nome: "Saúde"
  },
]

const findAll = async () => {
 const { data } = await api.get("/categories/list");

  // Mapeando os dados para garantir que estão no formato correto
  const formattedData: Category[] = data.categories.map((category: any) => ({
    id: category.id,
    nome: category.nome,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  }));

  return formattedData;
};

export const categoryService = {
  categoriesMock,
  findAll
}