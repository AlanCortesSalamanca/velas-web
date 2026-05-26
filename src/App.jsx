import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2500,
            style: {
              background: "#fdf8f0",
              color: "#3c4533",
              border: "1px solid #d0d8c2",
              fontSize: "0.875rem",
            },
            success: {
              iconTheme: { primary: "#d88a2a", secondary: "#fdf8f0" },
            },
          }}
        />
        <AppRouter />
      </FavoritesProvider>
    </CartProvider>
  );
}
