import AdminRoutes from "./routes/AdminRoutes";
import { ThemeProvider } from "@/components/ui/theme-provider";
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AdminRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
