import {
  LayoutDashboard,
  BookOpen,
  Wallet,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  const navItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },

    {
      label: "Bookings",
      icon: BookOpen,
      path: "/admin/bookings",
    },

    {
      label: "Payments",
      icon: Wallet,
      path: "/admin/payments",
    },
  ];

  return (
    <aside className="hidden sticky top-0 h-screen w-64 border-r border-zinc-800 bg-zinc-950 lg:flex lg:flex-col">
      {/* HEADER */}
      <div className="border-b border-zinc-800 p-6">
        <h1 className="text-2xl font-bold text-white">
          Admin Panel
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Hotel operations control
        </p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                  isActive
                    ? "bg-emerald-500 text-black"
                    : "text-zinc-400 hover:bg-zinc-900"
                }`
              }
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}