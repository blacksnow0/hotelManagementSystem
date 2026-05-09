import {
  LayoutDashboard,
  BookOpen,
  Wallet,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function AdminBottomNav() {
  const navItems = [
    {
      label: "Home",
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
    <div className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur lg:hidden">
      <div className="flex items-center justify-around py-3">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 ${
                  isActive
                    ? "text-emerald-400"
                    : "text-zinc-500"
                }`
              }
            >
              <Icon size={20} />

              <span className="text-xs">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}