import { useAuthStore } from "@/stores/auth.store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const AppAuthGuard = () => {
  const authStore = useAuthStore();
  const location = useLocation();
  const is_expired = authStore.expires_at
    ? new Date(authStore.expires_at * 1000) < new Date()
    : true;

  return authStore.access_token && !is_expired ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
