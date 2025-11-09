import { API_URL } from "./base";

export const produtosAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/produtos`);
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      return { success: false, message: "Erro ao conectar com o servidor" };
    }
  },

  getByCategoria: async (categoriaId: string) => {
    try {
      const response = await fetch(`${API_URL}/produtos`);
      const data = await response.json();
      if (data.success) {
        const produtosFiltrados = data.produtos.filter(
          (p: any) => p.categoria.id === categoriaId
        );
        return { success: true, produtos: produtosFiltrados };
      }
      return data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      return { success: false, message: "Erro ao conectar com o servidor" };
    }
  },
};
