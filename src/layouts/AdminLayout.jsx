import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/navigation/AdminSidebar";

import AdminBottomNav from "../components/navigation/AdminBottomNav";

// import AdminHeader from "../components/common/AdminHeader";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="flex">
        {/* DESKTOP SIDEBAR */}
        <AdminSidebar />

        {/* MAIN CONTENT */}
        <div className="flex min-h-screen flex-1 flex-col">
          {/* HEADER */}
          {/* <AdminHeader /> */}

          {/* PAGE CONTENT */}
          <main className="flex-1 p-4 pb-28 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>

      {/* MOBILE NAV */}
      <AdminBottomNav />
    </div>
  );
}