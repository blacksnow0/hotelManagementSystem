import BookingCard from "./BookingCard";

export default function BookingList({
  bookings,
}) {
  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
        />
      ))}
    </div>
  );
}