import { useMemo, useState } from "react";

import { useAuth } from "../../context/AuthContext";

import useRooms from "../../hooks/useRooms";

import RoomList from "../../components/rooms/RoomList";

export default function RoomsPage() {
  const { currentUser } = useAuth();

  const { rooms } = useRooms(currentUser?.hotelId);

  const [roomFilter, setRoomFilter] = useState("all");
  

  const filteredRooms = useMemo(() => {
    if (roomFilter === "all") {
      return rooms;
    }

    return rooms.filter((room) => room.status === roomFilter);
  }, [rooms, roomFilter]);

  return (
    <div className="min-h-screen bg-zinc-950 p-4 pb-28">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Rooms</h1>

        <p className="mt-2 text-sm text-zinc-500">Manage room occupancy</p>
      </div>

      {/* FILTERS */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
        {["all", "available", "reserved", "occupied", "cleaning"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setRoomFilter(status)}
              className={`rounded-2xl px-4 py-2 text-sm font-medium capitalize whitespace-nowrap ${
                roomFilter === status
                  ? "bg-emerald-500 text-black"
                  : "bg-zinc-900 text-zinc-400"
              }`}
            >
              {status}
            </button>
          ),
        )}
      </div>

      {/* ROOMS */}
      <div className="space-y-8">
        {[...new Set(filteredRooms.map((room) => room.floor))]
          .sort((a, b) => a - b)
          .map((floor) => {
            const floorRooms = filteredRooms.filter(
              (room) => room.floor === floor,
            );

            return (
              <section key={floor}>
                {/* FLOOR HEADER */}
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">
                    Floor {floor}
                  </h2>

                  <span className="text-sm text-zinc-500">
                    {floorRooms.length} rooms
                  </span>
                </div>

                {/* ROOMS */}
                <RoomList rooms={floorRooms} />
              </section>
            );
          })}
      </div>
    </div>
  );
}
