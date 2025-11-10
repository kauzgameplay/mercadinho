# 🔧 Como Funcionam as Variáveis de Ambiente no Expo

## 📱 Cenários de Uso

### 1️⃣ Expo Go (Desenvolvimento com `npm start`)

**Como funciona:**

- ✅ O Expo **CARREGA** automaticamente o arquivo `.env`
- ✅ Variáveis com `EXPO_PUBLIC_` são acessíveis no app
- ✅ Funciona perfeitamente com `expo-constants`

**Arquivo usado:**

```
📁 mercadinho/
  └── .env  ← Este arquivo é lido
```

**Comando:**

```bash
npm start
# ou
npx expo start
```

**Resultado:**

- ✅ `config.apiUrl` = valor do `.env`
- ✅ `config.environment` = "development"
- ✅ `config.debug` = true
- ✅ Logs habilitados

---

### 2️⃣ EAS Update (Deploy OTA - Over The Air)

**Como funciona:**

- ⚠️ EAS Update **NÃO COMPILA** o código novamente
- ⚠️ Usa as variáveis que estavam no último **EAS BUILD**
- ⚠️ O `.env` é **IGNORADO** no update

**O que você fez:**

```bash
npx eas update --branch preview --message "ajuste finalização de pedidos"
```

**Problema:**

- ❌ Se o build anterior não tinha as variáveis configuradas
- ❌ O update não vai trazer as novas variáveis
- ⚠️ Vai usar valores padrão do código (fallback)

**Solução:**

- Precisa fazer um novo **EAS BUILD** (não update)
- Ou configurar variáveis no `app.json`

---

### 3️⃣ EAS Build (Build Completo para APK/IPA)

**Como funciona:**

- ⚠️ EAS Build **NÃO LÊ** arquivos `.env` automaticamente
- ✅ Você precisa configurar de 3 formas possíveis

#### **Opção A: Usar app.json (Recomendado para este projeto)**

Adicionar variáveis diretamente no `app.json`:

```json
{
  "expo": {
    "extra": {
      "EXPO_PUBLIC_API_URL": "https://santafe-dashboard.vercel.app/api",
      "EXPO_PUBLIC_ENV": "production",
      "EXPO_PUBLIC_DEBUG": "false",
      "EXPO_PUBLIC_ENABLE_LOGS": "false",
      "EXPO_PUBLIC_API_TIMEOUT": "15000"
    }
  }
}
```

**Vantagens:**

- ✅ Funciona em Expo Go
- ✅ Funciona em EAS Update
- ✅ Funciona em EAS Build
- ✅ Simples e direto

**Desvantagens:**

- ⚠️ Variáveis ficam commitadas no Git
- ⚠️ Não é ideal para secrets sensíveis

---

#### **Opção B: EAS Secrets (Melhor para produção)**

Configurar variáveis como secrets no EAS:

```bash
# Adicionar secrets
eas secret:create --scope project --name EXPO_PUBLIC_API_URL --value "https://santafe-dashboard.vercel.app/api" --type string

eas secret:create --scope project --name EXPO_PUBLIC_ENV --value "production" --type string

eas secret:create --scope project --name EXPO_PUBLIC_DEBUG --value "false" --type string

eas secret:create --scope project --name EXPO_PUBLIC_ENABLE_LOGS --value "false" --type string

eas secret:create --scope project --name EXPO_PUBLIC_API_TIMEOUT --value "15000" --type string

# Listar secrets
eas secret:list
```

**Vantagens:**

- ✅ Não fica no Git
- ✅ Seguro para produção
- ✅ Diferente por ambiente (preview/production)

**Desvantagens:**

- ⚠️ Não funciona no Expo Go (precisa de build)
- ⚠️ Mais complexo de configurar

---

#### **Opção C: eas.json + dotenv (Híbrido)**

Instalar plugin:

```bash
npm install --save-dev dotenv-cli
```

Criar `eas.json`:

