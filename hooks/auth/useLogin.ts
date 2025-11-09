import { useState } from "react";
import { useRouter } from "expo-router";
import { ZodIssue } from "zod";
import { loginSchema, LoginInput } from "@/validators/auth";
import { clienteAPI } from "@/services/api";
import { storageService } from "@/services/storage";
import { useUser } from "@/contexts/user-context";

export type FieldErrors<T extends Record<string, any>> = Partial<
  Record<keyof T, string>
>;

export function useLogin() {
  const router = useRouter();
  const { login: loginUser } = useUser();
  const [values, setValues] = useState<LoginInput>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors<LoginInput>>({});

  const setField = <K extends keyof LoginInput>(
    key: K,
    value: LoginInput[K]
  ) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
      const issues = parsed.error.issues as ZodIssue[];
      const next: FieldErrors<LoginInput> = {};
      for (const i of issues) {
        const path = i.path[0] as keyof LoginInput;
        if (path) next[path] = i.message;
      }
      setErrors(next);
      return false;
    }
    setErrors({});
    return true;
  };

  const submit = async () => {
    if (!validate()) return false;
    setLoading(true);
    try {
      const result = await clienteAPI.login(values.email, values.password);
      if (result.success && result.cliente) {
        await storageService.saveCliente(result.cliente);
        const userData = {
          ...result.cliente,
          cpf: null,
          cidade: null,
          estado: null,
          cep: null,
          updatedAt: new Date().toISOString(),
        } as any;
        await loginUser(userData);
        router.replace("/(tabs)" as any);
        return true;
      }
      setErrors((e) => ({
        ...e,
        password: result.message || "Credenciais inválidas",
      }));
      return false;
    } catch {
      setErrors((e) => ({ ...e, password: "Erro ao conectar com o servidor" }));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    values,
    errors,
    loading,
    showPassword,
    setShowPassword,
    setField,
    submit,
  };
}
