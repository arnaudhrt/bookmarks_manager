import { googleGetRequest } from "../../api/google_api";
import { useEffect, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // API CALL TO GET SEARCH SUGGESTIONS
  useEffect(() => {
    if (searchValue) {
      googleGetRequest(searchValue).then((res) => {
        setSearchResult(res[1]);
      });
    } else {
      setSearchResult([]);
    }
  }, [searchValue]);

  // FUNCTION THAT DECODE ACCENTS AND SPECIAL CHARACTERS
  const decodeHtmlEntities = (text) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  };

  // FUNCTION THAT DELETE HTML TAGS IN API RESPONSE
  const renderTextWithoutBoldTags = (text) => {
    const decodedText = decodeHtmlEntities(text);
    const textWithoutBoldTags = decodedText.replace(/<\/?b>/g, "");
    return textWithoutBoldTags;
  };

  // STATE THAT OPEN THE COMMAND DIALOG
  const [open, setOpen] = useState(false);

  // FUNCTION THAT OPEN THE COMMAND DIALOG WHEN PRESSING CMD+K
  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // FUNCTION THAT OPEN GOOGLE SEARCH IN A NEW TAB
  const openGoogleSearch = (e) => {
    window.open(`https://www.google.com/search?q=${e}`, "_blank");
    setSearchValue("");
  };
  // FUNCTION THAT OPEN GOOGLE SEARCH IN A NEW TAB WHEN PRESSING ENTER IN THE INPUT
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      openGoogleSearch(searchValue);
    }
  };

  return (
    <>
      <div className="grow max-w-[700px]">
        <div className="relative">
          <Input placeholder="Search on Google or Bookmarks..." onClick={setOpen} />
          <kbd className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search on Google or Bookmarks..." value={searchValue} onValueChange={setSearchValue} onKeyDown={handleKeyDown} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Bookmarks">
            <CommandItem>Comming soon</CommandItem>
            <CommandItem>Commiing soon</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          {searchResult.length === 0 ? null : (
            <>
              <CommandSeparator />
              <CommandGroup heading="Google">
                {searchResult.map((result, index) => (
                  <CommandItem key={index} onSelect={(e) => openGoogleSearch(e)}>
                    {renderTextWithoutBoldTags(result[0])}
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
