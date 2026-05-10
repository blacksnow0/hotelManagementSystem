import { useState } from "react";

import { createRooms } from "../../services/roomService";

export default function RoomGeneratorPage() {
  const [formData, setFormData] =
    useState({
      hotelId: "",

      floor: 1,

      startRoom: 101,

      endRoom: 120,

      capacity: 2,

      type: "Deluxe",
    });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createRooms(formData);

      alert("Rooms created");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Room Generator
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Bulk create hotel rooms
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
      >
        {/* HOTEL */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Hotel
          </label>

          <input
            type="text"
            value={formData.hotelId}
            onChange={(e) =>
              setFormData({
                ...formData,
                hotelId: e.target.value,
              })
            }
            className="w-full rounded-2xl bg-zinc-950 p-4 text-white"
          />
        </div>

        {/* FLOOR */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Floor
          </label>

          <input
            type="number"
            value={formData.floor}
            onChange={(e) =>
              setFormData({
                ...formData,
                floor: Number(
                  e.target.value
                ),
              })
            }
            className="w-full rounded-2xl bg-zinc-950 p-4 text-white"
          />
        </div>

        {/* ROOM RANGE */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Start Room
            </label>

            <input
              type="number"
              value={formData.startRoom}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  startRoom: Number(
                    e.target.value
                  ),
                })
              }
              className="w-full rounded-2xl bg-zinc-950 p-4 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              End Room
            </label>

            <input
              type="number"
              value={formData.endRoom}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  endRoom: Number(
                    e.target.value
                  ),
                })
              }
              className="w-full rounded-2xl bg-zinc-950 p-4 text-white"
            />
          </div>
        </div>

        {/* CAPACITY */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Capacity
          </label>

          <select
            value={formData.capacity}
            onChange={(e) =>
              setFormData({
                ...formData,
                capacity: Number(
                  e.target.value
                ),
              })
            }
            className="w-full rounded-2xl bg-zinc-950 p-4 text-white"
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
          </select>
        </div>

        {/* TYPE */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Room Type
          </label>

          <input
            type="text"
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value,
              })
            }
            className="w-full rounded-2xl bg-zinc-950 p-4 text-white"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full rounded-2xl bg-emerald-500 py-4 font-semibold text-black"
        >
          Generate Rooms
        </button>
      </form>
    </div>
  );
}