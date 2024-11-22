import { auth, clerkClient } from "@clerk/nextjs/server";
import { TransactionsForMonth } from "../get-transations-forMonth";

export const canUserAddTransactions = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await clerkClient().users.getUser(userId);
  if (user.publicMetadata.subscriptionPlan === "premium") {
    return true;
  }
  const currentMonthTransactions = await TransactionsForMonth();
  if (currentMonthTransactions >= 10) {
    return false;
  }
  return true;
};
