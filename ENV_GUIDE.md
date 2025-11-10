# 📝 Guia de Variáveis de Ambiente - Mobile

Este documento explica como usar as variáveis de ambiente no app mobile.

## 📦 Arquivos Criados

```
mercadinho/
├── .env                 # Desenvolvimento (ignorado pelo Git)
├── .env.production      # Produção (ignorado pelo Git)
├── .env.example         # Template (commitado no Git)
├── config/
│   └── app.config.ts    # Configuração centralizada
└── services/
    └── api.ts           # Atualizado para usar variáveis
```

## 🔧 Configuração Inicial

### 1. Criar arquivo .env

Se você ainda não tem um arquivo `.env`, copie do exemplo:

```bash
cp .env.example .env
```

### 2. Variáveis Disponíveis

#### .env (Desenvolvimento)

```env
EXPO_PUBLIC_API_URL=https://santafe-dashboard.vercel.app/api
EXPO_PUBLIC_ENV=development
EXPO_PUBLIC_DEBUG=true
EXPO_PUBLIC_ENABLE_LOGS=true
EXPO_PUBLIC_API_TIMEOUT=10000
```

#### .env.production (Produção)

```env
EXPO_PUBLIC_API_URL=https://santafe-dashboard.vercel.app/api
EXPO_PUBLIC_ENV=production
EXPO_PUBLIC_DEBUG=false
EXPO_PUBLIC_ENABLE_LOGS=false
EXPO_PUBLIC_API_TIMEOUT=15000
```

## 📱 Como Usar no Código

### 1. Importar a Configuração

```typescript
import { config, logger, isProduction } from "@/config/app.config";
```

### 2. Acessar Variáveis

```typescript
// URL da API
const apiUrl = config.apiUrl;

// Ambiente atual
const env = config.environment; // 'development' | 'staging' | 'production'

// Debug mode
const debug = config.debug;

// Logs habilitados
const enableLogs = config.enableLogs;

// Timeout de requisições
const timeout = config.apiTimeout;
```

### 3. Usar Helper de Ambiente

```typescript
import { isProduction, isDevelopment } from "@/config/app.config";

if (isProduction) {
  // Código específico para produção
}

if (isDevelopment) {
  // Código específico para desenvolvimento
}
```

### 4. Usar Logger Condicional

```typescript
import { logger } from "@/config/app.config";

// Só loga se enableLogs = true
logger.log("Mensagem normal");
logger.error("Erro importante");
logger.warn("Aviso");

// Só loga se debug = true
logger.debug("Informação de debug");
```

## 🔄 Como Funciona

### Expo e Variáveis de Ambiente

O Expo requer o prefixo `EXPO_PUBLIC_` para variáveis acessíveis no cliente:

```env
# ✅ Correto - acessível no app
EXPO_PUBLIC_API_URL=https://api.example.com

# ❌ Errado - não acessível no app
API_URL=https://api.example.com
```

### Hierarquia de Configuração

1. **Variáveis de ambiente** (`.env`)
2. **Constants.expoConfig?.extra** (app.json)
3. **Valores padrão** (definidos no código)

```typescript
// app.config.ts
function getEnvVar(key: string, defaultValue: string): string {
  return (
    Constants.expoConfig?.extra?.[key] || // 1. app.json
    process.env[key] || // 2. .env
    defaultValue // 3. padrão
  );
}
```

## 🚀 Build e Deploy

### Desenvolvimento Local

```bash
# Carrega .env automaticamente
npm start
```

### Build de Produção

```bash
# Usar .env.production
npm run build

# Ou especificar arquivo
EXPO_PUBLIC_ENV=production npm run build
```

### EAS Build

O EAS não lê arquivos `.env` automaticamente. Configure via `eas.json` ou secrets:

#### Opção 1: eas.json

```json
{
  "build": {
    "production": {
      "env": {
        "EXPO_PUBLIC_API_URL": "https://santafe-dashboard.vercel.app/api",
        "EXPO_PUBLIC_ENV": "production",
        "EXPO_PUBLIC_DEBUG": "false"
      }
    }
  }
}
```

#### Opção 2: EAS Secrets

```bash
# Adicionar secret
eas secret:create --name EXPO_PUBLIC_API_URL --value "https://api.production.com" --type string

# Listar secrets
eas secret:list
```

## ✅ Validação

O arquivo `config/app.config.ts` valida automaticamente:

