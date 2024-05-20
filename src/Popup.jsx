import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "./lib/utils";
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { createRoot } from "react-dom";
import React from "react";
import "./global.css";
import { v4 as uuidv4 } from "uuid";

function Popup() {
  const [openCombobox, setOpenCombobox] = useState(false);
  const [valueCombobox, setValueCombobox] = useState("");

  const [newBookmarkName, setNewBookmarkName] = useState("");
  const [newBookmarkUrl, setNewBookmarkUrl] = useState("");

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const [userFolders, setUserFolders] = useState([]);
  useEffect(() => {
    chrome.storage.local.get("bookmarks", function (result) {
      if (result.bookmarks) {
        setUserFolders(result.bookmarks);
      }
    });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab) {
        setNewBookmarkUrl(activeTab.url);
        setNewBookmarkName(activeTab.title);
      }
    });
  }, []);

  const folders = userFolders.map((folder) => folder.name);

  return (
    <div className="border boder-boder bg-background p-5 w-[400px]">
      <h3 className="text-lg font-bold">Create a bookmark</h3>

      <Separator className="my-5 bg-foreground/90" />
      <div className="mb-4">
        <Label htmlFor="bookmark-name" className="text-sm mb-2 block">
          Bookmark title
        </Label>
        <Input
          id="bookmark-name"
          placeholder="Netflix"
          className=" placeholder:text-gray-400"
          onChange={(e) => setNewBookmarkName(e.target.value)}
          defaultValue={newBookmarkName}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="bookmark-url" className="text-sm mb-2 block">
          Bookmark URL
        </Label>
        <Input
          id="bookmark-url"
          placeholder="https://www.netflix.com/browse"
          className=" placeholder:text-gray-400"
          onChange={(e) => setNewBookmarkUrl(e.target.value)}
          defaultValue={newBookmarkUrl}
        />
      </div>

      {/* SELECT INPUT CHOOSE FOLDER */}
      <div className="mb-4">
        <p className="text-sm mb-2 block">Folder</p>
        <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between text-foreground">
              {valueCombobox ? capitalizeFirstLetter(valueCombobox) : "Select a folder.."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandGroup className="max-h-[350px] ">
                {folders.map((folder, index) => (
                  <CommandItem
                    key={index}
                    value={folder}
                    onSelect={(currentValue) => {
                      setValueCombobox(currentValue);
                      setOpenCombobox(false);
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", capitalizeFirstLetter(valueCombobox) === folder ? "opacity-100" : "opacity-0")} />
                    {folder}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <Button
        className="border border-border bg-foreground/90 hover:border-green-800 hover:bg-green-500 w-full"
        onClick={() => {
          if (newBookmarkName && newBookmarkUrl && valueCombobox) {
            const newBookmark = {
              title: newBookmarkName,
              url: newBookmarkUrl,
              id: uuidv4(),
            };
            const newUserFolders = userFolders.map((folder) => {
              if (folder.name === capitalizeFirstLetter(valueCombobox)) {
                return {
                  ...folder,
                  bookmarks: [...folder.bookmarks, newBookmark],
                };
              } else {
                return folder;
              }
            });
            chrome.storage.local.set({ bookmarks: newUserFolders });
            window.close();
          }
        }}
      >
        Add
      </Button>
    </div>
  );
}

const container = document.getElementById("popup-root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);

export default Popup;
