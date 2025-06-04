import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function AdminLayout() {
  return (
    <div className="flex h-screen font-[Inter]">
      <div className="fixed inset-y-0 left-0 w-56 z-20">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col ml-56">
        <div className="sticky top-0 z-10">
          <Navbar />
        </div>
        <main className="flex-1 p-4 overflow-x-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
