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

        {/* Carrinho */}
        <TouchableOpacity style={styles.navItem} onPress={handleCartPress}>
          <View>
            <Ionicons name="cart" size={24} color="#E0D4FF" />
            {itemCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{itemCount}</Text>
              </View>
            )}
          </View>
          <Text style={styles.navLabel}>Carrinho</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigate("favorites")}
        >
          <Ionicons name="person-outline" size={24} color="#E0D4FF" />
          <Text style={styles.navLabel}>Conta</Text>
        </TouchableOpacity>
      </View>
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
  badge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: "#E63946",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "700",
  },
});
