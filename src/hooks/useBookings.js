import { useEffect, useState } from "react";

import { listenToBookings } from "../services/bookingService";

export default function useBookings(
  hotelId
) {
  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!hotelId) return;

    async function fetchBookings() {
      try {
        setLoading(true);

        const data =
          await listenToBookings(
            hotelId
          );

        setBookings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [hotelId]);

  return {
    bookings,
    loading,
  };
}