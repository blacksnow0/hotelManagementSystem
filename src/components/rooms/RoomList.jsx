import RoomCard from "./RoomCard";

export default function RoomList({
  rooms,
}) {
  return (
    <div className="space-y-4">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
        />
      ))}
    </div>
  );
}