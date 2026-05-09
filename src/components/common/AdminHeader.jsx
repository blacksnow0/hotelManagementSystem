export default function AdminHeader() {
  return (
    <div className="border-b border-zinc-800 bg-zinc-950 px-4 py-5 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Hotel Control Center
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Coordinate bookings and
            payments
          </p>
        </div>
      </div>
    </div>
  );
}