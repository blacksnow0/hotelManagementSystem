import { useState } from "react";

import PaymentModal from "../payments/PaymentModal";

import useBookingPayments from "../../hooks/useBookingPayments";

import calculatePaymentTotals from "../../utils/calculatePaymentTotals";

import PaymentList from "../payments/PaymentList";

export default function CurrentGuestCard({ booking }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const payments = useBookingPayments(booking.id);

  const { receivedAmount, pendingAmount } = calculatePaymentTotals(
    payments,
    booking.totalAmount,
  );
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4 text-white">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">{booking.guestName}</h2>

          <p className="text-sm text-zinc-500">{booking.phone}</p>
        </div>

        <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
          Checked In
        </div>
      </div>

      {/* DETAILS */}
      <div className="mt-4 space-y-2 text-sm text-zinc-400">
        <p>Room: {booking.assignedRoomId}</p>

        <p>Travelers: {booking.travelers}</p>

        <p>Check-Out: {booking.checkOutDate}</p>
      </div>


      {/* PAYMENT SUMMARY */}
      <div className="mt-5 rounded-2xl bg-zinc-950 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500">Total</p>

            <p className="font-semibold">₹{booking.totalAmount}</p>
          </div>

          <div>
            <p className="text-xs text-zinc-500">Received</p>

            <p className="font-semibold text-emerald-400">₹{receivedAmount}</p>
          </div>

          <div>
            <p className="text-xs text-zinc-500">Pending</p>

            <p className="font-semibold text-red-400">₹{pendingAmount}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowPaymentModal(true)}
        className="mt-5 w-full rounded-2xl bg-emerald-500 py-3 font-semibold text-black"
      >
        Add Payment
      </button>

      <PaymentList payments={payments} />
      {showPaymentModal && (
        <PaymentModal
          booking={booking}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
}
