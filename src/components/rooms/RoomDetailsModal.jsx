// components/rooms/RoomDetailsModal.jsx

import {
  X,
  BedDouble,
  Users,
  Building2,
} from "lucide-react";

import {
  checkOutRoom,
  markRoomClean,
  checkInRoom,
} from "../../services/roomService";

import { useState } from "react";

import ShiftRoomModal from "./ShiftRoomModal";

export default function RoomDetailsModal({
  room,
  onClose,
}) {
  const [loading, setLoading] =
    useState(false);

  const [showShiftModal, setShowShiftModal] =
    useState(false);

  async function handleAction() {
    try {
      setLoading(true);

      if (room.status === "reserved") {
        await checkInRoom(
          room.id,
          room.currentBookingId
        );
      }

      if (room.status === "occupied") {
        await checkOutRoom(room.id);
      }

      if (room.status === "cleaning") {
        await markRoomClean(room.id);
      }

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function getActionButton() {
    if (room.status === "reserved") {
      return {
        label: "Check In",
        className:
          "bg-blue-500 text-white",
      };
    }

    if (room.status === "occupied") {
      return {
        label: "Check Out",
        className:
          "bg-red-500 text-white",
      };
    }

    if (room.status === "cleaning") {
      return {
        label: "Mark Clean",
        className:
          "bg-yellow-400 text-black",
      };
    }

    return null;
  }

  const action =
    getActionButton();

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/70 backdrop-blur-sm lg:items-center lg:justify-center">
      <div className="max-h-[95vh] w-full overflow-y-auto rounded-t-[2rem] border border-zinc-800 bg-zinc-950 text-white lg:max-w-lg lg:rounded-[2rem]">
        {/* HEADER */}
        <div className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-zinc-500">
                Room
              </p>

              <h2 className="text-4xl font-bold">
                {room.roomNumber}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="p-5">
          {/* STATUS */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500">
                  Current Status
                </p>

                <h3 className="mt-2 text-2xl font-bold capitalize">
                  {room.status}
                </h3>
              </div>

              <div className="rounded-full bg-zinc-800 px-4 py-2 text-sm capitalize text-zinc-300">
                {room.type}
              </div>
            </div>
          </div>

          {/* ROOM INFO */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
              <div className="flex items-center gap-2 text-zinc-500">
                <Building2 size={15} />

                <p className="text-xs uppercase">
                  Floor
                </p>
              </div>

              <p className="mt-2 text-xl font-bold">
                {room.floor}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
              <div className="flex items-center gap-2 text-zinc-500">
                <Users size={15} />

                <p className="text-xs uppercase">
                  Capacity
                </p>
              </div>

              <p className="mt-2 text-xl font-bold">
                {room.capacity}
              </p>
            </div>
          </div>

          {/* GUEST */}
          <div className="mt-5 rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
            <div className="flex items-center gap-2 text-zinc-500">
              <BedDouble size={16} />

              <p className="text-sm">
                Guest Information
              </p>
            </div>

            {room.currentGuestName ? (
              <div className="mt-4">
                <h3 className="text-xl font-bold">
                  {
                    room.currentGuestName
                  }
                </h3>

                <p className="mt-2 text-sm text-zinc-500">
                  Booking currently active
                </p>
              </div>
            ) : (
              <div className="mt-4">
                <p className="text-zinc-500">
                  No active guest
                </p>
              </div>
            )}
          </div>

          {/* ACTIONS */}
          <div className="mt-6 space-y-3">
            {action && (
              <button
                onClick={handleAction}
                disabled={loading}
                className={`h-14 w-full rounded-2xl font-semibold transition hover:opacity-90 ${action.className}`}
              >
                {loading
                  ? "Processing..."
                  : action.label}
              </button>
            )}

            {room.status ===
              "occupied" && (
              <button
                onClick={() =>
                  setShowShiftModal(
                    true
                  )
                }
                className="h-14 w-full rounded-2xl bg-zinc-800 font-semibold text-white"
              >
                Shift Room
              </button>
            )}
          </div>
        </div>

        {showShiftModal && (
          <ShiftRoomModal
            room={room}
            onClose={() =>
              setShowShiftModal(
                false
              )
            }
          />
        )}
      </div>
    </div>
  );
}