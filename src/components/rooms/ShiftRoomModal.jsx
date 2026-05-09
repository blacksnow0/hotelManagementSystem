import useAvailableRooms from "../../hooks/useAvailableRooms";

import { shiftRoom } from "../../services/roomService";

export default function ShiftRoomModal({
  room,
  onClose,
}) {
  const rooms = useAvailableRooms(
    room.hotelId
  );

  async function handleShift(
    newRoomId
  ) {
    try {
      await shiftRoom({
        oldRoomId: room.id,

        newRoomId,
      });

      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/60">
      <div className="w-full rounded-t-[32px] bg-zinc-950 p-5 text-white">
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Shift Room
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Move guest from Room{" "}
              {room.roomNumber}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-500"
          >
            Close
          </button>
        </div>

        {/* AVAILABLE ROOMS */}
        <div className="space-y-3">
          {rooms.map((availableRoom) => (
            <button
              key={availableRoom.id}
              onClick={() =>
                handleShift(
                  availableRoom.id
                )
              }
              className="w-full rounded-2xl bg-zinc-900 p-4 text-left"
            >
              Room{" "}
              {availableRoom.roomNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}