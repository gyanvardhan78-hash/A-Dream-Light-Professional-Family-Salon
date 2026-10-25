import { createFileRoute } from "@tanstack/react-router";

const esc = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

// Emails the salon a booking notification after a successful payment.
export const Route = createFileRoute("/api/send-email")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const user = process.env.GMAIL_USER;
        const pass = process.env.GMAIL_PASS;
        if (!user || !pass) return json({ success: false, error: "Email is not configured" }, 500);
        try {
          const { name, phone, service, date, time, advance, balance, paymentId } = await request.json();
          const nodemailer = (await import("nodemailer")).default;
          const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
          await transporter.sendMail({
            from: user,
            to: user,
            subject: `New Booking: ${String(service).slice(0, 80)} by ${String(name).slice(0, 80)}`,
            html: `<div style="font-family:Arial,sans-serif;color:#333;max-width:600px;border:1px solid #e0e0e0;border-radius:10px;padding:20px">
<h2 style="color:#D4AF37;text-align:center">A Dream Light Salon</h2>
<h3 style="text-align:center">New Booking Confirmed</h3>
<p><b>Customer:</b> ${esc(name)}</p><p><b>WhatsApp:</b> ${esc(phone)}</p>
<p><b>Service:</b> ${esc(service)}</p><p><b>Date & time:</b> ${esc(date)} at ${esc(time)}</p>
<p><b>Advance paid:</b> ₹${esc(advance)}</p><p><b>Balance at salon:</b> ₹${esc(balance)}</p>
<p style="font-size:12px;color:#666">Payment ID: ${esc(paymentId)}</p></div>`,
          });
          return json({ success: true });
        } catch (e) {
          console.error("send-email error:", e);
          return json({ success: false, error: "Email failed" }, 500);
        }
      },
    },
  },
});
