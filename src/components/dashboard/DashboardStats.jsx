export default function DashboardStats({
  rooms,
  pendingBookings,

}) {
  const occupiedRooms =
    rooms.filter(
      (room) =>
        room.status === "occupied"
    ).length;

  const availableRooms =
    rooms.filter(
      (room) =>
        room.status === "available"
    ).length;

  const cleaningRooms =
    rooms.filter(
      (room) =>
        room.status === "cleaning"
    ).length;

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* OCCUPIED */}
      <div className="rounded-3xl bg-zinc-900 p-4 text-white">
        <p className="text-sm text-zinc-500">
          OCCUPIED ROOMS
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {occupiedRooms}
        </h2>
      </div>

      {/* AVAILABLE */}
      <div className="rounded-3xl bg-zinc-900 p-4 text-white">
        <p className="text-sm text-zinc-500">
          AVAILABLE ROOMS
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {availableRooms}
        </h2>
      </div>

      {/* CLEANING */}
      <div className="rounded-3xl bg-zinc-900 p-4 text-white">
        <p className="text-sm text-zinc-500">
          CLEANING
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {cleaningRooms}
        </h2>
      </div>

      {/* PENDING */}
      <div className="rounded-3xl bg-zinc-900 p-4 text-white">
        <p className="text-sm text-zinc-500">
          PENDING BOOKINGS
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {pendingBookings.length}
        </h2>
      </div>
    </div>
  );
}