import { useMemo, useState } from "react";

import PendingBookingCard from "../../components/bookings/PendingBookingCard";

import { useAuth } from "../../context/AuthContext";

import useHotelBookings from "../../hooks/useHotelBookings";

import { CalendarCheck2 } from "lucide-react";

function ArrivalPage() {
  const { currentUser } = useAuth();

  const pendingBookings =
    useHotelBookings(
      currentUser?.hotelId
    );

  const [selectedDay, setSelectedDay] =
    useState("today");

  /* ================= DATES ================= */
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const tomorrowDate = new Date();

  tomorrowDate.setDate(
    tomorrowDate.getDate() + 1
  );

  const tomorrow =
    tomorrowDate
      .toISOString()
      .split("T")[0];

  /* ================= FILTERED BOOKINGS ================= */
  const filteredBookings =
    useMemo(() => {
      return pendingBookings.filter(
        (booking) => {
          if (
            selectedDay === "today"
          ) {
            return (
              booking.checkInDate ===
              today
            );
          }

          if (
            selectedDay ===
            "tomorrow"
          ) {
            return (
              booking.checkInDate ===
              tomorrow
            );
          }

          return true;
        }
      );
    }, [
      pendingBookings,
      selectedDay,
      today,
      tomorrow,
    ]);

  return (
    <section className="mt-2 mb-15 p-2">
      {/* ================= FILTER BUTTONS ================= */}
      <div className="mb-5 flex gap-3 overflow-x-auto pb-1">
        {/* TODAY */}
        <button
          onClick={() =>
            setSelectedDay("today")
          }
          className={`shrink-0 rounded-2xl px-5 py-3 text-sm font-medium transition ${
            selectedDay === "today"
              ? "bg-white text-black"
              : "border border-zinc-800 bg-zinc-900 text-zinc-400"
          }`}
        >
          Today
        </button>

        {/* TOMORROW */}
        <button
          onClick={() =>
            setSelectedDay(
              "tomorrow"
            )
          }
          className={`shrink-0 rounded-2xl px-5 py-3 text-sm font-medium transition ${
            selectedDay ===
            "tomorrow"
              ? "bg-white text-black"
              : "border border-zinc-800 bg-zinc-900 text-zinc-400"
          }`}
        >
          Tomorrow
        </button>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {filteredBookings.length ===
      0 ? (
        <div className="flex flex-col items-center justify-center rounded-[28px] border border-zinc-800 bg-zinc-900/60 px-6 py-14 text-center text-white">
          {/* ICON */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
            <CalendarCheck2
              size={36}
              className="text-emerald-400"
            />
          </div>

          {/* HEADING */}
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            All Caught Up
          </h2>

          {/* SUBTEXT */}
          <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-zinc-500">
            No pending arrivals for{" "}
            {selectedDay}.
          </p>

          {/* STATUS */}
          <div className="mt-6 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-400">
            Hotel operations running
            smoothly
          </div>
        </div>
      ) : (
        /* ================= BOOKINGS ================= */
        <div className="space-y-4">
          {filteredBookings.map(
            (booking) => (
              <PendingBookingCard
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

export default ArrivalPage;