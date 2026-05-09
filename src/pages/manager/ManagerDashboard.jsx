import { useAuth } from "../../context/AuthContext";

import useRooms from "../../hooks/useRooms";

import useHotelBookings from "../../hooks/useHotelBookings";

import useCheckedInBookings from "../../hooks/useCheckedInBookings";

import DashboardStats from "../../components/dashboard/DashboardStats";

import PendingBookingCard from "../../components/bookings/PendingBookingCard";

import CurrentGuestCard from "../../components/bookings/CurrentGuestCard";

export default function ManagerDashboard() {
  const { currentUser } = useAuth();

  const { rooms } = useRooms(
    currentUser?.hotelId
  );

  const pendingBookings =
    useHotelBookings(
      currentUser?.hotelId
    );

  const checkedInBookings =
    useCheckedInBookings(
      currentUser?.hotelId
    );

  return (
    <div className="min-h-screen bg-zinc-950 p-4 pb-28">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Hotel Operations
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Daily overview and activity
        </p>
      </div>

      {/* STATS */}
      <DashboardStats
        rooms={rooms}
        pendingBookings={
          pendingBookings
        }
        checkedInBookings={
          checkedInBookings
        }
      />

      {/* PENDING ASSIGNMENTS */}
      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Pending Assignments
        </h2>

        <div className="space-y-4">
          {pendingBookings.map(
            (booking) => (
              <PendingBookingCard
                key={booking.id}
                booking={booking}
              />
            )
          )}
        </div>
      </section>

      {/* CURRENT GUESTS */}
      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Current Guests
        </h2>

        <div className="space-y-4">
          {checkedInBookings.map(
            (booking) => (
              <CurrentGuestCard
                key={booking.id}
                booking={booking}
              />
            )
          )}
        </div>
      </section>
    </div>
  );
}