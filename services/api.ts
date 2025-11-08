// Configuração da API
// Tenta usar a API da Vercel primeiro, depois fallback para local
const API_URLS = [
  "https://santafe-dashboard.vercel.app/api", // API na Vercel (produção)
  "http://192.168.56.1:3000/api", // API local (desenvolvimento)
];

let currentApiUrl = API_URLS[0];

// Função para testar conectividade e escolher a melhor API
const testApiConnection = async (): Promise<string> => {
  for (const url of API_URLS) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 segundos de timeout

      const response = await fetch(`${url}/categorias`, {
        method: "GET",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        console.log(`✓ API disponível: ${url}`);
        return url;
      }
    } catch {
      console.log(`✗ API indisponível: ${url}`);
      continue;
    }
  }
  // Se nenhuma funcionar, usa a primeira (Vercel)
  return API_URLS[0];
};

// Inicializa a conexão
testApiConnection().then((url) => {
  currentApiUrl = url;
  console.log(`🔗 Usando API: ${currentApiUrl}`);
});

// Helper para fazer requisições com fallback
const fetchWithFallback = async (
  endpoint: string,
  options?: RequestInit
): Promise<Response> => {
  // Tenta com a URL atual
  try {
    const response = await fetch(`${currentApiUrl}${endpoint}`, options);
    if (response.ok) {
      return response;
    }
  } catch {
    console.log(`Erro na API principal, tentando alternativa...`);
  }

  // Se falhar, tenta com as outras URLs
  for (const url of API_URLS) {
    if (url === currentApiUrl) continue;

    try {
      const response = await fetch(`${url}${endpoint}`, options);
      if (response.ok) {
        currentApiUrl = url; // Atualiza para usar essa URL daqui pra frente
        console.log(`✓ Mudando para API: ${currentApiUrl}`);
        return response;
      }
    } catch {
      continue;
    }
  }

  // Se tudo falhar, lança erro
  throw new Error("Não foi possível conectar a nenhuma API");
};

export interface ClienteData {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  endereco: string | null;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Serviço de autenticação de clientes
export const clienteAPI = {
  // Cadastro de novo cliente
  register: async (dados: {
    nome: string;
    email: string;
    senha: string;
    telefone?: string;
    endereco?: string;
  }): Promise<{ success: boolean; message: string; cliente?: ClienteData }> => {
    try {
      const response = await fetchWithFallback("/clientes/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      return {
        success: false,
        message: "Erro ao conectar com o servidor",
      };
    }
  },

  // Login de cliente
  login: async (
    email: string,
    senha: string
  ): Promise<{ success: boolean; message: string; cliente?: ClienteData }> => {
    try {
      const response = await fetchWithFallback("/clientes/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return {
        success: false,
        message: "Erro ao conectar com o servidor",
      };
    }
  },

  // Buscar perfil do cliente
  getProfile: async (
    clienteId: string
  ): Promise<{ success: boolean; cliente?: ClienteData; message?: string }> => {
    try {
      const response = await fetchWithFallback(
        `/clientes/profile?id=${clienteId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      return {
        success: false,
        message: "Erro ao conectar com o servidor",
      };
    }
  },

  // Atualizar perfil do cliente
  updateProfile: async (dados: {
    id: string;
    nome?: string;
    telefone?: string;
    endereco?: string;
    senhaAtual?: string;
    novaSenha?: string;
  }): Promise<{ success: boolean; message: string; cliente?: ClienteData }> => {
    try {
      const response = await fetchWithFallback("/clientes/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      return {
        success: false,
        message: "Erro ao conectar com o servidor",
      };
    }
  },

  // Validar se email já existe
  validateEmail: async (
    email: string
  ): Promise<{ success: boolean; exists: boolean; message: string }> => {
    try {
      const response = await fetchWithFallback("/clientes/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      return data;
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

// Serviço de produtos
export const produtosAPI = {
  // Listar todos os produtos
  getAll: async () => {
    try {
      const response = await fetchWithFallback("/produtos");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      return {
        success: false,
        message: "Erro ao conectar com o servidor",
      };
    }
  },

  // Buscar produtos por categoria
  getByCategoria: async (categoriaId: string) => {
    try {
      const response = await fetchWithFallback("/produtos");
      const data = await response.json();

      if (data.success) {
        // Filtra produtos pela categoria
        const produtosFiltrados = data.produtos.filter(
          (p: any) => p.categoria.id === categoriaId
        );
        return {
          success: true,
          produtos: produtosFiltrados,
        };
      }
      return data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      return {
        success: false,
        message: "Erro ao conectar com o servidor",
      };
    }
  },
};

// Serviço de categorias
export const categoriasAPI = {
  // Listar todas as categorias
  getAll: async () => {
    try {
      const response = await fetchWithFallback("/categorias");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      return {
        success: false,
        message: "Erro ao conectar com o servidor",
      };
    }
  },
};

export default {
  clienteAPI,
  produtosAPI,
  categoriasAPI,
};
