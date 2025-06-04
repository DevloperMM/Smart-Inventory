import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "../store/useUserStore.js";

const RoleRedirect = () => {
  const { user } = useUserStore();
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace />;

  const path = location.pathname;
  const role = user.role;

  if (role === "admin") {
    if (path.startsWith("/admin/") || path.startsWith("/user/"))
      return <Navigate to={path} replace />;

    return <Navigate to={`/admin${path}`} replace />;
  }

  if (path.startsWith("/admin/")) return <Navigate to="/user" replace />;

  if (!path.startsWith("/user/"))
    return <Navigate to={`/user${path}`} replace />;

  return <Navigate to={path} replace />;
};

export default RoleRedirect;
