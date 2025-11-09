# Componentes de Transição e Skeleton Loaders

Este guia documenta os componentes criados para melhorar as transições entre páginas e os estados de carregamento no app Mercadinho.

## 📦 Componentes Criados

### 1. **PageTransition** (`components/page-transition.tsx`)

Componente wrapper que adiciona animações suaves nas transições de páginas.

#### Tipos de Animação

- **`fade`**: Transição de opacidade (0 → 1)
- **`slide`**: Desliza da direita para esquerda (30px)
- **`slideUp`**: Desliza de baixo para cima (30px)
- **`scale`**: Efeito de zoom suave (0.95 → 1)

#### Uso

```tsx
import { PageTransition } from "@/components/page-transition";

export default function MyScreen() {
  return (
    <PageTransition type="fade" duration={400}>
      <View style={styles.container}>{/* Seu conteúdo aqui */}</View>
    </PageTransition>
  );
}
```

#### Props

| Prop       | Tipo                                        | Default  | Descrição                 |
| ---------- | ------------------------------------------- | -------- | ------------------------- |
| `children` | `React.ReactNode`                           | -        | Conteúdo a ser animado    |
| `type`     | `"fade" \| "slide" \| "scale" \| "slideUp"` | `"fade"` | Tipo de animação          |
| `duration` | `number`                                    | `400`    | Duração da animação em ms |

---

### 2. **Skeleton Loaders** (`components/skeletons/`)

Componentes de carregamento com efeito shimmer para pré-visualização do conteúdo.

#### 2.1 ProductCardSkeleton

Simula o layout de cards de produtos.

```tsx
import { ProductCardSkeletonGrid } from "@/components/skeletons/product-card-skeleton";

// Para exibir um grid de skeletons
<ProductCardSkeletonGrid count={6} />

// Ou um único card
<ProductCardSkeleton />
```

**Props:**

- `count` (ProductCardSkeletonGrid): Número de cards skeleton a exibir (padrão: 6)

#### 2.2 ProfileSkeleton

Simula o layout da tela de perfil (avatar + menu items).

```tsx
import { ProfileSkeleton } from "@/components/skeletons/profile-skeleton";

{
  isLoading ? <ProfileSkeleton /> : <ActualProfileContent />;
}
```

#### 2.3 CartSkeleton

Simula o layout do carrinho (itens + resumo + sugestões).

```tsx
import { CartSkeleton } from "@/components/skeletons/cart-skeleton";

{
  isLoading ? <CartSkeleton /> : <ActualCartContent />;
}
```

---

## 🎯 Implementação nas Telas

### Home (index.tsx)

- **Transição**: `fade`
- **Skeleton**: `ProductCardSkeletonGrid` (exibido durante carregamento de produtos)

### Profile (profile.tsx)

- **Transição**: `slideUp`
- **Skeleton**: `ProfileSkeleton` (exibido enquanto carrega dados do usuário)

### Cart (cart.tsx)

- **Transição**: `slideUp`
- **Skeleton**: `CartSkeleton` (exibido quando carrinho está carregando)

### Explore (explore.tsx)

- **Transição**: `fade`

### Product Detail ([id].tsx)

- **Transição**: `scale` (efeito de zoom ao abrir produto)

---

## 🎨 Personalização

### Ajustar Duração da Animação

```tsx
<PageTransition type="fade" duration={600}>
  {/* conteúdo */}
</PageTransition>
```

### Criar Novos Skeletons

Base para criar novos skeleton loaders:

```tsx
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export function MyCustomSkeleton() {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0.3, { duration: 800 })
      ),
      -1,
      false
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.block, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  block: {
    width: "100%",
    height: 100,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
  },
});
```

---

## 🚀 Benefícios

✅ **Melhor UX**: Transições suaves eliminam mudanças bruscas  
✅ **Feedback Visual**: Skeletons mostram que o app está carregando  
✅ **Performance**: react-native-reanimated roda na thread nativa  
✅ **Reutilizável**: Componentes podem ser usados em qualquer tela  
✅ **Consistência**: Mesmo padrão de animação em todo o app

---

## 📝 Notas Técnicas

- **Biblioteca de Animação**: `react-native-reanimated`
- **Cores dos Skeletons**: `#E0E0E0` (fundo cinza claro)
- **Efeito Shimmer**: Animação de opacidade 0.3 ↔ 1 (800ms cada direção)
- **Compatibilidade**: iOS e Android

---

## 🔧 Manutenção

Para adicionar transições em novas telas:

1. Importe o componente: `import { PageTransition } from "@/components/page-transition"`
2. Envolva o conteúdo da tela: `<PageTransition type="fade">...</PageTransition>`
3. Escolha o tipo de animação adequado ao contexto

Para estados de loading:

1. Importe o skeleton apropriado
2. Use renderização condicional: `{loading ? <Skeleton /> : <Content />}`
