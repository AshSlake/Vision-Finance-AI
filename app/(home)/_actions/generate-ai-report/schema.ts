import { z } from "zod";

export const GenerateAiReportSchema = z.object({
  month: z.string().regex(/^(0?[1-9]|1[0-2])$/, {
    message: "Mês inválido. Deve ser um número entre 1 e 12 (ou 01 a 12).",
  }),
});

export type GenerateAiReportSchema = z.infer<typeof GenerateAiReportSchema>;
