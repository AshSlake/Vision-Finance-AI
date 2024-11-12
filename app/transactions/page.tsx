import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columms";
import AddTransactionButton from "../_components/add-transaction-button";
import NavBar from "../_components/navbar";

const TransactionPage = async () => {
  //acessar o banco de dados
  const transactions = await db.transaction.findMany({});

  return (
    <>
      <NavBar />
      <div className="space-y-6 p-6">
        {/* Titulo e botão */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        <DataTable columns={transactionColumns} data={transactions} />
      </div>
    </>
  );
};

export default TransactionPage;
