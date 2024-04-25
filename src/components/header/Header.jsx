import SearchBar from "./SearchBar";
import LogoBlock from "./LogoBlock";
import DarkModeToggle from "./DarkModeToggle";
import Profile from "./Profile";
import Pro from "./Pro";

export default function Header() {
  return (
    <div className="flex px-5 py-3 bg-transparent border-b border-border/80 shadow-md justify-around items-center">
      <LogoBlock />
      <SearchBar />
      <div className="flex gap-2">
        <DarkModeToggle />
        <Profile />
        <Pro />
      </div>
    </div>
  );
}