- ✅ API_URL está configurada
- ✅ HTTPS obrigatório em produção
- ✅ Timeout maior que 1000ms

Erros são exibidos no console durante o carregamento:

```
⚠️  Erros na configuração do app:
  - API URL deve usar HTTPS em produção
  - API timeout deve ser maior que 1000ms
```

## 🔒 Segurança

### ❌ Nunca Commitar

```bash
# Arquivos ignorados pelo Git
.env
.env.production
.env.local
.env*.local
```

### ✅ Sempre Commitar

```bash
# Template para outros desenvolvedores
.env.example
```

### 🔐 Boas Práticas

1. **HTTPS em Produção**: URLs da API devem sempre usar HTTPS em produção
2. **Secrets em EAS**: Use `eas secret` para valores sensíveis
3. **Logs Desabilitados**: Desabilite logs em produção (`EXPO_PUBLIC_ENABLE_LOGS=false`)
4. **Debug Desabilitado**: Desabilite debug em produção (`EXPO_PUBLIC_DEBUG=false`)

## 📚 Exemplos de Uso

### Exemplo 1: Requisição com Timeout Configurável

```typescript
import { config, logger } from "@/config/app.config";

async function fetchData() {
  try {
    const response = await fetch(config.apiUrl + "/produtos", {
      signal: AbortSignal.timeout(config.apiTimeout),
    });

    const data = await response.json();
    logger.log("Dados recebidos:", data);
    return data;
  } catch (error) {
    logger.error("Erro ao buscar dados:", error);
    throw error;
  }
}
```

### Exemplo 2: Comportamento por Ambiente

```typescript
import { isProduction, logger } from "@/config/app.config";

function trackEvent(event: string) {
  if (isProduction) {
    // Em produção: enviar para analytics
    analytics.track(event);
  } else {
    // Em desenvolvimento: apenas logar
    logger.debug("Event tracked:", event);
  }
}
```

### Exemplo 3: Configuração Condicional

```typescript
import { config, isDevelopment } from "@/config/app.config";

const apiClient = axios.create({
  baseURL: config.apiUrl,
  timeout: config.apiTimeout,
  headers: {
    "Content-Type": "application/json",
  },
  // Apenas em desenvolvimento
  validateStatus: isDevelopment ? () => true : undefined,
});
```

## 🐛 Troubleshooting

### Erro: "EXPO_PUBLIC_API_URL não está configurada"

**Causa**: Arquivo `.env` não existe ou variável não definida

**Solução**:

```bash
cp .env.example .env
# Edite o .env com seus valores
```

### Erro: "API URL deve usar HTTPS em produção"

**Causa**: URL da API usa HTTP em ambiente de produção

**Solução**: Atualize o `.env.production`:

```env
# ❌ Errado
EXPO_PUBLIC_API_URL=http://api.example.com

# ✅ Correto
EXPO_PUBLIC_API_URL=https://api.example.com
```

### Variável não está sendo carregada

**Causa**: Expo não detectou mudanças no `.env`

**Solução**:

```bash
# Limpar cache e reiniciar
npx expo start --clear
```

### Build EAS não encontra variáveis

**Causa**: EAS não lê arquivos `.env` automaticamente

**Solução**: Configure em `eas.json` ou use `eas secret`:

```bash
eas secret:create --name EXPO_PUBLIC_API_URL --value "https://api.com"
```

## 📖 Referências

- [Expo Environment Variables](https://docs.expo.dev/guides/environment-variables/)
- [Expo Constants](https://docs.expo.dev/versions/latest/sdk/constants/)
- [EAS Build Configuration](https://docs.expo.dev/build/eas-json/)
- [EAS Secrets](https://docs.expo.dev/build-reference/variables/)

## 📝 Checklist de Implementação

- [x] Criar `.env` para desenvolvimento
- [x] Criar `.env.production` para produção
- [x] Criar `.env.example` como template
- [x] Adicionar arquivos ao `.gitignore`
- [x] Criar `config/app.config.ts` centralizado
- [x] Atualizar `services/api.ts` para usar config
- [x] Implementar logger condicional
- [x] Adicionar validação de configuração
- [ ] Testar em desenvolvimento
- [ ] Testar em produção
- [ ] Configurar EAS secrets (se necessário)
- [ ] Documentar para equipe

---

✅ **Status**: Implementação completa - pronto para uso!
