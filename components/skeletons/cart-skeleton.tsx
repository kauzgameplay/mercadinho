import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export function CartSkeleton() {
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
      {/* Cart Items */}
      {Array.from({ length: 3 }).map((_, index) => (
        <View key={index} style={styles.productItem}>
          <Animated.View style={[styles.productImage, animatedStyle]} />
          <View style={styles.productDetails}>
            <Animated.View style={[styles.productName, animatedStyle]} />
            <Animated.View style={[styles.productPrice, animatedStyle]} />
            <Animated.View style={[styles.quantityRow, animatedStyle]} />
          </View>
        </View>
      ))}

      {/* Summary */}
      <View style={styles.summaryContainer}>
        <Animated.View style={[styles.summaryRow, animatedStyle]} />
        <Animated.View style={[styles.summaryRow, animatedStyle]} />
        <View style={styles.divider} />
        <Animated.View style={[styles.totalRow, animatedStyle]} />
      </View>

      {/* Suggestions */}
      <View style={styles.suggestionsContainer}>
        <Animated.View style={[styles.suggestionsTitle, animatedStyle]} />
        <View style={styles.suggestionsScroll}>
          {Array.from({ length: 3 }).map((_, index) => (
            <View key={index} style={styles.suggestionCard}>
              <Animated.View style={[styles.suggestionImage, animatedStyle]} />
              <Animated.View style={[styles.suggestionName, animatedStyle]} />
              <Animated.View style={[styles.suggestionPrice, animatedStyle]} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  productItem: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 12,
    borderRadius: 12,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  productName: {
    height: 14,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    width: "70%",
    marginBottom: 4,
  },
  productPrice: {
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    width: "40%",
    marginBottom: 8,
  },
  quantityRow: {
    height: 32,
    backgroundColor: "#E0E0E0",
    borderRadius: 16,
    width: 120,
  },
  summaryContainer: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginTop: 24,
    padding: 20,
    borderRadius: 12,
  },
  summaryRow: {
    height: 14,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 8,
  },
  totalRow: {
    height: 18,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  suggestionsContainer: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginTop: 24,
    padding: 20,
    borderRadius: 12,
  },
  suggestionsTitle: {
    height: 18,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    width: "50%",
    marginBottom: 16,
  },
  suggestionsScroll: {
    flexDirection: "row",
    gap: 12,
  },
  suggestionCard: {
    width: 140,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 12,
  },
  suggestionImage: {
    width: "100%",
    height: 80,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 8,
  },
  suggestionName: {
    height: 13,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 6,
    width: "80%",
  },
  suggestionPrice: {
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    width: "50%",
  },
});
