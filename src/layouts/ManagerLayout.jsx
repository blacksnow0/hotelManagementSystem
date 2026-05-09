import { Outlet } from "react-router-dom";


import BottomNav from "../components/navigation/BottomNav";
// import MobileBottomNav from "../components/navigation/MobileBottomNav";


export default function ManagerLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Outlet />

      {/* <MobileBottomNav/> */}
      <BottomNav/>
    </div>
  );
}