import "./global.css";
import Header from "./components/header/Header";
import { ThemeProvider } from "./components/global/DarkmodeContext";
import AppDock from "./components/app_dock/AppDock";
import ContainerBookmarks from "./components/bookmarks/ContainerBookmarks";
import { Toaster } from "@/components/ui/toaster";
import { Auth0Provider } from "@auth0/auth0-react";

export default function App() {
  return (
    <Auth0Provider
      domain="dev-6alpheo41a17q3k4.us.auth0.com"
      clientId="989dpWWWCUl8RmfA7qtrpXb0cgIfzi34"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
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
    </Auth0Provider>
  );
}
