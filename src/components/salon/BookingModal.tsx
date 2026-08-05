import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Clock,
  CreditCard,
  Flame,
  ShieldCheck,
  Sparkles,
  X,
  User,
  Phone,
  ReceiptText,
} from "lucide-react";
import { GoldButton } from "./GoldButton";
import { loadRazorpayScript } from "@/lib/razorpay";

const services = {
  male: [
    { id: "m1", name: "Haircut & Styling", time: "30 mins", price: 150 },
    { id: "m2", name: "Beard Grooming & Shape", time: "20 mins", price: 100 },
    { id: "m3", name: "Hair Color & Spa Combo", time: "60 mins", price: 800 },
    { id: "m4", name: "Groom Pre-Wedding Package", time: "120 mins", price: 3500 },
  ],
  female: [
    { id: "f1", name: "Advanced Haircut & Blowdry", time: "45 mins", price: 400 },
    { id: "f2", name: "Keratin Treatment", time: "90 mins", price: 3000 },
    { id: "f3", name: "Party Makeup & Hair", time: "60 mins", price: 1500 },
    { id: "f4", name: "Bridal HD Makeup", time: "180 mins", price: 8500 },
  ],
};

const days = [
  { d: "Mon", n: 12 },
  { d: "Tue", n: 13 },
  { d: "Wed", n: 14 },
  { d: "Thu", n: 15 },
  { d: "Fri", n: 16 },
  { d: "Sat", n: 17 },
  { d: "Sun", n: 18, off: true },
];

const slots = [
  { t: "10:00 AM" },
  { t: "11:30 AM" },
  { t: "1:00 PM", full: true },
  { t: "2:00 PM" },
  { t: "3:30 PM" },
  { t: "5:00 PM", full: true },
  { t: "6:00 PM" },
  { t: "7:00 PM", hot: true },
  { t: "8:30 PM" },
];

const steps = ["Service", "Time", "Details", "Pay"];

