# Página do Carrinho de Compras - Mercadinho SantaFé

## 📱 Tela Implementada

A página do carrinho de compras foi desenvolvida seguindo o design fornecido, com as seguintes características:

### ✨ Recursos Implementados

1. **Cabeçalho**

   - Botão de voltar (navegação)
   - Título "Carrinho de Compras"
   - Botão de busca

2. **Produto Principal**

   - Imagem grande do produto
   - Nome do produto em destaque
   - Controles de quantidade com botões estilizados (+/-)
   - Quantidade atual exibida

3. **Seção "Seu Carrinho"**

   - Lista horizontal de produtos já no carrinho
   - Cards com imagem e nome do produto
   - Fundo escuro no rótulo (como na imagem)

4. **Seção "Que tal levar?"**

   - Sugestões de produtos adicionais
   - Botão "+" para adicionar ao carrinho
   - Cards com design similar ao anterior

5. **Rodapé de Finalização**
   - Total em destaque (vermelho) - **Atualizado dinamicamente**
   - Botão "Finalizar a compra" (roxo)
   - Layout responsivo

### 🆕 **NOVO: Sistema de Carrinho Funcional**

Implementamos um sistema completo de gerenciamento de carrinho usando Context API:

#### **CartContext** (`contexts/cart-context.tsx`)

- ✅ Adicionar produtos ao carrinho
- ✅ Remover produtos do carrinho
- ✅ Atualizar quantidade de produtos
- ✅ Calcular total do carrinho
- ✅ Contar total de itens
- ✅ Limpar carrinho

#### **Integração Completa**

1. **Página de Produto** → Adiciona produto ao carrinho com quantidade escolhida
2. **Navegação** → Botão FAB com badge mostrando número de itens
3. **Página do Carrinho** → Exibe produtos adicionados com total dinâmico

#### **Badge no Carrinho**

- 🔴 Badge vermelho mostra quantidade total de itens
- 🎯 Aparece apenas quando há itens no carrinho
- 📍 Posicionado no botão FAB central

## 🎨 Design

### Cores Utilizadas

- **Roxo Principal**: `#7C3AED` (botões e elementos interativos)
- **Vermelho**: `#E63946` (total e badge)
- **Preto/Cinza Escuro**: `#2D2D2D` (rótulos dos cards)
- **Branco**: `#FFF` (fundo principal)

### Componentes Estilizados

- Botões de quantidade com bordas arredondadas
- Cards com sombras suaves
- Scrolls horizontais para as sugestões
- Layout clean e moderno
- Badge no botão do carrinho

## 🚀 Como Testar

### 1. Adicionar Produto ao Carrinho

**Na Página do Produto** (`http://localhost:8081/product/1`):

1. Ajuste a quantidade desejada usando os botões + e -
2. Clique em **"Colocar no Carrinho"**
3. Você será redirecionado automaticamente para o carrinho
4. O produto aparecerá na página do carrinho com a quantidade selecionada

### 2. Navegar para o Carrinho

**Opção A: Pela Navegação Inferior**

- Clique no **botão FAB roxo** (ícone de carrinho) no centro da barra inferior
- Se houver itens, verá um badge vermelho com o número

**Opção B: Após adicionar produto**

- Automático ao clicar em "Colocar no Carrinho"

### 3. Interações Disponíveis

- **Adicionar/Remover Quantidade**: Use os botões + e - no produto
- **Ver Total Atualizado**: O valor muda automaticamente ao ajustar quantidades
- **Voltar**: Clique na seta no cabeçalho
- **Badge**: Mostra total de itens em todas as páginas

## 📂 Arquivos Criados/Modificados

1. **`app/cart.tsx`** - Página do carrinho (atualizada para usar contexto)
2. **`app/product/[id].tsx`** - Página do produto (adiciona ao carrinho)
3. **`components/bottom-navigation.tsx`** - FAB com badge
4. **`contexts/cart-context.tsx`** - **NOVO**: Gerenciamento de estado do carrinho
5. **`app/_layout.tsx`** - Provider do carrinho e rota registrada

## 🔄 Fluxo Completo

```
1. Usuário navega para página do produto
2. Seleciona quantidade desejada
3. Clica em "Colocar no Carrinho"
4. Produto é adicionado ao CartContext
5. Badge é atualizado automaticamente
6. Usuário é redirecionado para o carrinho
7. Carrinho mostra produtos com total calculado
8. Pode ajustar quantidades em tempo real
```

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **Expo Router** - Navegação file-based
- **Context API** - Gerenciamento de estado global
- **Ionicons** - Ícones

## 📱 Executar o Projeto

```bash
# Iniciar o projeto
npm start

# Ou para dispositivo específico
npm run android
npm run ios
```

## 💡 Observações

- ✅ Sistema de carrinho totalmente funcional
- ✅ Estado persistente entre navegações
- ✅ Cálculos automáticos de total
- ✅ Badge com contador de itens
- ✅ Design fiel à imagem fornecida
- ✅ Código limpo e bem documentado
- ✅ Todas as interações funcionam corretamente

## 🎯 Próximos Passos Sugeridos

1. **Persistência**: Salvar carrinho no AsyncStorage para manter entre sessões
2. **Imagens Reais**: Substituir imagens placeholder por imagens reais dos produtos
3. **Animações**: Adicionar animações ao adicionar/remover produtos
4. **Finalizar Compra**: Implementar fluxo de checkout
5. **Lista de Produtos**: Permitir adicionar produtos direto da home
6. **Notificações**: Feedback visual ao adicionar ao carrinho (toast)
