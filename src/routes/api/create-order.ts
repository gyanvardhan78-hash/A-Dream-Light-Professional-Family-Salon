import { createFileRoute } from "@tanstack/react-router";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

// Creates a Razorpay order for the advance payment (amount in paise).
export const Route = createFileRoute("/api/create-order")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;
        if (!keyId || !keySecret) {
          return json({ error: "Razorpay keys are not configured on the server" }, 500);
        }
        let amount = 0;
        try {
          ({ amount } = await request.json());
        } catch {
          return json({ error: "Invalid request" }, 400);
        }
        amount = Math.round(Number(amount));
        if (!Number.isFinite(amount) || amount < 100 || amount > 1_000_000) {
          return json({ error: "Invalid amount" }, 400);
        }
        const res = await fetch("https://api.razorpay.com/v1/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(`${keyId}:${keySecret}`),
          },
          body: JSON.stringify({
            amount,
            currency: "INR",
            receipt: "receipt_" + Math.random().toString(36).slice(2, 9),
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          return json({ error: data?.error?.description || "Razorpay order failed" }, 502);
        }
        return json({ ...data, key: keyId });
      },
    },
  },
});
