import { useCart } from "@/contexts/cart-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import React, { useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const pathname = usePathname();
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();
  const insets = useSafeAreaInsets();

  const handleHomePress = useCallback(() => {
    console.log("Home pressed, current path:", pathname);
    try {
      if (pathname === "/" || pathname === "/(tabs)") {
        // Já está na home, não faz nada
        return;
      }
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Error navigating to home:", error);
    }
  }, [router, pathname]);

  const handleExplorePress = useCallback(() => {
    console.log("Explore pressed, current path:", pathname);
    try {
      if (pathname === "/(tabs)/explore") {
        // Já está no explore, não faz nada
        return;
      }
      router.replace("/(tabs)/explore");
    } catch (error) {
      console.error("Error navigating to explore:", error);
    }
  }, [router, pathname]);

  const handleCartPress = useCallback(() => {
    console.log("Cart pressed, current path:", pathname);
    try {
      router.push("/(cart)/cart");
    } catch (error) {
      console.error("Error navigating to cart:", error);
    }
  }, [router, pathname]);

  const handleProfilePress = useCallback(() => {
    console.log("Profile pressed, current path:", pathname);
    try {
      router.push("/(account)/profile");
    } catch (error) {
      console.error("Error navigating to profile:", error);
    }
  }, [router, pathname]);

  return (
    <View style={styles.wrapper}>
      <View
        style={[styles.nav, { paddingBottom: Math.max(insets.bottom, 10) }]}
      >
        <TouchableOpacity
          style={styles.navItem}
          onPress={handleHomePress}
          activeOpacity={0.7}
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
          onPress={handleExplorePress}
          activeOpacity={0.7}
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
        <TouchableOpacity
          style={styles.navItem}
          onPress={handleCartPress}
          activeOpacity={0.7}
        >
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
          onPress={handleProfilePress}
          activeOpacity={0.7}
        >
          <Ionicons
            name="person-outline"
            size={24}
            color={active === "favorites" ? "#FFF" : "#E0D4FF"}
          />
          <Text
            style={
              active === "favorites" ? styles.navLabelActive : styles.navLabel
            }
          >
            Conta
          </Text>
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
    paddingTop: 10,
    paddingHorizontal: 24,
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
    paddingVertical: 8,
    minHeight: 50,
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
