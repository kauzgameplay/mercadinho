import { useCart } from "@/contexts/cart-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TabKey = "home" | "explore" | "credit" | "chat" | "favorites";

interface BottomNavigationProps {
  active: TabKey;
  onFabPress?: () => void;
}

export const BOTTOM_NAV_HEIGHT = 50;

export function BottomNavigation({
  active,
  onFabPress,
}: BottomNavigationProps) {
  const router = useRouter();
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  const handleNavigate = (key: TabKey) => {
    switch (key) {
      case "home":
        router.replace("/(tabs)");
        break;
      case "explore":
        router.replace("/(tabs)/explore");
        break;
      default:
        break;
    }
  };

  const handleCartPress = () => {
    router.push("/cart" as any);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigate("home")}
        >
          <Ionicons
            name="home"
            size={24}
            color={active === "home" ? "#FFF" : "#E0D4FF"}
          />
          <Text
            style={active === "home" ? styles.navLabelActive : styles.navLabel}
          >
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigate("explore")}
        >
          <Ionicons
            name="pricetag-outline"
            size={24}
            color={active === "explore" ? "#FFF" : "#E0D4FF"}
          />
          <Text
            style={
              active === "explore" ? styles.navLabelActive : styles.navLabel
            }
          >
            Ofertas
          </Text>
        </TouchableOpacity>

        {/* Espaço para o FAB */}
        <View style={styles.fabSpace} />

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigate("chat")}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={24}
            color="#E0D4FF"
          />
          <Text style={styles.navLabel}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigate("favorites")}
        >
          <Ionicons name="heart-outline" size={24} color="#E0D4FF" />
          <Text style={styles.navLabel}>Favoritos</Text>
        </TouchableOpacity>
      </View>

      {/* FAB para Carrinho */}
      <TouchableOpacity style={styles.fab} onPress={handleCartPress}>
        <Ionicons name="cart" size={28} color="#FFF" />
        {itemCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{itemCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "transparent",
    paddingTop: 0,
    paddingBottom: 0,
  },
  nav: {
    flexDirection: "row",
    backgroundColor: "#7C3AED",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 24,
    paddingBottom: 20,
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 12,
    overflow: "hidden",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  navLabel: {
    fontSize: 11,
    color: "#E0D4FF",
    fontWeight: "500",
  },
  navLabelActive: {
    fontSize: 11,
    color: "#FFF",
    fontWeight: "600",
  },
  fabSpace: {
    width: 60,
  },
  fab: {
    position: "absolute",
    top: -28,
    left: "50%",
    marginLeft: -28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 4,
    borderColor: "#FFF",
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#E63946",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  badgeText: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "700",
  },
});
