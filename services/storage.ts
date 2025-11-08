import AsyncStorage from "@react-native-async-storage/async-storage";
import { ClienteData } from "./api";

const CLIENTE_KEY = "@santafe:cliente";

// Serviço para gerenciar dados do cliente no AsyncStorage
export const storageService = {
  // Salvar dados do cliente
  saveCliente: async (cliente: ClienteData): Promise<boolean> => {
    try {
      await AsyncStorage.setItem(CLIENTE_KEY, JSON.stringify(cliente));
      return true;
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
      return false;
    }
  },

  // Buscar dados do cliente
  getCliente: async (): Promise<ClienteData | null> => {
    try {
      const data = await AsyncStorage.getItem(CLIENTE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      return null;
    }
  },

  // Remover dados do cliente (logout)
  removeCliente: async (): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem(CLIENTE_KEY);
      return true;
    } catch (error) {
      console.error("Erro ao remover cliente:", error);
      return false;
    }
  },

  // Verificar se cliente está logado
  isLoggedIn: async (): Promise<boolean> => {
    try {
      const cliente = await AsyncStorage.getItem(CLIENTE_KEY);
      return cliente !== null;
    } catch (error) {
      console.error("Erro ao verificar login:", error);
      return false;
    }
  },
};

export default storageService;
