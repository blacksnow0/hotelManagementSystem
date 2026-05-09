import {
  BedDouble,
  CalendarDays,
  Sparkles,
  Plus,
  Home,
  ClipboardList,
  User,
} from "lucide-react";

const rooms = [
  {
    number: "101",
    status: "available",
  },
  {
    number: "102",
    status: "occupied",
    guest: "Rahul Sharma",
    till: "12 May",
  },
  {
    number: "103",
    status: "cleaning",
  },
  {
    number: "104",
    status: "occupied",
    guest: "Aman Verma",
    till: "10 May",
  },
];

export default function Dashboard() {
  const getStatusStyles = (status) => {
    switch (status) {
      case "available":
        return {
          card: "border-emerald-500/20 bg-emerald-500/5",
          badge: "bg-emerald-500/15 text-emerald-400",
          button: "bg-emerald-500 text-black",
        };

      case "occupied":
        return {
          card: "border-red-500/20 bg-red-500/5",
          badge: "bg-red-500/15 text-red-400",
          button: "bg-red-500 text-white",
        };

      case "cleaning":
        return {
          card: "border-yellow-500/20 bg-yellow-500/5",
          badge: "bg-yellow-500/15 text-yellow-300",
          button: "bg-yellow-400 text-black",
        };

      default:
        return {};
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* MAIN MOBILE CONTAINER */}
      <div className="mx-auto max-w-md pb-28">
        {/* HEADER */}
        <div className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
          <div className="px-4 pt-5 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500">
                  Welcome back
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight">
                  Hotel New Urvashi
                </h1>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900">
                <User size={20} />
              </div>
            </div>

            {/* QUICK STATS */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-zinc-900 p-3">
                <div className="flex items-center justify-between">
                  <BedDouble
                    size={18}
                    className="text-emerald-400"
                  />

                  <span className="text-xs text-zinc-500">
                    Free
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-bold">
                  12
                </h2>
              </div>

              <div className="rounded-2xl bg-zinc-900 p-3">
                <div className="flex items-center justify-between">
                  <CalendarDays
                    size={18}
                    className="text-red-400"
                  />

                  <span className="text-xs text-zinc-500">
                    Occupied
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-bold">
                  18
                </h2>
              </div>

              <div className="rounded-2xl bg-zinc-900 p-3">
                <div className="flex items-center justify-between">
                  <Sparkles
                    size={18}
                    className="text-yellow-300"
                  />

                  <span className="text-xs text-zinc-500">
                    Cleaning
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-bold">
                  3
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* TODAY SECTION */}
        <div className="px-4 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Today's Operations
              </h2>

              <p className="text-sm text-zinc-500">
                Live room activity
              </p>
            </div>

            <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black">
              + Booking
            </button>
          </div>
        </div>

        {/* ROOM LIST */}
        <div className="space-y-4 px-4 pt-5">
          {rooms.map((room) => {
            const styles = getStatusStyles(room.status);

            return (
              <div
                key={room.number}
                className={`rounded-3xl border p-4 transition active:scale-[0.98] ${styles.card}`}
              >
                {/* TOP */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-zinc-500">
                      Room
                    </p>

                    <h2 className="mt-1 text-3xl font-bold">
                      {room.number}
                    </h2>
                  </div>

                  <div
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${styles.badge}`}
                  >
                    {room.status}
                  </div>
                </div>

                {/* ROOM CONTENT */}
                <div className="mt-5">
                  {room.status === "occupied" && (
                    <>
                      <p className="text-base font-medium">
                        {room.guest}
                      </p>

                      <p className="mt-1 text-sm text-zinc-500">
                        Till {room.till}
                      </p>
                    </>
                  )}

                  {room.status === "available" && (
                    <p className="text-sm text-zinc-500">
                      Ready for check-in
                    </p>
                  )}

                  {room.status === "cleaning" && (
                    <p className="text-sm text-zinc-500">
                      Housekeeping pending
                    </p>
                  )}
                </div>

                {/* ACTION BUTTON */}
                <button
                  className={`mt-5 w-full rounded-2xl py-3 text-sm font-semibold transition active:scale-[0.98] ${styles.button}`}
                >
                  {room.status === "available" &&
                    "Check-in"}

                  {room.status === "occupied" &&
                    "Check-out"}

                  {room.status === "cleaning" &&
                    "Mark Done"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* FLOATING ACTION */}
      <button className="fixed bottom-24 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 shadow-2xl transition active:scale-90">
        <Plus className="text-black" size={28} />
      </button>

      {/* BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center justify-around py-3">
          <button className="flex flex-col items-center gap-1 text-emerald-400">
            <Home size={20} />
            <span className="text-xs">Home</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-zinc-500">
            <ClipboardList size={20} />
            <span className="text-xs">Bookings</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-zinc-500">
            <BedDouble size={20} />
            <span className="text-xs">Rooms</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-zinc-500">
            <User size={20} />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}