```json
{
  "build": {
    "development": {
      "env": {
        "EXPO_PUBLIC_API_URL": "https://santafe-dashboard.vercel.app/api",
        "EXPO_PUBLIC_ENV": "development",
        "EXPO_PUBLIC_DEBUG": "true",
        "EXPO_PUBLIC_ENABLE_LOGS": "true",
        "EXPO_PUBLIC_API_TIMEOUT": "10000"
      }
    },
    "preview": {
      "env": {
        "EXPO_PUBLIC_API_URL": "https://santafe-dashboard.vercel.app/api",
        "EXPO_PUBLIC_ENV": "staging",
        "EXPO_PUBLIC_DEBUG": "false",
        "EXPO_PUBLIC_ENABLE_LOGS": "true",
        "EXPO_PUBLIC_API_TIMEOUT": "15000"
      }
    },
    "production": {
      "env": {
        "EXPO_PUBLIC_API_URL": "https://santafe-dashboard.vercel.app/api",
        "EXPO_PUBLIC_ENV": "production",
        "EXPO_PUBLIC_DEBUG": "false",
        "EXPO_PUBLIC_ENABLE_LOGS": "false",
        "EXPO_PUBLIC_API_TIMEOUT": "15000"
      }
    }
  }
}
```

**Vantagens:**

- ✅ Controle fino por perfil
- ✅ Fica no Git (não é secret)
- ✅ Fácil de gerenciar

**Desvantagens:**

- ⚠️ Não funciona no Expo Go
- ⚠️ Precisa recriar build para mudar

---

## 🎯 Recomendação para Seu Projeto

### ✅ Melhor Solução: **app.json + Valores Padrão**

Como suas variáveis **NÃO SÃO SECRETS** (URL pública), use `app.json`:

1. **Adicionar ao app.json** (ver próximo arquivo)
2. **Manter .env para desenvolvimento local**
3. **Valores padrão no código servem como fallback**

---

## 📋 Checklist de Configuração

### ✅ Para Desenvolvimento (Expo Go)

- [x] Criar `.env` com variáveis
- [x] Adicionar `expo-constants` ao projeto
- [x] Configurar `app.config.ts` para ler variáveis
- [ ] Testar: `npm start` → abrir no Expo Go

### ✅ Para Build de Produção (EAS Build)

- [ ] Adicionar variáveis ao `app.json` (recomendado)
- [ ] OU configurar `eas.json` com variáveis
- [ ] OU usar `eas secret:create` para cada variável
- [ ] Fazer novo build: `eas build --platform android --profile preview`

### ✅ Para Updates OTA (EAS Update)

- [ ] Garantir que o build base tem as variáveis configuradas
- [ ] Updates vão herdar variáveis do build
- [ ] Não precisa reconfigurar a cada update

---

## 🔍 Como Verificar se Está Funcionando

### No Expo Go:

```bash
npm start
```

No app, veja os logs:

```
[APP] Configuração carregada: {
  environment: 'development',
  apiUrl: 'https://santafe-dashboard.vercel.app/api',
  debug: true
}
```

### No Build:

Adicione no código (temporário):

```typescript
// App.tsx ou index.tsx
import { config } from "./config/app.config";

console.log("🔧 Config:", JSON.stringify(config, null, 2));
```

Depois do build, abra o app e veja o log no console.

---

## 🚨 Problemas Comuns

### Problema 1: "Variáveis undefined no Expo Go"

**Causa:** Arquivo `.env` não foi carregado  
**Solução:**

```bash
npx expo start --clear
```

### Problema 2: "Variáveis undefined no Build"

**Causa:** EAS não leu as variáveis  
**Solução:** Adicionar ao `app.json` ou usar `eas secret`

### Problema 3: "Update não aplica novas variáveis"

**Causa:** EAS Update não recompila código  
**Solução:** Fazer novo build completo com `eas build`

---

## 📚 Comandos Úteis

```bash
# Desenvolvimento
npm start                    # Expo Go com .env
npx expo start --clear       # Limpar cache

# Build
eas build --platform android --profile preview    # Build preview
eas build --platform android --profile production # Build production
eas build --platform ios --profile production     # Build iOS

# Update (OTA)
eas update --branch preview --message "descrição"
eas update --branch production --message "descrição"

# Secrets (se usar Opção B)
eas secret:create --scope project --name VAR_NAME --value "value"
eas secret:list
eas secret:delete --name VAR_NAME
```

---

## ✅ Próximos Passos

1. **Adicionar variáveis ao app.json** (arquivo a seguir)
2. **Fazer novo EAS Build**
3. **Testar no app instalado**
4. **Depois pode fazer EAS Updates normalmente**
