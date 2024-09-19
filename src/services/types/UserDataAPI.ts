type Category = {
  nome: string;
};

export type UserDataAPI = {
  id: number;
  name: string;
  email: string;
  categoria: Category;
  professionalExperiences: any[]; 
  educations: any[]; 
};