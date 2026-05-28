import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 2500,
              style: {
                background: "rgba(255, 255, 255, 0.8)",
                color: "#3e4a33",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                fontSize: "0.875rem",
                borderRadius: "1rem",
                backdropFilter: "blur(16px)",
                boxShadow: "0 8px 32px rgba(60, 69, 51, 0.1)",
              },
              success: {
                iconTheme: { primary: "#d46a2e", secondary: "#fefcf7" },
              },
            }}
          />
          <AppRouter />
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}
