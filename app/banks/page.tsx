import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "../_components/navbar";
import { Button } from "../_components/ui/button";

const BanksPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  return (
    <>
      <NavBar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Seus Bancos Vinculados:</h1>
          <Button>Adicinar Novo Banco</Button>
        </div>
      </div>
    </>
  );
};

export default BanksPage;
