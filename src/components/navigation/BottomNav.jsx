import { Home, BedDouble, Sparkles, User } from "lucide-react";

import { NavLink } from "react-router-dom";

export default function BottomNav() {
  const navItems = [
    {
      label: "Home",
      icon: Home,
      path: "/manager",
    },
    {
      label: "Arrivals",
      icon: BedDouble,
      path: "/manager/arrival",
    },
    {
      label: "Current",
      icon: Sparkles,
      path: "/manager/current",
    },
    {
      label: "Profile",
      icon: User,
      path: "/manager/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-around py-3">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/manager"}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 ${
                  isActive ? "text-emerald-400" : "text-zinc-500"
                }`
              }
            >
              <Icon size={20} />

              <span className="text-xs">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
