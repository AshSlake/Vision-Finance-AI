"use client";

import { Button } from "@/app/_components/ui/button";
import { createCkeckout } from "../_actions/create-checkout";
import { loadStripe } from "@stripe/stripe-js";

const AcquarePlanButton = () => {
  const handleAcquirePlanClick = async () => {
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
    <Button
      className="w-full rounded-full font-bold"
      onClick={handleAcquirePlanClick}
    >
      Adiquirir Plano
    </Button>
  );
};

export default AcquarePlanButton;
