// import { Navigate } from "react-router-dom";
// import { useAuth } from "../contexts/Auth";

// export default function Protected({ children, roles }) {
//   const { user, booted } = useAuth();

//   if (!booted) {
//     console.log("not booted");
//     return null;
//   }

//   if (!user) {
//     console.log("no user");
//     return <Navigate to="/login" replace />;
//   }

//   if (roles?.length && !user.roles?.some((r) => roles.includes(r))) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }

// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

export default function Protected({ children, roles }) {
  const { user, booted } = useAuth();

  if (!booted) {
    // a simple skeleton; replace with your app’s loader
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="animate-pulse text-red/70">Loading…</div>
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  if (roles?.length && !user.roles?.some((r) => roles.includes(r))) {
    return <Navigate to="/" replace />;
  }

  return children;
}
