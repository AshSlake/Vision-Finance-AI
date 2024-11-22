"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { createCkeckout } from "@/app/subscription/_actions/create-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { FrownIcon } from "lucide-react";
import GeminiButton from "./efectButtonIaReport";

const ButtonIsNotRequireIa = () => {
  const handleAcquirePlanClickForIA = async () => {
    const { sessionId } = await createCkeckout();
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Env var NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set.");
    }
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );
    if (!stripe) {
      throw new Error("Failed to load Stripe.");
    }
    await stripe.redirectToCheckout({ sessionId });
  };
  return (
    <Dialog>
      <DialogTrigger>
        <GeminiButton>Relatorio IA</GeminiButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="animate-pulse border-danger">
          <DialogTitle className="animate-pulse border-danger">
            Relatório de IA
          </DialogTitle>
          <DialogDescription className="animate-pulse border-danger">
            <div className="justify flex items-center gap-2 text-danger">
              ...OPS
              <FrownIcon size={24} />
            </div>
            <p>
              Este botão não está disponível para usuários sem um plano Premium.
              Faça o upgrade para acessar este recurso.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button
            className="rounded-full font-bold"
            onClick={handleAcquirePlanClickForIA}
          >
            Adquira o Plano Premium
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonIsNotRequireIa;
