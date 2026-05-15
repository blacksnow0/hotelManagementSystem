// src/pages/admin/BookingHistoryPage.jsx

import { useMemo, useState } from "react";

import {
  History,
  Search,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import useBookings from "../../hooks/useBookings";

export default function BookingHistory() {
  const { currentUser } = useAuth();

  const [selectedHotel, setSelectedHotel] =
    useState("all");

  const [search, setSearch] =
    useState("");

  const { bookings, loading } =
    useBookings(
      currentUser?.hotelId
    );

  /* ===============================
     ONLY COMPLETED BOOKINGS
  =============================== */
  const completedBookings =
    useMemo(() => {
      return bookings.filter(
        (booking) =>
          booking.status ===
          "completed"
      );
    }, [bookings]);

  /* ===============================
     FILTER BOOKINGS
  =============================== */
  const filteredBookings =
    useMemo(() => {
      return completedBookings.filter(
        (booking) => {
          /* HOTEL */
          const matchesHotel =
            selectedHotel === "all"
              ? true
              : booking.hotelId ===
                selectedHotel;

          /* SEARCH */
          const matchesSearch =
            booking.guestName
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            booking.phone?.includes(
              search
            );

          return (
            matchesHotel &&
            matchesSearch
          );
        }
      );
    }, [
      completedBookings,
      selectedHotel,
      search,
    ]);

  return (
    <section className="min-h-screen bg-black p-4 pb-24 text-white">
      {/* ================= HEADER ================= */}
      <div className="rounded-[28px] border border-zinc-800 bg-zinc-900/60 p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800">
            <History size={26} />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Booking Records
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              Booking History
            </h1>
          </div>
        </div>

        {/* SEARCH */}
        <div className="relative mt-6">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            placeholder="Search guest or phone..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="h-14 w-full rounded-2xl border border-zinc-800 bg-zinc-950 pl-12 pr-4 outline-none transition focus:border-emerald-500"
          />
        </div>

        {/* FILTERS */}
        <div className="mt-5 flex gap-3 overflow-x-auto pb-1">
          {[
            "all",
            "Urvashi",
            "New_Urvashi",
            "Dhanvantri",
          ].map((hotel) => (
            <button
              key={hotel}
              onClick={() =>
                setSelectedHotel(
                  hotel
                )
              }
              className={`shrink-0 rounded-2xl px-5 py-3 text-sm font-medium transition ${
                selectedHotel ===
                hotel
                  ? "bg-white text-black"
                  : "border border-zinc-800 bg-zinc-950 text-zinc-400"
              }`}
            >
              {hotel === "all"
                ? "All Hotels"
                : hotel}
            </button>
          ))}
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="mt-5 overflow-hidden rounded-[28px] border border-zinc-800 bg-zinc-900/60">
        {/* TABLE HEADER */}
        <div className="grid min-w-[900px] grid-cols-[180px_140px_140px_120px_120px_120px_140px] border-b border-zinc-800 bg-zinc-950/80 px-5 py-4 text-sm font-semibold text-zinc-400">
          <div>Guest</div>

          <div>Hotel</div>

          <div>Check In</div>

          <div>Rooms</div>

          <div>Travelers</div>

          <div>Total</div>

          <div>Status</div>
        </div>

        {/* TABLE BODY */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex h-40 items-center justify-center text-zinc-500">
              Loading history...
            </div>
          ) : filteredBookings.length ===
            0 ? (
            <div className="flex h-40 items-center justify-center text-zinc-500">
              No completed bookings
              found
            </div>
          ) : (
            filteredBookings.map(
              (booking) => (
                <div
                  key={booking.id}
                  className="grid min-w-[900px] grid-cols-[180px_140px_140px_120px_120px_120px_140px] items-center border-b border-zinc-800/60 px-5 py-4 text-sm transition hover:bg-zinc-800/30"
                >
                  {/* GUEST */}
                  <div>
                    <p className="font-semibold text-white">
                      {
                        booking.guestName
                      }
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      {
                        booking.phone
                      }
                    </p>
                  </div>

                  {/* HOTEL */}
                  <div className="text-zinc-300">
                    {
                      booking.hotelId
                    }
                  </div>

                  {/* CHECK IN */}
                  <div className="text-zinc-300">
                    {
                      booking.checkInDate
                    }
                  </div>

                  {/* ROOMS */}
                  <div className="text-zinc-300">
                    {booking.assignedRooms
                      ?.map(
                        (room) =>
                          room.roomNumber
                      )
                      .join(", ")}
                  </div>

                  {/* TRAVELERS */}
                  <div className="text-zinc-300">
                    {
                      booking.travelers
                    }
                  </div>

                  {/* TOTAL */}
                  <div className="font-semibold text-white">
                    ₹
                    {
                      booking.totalAmount
                    }
                  </div>

                  {/* STATUS */}
                  <div>
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                      Completed
                    </span>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </section>
  );
}