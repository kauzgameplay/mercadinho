import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLogin } from "@/hooks/auth/useLogin";

export default function LoginScreen() {
  const router = useRouter();
  const {
    values,
    errors,
    loading,
    showPassword,
    setShowPassword,
    setField,
    submit,
  } = useLogin();
  const handleLogin = async () => {
    const ok = await submit();
    if (!ok && (errors.email || errors.password)) {
      Alert.alert(
        "Erro",
        errors.email || errors.password || "Erro ao fazer login"
      );
    }
  };

  const handleForgotPassword = () => {
    console.log("Esqueceu a senha");
  };

  const handleSignUp = () => {
    router.push("/signup" as any);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="light-content" backgroundColor="#7C3AED" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="cart" size={80} color="#FFF" />
          </View>
          <Text style={styles.title}>SantaFé</Text>
          <Text style={styles.subtitle}>Supermercado</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Bem-vindo de volta!</Text>
          <Text style={styles.formSubtitle}>
            Faça login para continuar suas compras
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-mail</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={values.email}
                onChangeText={(t) => setField("email", t)}
              />
            </View>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Sua senha"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={values.password}
                onChangeText={(t) => setField("password", t)}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.loginButtonText}>Entrar</Text>
            )}
          </TouchableOpacity>
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Não tem uma conta? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signupLink}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#7C3AED" },
  scrollContent: { flexGrow: 1 },
  header: { alignItems: "center", paddingTop: 60, paddingBottom: 40 },
  logoContainer: { marginBottom: 20 },
  title: { fontSize: 40, fontWeight: "800", color: "#FFF", letterSpacing: 1 },
  subtitle: {
    fontSize: 18,
    fontWeight: "300",
    color: "#E0D4FF",
    letterSpacing: 3,
    marginTop: 4,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  formSubtitle: { fontSize: 14, color: "#666", marginBottom: 32 },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: "#333", marginBottom: 8 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: "#333" },
  eyeIcon: { padding: 4 },
  forgotPassword: { alignSelf: "flex-end", marginBottom: 24 },
  forgotPasswordText: { fontSize: 14, fontWeight: "600", color: "#7C3AED" },
  loginButton: {
    backgroundColor: "#7C3AED",
    borderRadius: 12,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: { backgroundColor: "#B8A3E8" },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
    letterSpacing: 0.5,
  },
  divider: { flexDirection: "row", alignItems: "center", marginVertical: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#E0E0E0" },
  dividerText: { fontSize: 14, color: "#999", marginHorizontal: 16 },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: { fontSize: 14, color: "#666" },
  signupLink: { fontSize: 14, fontWeight: "700", color: "#7C3AED" },
  errorText: { color: "#EF4444", marginTop: 6, fontSize: 12 },
});
