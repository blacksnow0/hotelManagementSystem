import { verifyPayment } from "../../services/paymentService";

export default function PendingPaymentCard({
  payment,
}) {
  async function handleVerify() {
    try {
      await verifyPayment(payment.id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4 text-white">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">
            {payment.guestName}
          </h2>

          <p className="text-sm text-zinc-500">
            {payment.paymentMethod}
          </p>
        </div>

        <div className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400">
          Pending
        </div>
      </div>

      {/* DETAILS */}
      <div className="mt-4 space-y-2 text-sm text-zinc-400">
        <p>
          Amount: ₹{payment.amount}
        </p>

        <p>
          Account:{" "}
          {payment.receivedInAccount}
        </p>

        <p>
          Received By:{" "}
          {payment.receivedBy}
        </p>
      </div>

      {/* REMARKS */}
      {payment.remarks && (
        <div className="mt-4 rounded-2xl bg-zinc-950 p-3 text-sm text-zinc-400">
          {payment.remarks}
        </div>
      )}

      {/* BUTTON */}
      <button
        onClick={handleVerify}
        className="mt-5 w-full rounded-2xl bg-emerald-500 py-3 font-semibold text-black"
      >
        Verify Payment
      </button>
    </div>
  );
}