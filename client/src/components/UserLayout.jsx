import { Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";

function UserLayout() {
  return (
    <>
      <UserNavbar />
      <Outlet />
    </>
  );
}

export default UserLayout;
