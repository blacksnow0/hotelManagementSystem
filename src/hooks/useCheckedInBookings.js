import { useEffect, useState } from "react";

import { listenToCheckedInBookings } from "../services/bookingService";

export default function useCheckedInBookings(
  hotelId
) {
  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {
    if (!hotelId) return;

    const unsubscribe =
      listenToCheckedInBookings(
        hotelId,
        (data) => {
          setBookings(data);
        }
      );

    return () => unsubscribe();
  }, [hotelId]);

  return bookings;
}