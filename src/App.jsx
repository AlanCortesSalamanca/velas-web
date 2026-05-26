import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fdf8f0",
            color: "#3c4533",
            border: "1px solid #d0d8c2",
          },
        }}
      />
      <AppRouter />
    </>
  );
}
