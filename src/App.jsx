import "./global.css";
import Header from "./components/header/Header";
import { ThemeProvider } from "./components/global/DarkmodeContext";
import AppDock from "./components/app_dock/AppDock";
import ContainerBookmarks from "./components/bookmarks/ContainerBookmarks";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";

export default function App() {
  const [disableMarks, setDisableMarks] = useState(true);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <>
        <Header disableMarks={disableMarks} setDisableMarks={setDisableMarks} />
        <main className="max-w-[1250px] mx-auto flex justify-center flex-col">
          <AppDock disableMarks={disableMarks} setDisableMarks={setDisableMarks} />
          <ContainerBookmarks disableMarks={disableMarks} setDisableMarks={setDisableMarks} />
        </main>
        <Toaster />
      </>
    </ThemeProvider>
  );
}
