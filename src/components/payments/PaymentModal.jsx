import { useState } from "react";

import { createPayment } from "../../services/paymentService";

export default function PaymentModal({
  booking,
  onClose,
}) {
  const [formData, setFormData] =
    useState({
      amount: "",

      paymentMethod: "cash",

      receivedInAccount: "",

      remarks: "",
    });

  const [loading, setLoading] =
    useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await createPayment({
        bookingId: booking.id,

        hotelId: booking.hotelId,

        guestName: booking.guestName,

        amount: Number(
          formData.amount
        ),

        paymentMethod:
          formData.paymentMethod,

        receivedInAccount:
          formData.receivedInAccount,

        remarks: formData.remarks,

        receivedBy: "manager",
      });

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/60">
      <div className="w-full rounded-t-[32px] bg-zinc-950 p-5 text-white">
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Add Payment
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              {booking.guestName}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-500"
          >
            Close
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* AMOUNT */}
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
          />

          {/* PAYMENT METHOD */}
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
          >
            <option value="cash">
              Cash
            </option>

            <option value="upi">
              UPI
            </option>

            <option value="bank_transfer">
              Bank Transfer
            </option>
          </select>

          {/* ACCOUNT */}
          <input
            type="text"
            name="receivedInAccount"
            placeholder="Received In Account"
            value={
              formData.receivedInAccount
            }
            onChange={handleChange}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
          />

          {/* REMARKS */}
          <textarea
            name="remarks"
            placeholder="Remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="min-h-[120px] w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
          />

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full rounded-2xl bg-emerald-500 py-4 font-semibold text-black"
          >
            {loading
              ? "Saving..."
              : "Save Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}