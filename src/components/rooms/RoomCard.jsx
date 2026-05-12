import {
  checkOutRoom,
  markRoomClean,
  checkInRoom,
} from "../../services/roomService";

import { useState } from "react";

import ShiftRoomModal from "./ShiftRoomModal";

export default function RoomCard({ room }) {
  const [showShiftModal, setShowShiftModal] = useState(false);

  async function handleAction() {
    try {
      if (room.status === "reserved") {
        await checkInRoom(room.id, room.currentBookingId);
      }

      /* OCCUPIED → CLEANING */
      if (room.status === "occupied") {
        await checkOutRoom(room.id);
      }

      /* CLEANING → AVAILABLE */
      if (room.status === "cleaning") {
        await markRoomClean(room.id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4 text-white">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-500">Room</p>

          <h2 className="text-2xl font-bold">{room.roomNumber}</h2>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          <span>Floor {room.floor}</span>

          <span>•</span>

          <span>{room.capacity} Guests</span>

          <span>•</span>

          <span>{room.type}</span>
        </div>

        <div className="rounded-full bg-zinc-800 px-3 py-1 text-sm capitalize">
          {room.status}
        </div>
      </div>

      {/* GUEST */}
      {room.currentGuestName && (
        <p className="mt-4 text-sm text-zinc-400">{room.currentGuestName}</p>
      )}

      {/* ACTIONS */}

      {room.status === "reserved" && (
        <button
          onClick={handleAction}
          className="mt-5 w-full rounded-2xl bg-blue-500 py-3 font-semibold text-white"
        >
          Check In
        </button>
      )}
      {room.status === "occupied" && (
        <button
          onClick={handleAction}
          className="mt-5 w-full rounded-2xl bg-red-500 py-3 font-semibold text-white"
        >
          Check-out
        </button>
      )}

      {room.status === "occupied" && (
        <button
          onClick={() => setShowShiftModal(true)}
          className="mt-3 w-full rounded-2xl bg-zinc-800 py-3 font-semibold text-white"
        >
          Shift Room
        </button>
      )}

      {room.status === "cleaning" && (
        <button
          onClick={handleAction}
          className="mt-5 w-full rounded-2xl bg-yellow-400 py-3 font-semibold text-black"
        >
          Mark Clean
        </button>
      )}

      {showShiftModal && (
        <ShiftRoomModal room={room} onClose={() => setShowShiftModal(false)} />
      )}

      {room.status === "available" && (
        <div className="mt-5 rounded-2xl bg-emerald-500/10 py-3 text-center text-sm text-emerald-400">
          Ready for check-in
        </div>
      )}
    </div>
  );
}
