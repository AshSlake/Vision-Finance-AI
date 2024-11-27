"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface AddTransactionButtonProps {
  userCanAddTransaction: boolean;
}

const AddTransactionButton = ({
  userCanAddTransaction,
}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const toastUnsuccessful = () => {
    toast.error("Voce não pode adicionar mais transações neste mês.");
  };

  return (
    <>
      <TooltipProvider>
        {!userCanAddTransaction ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="animate-pulse rounded-full bg-danger px-4 py-2 font-bold hover:bg-danger hover:text-black"
                onClick={toastUnsuccessful}
              >
                Adicionar Transações
                <ArrowDownUpIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Você Atingiu o limite de transações para este mês. Atualize o
              plano premium para ter transações ilimitadas.
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button
            className="rounded-full font-bold"
            onClick={() => setDialogIsOpen(true)}
          >
            Adicionar Transações
            <ArrowDownUpIcon />
          </Button>
        )}
      </TooltipProvider>

      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
};

export default AddTransactionButton;
