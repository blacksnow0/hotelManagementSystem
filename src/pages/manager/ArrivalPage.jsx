import PendingBookingCard from "../../components/bookings/PendingBookingCard";

import { useAuth } from "../../context/AuthContext";

import useHotelBookings from "../../hooks/useHotelBookings";

import { CalendarCheck2 } from "lucide-react";

function ArrivalPage() {
  const { currentUser } = useAuth();

  const pendingBookings = useHotelBookings(currentUser?.hotelId);

  return (
    <section className="mt-2 mb-15 p-2">
      {pendingBookings.length === 0 ? (
        /* ================= EMPTY STATE ================= */
        <div className="flex flex-col items-center justify-center rounded-[28px] border border-zinc-800 bg-zinc-900/60 px-6 py-14 text-center text-white">
          {/* ICON */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
            <CalendarCheck2 size={36} className="text-emerald-400" />
          </div>

          {/* HEADING */}
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            All Caught Up
          </h2>

          {/* SUBTEXT */}
          <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-zinc-500">
            No pending arrivals remaining. All guests have been checked in.
          </p>

          {/* OPTIONAL MINI STATUS */}
          <div className="mt-6 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-400">
            Hotel operations running smoothly
          </div>
        </div>
      ) : (
        /* ================= BOOKINGS ================= */
        <div className="space-y-4">
          {pendingBookings.map((booking) => (
            <PendingBookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ArrivalPage;
