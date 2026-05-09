import usePendingPayments from "../../hooks/usePendingPayments";

import PendingPaymentCard from "../../components/payments/PendingPaymentCard";

export default function PaymentsPage() {
  const payments =
    usePendingPayments();

  return (
    <div className="min-h-screen bg-zinc-950 p-4 text-white">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Pending Payments
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Verify manager payment entries
        </p>
      </div>

      {/* PAYMENTS */}
      <div className="space-y-4">
        {payments.map((payment) => (
          <PendingPaymentCard
            key={payment.id}
            payment={payment}
          />
        ))}
      </div>
    </div>
  );
}