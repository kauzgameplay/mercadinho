import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export function ProfileSkeleton() {
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
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Animated.View style={[styles.avatar, animatedStyle]} />
        <View style={styles.profileInfo}>
          <Animated.View style={[styles.name, animatedStyle]} />
          <Animated.View style={[styles.email, animatedStyle]} />
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {Array.from({ length: 7 }).map((_, index) => (
          <View key={index} style={styles.menuItem}>
            <Animated.View style={[styles.menuIcon, animatedStyle]} />
            <View style={styles.menuTextContainer}>
              <Animated.View style={[styles.menuTitle, animatedStyle]} />
              <Animated.View style={[styles.menuSubtitle, animatedStyle]} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E0E0E0",
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    height: 18,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 8,
    width: "60%",
  },
  email: {
    height: 14,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    width: "80%",
  },
  menuContainer: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 6,
    width: "40%",
  },
  menuSubtitle: {
    height: 13,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    width: "60%",
  },
});
