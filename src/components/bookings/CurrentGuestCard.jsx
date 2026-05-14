import { useState } from "react";

import PaymentModal from "../payments/PaymentModal";

import useBookingPayments from "../../hooks/useBookingPayments";

import calculatePaymentTotals from "../../utils/calculatePaymentTotals";

import PaymentList from "../payments/PaymentList";

import { checkOutRooms } from "../../services/roomService";

export default function CurrentGuestCard({
  booking,
}) {
  const [
    showPaymentModal,
    setShowPaymentModal,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const payments =
    useBookingPayments(
      booking.id
    );

  const {
    receivedAmount,
    pendingAmount,
  } = calculatePaymentTotals(
    payments,
    booking.totalAmount,
    booking.advanceAmount
  );

  /* ================= CHECKOUT ================= */
  async function handleCheckout() {
    try {
      setLoading(true);

      const roomIds =
        booking.assignedRooms
          ?.filter(
            (room) =>
              room?.roomId
          )
          .map(
            (room) =>
              room.roomId
          );

      await checkOutRooms(
        roomIds,
        booking.id
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4 text-white">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">
            {booking.guestName}
          </h2>

          <p className="text-sm text-zinc-500">
            {booking.phone}
          </p>
        </div>

        <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
          Checked In
        </div>
      </div>

      {/* DETAILS */}
      <div className="mt-4 space-y-4 text-sm text-zinc-400">
        {/* ROOMS */}
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
            Rooms
          </p>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {booking.assignedRooms
              ?.filter(
                (room) =>
                  room?.roomNumber
              )
              .map((room) => (
                <div
                  key={
                    room.roomId
                  }
                  className="shrink-0 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 font-medium text-blue-400"
                >
                  {
                    room.roomNumber
                  }
                </div>
              ))}
          </div>
        </div>

        {/* OTHER INFO */}
        <div className="space-y-2">
          <p>
            Travelers:{" "}
            {booking.travelers}
          </p>

          <p>
            Check-Out:{" "}
            {
              booking.checkOutDate
            }
          </p>
        </div>
      </div>

      {/* PAYMENT SUMMARY */}
      <div className="mt-5 rounded-2xl bg-zinc-950 p-4">
        <div className="flex items-center justify-between">
          {/* TOTAL */}
          <div>
            <p className="text-xs text-zinc-500">
              Total
            </p>

            <p className="font-semibold">
              ₹
              {
                booking.totalAmount
              }
            </p>
          </div>

          {/* RECEIVED */}
          <div>
            <p className="text-xs text-zinc-500">
              Received
            </p>

            <p className="font-semibold text-emerald-400">
              ₹
              {
                receivedAmount
              }
            </p>
          </div>

          {/* PENDING */}
          <div>
            <p className="text-xs text-zinc-500">
              Pending
            </p>

            <p className="font-semibold text-red-400">
              ₹
              {
                pendingAmount
              }
            </p>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {/* ADD PAYMENT */}
        <button
          onClick={() =>
            setShowPaymentModal(
              true
            )
          }
          className="rounded-2xl bg-emerald-500 py-3 font-semibold text-black transition hover:opacity-90"
        >
          Add Payment
        </button>

        {/* CHECKOUT */}
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="rounded-2xl border border-red-500/20 bg-red-500/10 py-3 font-semibold text-red-400 transition hover:bg-red-500/20 disabled:opacity-50"
        >
          {loading
            ? "Checking Out..."
            : "Check Out"}
        </button>
      </div>

      {/* PAYMENTS */}
      <PaymentList
        payments={payments}
      />

      {/* MODAL */}
      {showPaymentModal && (
        <PaymentModal
          booking={booking}
          onClose={() =>
            setShowPaymentModal(
              false
            )
          }
        />
      )}
    </div>
  );
}