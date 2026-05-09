import { useEffect, useState } from "react";

import { listenToHotelBookings } from "../services/bookingService";

export default function useHotelBookings(
  hotelId
) {
  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {
    if (!hotelId) return;

    const unsubscribe =
      listenToHotelBookings(
        hotelId,
        (data) => {
          setBookings(data);
        }
      );

    return () => unsubscribe();
  }, [hotelId]);

  return bookings;
}