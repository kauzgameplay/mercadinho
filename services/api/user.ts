import { API_URL } from "./base";
import type { UserData } from "./types";

export const userAPI = {
  getUser: async (
    userId: string
  ): Promise<{ success: boolean; cliente?: UserData; message?: string }> => {
    try {
      const response = await fetch(`${API_URL}/user/${userId}`);
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return { success: false, message: "Erro ao conectar com o servidor" };
    }
  },

  updateUser: async (dados: {
    id: string;
    nome: string;
    email: string;
    telefone?: string;
    cpf?: string;
    endereco?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
  }): Promise<{ success: boolean; message: string; cliente?: UserData }> => {
    try {
      const response = await fetch(`${API_URL}/user/${dados.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return { success: false, message: "Erro ao conectar com o servidor" };
    }
  },
};
