import SearchBar from "./SearchBar";
import LogoBlock from "./LogoBlock";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <div className="flex px-5 py-3 bg-transparent border-b border-border/80 shadow-md justify-around items-center">
      <LogoBlock />
      <SearchBar />
      <DarkModeToggle />
    </div>
  );
}