export function BookingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  
  const [gender, setGender] = useState<"male" | "female">("female");
  const [selectedServiceId, setSelectedServiceId] = useState<string>("f1");
  const [day, setDay] = useState(14);
  const [slot, setSlot] = useState("7:00 PM");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  
  // States for payment completion
  const [done, setDone] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentId, setPaymentId] = useState("");

  const activeServices = services[gender];
  const chosenService = activeServices.find((s) => s.id === selectedServiceId) || activeServices[0];
  const advanceAmount = Math.round(chosenService.price * 0.3); 
  const remainingAmount = chosenService.price - advanceAmount;

  const close = () => {
    onClose();
    setTimeout(() => {
      setStep(0);
      setDone(false);
      setName("");
      setPhone("");
      setPaymentId("");
    }, 300);
  };

  const handleGenderChange = (newGender: "male" | "female") => {
    setGender(newGender);
    setSelectedServiceId(services[newGender][0].id); 
  };

  const canGoNext = () => {
    if (step === 0) return !!selectedServiceId;
    if (step === 1) return !!day && !!slot;
    if (step === 2) return name.trim().length > 2 && phone.trim().length >= 10;
    return true;
  };

  // --- Razorpay Payment & Email Logic ---
  const handlePayment = async () => {
    setIsPaying(true);
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setIsPaying(false);
      return;
    }

    try {
      // 1. Fetch Order ID from backend
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: advanceAmount * 100 }), 
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order on server');
      }

      const orderData = await orderResponse.json();

      // 2. Open Razorpay Checkout
      const options = {
        key: "rzp_test_TLz7s55uO4oGCr", 
        amount: orderData.amount,
        currency: orderData.currency,
        name: "A Dream Light Salon",
        description: `Advance for ${chosenService.name}`,
        order_id: orderData.id, 
        image: "https://example.com/your_logo.png", 
        handler: async function (response: any) {
          // Setup state for the receipt
          setPaymentId(response.razorpay_payment_id);
          setDone(true);
          setIsPaying(false);

          // 3. Send Automatic Email to Owner via Backend API
          try {
            await fetch('/api/send-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: name,
                phone: phone,
                service: chosenService.name,
                date: `Aug ${day}, 2026`,
                time: slot,
                advance: advanceAmount,
                balance: remainingAmount,
                paymentId: response.razorpay_payment_id
              }),
            });
          } catch (emailError) {
            console.error("Failed to send email notification:", emailError);
          }
        },
        prefill: {
          name: name,
          contact: phone,
        },
        theme: {
          color: "#D4AF37", 
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      
      paymentObject.on("payment.failed", function (response: any) {
        alert("Payment Failed. Please try again.");
        setIsPaying(false);
      });

      paymentObject.open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong while initiating the payment. Please try again.");
      setIsPaying(false);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="glass-card relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-3xl p-6 sm:max-w-2xl sm:rounded-3xl sm:p-8"
          >
            <button
              onClick={close}
              aria-label="Close booking"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-gold/25 text-muted-foreground hover:text-gold transition-colors"
            >
              <X size={16} />
            </button>

            {!done && (
              <>
                <p className="text-[10px] uppercase tracking-[0.32em] text-gold">
                  Smart Booking
                </p>
                <h3 className="mt-2 text-2xl sm:text-3xl">Reserve your chair</h3>

                {/* Stepper */}
                <div className="mt-6 grid grid-cols-4 gap-2">
                  {steps.map((s, i) => (
                    <div key={s} className="min-w-0">
                      <div
                        className={`h-1 rounded-full transition-colors ${
                          i <= step ? "bg-[image:var(--gradient-gold)]" : "bg-muted"
                        }`}
                      />
                      <p
                        className={`mt-2 truncate text-[11px] ${
                          i <= step ? "text-champagne" : "text-muted-foreground"
                        }`}
                      >
                        {i + 1}. {s}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="mt-7">
              <AnimatePresence mode="wait">
                {done ? (
                  /* --- VIRTUAL RECEIPT SCREEN --- */
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    {/* The Receipt Card */}
                    <div 
                      className="w-full max-w-sm rounded-2xl border border-gold/40 bg-[#111] p-6 shadow-2xl relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-[image:var(--gradient-gold)]"></div>
                      
                      <div className="text-center mb-6 mt-2">
                        <h2 className="font-display text-2xl text-gradient-gold mb-1">A Dream Light Salon</h2>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">Booking Receipt</p>
                      </div>

                      <div className="space-y-4 text-sm text-champagne">
                        <div className="flex justify-between items-end border-b border-white/10 pb-2">
                          <span className="text-muted-foreground text-xs">Customer</span>
                          <span className="font-medium">{name}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-white/10 pb-2">
                          <span className="text-muted-foreground text-xs">Phone</span>
                          <span>{phone}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-white/10 pb-2">
                          <span className="text-muted-foreground text-xs">Service</span>
                          <span className="text-right max-w-[60%]">{chosenService.name}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-white/10 pb-2">
                          <span className="text-muted-foreground text-xs">Date & Time</span>
                          <span>Aug {day}, 2026 · {slot}</span>
                        </div>

                        <div className="pt-4 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Service Value</span>
                            <span>₹{chosenService.price}</span>
                          </div>
                          <div className="flex justify-between text-gold">
                            <span>Advance Paid (30%)</span>
                            <span>- ₹{advanceAmount}</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gold/30 flex items-center justify-between">
                          <div>
                            <span className="block text-champagne font-bold text-lg">Balance Due</span>
                            <span className="block text-[10px] text-muted-foreground">To be paid at the salon</span>
                          </div>
                          <span className="font-display text-3xl text-gradient-gold">₹{remainingAmount}</span>
                        </div>

                        {paymentId && (
                          <div className="mt-6 text-center">
                            <p className="text-[9px] text-muted-foreground break-all">Txn ID: {paymentId}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="w-full max-w-sm mt-6 text-center">
                      <p className="text-xs text-muted-foreground mb-4">
                        Please take a screenshot of this receipt for your records.
                      </p>
                      <GoldButton full onClick={close}>
                        Done & Close
                      </GoldButton>
                    </div>
                  </motion.div>
                ) : step === 0 ? (
                  <motion.div
                    key="s0"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    className="grid gap-5"
                  >
                    <div className="flex rounded-xl border border-border bg-surface/40 p-1">
                      <button
                        onClick={() => handleGenderChange("female")}
                        className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                          gender === "female" ? "bg-gold/20 text-champagne" : "text-muted-foreground hover:text-champagne"
                        }`}
                      >
                        Female
                      </button>
                      <button
                        onClick={() => handleGenderChange("male")}
                        className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                          gender === "male" ? "bg-gold/20 text-champagne" : "text-muted-foreground hover:text-champagne"
                        }`}
                      >
                        Male
                      </button>
                    </div>

                    <div className="grid gap-3">
                      {activeServices.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSelectedServiceId(s.id)}
                          className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                            selectedServiceId === s.id
                              ? "border-gold/70 bg-gold/10 gold-glow"
                              : "border-border bg-surface/60 hover:border-gold/40"
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="truncate font-display text-lg text-champagne">
                              {s.name}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              Estimated Time: {s.time}
                            </p>
                          </div>
                          <div className="shrink-0 text-right">
                            <span className="block text-sm text-gold">₹{s.price}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : step === 1 ? (
                  <motion.div
                    key="s1"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                  >
                    <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      <CalendarDays size={14} className="text-gold" /> August 2026
                    </p>
                    <div className="mt-4 grid grid-cols-7 gap-2">
                      {days.map((d) => (
                        <button
                          key={d.n}
                          disabled={d.off}
                          onClick={() => setDay(d.n)}
                          className={`rounded-xl border px-1 py-3 text-center transition-all disabled:opacity-30 ${
                            day === d.n
                              ? "border-gold bg-gold/15 text-champagne"
                              : "border-border text-muted-foreground hover:border-gold/40"
                          }`}
                        >
                          <span className="block text-[10px] uppercase">{d.d}</span>
                          <span className="block text-sm">{d.n}</span>
                        </button>
                      ))}
                    </div>

                    <p className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      <Clock size={14} className="text-gold" /> Available slots
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {slots.map((s) => (
                        <button
                          key={s.t}
                          disabled={s.full}
                          onClick={() => setSlot(s.t)}
                          className={`relative rounded-xl border py-3 text-sm transition-all disabled:cursor-not-allowed disabled:opacity-30 ${
                            slot === s.t
                              ? "border-gold bg-gold/15 text-champagne"
                              : s.hot
                                ? "border-rose-gold/60 text-rose-gold"
                                : "border-border text-muted-foreground hover:border-gold/40"
                          }`}
                        >
                          {s.t}
                          {s.hot ? (
                            <span className="absolute -top-2 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-rose-gold px-2 py-0.5 text-[9px] font-semibold text-primary-foreground">
                              <Flame size={9} /> Fast filling
                            </span>
                          ) : null}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : step === 2 ? (
                  <motion.div
                    key="s2"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    className="grid gap-4"
                  >
                    <p className="text-sm text-muted-foreground mb-2">
                      Please provide your details so we can confirm your slot.
                    </p>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60" />
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-2xl border border-border bg-surface/60 py-4 pl-12 pr-4 text-sm text-champagne outline-none transition-colors focus:border-gold/50 focus:bg-surface/80"
                      />
                    </div>
                    <div className="relative">
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60" />
                      <input
                        type="tel"
                        placeholder="Phone Number (WhatsApp)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-2xl border border-border bg-surface/60 py-4 pl-12 pr-4 text-sm text-champagne outline-none transition-colors focus:border-gold/50 focus:bg-surface/80"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="s3"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                  >
                    <div className="rounded-2xl border border-border bg-surface/60 p-5">
                      {[
                        ["Name", name],
                        ["Service", chosenService.name],
                        ["Date & Time", `Aug ${day}, 2026 · ${slot}`],
                        ["Total Service Value", `₹${chosenService.price}`],
                      ].map(([k, v]) => (
                        <div
                          key={k}
                          className="flex items-baseline justify-between gap-4 py-2 text-sm"
                        >
                          <span className="shrink-0 text-muted-foreground">{k}</span>
                          <span className="hairline mx-2 hidden flex-1 sm:block" />
                          <span className="text-right text-champagne font-medium">{v}</span>
                        </div>
                      ))}
                      <div className="mt-4 flex items-center justify-between border-t border-gold/20 pt-4">
                        <div>
                          <span className="block text-sm text-champagne font-semibold">
                            Booking Advance (30%)
                          </span>
                          <span className="block text-[10px] text-muted-foreground mt-0.5">
                            To reserve your slot
                          </span>
                        </div>
                        <span className="font-display text-3xl text-gradient-gold">
                          ₹{advanceAmount}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {["UPI", "Razorpay", "Cards"].map((m) => (
                        <div
                          key={m}
                          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface/40 py-3 text-xs text-muted-foreground"
                        >
                          <CreditCard size={14} className="text-gold" />
                          {m}
                        </div>
                      ))}
                    </div>

                    <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      <ShieldCheck size={14} className="text-gold shrink-0" />
                      Deposit is fully adjusted in your final bill. Free reschedule up to 6 hours prior.
                    </p>

                    <GoldButton 
                      full 
                      className="mt-5" 
                      onClick={handlePayment}
                      disabled={isPaying}
                    >
                      {isPaying ? "Processing..." : (
                        <><Sparkles size={16} /> Pay ₹{advanceAmount} & Confirm</>
                      )}
                    </GoldButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Navigation */}
            {!done ? (
              <div className="mt-7 flex items-center justify-between gap-3">
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0 || isPaying}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground disabled:opacity-30 hover:text-gold transition-colors"
                >
                  <ArrowLeft size={15} /> Back
                </button>
                <span className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
                  <BadgeCheck size={14} className="text-gold" /> Verified Premium Service
                </span>
                {step < 3 ? (
                  <GoldButton
                    className="px-6 py-2.5 text-xs"
                    onClick={() => setStep((s) => Math.min(3, s + 1))}
                    disabled={!canGoNext()}
                  >
                    Continue <ArrowRight size={15} />
                  </GoldButton>
                ) : (
                  <span />
                )}
              </div>
            ) : null}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}