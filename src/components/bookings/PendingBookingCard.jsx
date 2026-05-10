import { useState } from "react";

import {
  BedDouble,
  ChevronRight,
  Users,
} from "lucide-react";

import RoomAllocationModal from "./RoomAllocationModal";

export default function PendingBookingCard({
  booking,
}) {
  const [openAllocation, setOpenAllocation] =
    useState(false);

  const assignedCount =
    booking.assignedRooms?.length || 0;

  const allocationComplete =
    assignedCount >= booking.roomsRequired;

  return (
    <>
      {/* ================= CARD ================= */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-5 text-white transition hover:border-zinc-700">
        {/* TOP */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              {booking.guestName}
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              {booking.phone}
            </p>
          </div>

          <div
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              allocationComplete
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-yellow-500/10 text-yellow-400"
            }`}
          >
            {allocationComplete
              ? "Allocated"
              : "Pending"}
          </div>
        </div>

        {/* INFO */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center gap-2 text-zinc-500">
              <Users size={15} />

              <p className="text-xs uppercase tracking-wide">
                Travelers
              </p>
            </div>

            <p className="mt-2 text-lg font-semibold">
              {booking.travelers}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center gap-2 text-zinc-500">
              <BedDouble size={15} />

              <p className="text-xs uppercase tracking-wide">
                Rooms
              </p>
            </div>

            <p className="mt-2 text-lg font-semibold">
              {assignedCount}
              {" / "}
              {booking.roomsRequired}
            </p>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <p className="text-zinc-500">
              Room Allocation
            </p>

            <p className="font-medium text-white">
              {Math.round(
                (assignedCount /
                  booking.roomsRequired) *
                  100
              )}
              %
            </p>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
            <div
              className={`h-full rounded-full transition-all ${
                allocationComplete
                  ? "bg-emerald-500"
                  : "bg-yellow-500"
              }`}
              style={{
                width: `${
                  (assignedCount /
                    booking.roomsRequired) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        {/* ASSIGNED ROOMS */}
        {booking.assignedRooms?.length >
          0 && (
          <div className="mt-5">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
              Assigned Rooms
            </p>

            <div className="flex flex-wrap gap-2">
              {booking.assignedRooms.map(
                (room) => (
                  <div
                    key={room.roomId}
                    className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-400"
                  >
                    {room.roomNumber}
                  </div>
                )
              )}
            </div>
          </div>
        )}


        <button
          onClick={() =>
            setOpenAllocation(true)
          }
          className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-white font-semibold text-black transition hover:opacity-90"
        >
          {allocationComplete
            ? "Manage Allocation"
            : "Allocate Rooms"}

          <ChevronRight size={18} />
        </button>
      </div>

      {/* ================= MODAL ================= */}
      {openAllocation && (
        <RoomAllocationModal
          booking={booking}
          onClose={() =>
            setOpenAllocation(false)
          }
        />
      )}
    </>
  );
}