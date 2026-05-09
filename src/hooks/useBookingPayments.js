import { useEffect, useState } from "react";

import { listenToBookingPayments } from "../services/paymentService";

export default function useBookingPayments(
  bookingId
) {
  const [payments, setPayments] =
    useState([]);

  useEffect(() => {
    if (!bookingId) return;

    const unsubscribe =
      listenToBookingPayments(
        bookingId,
        (data) => {
          setPayments(data);
        }
      );

    return () => unsubscribe();
  }, [bookingId]);

  return payments;
}