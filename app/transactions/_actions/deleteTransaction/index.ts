"use server";

import { db } from "@/app/_lib/prisma";
import { DeleteTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

/**
 * Componente responsável por excluir uma transação específica do banco de dados.
 *
 * @param transactionId - O identificador único da transação a ser excluída.
 *
 * @remarks
 * Este componente é um endpoint de servidor e é chamado pelo front-end para realizar a exclusão de uma transação.
 * Ele utiliza a biblioteca Prisma para interagir com o banco de dados e exclui a transação com base no `transactionId` fornecido.
 *
 * Logo apos ele atualiza a cache do Next.js para garantir que as páginas "/transactions" e "/" sejam revalidadas após a exclusão de uma transação.
 * Isso significa que os dados serão atualizados automaticamente no front-end sem a necessidade de uma atualização manual.
 *
 * @example
 * ```typescript
 * // Excluindo uma transação com ID 123
 * await DeleteTransaction({ transactionId: 123 });
 * ```
 */
export const DeleteTransaction = async ({
  transactionId,
}: DeleteTransactionSchema) => {
  await db.transaction.delete({
    where: { id: transactionId },
  });

  revalidatePath("/transactions");
  revalidatePath("/");
};
