import {
  BedDouble,
  CalendarDays,
  Wallet,
  AlertCircle,
} from "lucide-react";
import getTodayDate from "../../utils/getTodayDate";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Today's Bookings",
      value: 18,
      icon: CalendarDays,
    },

    {
      title: "Pending Assignments",
      value: 6,
      icon: AlertCircle,
    },

    {
      title: "Pending Payments",
      value: 4,
      icon: Wallet,
    },

    {
      title: "Occupied Rooms",
      value: 42,
      icon: BedDouble,
    },
  ];

  const hotels = [
    {
      name: "Hotel One",
      occupied: 18,
      available: 7,
      cleaning: 2,
    },

    {
      name: "Hotel Two",
      occupied: 14,
      available: 5,
      cleaning: 1,
    },

    {
      name: "Hotel Three",
      occupied: 10,
      available: 8,
      cleaning: 3,
    },
  ];

  return (
    <div className="space-y-8">
      {/* PAGE HEADER */}
<div className="flex flex-col gap-4 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5 md:flex-row md:items-center md:justify-between md:p-7">
  {/* LEFT */}
  <div>
    <h1 className="text-2xl font-bold tracking-tight text-white md:text-4xl">
      Admin Dashboard
    </h1>

    <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500 md:text-base">
      Monitor bookings, hotels and
      financial operations
    </p>
  </div>

  {/* RIGHT */}
  <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 md:min-w-[220px] md:justify-center md:px-6">
    <div className="md:text-center">
      <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
        Today
      </p>

      <div className="mt-1 text-sm font-semibold text-white md:text-xl">
        {getTodayDate()}
      </div>
    </div>
  </div>
</div>

      {/* STATS */}
      <section>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-500">
                      {stat.title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-white">
                      {stat.value}
                    </h2>
                  </div>

                  <div className="rounded-2xl bg-zinc-950 p-3">
                    <Icon
                      size={22}
                      className="text-emerald-400"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOTEL OVERVIEW */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Hotel Overview
          </h2>

          <span className="text-sm text-zinc-500">
            Live room status
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <div
              key={hotel.name}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5"
            >
              {/* TOP */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">
                  {hotel.name}
                </h3>

                <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                  Active
                </div>
              </div>

              {/* STATS */}
              <div className="mt-6 space-y-4">
                {/* OCCUPIED */}
                <div className="flex items-center justify-between">
                  <p className="text-zinc-500">
                    Occupied
                  </p>

                  <p className="font-semibold text-white">
                    {hotel.occupied}
                  </p>
                </div>

                {/* AVAILABLE */}
                <div className="flex items-center justify-between">
                  <p className="text-zinc-500">
                    Available
                  </p>

                  <p className="font-semibold text-white">
                    {hotel.available}
                  </p>
                </div>

                {/* CLEANING */}
                <div className="flex items-center justify-between">
                  <p className="text-zinc-500">
                    Cleaning
                  </p>

                  <p className="font-semibold text-white">
                    {hotel.cleaning}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OPERATION QUEUES */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Attention Needed
          </h2>

          <span className="text-sm text-zinc-500">
            Pending operational actions
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* PENDING ASSIGNMENTS */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Pending Assignments
                </h3>

                <p className="mt-1 text-sm text-zinc-500">
                  Guests waiting for room
                  allocation
                </p>
              </div>

              <div className="rounded-full bg-yellow-500/10 px-4 py-2 text-yellow-400">
                6
              </div>
            </div>
          </div>

          {/* PENDING PAYMENTS */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Payment Verification
                </h3>

                <p className="mt-1 text-sm text-zinc-500">
                  Payments waiting for admin
                  approval
                </p>
              </div>

              <div className="rounded-full bg-red-500/10 px-4 py-2 text-red-400">
                4
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}