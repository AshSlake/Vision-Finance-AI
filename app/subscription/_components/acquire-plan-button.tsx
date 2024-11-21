"use client";

import { Button } from "@/app/_components/ui/button";
import { createCkeckout } from "../_actions/create-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const AcquarePlanButton = () => {
  const { user } = useUser();
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

  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";

  if (hasPremiumPlan) {
    return (
      <Button className="w-full rounded-full font-bold" variant="link">
        <Link
          href={process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}
        >
          Gerenciar Plano Premium
        </Link>
      </Button>
    );
  }

  return (
    <Button
      className="w-full rounded-full font-bold"
      onClick={handleAcquirePlanClick}
      variant="default"
    >
      Adquira o Plano Premium
    </Button>
  );
};

export default AcquarePlanButton;
