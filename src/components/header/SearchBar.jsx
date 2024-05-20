import { useEffect, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { defaultFolders } from "../../data/defaultFolders";

export default function SearchBar() {
  const [userFolders, setUserFolders] = useState([]);

  useEffect(() => {
    // PROD
    chrome.storage.local.get("bookmarks", function (result) {
      if (result.bookmarks) {
        setUserFolders(result.bookmarks);
      } else {
        setUserFolders(defaultFolders);
      }
    });

    // setUserFolders(defaultFolders); //DEV
  }, []);

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
  return (
    <>
      <div className="grow max-w-[700px]">
        <div className="relative">
          <Input placeholder="Search Bookmarks..." onClick={setOpen} />
          <kbd className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search Bookmarks..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Bookmarks">
            {userFolders.map((folder) =>
              folder.bookmarks.map((bookmark) => {
                return (
                  <CommandItem key={bookmark.id} onSelect={() => window.open(bookmark.url, "_blank")} className="grow">
                    <div className="flex gap-3 items-center">
                      <div className="flex w-6 h-6 bg-white border border-card-foreground/20 rounded-[5px] p-1">
                        <img src={`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=180`} alt="icon bookmark" />
                      </div>
                      {bookmark.title}
                    </div>
                  </CommandItem>
                );
              })
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
