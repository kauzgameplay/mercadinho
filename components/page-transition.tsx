import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";

interface PageTransitionProps {
  children: React.ReactNode;
  type?: "fade" | "slide" | "scale" | "slideUp";
  duration?: number;
}

export function PageTransition({
  children,
  type = "fade",
  duration = 400,
}: PageTransitionProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(type === "slideUp" ? 30 : 0);
  const translateX = useSharedValue(type === "slide" ? 30 : 0);
  const scale = useSharedValue(type === "scale" ? 0.95 : 1);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration,
      easing: Easing.out(Easing.cubic),
    });

    if (type === "slide" || type === "slideUp") {
      if (type === "slideUp") {
        translateY.value = withSpring(0, {
          damping: 15,
          stiffness: 100,
        });
      } else {
        translateX.value = withSpring(0, {
          damping: 15,
          stiffness: 100,
        });
      }
    }

    if (type === "scale") {
      scale.value = withSpring(1, {
        damping: 12,
        stiffness: 100,
      });
    }
  }, [duration, opacity, scale, translateX, translateY, type]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
