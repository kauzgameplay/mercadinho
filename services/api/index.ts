import { clienteAPI } from "./clientes";
import { produtosAPI } from "./produtos";
import { categoriasAPI } from "./categorias";
import { userAPI } from "./user";
export { API_URL } from "./base";
export { clienteAPI, produtosAPI, categoriasAPI, userAPI };
export type { ApiResponse, ClienteData, UserData } from "./types";

// Default export keeping the same shape as before
export default {
  clienteAPI,
  produtosAPI,
  categoriasAPI,
  userAPI,
};
