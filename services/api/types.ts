export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface ClienteData {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  endereco: string | null;
  createdAt: string;
}

export interface UserData {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  cpf: string | null;
  endereco: string | null;
  cidade: string | null;
  estado: string | null;
  cep: string | null;
  createdAt: string;
  updatedAt: string;
}
