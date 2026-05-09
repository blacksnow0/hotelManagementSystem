import { LogOut, Hotel, Shield } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
  const { currentUser, logout } =
    useAuth();

  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-4 pb-28 text-white">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Profile
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Manage your account and hotel
          access
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-5 shadow-2xl">
        {/* AVATAR */}
        <div className="flex flex-col items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500 text-3xl font-bold text-black">
            {currentUser?.email?.[0]
              ?.toUpperCase()}
          </div>

          <h2 className="mt-4 text-xl font-semibold">
            {currentUser?.email}
          </h2>

          <div className="mt-3 rounded-full bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-400">
            Manager
          </div>
        </div>

        {/* INFO */}
        <div className="mt-8 space-y-4">
          {/* HOTEL */}
          <div className="flex items-center justify-between rounded-2xl bg-zinc-950 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-zinc-900 p-3">
                <Hotel
                  size={20}
                  className="text-emerald-400"
                />
              </div>

              <div>
                <p className="text-sm text-zinc-500">
                  Hotel
                </p>

                <p className="font-medium">
                  {currentUser?.hotelId}
                </p>
              </div>
            </div>
          </div>

          {/* ROLE */}
          <div className="flex items-center justify-between rounded-2xl bg-zinc-950 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-zinc-900 p-3">
                <Shield
                  size={20}
                  className="text-blue-400"
                />
              </div>

              <div>
                <p className="text-sm text-zinc-500">
                  Access Role
                </p>

                <p className="font-medium">
                  Manager
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 py-4 font-semibold text-white transition active:scale-[0.98]"
        >
          <LogOut size={18} />

          Logout
        </button>
      </div>
    </div>
  );
}