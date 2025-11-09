import { API_URL } from "./base";
import type { ClienteData } from "./types";

export const clienteAPI = {
  register: async (dados: {
    nome: string;
    email: string;
    senha: string;
    telefone?: string;
    endereco?: string;
  }): Promise<{ success: boolean; message: string; cliente?: ClienteData }> => {
    try {
      const response = await fetch(`${API_URL}/clientes/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      return { success: false, message: "Erro ao conectar com o servidor" };
    }
  },

  login: async (
    email: string,
    senha: string
  ): Promise<{ success: boolean; message: string; cliente?: ClienteData }> => {
    try {
      const response = await fetch(`${API_URL}/clientes/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return { success: false, message: "Erro ao conectar com o servidor" };
    }
  },

  getProfile: async (
    clienteId: string
  ): Promise<{ success: boolean; cliente?: ClienteData; message?: string }> => {
    try {
      const response = await fetch(
        `${API_URL}/clientes/profile?id=${clienteId}`
      );
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      return { success: false, message: "Erro ao conectar com o servidor" };
    }
  },

  updateProfile: async (dados: {
    id: string;
    nome?: string;
    telefone?: string;
    endereco?: string;
    senhaAtual?: string;
    novaSenha?: string;
  }): Promise<{ success: boolean; message: string; cliente?: ClienteData }> => {
    try {
      const response = await fetch(`${API_URL}/clientes/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      return { success: false, message: "Erro ao conectar com o servidor" };
    }
  },

  validateEmail: async (
    email: string
  ): Promise<{ success: boolean; exists: boolean; message: string }> => {
    try {
      const response = await fetch(`${API_URL}/clientes/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao validar email:", error);
      return {
        success: false,
        exists: false,
        message: "Erro ao conectar com o servidor",
      };
    }
  },
};
