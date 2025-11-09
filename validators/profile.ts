import { z } from "zod";

export const profileSchema = z.object({
  nome: z
    .string({ required_error: "Nome é obrigatório" })
    .trim()
    .min(2, "Nome muito curto"),
  email: z
    .string({ required_error: "Email é obrigatório" })
    .trim()
    .email("Email inválido"),
  telefone: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || v.length >= 8, {
      message: "Telefone inválido",
    }),
  cpf: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || /^(\d{11}|\d{3}\.\d{3}\.\d{3}-\d{2})$/.test(v), {
      message: "CPF inválido",
    }),
  endereco: z.string().trim().optional(),
  cidade: z.string().trim().optional(),
  estado: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || /^[A-Za-z]{2}$/.test(v), {
      message: "UF inválida",
    }),
  cep: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || /^(\d{5}-\d{3}|\d{8})$/.test(v), {
      message: "CEP inválido",
    }),
});

export type ProfileInput = z.infer<typeof profileSchema>;
