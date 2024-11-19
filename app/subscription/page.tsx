import NavBar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import AcquarePlanButton from "./_components/acquire-plan-button";

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  return (
    <>
      <NavBar />
      <div className="space-y-6 p-6">
        <div className="text-2xl font-bold"> Assinatura</div>

        <div className="flex gap-6">
          <Card className="w-[450px]">
            <CardHeader>
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
                <p>Apenas 10 transações por mês (7/10)</p>
              </div>
              <div className="flex items-center gap-3">
                <XIcon className="text-danger" />
                <p>Relatorios de IA</p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-[450px]">
            <CardHeader>
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
                <AcquarePlanButton />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
