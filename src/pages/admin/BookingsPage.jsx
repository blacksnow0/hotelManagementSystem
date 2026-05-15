// src/pages/admin/BookingsPage.jsx

import { useState } from "react";

import { createBooking } from "../../services/bookingService";

// import useBookings from "../../hooks/useBookings";

// import BookingList from "../../components/bookings/BookingList";

import BookingForm from "../../components/bookings/BookingForm";

export default function BookingsPage() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
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
  });

  // const { bookings, loading: bookingsLoading } =
  //   useBookings();

  async function handleSubmit() {
    try {
      setLoading(true);

      await createBooking({
        ...formData,
        createdByRole: "admin",
      });

      alert("Booking created");

      setFormData({
        guestName: "",
        phone: "",
        hotelId: "",
        checkInDate: "",
        checkOutDate: "",
        travelers: 1,
        roomsRequired: 1,
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

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* MOBILE */}
      <div className="lg:hidden">
        <BookingForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block">
        <div className="mx-auto max-w-6xl px-8 py-10">
          {/* HEADER */}
          <div className="mb-5">
            <h1 className="text-5xl font-bold tracking-tight text-white">
              Create Booking
            </h1>
          </div>

          {/* FORM CONTAINER */}
          <div className="rounded-[36px] border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur">
            <BookingForm
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
