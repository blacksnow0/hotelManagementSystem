import { useEffect, useState } from "react";

import { listenToRooms } from "../services/roomService";

export default function useRooms(hotelId) {
  const [rooms, setRooms] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!hotelId) return;

    const unsubscribe = listenToRooms(
      hotelId,
      (data) => {
        setRooms(data);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [hotelId]);

  return {
    rooms,
    loading,
  };
}