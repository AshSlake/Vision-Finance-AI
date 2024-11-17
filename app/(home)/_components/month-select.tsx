// Este componente é um seletor de mês para a aplicação financeira.
// Ele utiliza a biblioteca "@/app/_components/ui/select" para construir o seletor.
// O "useRouter" do Next.js é usado para navegar entre páginas.

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

// Lista de opções de mês para o seletor.
const MONTH_OPTIONS = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

const MonthSelect = () => {
  // Obtém a instância do roteador para navegar para outras páginas.
  const { push } = useRouter();

  const serchParams = useSearchParams();
  const month = serchParams.get("month");

  // Função que é chamada quando um novo mês é selecionado.
  const HandleMonthChange = (month: string) => {
    // Navega para a página principal com o mês selecionado na URL.
    push(`/?month=${month}`);
  };

  // Renderiza o componente de seleção de mês.
  return (
    <Select
      onValueChange={(value) => HandleMonthChange(value)}
      defaultValue={month ?? ""}
    >
      <SelectTrigger className="w-[150px] rounded-full">
        <SelectValue placeholder="Mês" />
      </SelectTrigger>
      <SelectContent>
        {MONTH_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MonthSelect;
