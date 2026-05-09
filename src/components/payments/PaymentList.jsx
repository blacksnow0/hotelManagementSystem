export default function PaymentList({
  payments,
}) {
  return (
    <div className="mt-4 space-y-3">
      {payments.map((payment) => (
        <div
          key={payment.id}
          className="rounded-2xl bg-zinc-950 p-3"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">
                ₹{payment.amount}
              </p>

              <p className="text-xs text-zinc-500">
                {payment.paymentMethod}
              </p>
            </div>

            <div
              className={`rounded-full px-3 py-1 text-xs ${
                payment.verificationStatus ===
                "verified"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-yellow-500/10 text-yellow-400"
              }`}
            >
              {
                payment.verificationStatus
              }
            </div>
          </div>

          {payment.remarks && (
            <p className="mt-2 text-sm text-zinc-400">
              {payment.remarks}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}