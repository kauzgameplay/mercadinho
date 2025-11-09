import { API_URL } from "./base";

export const categoriasAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/categorias`);
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      return { success: false, message: "Erro ao conectar com o servidor" };
    }
  },
};
