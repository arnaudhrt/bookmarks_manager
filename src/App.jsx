import SearchBar from "./components/search_bar/SearchBar";
import "./global.css";
import ServicesButtons from "./components/services/ServicesButtons";
import MainAppRow from "./components/main_apps_row/MainAppRow";

export default function App() {
  return (
    <main className="max-w-screen-xl mx-auto flex justify-center flex-col">
      <SearchBar />
      <ServicesButtons />
      <MainAppRow />
    </main>
  );
}
