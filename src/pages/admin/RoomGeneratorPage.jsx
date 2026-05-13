import { useState } from "react";

import {
  Plus,
  Trash2,
  BedDouble,
} from "lucide-react";

import { createRooms } from "../../services/roomService";

export default function RoomGeneratorPage() {
  const [hotelId, setHotelId] =
    useState("");

  const [floor, setFloor] =
    useState(1);

  const [rooms, setRooms] =
    useState([
      {
        roomNumber: "101",
        capacity: 2,
        type: "Standard",
      },
    ]);

  const [loading, setLoading] =
    useState(false);

  /* ================= ADD ROOM ================= */
  function addRoom() {
    setRooms([
      ...rooms,
      {
        roomNumber: "",
        capacity: 2,
        type: "Standard",
      },
    ]);
  }

  /* ================= REMOVE ROOM ================= */
  function removeRoom(index) {
    const updatedRooms = [...rooms];

    updatedRooms.splice(index, 1);

    setRooms(updatedRooms);
  }

  /* ================= UPDATE ROOM ================= */
  function updateRoom(
    index,
    field,
    value
  ) {
    const updatedRooms = [...rooms];

    updatedRooms[index][field] =
      value;

    setRooms(updatedRooms);
  }

  /* ================= SUBMIT ================= */
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const formattedRooms =
        rooms.map((room) => ({
          hotelId,

          floor,

          roomNumber:
            room.roomNumber,

          capacity:
            room.capacity,

          type: room.type,
        }));

      await createRooms(
        formattedRooms
      );

      alert("Rooms created");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-2">
      {/* ================= HEADER ================= */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Room Generator
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Create and customize hotel
          rooms in bulk
        </p>
      </div>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* ================= HOTEL INFO ================= */}
        <div className="rounded-[28px] border border-zinc-800 bg-zinc-900/80 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            {/* HOTEL ID */}
            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Hotel ID
              </label>

              <input
                type="text"
                value={hotelId}
                onChange={(e) =>
                  setHotelId(
                    e.target.value
                  )
                }
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-white outline-none transition focus:border-emerald-500"
              />
            </div>

            {/* FLOOR */}
            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Floor
              </label>

              <input
                type="number"
                value={floor}
                onChange={(e) =>
                  setFloor(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-white outline-none transition focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* ================= ROOM LIST ================= */}
        <div className="rounded-[28px] border border-zinc-800 bg-zinc-900/80 p-5">
          {/* HEADER */}
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">
                Rooms
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Add and customize room
                inventory
              </p>
            </div>

            <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-400">
              {rooms.length} Rooms
            </div>
          </div>

          {/* ROOM ROWS */}
          <div className="space-y-4">
            {rooms.map(
              (room, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4"
                >
                  {/* MOBILE TOP */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                        <BedDouble
                          size={20}
                        />
                      </div>

                      <div>
                        <p className="font-semibold text-white">
                          Room{" "}
                          {index + 1}
                        </p>

                        <p className="text-xs text-zinc-500">
                          Configure
                          room
                          details
                        </p>
                      </div>
                    </div>

                    {rooms.length >
                      1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeRoom(
                            index
                          )
                        }
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 transition hover:bg-red-500/20"
                      >
                        <Trash2
                          size={18}
                        />
                      </button>
                    )}
                  </div>

                  {/* INPUTS */}
                  <div className="grid gap-4 md:grid-cols-3">
                    {/* ROOM NUMBER */}
                    <div>
                      <label className="mb-2 block text-sm text-zinc-400">
                        Room Number
                      </label>

                      <input
                        type="text"
                        value={
                          room.roomNumber
                        }
                        onChange={(e) =>
                          updateRoom(
                            index,
                            "roomNumber",
                            e.target
                              .value
                          )
                        }
                        className="w-full rounded-2xl border border-zinc-800 bg-black/40 p-4 text-white outline-none transition focus:border-emerald-500"
                      />
                    </div>

                    {/* CAPACITY */}
                    <div>
                      <label className="mb-2 block text-sm text-zinc-400">
                        Capacity
                      </label>

                      <select
                        value={
                          room.capacity
                        }
                        onChange={(e) =>
                          updateRoom(
                            index,
                            "capacity",
                            Number(
                              e.target
                                .value
                            )
                          )
                        }
                        className="w-full rounded-2xl border border-zinc-800 bg-black/40 p-4 text-white outline-none transition focus:border-emerald-500"
                      >
                        <option value={1}>
                          Single
                        </option>

                        <option value={2}>
                          Double
                        </option>

                        <option value={3}>
                          Triple
                        </option>

                        <option value={4}>
                          Quad
                        </option>

                        <option value={5}>
                          Five Bed
                        </option>
                      </select>
                    </div>

                    {/* TYPE */}
                    <div>
                      <label className="mb-2 block text-sm text-zinc-400">
                        Room Type
                      </label>

                      <input
                        type="text"
                        value={
                          room.type
                        }
                        onChange={(e) =>
                          updateRoom(
                            index,
                            "type",
                            e.target
                              .value
                          )
                        }
                        className="w-full rounded-2xl border border-zinc-800 bg-black/40 p-4 text-white outline-none transition focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {/* ADD BUTTON */}
          <button
            type="button"
            onClick={addRoom}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/50 py-4 text-sm font-medium text-zinc-400 transition hover:border-emerald-500 hover:text-emerald-400"
          >
            <Plus size={18} />
            Add Another Room
          </button>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="flex h-14 w-full items-center justify-center rounded-2xl bg-emerald-500 font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Generating Rooms..."
            : "Generate Rooms"}
        </button>
      </form>
    </div>
  );
}