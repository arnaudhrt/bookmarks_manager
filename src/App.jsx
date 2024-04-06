import "./global.css";
import Header from "./components/header/Header";
import { ThemeProvider } from "./components/global/DarkmodeContext";
import AppDock from "./components/app_dock/AppDock";
import ContainerBookmarks from "./components/bookmarks/ContainerBookmarks";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <>
        <Header />
        <main className="max-w-[1250px] mx-auto flex justify-center flex-col">
          <AppDock />
          <ContainerBookmarks />
        </main>
        <Toaster />
      </>
    </ThemeProvider>
  );
}
