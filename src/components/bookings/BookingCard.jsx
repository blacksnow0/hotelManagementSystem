export default function BookingCard({
  booking,
}) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4 text-white">

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">
            {booking.guestName}
          </h2>

          <p className="text-sm text-zinc-500">
            {booking.phone}
          </p>
        </div>

        <div className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs capitalize text-yellow-400">
          {booking.status}
        </div>
      </div>

      {/* DETAILS */}
      <div className="mt-4 space-y-2 text-sm text-zinc-400">
        <p>
          Hotel: {booking.hotelId}
        </p>

        <p>
          Check-In:{" "}
          {booking.checkInDate}
        </p>

        <p>
          Check-Out:{" "}
          {booking.checkOutDate}
        </p>

        <p>
          Travelers:{" "}
          {booking.travelers}
        </p>
      </div>

      {/* PAYMENT */}
      <div className="mt-5 flex items-center justify-between rounded-2xl bg-zinc-950 p-3">
        <div>
          <p className="text-xs text-zinc-500">
            Total
          </p>

          <p className="font-semibold">
            ₹{booking.totalAmount}
          </p>
        </div>

        <div>
          <p className="text-xs text-zinc-500">
            Advance
          </p>

          <p className="font-semibold text-emerald-400">
            ₹{booking.advanceAmount}
          </p>
        </div>
      </div>
    </div>
  );
}