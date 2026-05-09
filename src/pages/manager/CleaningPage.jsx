import { useAuth } from "../../context/AuthContext";

import useRooms from "../../hooks/useRooms";

import RoomList from "../../components/rooms/RoomList";

export default function CleaningPage() {
  const { currentUser } = useAuth();

  const { rooms } = useRooms(
    currentUser?.hotelId
  );

  const cleaningRooms = rooms.filter(
    (room) =>
      room.status === "cleaning"
  );

  return (
    <div className="min-h-screen bg-zinc-950 p-4 pb-28">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Cleaning Queue
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Rooms waiting for cleaning
        </p>
      </div>

      <RoomList
        rooms={cleaningRooms}
      />
    </div>
  );
}