import {
  useMemo,
  useState,
} from "react";

import {
  X,
  Check,
  BedDouble,
  Building2,
} from "lucide-react";

import useAvailableRooms from "../../hooks/useAvailableRooms";

import { assignRoom } from "../../services/roomService";

export default function RoomAllocationModal({
  booking,
  onClose,
}) {
  const rooms = useAvailableRooms(
    booking.hotelId
  );

  const [selectedRooms, setSelectedRooms] =
    useState(
      booking.assignedRooms || []
    );

  const [loading, setLoading] =
    useState(false);

  /* ===============================
     GROUP ROOMS BY FLOOR
  =============================== */
  const groupedRooms = useMemo(() => {
    return rooms.reduce((acc, room) => {
      if (!acc[room.floor]) {
        acc[room.floor] = [];
      }

      acc[room.floor].push(room);

      return acc;
    }, {});
  }, [rooms]);

  /* ===============================
     ALLOCATION STATE
  =============================== */
  const allocationComplete =
    selectedRooms.length ===
    booking.roomsRequired;

  const remainingRooms =
    booking.roomsRequired -
    selectedRooms.length;

  /* ===============================
     ROOM SELECT / REMOVE
  =============================== */
  function handleRoomToggle(roomId) {
    const alreadySelected =
      selectedRooms.includes(roomId);

    /* REMOVE */
    if (alreadySelected) {
      setSelectedRooms(
        selectedRooms.filter(
          (id) => id !== roomId
        )
      );

      return;
    }

    /* LIMIT REACHED */
    if (
      selectedRooms.length >=
      booking.roomsRequired
    ) {
      return;
    }

    /* ADD */
    setSelectedRooms([
      ...selectedRooms,
      roomId,
    ]);
  }

  /* ===============================
     CONFIRM ALLOCATION
  =============================== */
  async function handleConfirm() {
    try {
      setLoading(true);

      for (const roomId of selectedRooms) {
        if (
          booking.assignedRooms?.includes(
            roomId
          )
        ) {
          continue;
        }

        await assignRoom({
          roomId,

          bookingId: booking.id,

          guestName: booking.guestName,
        });
      }

      alert(
        "Rooms allocated successfully"
      );

      onClose();
    } catch (error) {
      console.error(error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex bg-black/70 backdrop-blur-sm">
      {/* ================= PANEL ================= */}
      <div className="ml-auto flex h-full w-full max-w-5xl flex-col border-l border-zinc-800 bg-zinc-950 text-white">
        {/* ================= HEADER ================= */}
        <div className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
          <div className="flex items-start justify-between gap-4 p-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Room Allocation
              </h2>

              <p className="mt-2 text-zinc-500">
                {booking.guestName}
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 transition hover:bg-zinc-800"
            >
              <X size={18} />
            </button>
          </div>

          {/* ================= PROGRESS ================= */}
          <div className="px-6 pb-6">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500">
                  Allocation Progress
                </p>

                <p className="mt-1 text-lg font-semibold">
                  {selectedRooms.length}
                  {" / "}
                  {booking.roomsRequired}{" "}
                  rooms selected
                </p>
              </div>

              <div
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  allocationComplete
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-yellow-500/10 text-yellow-400"
                }`}
              >
                {allocationComplete
                  ? "Ready"
                  : `${remainingRooms} remaining`}
              </div>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{
                  width: `${
                    (selectedRooms.length /
                      booking.roomsRequired) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* ================= SELECTED ROOMS ================= */}
        <div className="sticky top-[145px] z-10 border-b border-zinc-800 bg-zinc-950/95 px-6 py-4 backdrop-blur">
          <div className="flex items-center gap-2">
            <Check
              size={16}
              className="text-emerald-400"
            />

            <p className="text-sm font-medium text-zinc-300">
              Selected Rooms
            </p>
          </div>

          {selectedRooms.length === 0 ? (
            <p className="mt-3 text-sm text-zinc-500">
              No rooms selected yet
            </p>
          ) : (
            <div className="mt-4 flex flex-wrap gap-3">
              {selectedRooms.map(
                (roomId) => {
                  const room = rooms.find(
                    (r) => r.id === roomId
                  );

                  return (
                    <button
                      key={roomId}
                      onClick={() =>
                        handleRoomToggle(
                          roomId
                        )
                      }
                      className="flex items-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-black"
                    >
                      <BedDouble size={16} />

                      {
                        room?.roomNumber
                      }

                      <X size={14} />
                    </button>
                  );
                }
              )}
            </div>
          )}
        </div>

        {/* ================= FLOOR ROOMS ================= */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            {Object.entries(groupedRooms)
              .sort(
                ([a], [b]) =>
                  Number(a) -
                  Number(b)
              )
              .map(
                ([floor, floorRooms]) => (
                  <div
                    key={floor}
                    className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5"
                  >
                    {/* FLOOR HEADER */}
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800">
                          <Building2
                            size={22}
                          />
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold">
                            Floor{" "}
                            {floor}
                          </h3>

                          <p className="text-sm text-zinc-500">
                            {
                              floorRooms.length
                            }{" "}
                            available rooms
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ROOMS GRID */}
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                      {floorRooms.map(
                        (room) => {
                          const isSelected =
                            selectedRooms.includes(
                              room.id
                            );

                          const limitReached =
                            selectedRooms.length >=
                            booking.roomsRequired;

                          return (
                            <button
                              key={
                                room.id
                              }
                              onClick={() =>
                                handleRoomToggle(
                                  room.id
                                )
                              }
                              disabled={
                                limitReached &&
                                !isSelected
                              }
                              className={`rounded-2xl border p-4 text-center transition-all ${
                                isSelected
                                  ? "border-emerald-500 bg-emerald-500 text-black"
                                  : limitReached
                                  ? "cursor-not-allowed border-zinc-800 bg-zinc-900 text-zinc-600"
                                  : "border-zinc-700 bg-zinc-950 hover:border-emerald-500 hover:bg-zinc-900"
                              }`}
                            >
                              <div className="flex flex-col items-center">
                                <BedDouble
                                  size={
                                    18
                                  }
                                />

                                <p className="mt-2 text-sm font-semibold">
                                  {
                                    room.roomNumber
                                  }
                                </p>

                                <p className="mt-1 text-xs text-zinc-500">
                                  {
                                    room.type
                                  }
                                </p>
                              </div>
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>
                )
              )}
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="sticky bottom-0 border-t border-zinc-800 bg-zinc-950/95 p-6 backdrop-blur">
          <button
            onClick={handleConfirm}
            disabled={
              !allocationComplete ||
              loading
            }
            className={`h-14 w-full rounded-2xl text-sm font-semibold transition-all ${
              allocationComplete
                ? "bg-emerald-500 text-black hover:opacity-90"
                : "cursor-not-allowed bg-zinc-800 text-zinc-500"
            }`}
          >
            {loading
              ? "Allocating Rooms..."
              : allocationComplete
              ? "Confirm Allocation"
              : `Select ${remainingRooms} More Room${
                  remainingRooms > 1
                    ? "s"
                    : ""
                }`}
          </button>
        </div>
      </div>
    </div>
  );
}