import useAvailableRooms from "../../hooks/useAvailableRooms";

import { assignRoom } from "../../services/roomService";

export default function PendingBookingCard({
  booking,
}) {
  const rooms = useAvailableRooms(
    booking.hotelId
  );

  async function handleAssign(roomId) {
    try {
      await assignRoom({
        roomId,

        bookingId: booking.id,

        guestName: booking.guestName,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4 text-white">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">
            {booking.guestName}
          </h2>

          <p className="text-sm text-zinc-500">
            {booking.phone}
          </p>
        </div>

        <div className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400">
          Pending
        </div>
      </div>

      {/* DETAILS */}
      <div className="mt-4 space-y-2 text-sm text-zinc-400">
        <p>
          Check-In:{" "}
          {booking.checkInDate}
        </p>

        <p>
          Travelers:{" "}
          {booking.travelers}
        </p>
      </div>

      {/* AVAILABLE ROOMS */}
      <div className="mt-5">
        <p className="mb-3 text-sm text-zinc-500">
          Assign Room
        </p>

        <div className="flex flex-wrap gap-2">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() =>
                handleAssign(room.id)
              }
              className="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black"
            >
              {room.roomNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}