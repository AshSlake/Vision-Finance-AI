import NavBar from "../_components/navbar";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import AcquarePlanButton from "./_components/acquire-plan-button";
import { Badge } from "../_components/ui/badge";
import { TransactionsForMonth } from "../_data/get-transations-forMonth";

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const user = await clerkClient().users.getUser(userId);
  const currentMonthTransactions = await TransactionsForMonth();
  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";
  return (
    <>
      <NavBar />
      <div className="space-y-6 p-6">
        <div className="text-2xl font-bold"> Assinatura</div>

        <div className="flex gap-6">
          <Card
            className={`w-[450px] ${!hasPremiumPlan ? "border-white" : ""}`}
          >
            <CardHeader className="relative border-b border-solid py-8">
              {!hasPremiumPlan && (
                <Badge
                  className="absolute left-4 top-4 bg-white/10 text-white"
                  variant="outline"
                >
                  Atual
                </Badge>
              )}
              <h2 className="text-center text-2xl font-semibold">
                Plano Basico
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">0,00</span>
                <div className="text-2xl text-muted-foreground">Mês</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 py-8">
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>
                  Apenas 10 transações por mês ({currentMonthTransactions}/10)
                </p>
              </div>
              <div className="flex items-center gap-3">
                <XIcon className="text-danger" />
                <p>Relatorios de IA</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`w-[450px] ${hasPremiumPlan ? "border-primary" : ""}`}
          >
            <CardHeader className="relative border-b border-solid py-8">
              {hasPremiumPlan && (
                <Badge
                  className="absolute left-4 top-4 bg-primary/10 text-primary"
                  variant="outline"
                >
                  Ativo
                </Badge>
              )}
              <h2 className="text-center text-2xl font-semibold">
                Plano Premium
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">19,00</span>
                <div className="text-2xl text-muted-foreground">Mês</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 py-8">
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>Transações Ilimitadas</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>Relatorios de IA</p>
              </div>
              <AcquarePlanButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
