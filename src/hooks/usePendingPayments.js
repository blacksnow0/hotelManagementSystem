import { useEffect, useState } from "react";

import { listenToPendingPayments } from "../services/paymentService";

export default function usePendingPayments() {
  const [payments, setPayments] =
    useState([]);

  useEffect(() => {
    const unsubscribe =
      listenToPendingPayments(
        (data) => {
          setPayments(data);
        }
      );

    return () => unsubscribe();
  }, []);

  return payments;
}