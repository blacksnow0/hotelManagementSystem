import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  allowedRole,
}) {
  const { currentUser, loading } =
    useAuth();

  /* AUTH LOADING */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        Loading...
      </div>
    );
  }

  /* NOT LOGGED IN */
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  /* WRONG ROLE */
  if (
    allowedRole &&
    currentUser.role !== allowedRole
  ) {
    return <Navigate to="/" replace />;
  }

  /* ALLOWED */
  return children;
}