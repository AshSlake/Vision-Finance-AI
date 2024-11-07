import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columms";

const TransactionPage = async () => {
  //acessar o banco de dados
  const transactions = await db.transaction.findMany({});

  return (
    <div className="space-y-6 p-6">
      {/* Titulo e botão */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button className="rounded-full">
          Transações
          <ArrowDownUpIcon />
        </Button>
      </div>
      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  );
};

export default TransactionPage;

/* {transactions.map((trasaction) => (
        <div key={trasaction.id}>{trasaction.name}</div>
      ))}*/
