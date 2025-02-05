import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.error();
  }

  const text = await request.text();
  if (!text) {
    return NextResponse.error();
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.error();
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
  });

  if (!process.env.STRIPE_WEBHOOK_SECRET_KEY) {
    return NextResponse.error();
  }

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET_KEY,
  );

  switch (event.type) {
    case "invoice.paid":
      const { customer, subscription, subscription_details } =
        event.data.object;

      const clerkUserId = subscription_details?.metadata?.clerk_user_id;
      if (!clerkUserId) {
        return NextResponse.error();
      }
      await clerkClient().users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: customer,
          stripeSubcriptionId: subscription,
        },
        publicMetadata: {
          subscriptionPlan: "premium",
        },
      });
      break;
  }

  return NextResponse.json({ received: true });
};
