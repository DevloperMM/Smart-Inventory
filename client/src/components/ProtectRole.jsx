import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore.js";

function ProtectRole({ children, allowedRoles = [] }) {
  const { user } = useUserStore();

  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role))
    return <Navigate to="/" replace />;

  return children;
}

export default ProtectRole;
