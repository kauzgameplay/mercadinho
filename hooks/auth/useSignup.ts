import { useState } from "react";
import { useRouter } from "expo-router";
import { ZodIssue } from "zod";
import { signupSchema, SignupInput } from "@/validators/auth";
import { clienteAPI } from "@/services/api";
import { storageService } from "@/services/storage";
import { useUser } from "@/contexts/user-context";

export type FieldErrors<T extends Record<string, any>> = Partial<
  Record<keyof T, string>
>;

export function useSignup() {
  const router = useRouter();
  const { login: loginUser } = useUser();
  const [values, setValues] = useState<SignupInput>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors<SignupInput>>({});

  const setField = <K extends keyof SignupInput>(
    key: K,
    value: SignupInput[K]
  ) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const parsed = signupSchema.safeParse(values);
    if (!parsed.success) {
      const issues = parsed.error.issues as ZodIssue[];
      const next: FieldErrors<SignupInput> = {};
      for (const i of issues) {
        const path = i.path[0] as keyof SignupInput;
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
      const result = await clienteAPI.register({
        nome: values.name,
        email: values.email,
        senha: values.password,
        telefone: values.phone || undefined,
      });
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
      setErrors((e) => ({ ...e, email: result.message || "Erro no cadastro" }));
      return false;
    } catch {
      setErrors((e) => ({ ...e, email: "Erro ao conectar com o servidor" }));
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
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    setField,
    submit,
  };
}
