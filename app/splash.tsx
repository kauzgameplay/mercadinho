import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a tela inicial após 3 segundos
    const timer = setTimeout(() => {
      router.replace("/(tabs)");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>SantaFé</Text>
        <Text style={styles.subtitle}>Supermercado</Text>

        <View style={styles.cartContainer}>
          <Ionicons name="cart" size={120} color="#FFF" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 56,
    fontWeight: "800",
    color: "#FFF",
    marginBottom: 8,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "300",
    color: "#FFF",
    marginBottom: 60,
    letterSpacing: 4,
  },
  cartContainer: {
    marginTop: 20,
  },
});
