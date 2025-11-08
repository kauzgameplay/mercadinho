# 📱 Integração App Mobile com Backend

## 🚀 Instalação de Dependências

Execute o comando abaixo na pasta do app mobile (`mercadinho`):

```bash
npm install @react-native-async-storage/async-storage
```

ou

```bash
npx expo install @react-native-async-storage/async-storage
```

## ⚙️ Configuração

### 1. Descubra o IP da sua máquina

**Windows:**

```bash
ipconfig
```

Procure por "Endereço IPv4" (ex: 192.168.1.100)

**Mac/Linux:**

```bash
ifconfig
```

Procure pelo endereço IP na interface de rede (ex: 192.168.1.100)

### 2. Atualize o arquivo de configuração da API

Abra o arquivo `services/api.ts` e altere a linha:

```typescript
const API_URL = "http://192.168.56.1:3000/api";
```

Para o seu IP local:

```typescript
const API_URL = "http://SEU_IP_AQUI:3000/api";
```

**Exemplo:**

```typescript
const API_URL = "http://192.168.1.100:3000/api";
```

### 3. Certifique-se que o servidor backend está rodando

No terminal da pasta `mercadinho-desktop`:

```bash
npm run dev
```

O servidor deve estar rodando em `http://localhost:3000`

## 📱 Como Usar

### 1. Inicie o app mobile

Na pasta `mercadinho`:

```bash
npm start
```

ou

```bash
npx expo start
```

### 2. Conecte seu dispositivo/emulador

- **Dispositivo físico:** Escaneie o QR code com o app Expo Go
- **Emulador Android:** Pressione `a`
- **Simulador iOS:** Pressione `i`

### 3. Teste o fluxo de autenticação

1. **Cadastro:**

   - Abra a tela de cadastro
   - Preencha: Nome, Email, Senha (mín. 6 caracteres)
   - Clique em "Criar conta"
   - Se sucesso, será redirecionado para a home

2. **Login:**
   - Use o email e senha cadastrados
   - Clique em "Entrar"
   - Dados do cliente são salvos localmente (AsyncStorage)

## 🔧 Arquivos Criados/Modificados

### Novos arquivos:

- `services/api.ts` - Serviço de comunicação com backend
- `services/storage.ts` - Gerenciamento de dados locais (AsyncStorage)

### Arquivos modificados:

- `app/login.tsx` - Integração com API de login
- `app/signup.tsx` - Integração com API de cadastro

## 📡 APIs Integradas

### 1. Cadastro de Cliente

**Endpoint:** `POST /api/clientes/register`

```typescript
await clienteAPI.register({
  nome: "João Silva",
  email: "joao@email.com",
  senha: "senha123",
  telefone: "11987654321", // opcional
});
```

### 2. Login de Cliente

**Endpoint:** `POST /api/clientes/login`

```typescript
await clienteAPI.login("joao@email.com", "senha123");
```

### 3. Buscar Perfil

**Endpoint:** `GET /api/clientes/profile?id={id}`

```typescript
await clienteAPI.getProfile(clienteId);
```

### 4. Atualizar Perfil

**Endpoint:** `PUT /api/clientes/profile`

```typescript
await clienteAPI.updateProfile({
  id: clienteId,
  nome: "João Silva Santos",
  telefone: "11999999999",
});
```

## 🔒 Dados Salvos Localmente

O app salva os seguintes dados do cliente após login/cadastro:

```typescript
{
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  endereco: string | null;
  createdAt: string;
}
```

**Chave no AsyncStorage:** `@santafe:cliente`

## 📝 Exemplos de Uso

### Verificar se usuário está logado

```typescript
import storageService from "./services/storage";

const isLoggedIn = await storageService.isLoggedIn();
if (isLoggedIn) {
  const cliente = await storageService.getCliente();
  console.log("Cliente logado:", cliente?.nome);
}
```

### Fazer logout

```typescript
import storageService from "./services/storage";

await storageService.removeCliente();
router.replace("/login");
```

### Buscar dados do cliente atual

```typescript
import storageService from "./services/storage";

const cliente = await storageService.getCliente();
if (cliente) {
  console.log("Email:", cliente.email);
  console.log("Nome:", cliente.nome);
}
```

## 🐛 Troubleshooting

### Erro: "Erro ao conectar com o servidor"

1. Verifique se o backend está rodando (`npm run dev` na pasta mercadinho-desktop)
2. Confirme que o IP em `services/api.ts` está correto
3. Certifique-se que o dispositivo/emulador está na mesma rede Wi-Fi
4. Tente desabilitar firewall temporariamente

### Erro: "Cannot find module '@react-native-async-storage/async-storage'"

Execute:

```bash
npx expo install @react-native-async-storage/async-storage
```

### Cadastro/Login não funciona

1. Abra o console do navegador/terminal para ver erros
2. Teste a API diretamente:
   ```bash
   curl -Method POST http://SEU_IP:3000/api/clientes/login \
     -Headers @{"Content-Type"="application/json"} \
     -Body '{"email":"teste@teste.com","senha":"senha123"}'
   ```

## ✅ Próximos Passos

1. ✅ **Integração completa de autenticação**
2. 🔜 Carregar produtos da API
3. 🔜 Criar carrinho de compras
4. 🔜 Fazer pedidos
5. 🔜 Visualizar histórico de pedidos
6. 🔜 Atualizar perfil do usuário

## 📞 Suporte

Se encontrar problemas, verifique:

- Console do app mobile (Expo)
- Console do servidor backend
- Network tab no Chrome DevTools (se usando web)
