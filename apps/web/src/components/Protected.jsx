import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

export default function Protected({ children, roles }) {
  const { user, booted } = useAuth();

  if (!booted) {
    console.log("not booted");
    return null;
  }

  if (!user) {
    console.log("no user");
    return <Navigate to="/login" replace />;
  }

  if (roles?.length && !user.roles?.some((r) => roles.includes(r))) {
    return <Navigate to="/" replace />;
  }

  return children;
}
