import { Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";

function UserLayout() {
  return (
    <>
      <UserNavbar />

      <main>
        <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-fuchsia-100 to-emerald-100 p-6 pt-10">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default UserLayout;
