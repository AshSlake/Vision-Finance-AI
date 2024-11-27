/**
 * Define o esquema de dados para a ação de exclusão de transações.
 * Utiliza a biblioteca Zod para validar e inferir os tipos de dados.
 */
import { z } from "zod";

export const DeleteTransactionSchema = z.object({
  transactionId: z.string().uuid(),
});

/**
 * Define o tipo de dados inferido a partir do esquema de exclusão de transações.
 * O tipo `DeleteTransactionSchema` representa um objeto com uma propriedade `transactionId` do tipo UUID.
 */
export type DeleteTransactionSchema = z.infer<typeof DeleteTransactionSchema>;
