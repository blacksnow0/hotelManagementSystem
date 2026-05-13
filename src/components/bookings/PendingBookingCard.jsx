import { useState } from "react";

import {
  ChevronRight,
  ChevronDown,
  Users,
  Phone,
  CalendarDays,
  IndianRupee,
  NotebookPen,
  Building2,
} from "lucide-react";

import RoomAllocationModal from "./RoomAllocationModal";

import { checkInRooms } from "../../services/roomService";

import { useNavigate } from "react-router-dom";

export default function PendingBookingCard({
  booking,
}) {

  const navigate = useNavigate()

  const [openAllocation, setOpenAllocation] =
    useState(false);

  const [showDetails, setShowDetails] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const assignedCount =
    booking.assignedRooms?.length || 0;

  const allocationComplete =
    assignedCount >= booking.roomsRequired;

  const progress =
    (assignedCount /
      booking.roomsRequired) *
    100;

  async function handlePrimaryAction() {
    try {
      /* OPEN ALLOCATION */
      if (!allocationComplete) {
        setOpenAllocation(true);

        return;
      }

      /* CHECK IN ALL ROOMS */
      setLoading(true);

      console.log("working and button clicked")

      const roomIds =
        booking.assignedRooms.map(
          (room) => room.roomId
        );

      await checkInRooms(
        roomIds,
        booking.id
      );

      navigate("/manager/current")
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ================= CARD ================= */}
      <div className="overflow-hidden rounded-[28px] border border-zinc-800 bg-zinc-900/80 text-white transition-all hover:border-zinc-700">
        {/* ================= MAIN CONTENT ================= */}
        <div className="p-5">
          {/* ================= TOP ================= */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="truncate text-2xl font-bold tracking-tight">
                {booking.guestName}
              </h2>

              <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
                <Building2 size={14} />

                <span className="truncate">
                  {
                    booking.bookingSource
                  }
                </span>
              </div>
            </div>

            <div
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold ${
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

          {/* ================= QUICK INFO ================= */}
          <div className="mt-5 flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-4">
            {/* ROOMS */}
            <div>
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Rooms
              </p>

              <p className="mt-1 text-2xl font-bold">
                {assignedCount}
                <span className="text-zinc-500">
                  {" / "}
                  {
                    booking.roomsRequired
                  }
                </span>
              </p>
            </div>

            {/* CHECK IN */}
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Check In
              </p>

              <p className="mt-1 text-sm font-semibold">
                {
                  booking.checkInDate
                }
              </p>
            </div>
          </div>

          {/* ================= PROGRESS ================= */}
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-sm">
              <p className="text-zinc-500">
                Room Allocation
              </p>

              <p className="font-medium text-white">
                {Math.round(progress)}%
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
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="mt-5 flex gap-3">
            {/* PRIMARY BUTTON */}
            <button
              onClick={
                handlePrimaryAction
              }
              disabled={loading}
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-white font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : allocationComplete
                ? "CheckIn"
                : "Allocate"}

              <ChevronRight size={18} />
            </button>

            {/* DETAILS BUTTON */}
            <button
              onClick={() =>
                setShowDetails(
                  !showDetails
                )
              }
              className="flex h-14 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-950 px-5 transition hover:bg-zinc-900"
            >
              <ChevronDown
                size={20}
                className={`transition-transform ${
                  showDetails
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* ================= DROPDOWN DETAILS ================= */}
        {showDetails && (
          <div className="border-t border-zinc-800 bg-zinc-950/50 p-5">
            {/* ================= INFO GRID ================= */}
            <div className="grid grid-cols-2 gap-3">
              {/* PHONE */}
              <div className="rounded-2xl border border-zinc-800 bg-black/40 p-4">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Phone size={14} />

                  <p className="text-xs uppercase tracking-wide">
                    Phone
                  </p>
                </div>

                <p className="mt-2 text-sm font-semibold">
                  {booking.phone}
                </p>
              </div>

              {/* TRAVELERS */}
              <div className="rounded-2xl border border-zinc-800 bg-black/40 p-4">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Users size={14} />

                  <p className="text-xs uppercase tracking-wide">
                    Travelers
                  </p>
                </div>

                <p className="mt-2 text-lg font-semibold">
                  {booking.travelers}
                </p>
              </div>

              {/* CHECK OUT */}
              <div className="rounded-2xl border border-zinc-800 bg-black/40 p-4">
                <div className="flex items-center gap-2 text-zinc-500">
                  <CalendarDays
                    size={14}
                  />

                  <p className="text-xs uppercase tracking-wide">
                    Check Out
                  </p>
                </div>

                <p className="mt-2 text-sm font-semibold">
                  {
                    booking.checkOutDate
                  }
                </p>
              </div>

              {/* ADVANCE */}
              <div className="rounded-2xl border border-zinc-800 bg-black/40 p-4">
                <div className="flex items-center gap-2 text-zinc-500">
                  <IndianRupee
                    size={14}
                  />

                  <p className="text-xs uppercase tracking-wide">
                    Advance
                  </p>
                </div>

                <p className="mt-2 text-lg font-semibold">
                  ₹
                  {booking.advanceAmount ||
                    0}
                </p>
              </div>
            </div>

            {/* ================= TOTAL ================= */}
            <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-emerald-400">
                  Total Amount
                </p>

                <p className="text-2xl font-bold text-white">
                  ₹
                  {booking.totalAmount}
                </p>
              </div>
            </div>

            {/* ================= NOTES ================= */}
            {booking.notes && (
              <div className="mt-4 rounded-2xl border border-zinc-800 bg-black/40 p-4">
                <div className="flex items-center gap-2 text-zinc-500">
                  <NotebookPen
                    size={14}
                  />

                  <p className="text-xs uppercase tracking-wide">
                    Notes
                  </p>
                </div>

                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-300">
                  {booking.notes}
                </p>
              </div>
            )}

            {/* ================= ASSIGNED ROOMS ================= */}
            {booking.assignedRooms
              ?.length > 0 && (
              <div className="mt-4">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Assigned Rooms
                </p>

                <div className="flex flex-wrap gap-2">
                  {booking.assignedRooms.map(
                    (room) => (
                      <div
                        key={
                          room.roomId
                        }
                        className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-400"
                      >
                        {
                          room.roomNumber
                        }
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        )}
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