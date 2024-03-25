import SearchBar from "./components/SearchBar";
import "./app.css";
import ServicesButtons from "./components/ServicesButtons";
import MainApp from "./components/MainApp";

export default function App() {
  return (
    <main className="container">
      <SearchBar />
      <ServicesButtons />
      <MainApp />
    </main>
  );
}
