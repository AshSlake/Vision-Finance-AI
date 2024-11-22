"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GenerateAiReportSchema } from "./schema";
import { db } from "@/app/_lib/prisma";

export const GenerateAiReport = async ({ month }: GenerateAiReportSchema) => {
  GenerateAiReportSchema.parse({ month });
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await clerkClient().users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";
  if (!hasPremiumPlan) {
    throw new Error("User does not have a premium plan");
  }

  //pegar as transações do mês Recebido
  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`2024-${month}-01`),
        lte: new Date(`2024-${month}-31`),
      },
    },
  });

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const currency = "BRL"; // Defina a moeda

  const content = `Gere um relatório com insights sobre as minhas finanças em ${currency}, com dicas e orientações de como melhorar minha vida financeira.  Analise meus gastos e receitas, identificando áreas onde posso economizar e investir melhor. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas: ${transactions
    .map(
      (transaction) =>
        `${transaction.date.toLocaleDateString("pt-BR")}-${transaction.type}-R$${transaction.amount}-${transaction.category}`,
    )
    .join(";")}`;

  try {
    const result = await model.generateContent(content);
    return result.response.text();
  } catch (error) {
    console.error("Erro ao gerar relatório:", error);
    throw new Error(
      "Falha ao gerar o relatório. Por favor, tente novamente mais tarde.",
    );
  }
};
