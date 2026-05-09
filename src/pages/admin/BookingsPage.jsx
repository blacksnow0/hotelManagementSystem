import { useState } from "react";

import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";

import { createBooking } from "../../services/bookingService";

import useBookings from "../../hooks/useBookings";

import BookingList from "../../components/bookings/BookingList";

export default function BookingsPage() {
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    guestName: "",
    phone: "",
    hotelId: "",
    checkInDate: "",
    checkOutDate: "",
    travelers: 1,
    bookingSource: "",
    totalAmount: "",
    advanceAmount: "",
    notes: "",
  });

  const { bookings, loading: bookingsLoading } = useBookings();

  const totalSteps = 4;

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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

  async function handleSubmit() {
    try {
      setLoading(true);

      await createBooking(formData);

      alert("Booking created");

      setFormData({
        guestName: "",
        phone: "",
        hotelId: "",
        checkInDate: "",
        checkOutDate: "",
        travelers: 1,
        bookingSource: "",
        totalAmount: "",
        advanceAmount: "",
        notes: "",
      });

      setStep(1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "h-14 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 text-base outline-none transition focus:border-emerald-500";

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* ================= MOBILE ================= */}
      {/* ================= MOBILE ================= */}
      <div className="lg:hidden">
        <div className="min-h-screen bg-zinc-950 text-white">
          {/* TOP AREA */}
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

            {/* PROGRESS */}
            <div className="flex gap-2 px-5 pb-5 pt-5">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className={`h-1 flex-1 rounded-full transition ${
                    item <= step ? "bg-white" : "bg-zinc-800"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col justify-start px-6 pb-56 pt-8">
            {/* ================= STEP 1 ================= */}
            {step === 1 && (
              <div>
                <div className="text-center">
                  <h1 className="text-3xl font-bold tracking-tight">
                    Guest Details
                  </h1>

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
                </div>

                {/* TRAVELERS */}
                <div className="mt-16 text-center">
                  <p className="mb-8 text-xs uppercase tracking-[0.3em] text-zinc-500">
                    Travelers
                  </p>

                  <div className="flex items-center justify-center gap-8">
                    <button
                      onClick={() =>
                        setFormData({
                          ...formData,
                          travelers:
                            formData.travelers > 1 ? formData.travelers - 1 : 1,
                        })
                      }
                      className="flex h-16 w-16 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900"
                    >
                      <Minus size={24} />
                    </button>

                    <div className="w-24 text-center text-7xl font-bold leading-none">
                      {formData.travelers}
                    </div>

                    <button
                      onClick={() =>
                        setFormData({
                          ...formData,
                          travelers: formData.travelers + 1,
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

            {/* ================= STEP 2 ================= */}
            {step === 2 && (
              <div>
                <div className="text-center">
                  <h1 className="text-3xl font-bold tracking-tight">
                    Stay Details
                  </h1>

                  <p className="mt-3 text-zinc-500">Reservation dates</p>
                </div>

                <div className="mx-auto mt-10 max-w-sm space-y-5">
                  <div>
                    <label className="mb-3 block text-sm text-zinc-500">
                      Check In
                    </label>

                    <input
                      type="date"
                      name="checkInDate"
                      value={formData.checkInDate}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-3 block text-sm text-zinc-500">
                      Check Out
                    </label>

                    <input
                      type="date"
                      name="checkOutDate"
                      value={formData.checkOutDate}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 3 ================= */}
            {step === 3 && (
              <div>
                <div className="text-center">
                  <h1 className="text-3xl font-bold tracking-tight">
                    Booking Info
                  </h1>

                  <p className="mt-3 text-zinc-500">Hotel and source details</p>
                </div>

                <div className="mx-auto mt-10 max-w-sm">
                  {/* HOTEL ID */}
                  <input
                    type="text"
                    name="hotelId"
                    placeholder="Hotel ID"
                    value={formData.hotelId}
                    onChange={handleChange}
                    className={inputClass}
                  />

                  {/* BOOKING SOURCE */}
                  <div className="mt-10">
                    <p className="mb-4 text-xs uppercase tracking-[0.3em] text-zinc-500">
                      Booking Source
                    </p>

                    <input
                      type="text"
                      name="bookingSource"
                      placeholder="Booking Source"
                      value={formData.bookingSource}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 4 ================= */}
            {step === 4 && (
              <div>
                <div className="text-center">
                  <h1 className="text-3xl font-bold tracking-tight">Payment</h1>

                  <p className="mt-3 text-zinc-500">Final booking details</p>
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

          {/* FLOATING CTA */}
          <div className="fixed bottom-[88px] left-0 right-0 z-30 px-5">
            {step !== totalSteps ? (
              <button
                onClick={nextStep}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-white font-semibold text-black shadow-2xl"
              >
                Next
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="h-14 w-full rounded-2xl bg-emerald-500 font-semibold text-black shadow-2xl disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Booking"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block">
        <div className="mx-auto max-w-7xl p-6">
          <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
            {/* FORM */}
            <div className="sticky top-6 h-fit rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h1 className="mb-6 text-3xl font-bold">Create Booking</h1>

              <div className="space-y-4">
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
                  type="text"
                  name="hotelId"
                  placeholder="Hotel ID"
                  value={formData.hotelId}
                  onChange={handleChange}
                  className={inputClass}
                />

                <div className="grid grid-cols-2 gap-4">
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

                <input
                  type="number"
                  name="travelers"
                  placeholder="Travelers"
                  value={formData.travelers}
                  onChange={handleChange}
                  className={inputClass}
                />

                <input
                  type="text"
                  name="bookingSource"
                  placeholder="Booking Source"
                  value={formData.bookingSource}
                  onChange={handleChange}
                  className={inputClass}
                />

                <div className="grid grid-cols-2 gap-4">
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
                </div>

                <textarea
                  name="notes"
                  placeholder="Notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="min-h-[120px] w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4 outline-none transition focus:border-emerald-500"
                />

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="h-14 w-full rounded-2xl bg-emerald-500 font-semibold text-black disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Booking"}
                </button>
              </div>
            </div>

            {/* BOOKINGS */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Recent Bookings</h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    Live booking activity
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-zinc-400">
                  {bookings.length} bookings
                </div>
              </div>

              {bookingsLoading ? (
                <div className="flex h-40 items-center justify-center text-zinc-500">
                  Loading bookings...
                </div>
              ) : (
                <BookingList bookings={bookings} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
