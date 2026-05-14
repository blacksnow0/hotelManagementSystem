import { useAuth } from "../../context/AuthContext";

import useRooms from "../../hooks/useRooms";

import useHotelBookings from "../../hooks/useHotelBookings";

import useCheckedInBookings from "../../hooks/useCheckedInBookings";

import DashboardStats from "../../components/dashboard/DashboardStats";
import { useState } from "react";

import BookingForm from "../../components/bookings/BookingForm";

import { createBooking } from "../../services/bookingService";


export default function ManagerDashboard() {

  const[loading, setLoading] = useState(false)

  const[formData, setFormData] = useState({
    guestName: "",
    phone: "",
    hotelId: "",
    checkInDate: "",
    checkOutDate: "",
    travelers: "",
    roomsRequired: 1,
    bookingSource: "",
    totalAmount: "",
    advanceAmount: "",
    assignedRooms: [],
    notes: "",
  })

  async function handleSubmit() {
      try {
        setLoading(true);
  
        await createBooking({
          ...formData,
          createdByRole: "manager",
        });
  
        alert("Booking created");
  
        setFormData({
          guestName: "",
          phone: "",
          hotelId: "",
          checkInDate: "",
          checkOutDate: "",
          travelers: 1,
          roomsRequired: "",
          bookingSource: "",
          totalAmount: "",
          advanceAmount: "",
          assignedRooms: [],
          notes: "",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

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
    <div className="min-h-screen  p-4 pb-28">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {currentUser?.hotelId}
        </h1>
        
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

      <div className="lg:hidden">
              <BookingForm
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                loading={loading}
              />
            </div>
    </div>
  );
}