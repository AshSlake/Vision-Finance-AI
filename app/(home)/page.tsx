// Importar módulos e componentes necessários de bibliotecas externas
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import MonthSelect from "./_components/month-select";
import { isMatch } from "date-fns";
import TransactionpieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expense-per-category";
import LastTransactionTablle from "./_components/last-transaction-table";
import { canUserAddTransactions } from "../_data/can-user-add-transaction";
import AibButton from "./_components/ia-report-button";

// Definir a interface de props para o componente Home
interface HomeProps {
  searchParams: { month: string };
}

// Definir o componente Home
const Home = async ({ searchParams: { month } }: HomeProps) => {
  // Autenticar o usuário
  const { userId } = await auth();
  if (!userId) {
    // Redirecionar para a página de login se o usuário não estiver autenticado
    redirect("/login");
  }

  // Verificar se o mês fornecido é válido
  const monthIsInvalid = !month || !isMatch(month, "MM");

  if (monthIsInvalid) {
    // Redirecionar para o mês atual se o mês fornecido for inválido
    redirect(`?month=${new Date().getMonth() + 1}`);
  }

  // Buscar dados do painel para o mês selecionado
  const dashboard = await getDashboard(month);

  // Verificar se o usuário pode adicionar transações
  const userCanAddTransactions = await canUserAddTransactions();

  // Renderizar o componente Home
  return (
    <>
      <NavBar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Painel de Controle</h1>
          <div className="flex items-center gap-3">
            <AibButton month={month} />
            <MonthSelect />
          </div>
        </div>
        <div className="grid grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards
              month={month}
              {...dashboard}
              userCanAddTransaction={userCanAddTransactions}
            />
            <div className="grid grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <TransactionpieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactionTablle
            lastTransactions={dashboard.lastTransactions}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
