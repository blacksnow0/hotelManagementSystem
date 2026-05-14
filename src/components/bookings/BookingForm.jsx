// src/components/bookings/BookingForm.jsx

import { useState } from "react";

import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";

export default function BookingForm({
  formData,
  setFormData,
  handleSubmit,
  loading,
  hideFields = [],
}) {
  const hotelIds = ["Urvashi", "New_Urvashi", "Dhanvatri"];

  const [step, setStep] = useState(1);

  const totalSteps = 4;

  const inputClass =
    "h-14 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 text-base outline-none transition focus:border-emerald-500";

  function handleChange(e) {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  }

  function nextStep() {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  }

  function prevStep() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* MOBILE */}
      <div className="lg:hidden">
        {/* TOP */}
        <div className="sticky top-0 z-20 border-b border-zinc-900 bg-zinc-950/90 backdrop-blur">
          <div className="flex items-center justify-between px-5 pt-5">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="text-sm text-zinc-500">
              Step {step} of {totalSteps}
            </div>
          </div>

          <div className="flex gap-2 px-5 pb-5 pt-5">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className={`h-1 flex-1 rounded-full ${
                  item <= step ? "bg-white" : "bg-zinc-800"
                }`}
              />
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-6 pb-56 pt-8">
          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <div className="text-center">
                <h1 className="text-3xl font-bold">Guest Details</h1>

                <p className="mt-3 text-zinc-500">Add guest information</p>
              </div>

              <div className="mx-auto mt-10 max-w-sm space-y-4">
                <input
                  type="text"
                  name="guestName"
                  placeholder="Guest Name"
                  value={formData.guestName}
                  onChange={handleChange}
                  className={inputClass}
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                />

                <input
                  type="number"
                  name="travelers"
                  placeholder="Travelers"
                  value={formData.travelers}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* TRAVELERS */}
              <div className="mt-16 text-center">
                <p className="mb-8 text-xs uppercase tracking-[0.3em] text-zinc-500">
                  roomsRequired
                </p>

                <div className="flex items-center justify-center gap-8">
                  <button
                    onClick={() =>
                      setFormData({
                        ...formData,
                        roomsRequired:
                          formData.roomsRequired > 1
                            ? formData.roomsRequired - 1
                            : 1,
                      })
                    }
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900"
                  >
                    <Minus size={24} />
                  </button>

                  <div className="w-24 text-center text-7xl font-bold">
                    {formData.roomsRequired}
                  </div>

                  <button
                    onClick={() =>
                      setFormData({
                        ...formData,
                        roomsRequired: formData.roomsRequired + 1,
                      })
                    }
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900"
                  >
                    <Plus size={24} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <div className="text-center">
                <h1 className="text-3xl font-bold">Stay Details</h1>

                <p className="mt-3 text-zinc-500">Reservation dates</p>
              </div>

              <div className="mx-auto mt-10 max-w-sm space-y-5">
                <input
                  type="date"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleChange}
                  className={inputClass}
                />

                <input
                  type="date"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <div className="text-center">
                <h1 className="text-3xl font-bold">Booking Info</h1>
              </div>

              <div className="mx-auto mt-10 max-w-sm space-y-4">
                {!hideFields.includes("hotelId") && (
                  <select
                    name="hotelId"
                    value={formData.hotelId}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select Hotel</option>

                    {hotelIds.map((hotel) => (
                      <option key={hotel} value={hotel}>
                        {hotel}
                      </option>
                    ))}
                  </select>
                )}

                {!hideFields.includes("bookingSource") && (
                  <input
                    type="text"
                    name="bookingSource"
                    placeholder="Booking Source"
                    value={formData.bookingSource}
                    onChange={handleChange}
                    className={inputClass}
                  />
                )}
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div>
              <div className="text-center">
                <h1 className="text-3xl font-bold">Payment</h1>
              </div>

              <div className="mx-auto mt-10 max-w-sm space-y-4">
                <input
                  type="number"
                  name="totalAmount"
                  placeholder="Total Amount"
                  value={formData.totalAmount}
                  onChange={handleChange}
                  className={inputClass}
                />

                <input
                  type="number"
                  name="advanceAmount"
                  placeholder="Advance Amount"
                  value={formData.advanceAmount}
                  onChange={handleChange}
                  className={inputClass}
                />

                <textarea
                  name="notes"
                  placeholder="Notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="min-h-[140px] w-full rounded-3xl border border-zinc-800 bg-zinc-900 p-5 outline-none transition focus:border-emerald-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="fixed bottom-[88px] left-0 right-0 z-30 px-5">
          {step !== totalSteps ? (
            <button
              onClick={nextStep}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-white font-semibold text-black"
            >
              Next
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="h-14 w-full rounded-2xl bg-emerald-500 font-semibold text-black disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Booking"}
            </button>
          )}
        </div>
      </div>
      {/* DESKTOP */}
      <div className="hidden lg:block">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            {/* ================= LEFT ================= */}
            <div className="rounded-[32px] border border-zinc-800 bg-zinc-900/70 p-8">
              <div className="space-y-10">
                {/* GUEST DETAILS */}
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold">Guest Details</h2>

                    <p className="mt-1 text-sm text-zinc-500">
                      Guest information and traveler count
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      type="text"
                      name="guestName"
                      placeholder="Guest Name"
                      value={formData.guestName}
                      onChange={handleChange}
                      className={inputClass}
                    />

                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  {/* TRAVELERS */}
                  <div className="mt-8">
                    <p className="mb-5 text-sm font-medium text-zinc-400">
                      Rooms Required
                    </p>

                    <div className="flex items-center gap-5">
                      <button
                        onClick={() =>
                          setFormData({
                            ...formData,
                            roomsRequired:
                              formData.roomsRequired > 1
                                ? formData.roomsRequired - 1
                                : 1,
                          })
                        }
                        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-950"
                      >
                        <Minus size={20} />
                      </button>

                      <div className="w-20 text-center text-5xl font-bold">
                        {formData.roomsRequired}
                      </div>

                      <button
                        onClick={() =>
                          setFormData({
                            ...formData,
                            roomsRequired: formData.roomsRequired + 1,
                          })
                        }
                        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-950"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* STAY DETAILS */}
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold">Stay Details</h2>

                    <p className="mt-1 text-sm text-zinc-500">
                      Reservation dates and duration
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      type="date"
                      name="checkInDate"
                      value={formData.checkInDate}
                      onChange={handleChange}
                      className={inputClass}
                    />

                    <input
                      type="date"
                      name="checkOutDate"
                      value={formData.checkOutDate}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* BOOKING INFO */}
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold">Booking Info</h2>

                    <p className="mt-1 text-sm text-zinc-500">
                      Reservation and source information
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {!hideFields.includes("hotelId") && (
                      <select
                        name="hotelId"
                        value={formData.hotelId}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Select Hotel</option>

                        {hotelIds.map((hotel) => (
                          <option key={hotel} value={hotel}>
                            {hotel}
                          </option>
                        ))}
                      </select>
                    )}

                    <input
                      type="number"
                      name="travelers"
                      placeholder="Travelers"
                      value={formData.travelers}
                      onChange={handleChange}
                      className={inputClass}
                    />

                    {!hideFields.includes("bookingSource") && (
                      <input
                        type="text"
                        name="bookingSource"
                        placeholder="Booking Source"
                        value={formData.bookingSource}
                        onChange={handleChange}
                        className={`${inputClass} md:col-span-2`}
                      />
                    )}
                  </div>
                </div>

                {/* PAYMENT */}
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold">Payment</h2>

                    <p className="mt-1 text-sm text-zinc-500">
                      Billing and payment information
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      type="number"
                      name="totalAmount"
                      placeholder="Total Amount"
                      value={formData.totalAmount}
                      onChange={handleChange}
                      className={inputClass}
                    />

                    <input
                      type="number"
                      name="advanceAmount"
                      placeholder="Advance Amount"
                      value={formData.advanceAmount}
                      onChange={handleChange}
                      className={inputClass}
                    />

                    <textarea
                      name="notes"
                      placeholder="Notes"
                      value={formData.notes}
                      onChange={handleChange}
                      className="min-h-[160px] w-full rounded-3xl border border-zinc-800 bg-zinc-950 p-5 outline-none transition focus:border-emerald-500 md:col-span-2"
                    />
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex h-16 w-full items-center justify-center rounded-2xl bg-emerald-500 text-lg font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? "Creating Booking..." : "Create Booking"}
                </button>
              </div>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="sticky top-8 rounded-[32px] border border-zinc-800 bg-zinc-900/50 p-8">
              <h2 className="text-2xl font-bold">Booking Summary</h2>

              <p className="mt-2 text-sm text-zinc-500">
                Quick preview of reservation details
              </p>

              <div className="mt-8 space-y-5">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                  <p className="text-sm text-zinc-500">Guest</p>

                  <h3 className="mt-2 text-xl font-semibold">
                    {formData.guestName || "Guest Name"}
                  </h3>

                  <p className="mt-1 text-zinc-500">
                    {formData.phone || "Phone Number"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                    <p className="text-sm text-zinc-500">Travelers</p>

                    <h3 className="mt-2 text-3xl font-bold">
                      {formData.travelers}
                    </h3>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                    <p className="text-sm text-zinc-500">Rooms</p>

                    <h3 className="mt-2 text-3xl font-bold">
                      {formData.roomsRequired}
                    </h3>
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-zinc-500">Total Amount</p>

                    <p className="text-2xl font-bold">
                      ₹{formData.totalAmount || 0}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-zinc-500">Advance</p>

                    <p className="text-lg font-semibold text-emerald-400">
                      ₹{formData.advanceAmount || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
