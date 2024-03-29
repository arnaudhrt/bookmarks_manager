import SearchBar from "./components/search_bar/SearchBar";
import "./global.css";
import ServicesButtons from "./components/services/ServicesNav";
import MainAppRow from "./components/app_dock/AppDock";

export default function App() {
  return (
    <main className="max-w-screen-xl mx-auto flex justify-center flex-col">
      <SearchBar />
      <ServicesButtons />
      <MainAppRow />
    </main>
  );
}
