import { Navigate, useLocation, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

function AuthLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-5"
      >
        <div className="relative">
          <div className="h-10 w-10 rounded-full border-[3px] border-terra-200/60 border-t-terra-500 animate-spin" />
          <div className="absolute inset-0 h-10 w-10 rounded-full border-[3px] border-transparent border-b-terra-300/30 animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-sage-500">Verifying session</p>
          <p className="text-[11px] text-sage-400 mt-0.5">Please wait a moment</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <AuthLoading />;
  }

  if (!isAuthenticated) {
    console.log("[ProtectedRoute] Redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log("[ProtectedRoute] User authenticated");
  return children || <Outlet />;
}
