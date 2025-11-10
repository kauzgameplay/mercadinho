import Constants from "expo-constants";

/**
 * Configuração centralizada do app
 * Todas as variáveis de ambiente devem ser acessadas através deste arquivo
 */

interface AppConfig {
  apiUrl: string;
  environment: "development" | "staging" | "production";
  debug: boolean;
  enableLogs: boolean;
  apiTimeout: number;
}

/**
 * Obtém valor de variável de ambiente com fallback
 */
function getEnvVar(key: string, defaultValue: string): string {
  return Constants.expoConfig?.extra?.[key] || process.env[key] || defaultValue;
}

/**
 * Configuração do app
 */
export const config: AppConfig = {
  // URL da API (HTTPS obrigatório em produção!)
  apiUrl: getEnvVar(
    "EXPO_PUBLIC_API_URL",
    "https://santafe-dashboard.vercel.app/api"
  ),

  // Ambiente atual
  environment: getEnvVar(
    "EXPO_PUBLIC_ENV",
    "development"
  ) as AppConfig["environment"],

  // Debug mode
  debug: getEnvVar("EXPO_PUBLIC_DEBUG", "false") === "true",

  // Logs habilitados
  enableLogs: getEnvVar("EXPO_PUBLIC_ENABLE_LOGS", "false") === "true",

  // Timeout de requisições
  apiTimeout: parseInt(getEnvVar("EXPO_PUBLIC_API_TIMEOUT", "10000"), 10),
};

/**
 * Verifica se está em produção
 */
export const isProduction = config.environment === "production";

/**
 * Verifica se está em desenvolvimento
 */
export const isDevelopment = config.environment === "development";

/**
 * Valida configuração
 */
export function validateConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Valida URL da API
  if (!config.apiUrl) {
    errors.push("EXPO_PUBLIC_API_URL não está configurada");
  } else if (!config.apiUrl.startsWith("https://") && isProduction) {
    errors.push("API URL deve usar HTTPS em produção");
  }

  // Valida timeout
  if (config.apiTimeout < 1000) {
    errors.push("API timeout deve ser maior que 1000ms");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Logger condicional (só funciona se enableLogs = true)
 */
export const logger = {
  log: (...args: unknown[]) => {
    if (config.enableLogs) {
      console.log("[APP]", ...args);
    }
  },
  error: (...args: unknown[]) => {
    if (config.enableLogs) {
      console.error("[APP ERROR]", ...args);
    }
  },
  warn: (...args: unknown[]) => {
    if (config.enableLogs) {
      console.warn("[APP WARN]", ...args);
    }
  },
  debug: (...args: unknown[]) => {
    if (config.debug) {
      console.log("[DEBUG]", ...args);
    }
  },
};

// Valida configuração no carregamento
const validation = validateConfig();
if (!validation.valid) {
  console.error("⚠️  Erros na configuração do app:");
  validation.errors.forEach((error) => console.error(`  - ${error}`));
}

// Log de inicialização
if (config.enableLogs) {
  logger.log("Configuração carregada:", {
    environment: config.environment,
    apiUrl: config.apiUrl,
    debug: config.debug,
  });
}

export default config;
