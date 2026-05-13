import CurrentGuestCard from "../../components/bookings/CurrentGuestCard";

import { useAuth } from "../../context/AuthContext";

import useCheckedInBookings from "../../hooks/useCheckedInBookings";

import { BedDouble } from "lucide-react";

function CurrentGuests() {
  const { currentUser } = useAuth();

  const currentBookings =
    useCheckedInBookings(
      currentUser?.hotelId
    );

  return (
    <section className="mt-2 mb-15 p-2">
      {currentBookings.length === 0 ? (
        /* ================= EMPTY STATE ================= */
        <div className="flex flex-col items-center justify-center rounded-[28px] border border-zinc-800 bg-zinc-900/60 px-6 py-14 text-center text-white">
          {/* ICON */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10">
            <BedDouble
              size={36}
              className="text-blue-400"
            />
          </div>

          {/* HEADING */}
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            No Current Guests
          </h2>

          {/* SUBTEXT */}
          <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-zinc-500">
            There are no occupied rooms or
            active stays in the hotel right
            now.
          </p>

          {/* MINI STATUS */}
          <div className="mt-6 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-medium text-blue-400">
            All rooms currently available
          </div>
        </div>
      ) : (
        /* ================= CURRENT BOOKINGS ================= */
        <div className="space-y-4">
          {currentBookings.map(
            (booking) => (
              <CurrentGuestCard
                key={booking.id}
                booking={booking}
              />
            )
          )}
        </div>
      )}
    </section>
  );
}

export default CurrentGuests;