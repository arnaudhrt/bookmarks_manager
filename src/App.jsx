import "./global.css";
import Header from "./components/header/Header";
import { ThemeProvider } from "./components/global/DarkmodeContext";
import AppDock from "./components/app_dock/AppDock";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <>
        <Header />
        <main className="max-w-screen-xl mx-auto flex justify-center flex-col"></main>
        <AppDock />
      </>
    </ThemeProvider>
  );
}
