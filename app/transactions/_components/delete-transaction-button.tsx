import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { DeleteTransaction } from "../_actions/deleteTransaction";

interface DeletedTransactionButtonProps {
  transactionId: string;
}

const DeletedTransactionButton = ({
  transactionId,
}: DeletedTransactionButtonProps) => {
  const handleconfirmDeleteTransaction = async () => {
    try {
      await DeleteTransaction({ transactionId });
      toast.success("Transação deletada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error(
        "Falha ao deletar a transação. Por favor, tente novamente mais tarde.",
      );
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deseja realmente deletar essa Transação?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa Ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleconfirmDeleteTransaction}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletedTransactionButton;
