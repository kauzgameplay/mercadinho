import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Informe o e-mail" })
    .trim()
    .email("E-mail inválido"),
  password: z
    .string({ required_error: "Informe a senha" })
    .min(1, "Senha é obrigatória"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    name: z
      .string({ required_error: "Informe o nome" })
      .trim()
      .min(2, "Nome muito curto"),
    email: z
      .string({ required_error: "Informe o e-mail" })
      .trim()
      .email("E-mail inválido"),
    phone: z
      .string()
      .trim()
      .optional()
      .refine((v) => !v || v.length >= 8, {
        message: "Telefone muito curto",
      }),
    password: z
      .string({ required_error: "Informe a senha" })
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z
      .string({ required_error: "Confirme a senha" })
      .min(6, "A confirmação deve ter no mínimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type SignupInput = z.infer<typeof signupSchema>;
