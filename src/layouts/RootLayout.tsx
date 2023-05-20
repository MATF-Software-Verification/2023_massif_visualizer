import { Outlet } from "react-router-dom";

import Navbar from "@/components/Navbar";

const RootLayout = () => {
  return (
    <div className="app_root">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
