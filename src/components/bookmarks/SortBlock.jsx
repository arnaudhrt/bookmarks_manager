import { Button } from "@/components/ui/button";
import { LuImport } from "react-icons/lu";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { RxTrash } from "react-icons/rx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function SortBlock({
  importBookmarks,
  isImported,
  setIsImported,
  userFolders,
  checkboxValues,
  selectedFolder,
  setUserFolders,
  setCheckboxValues,
  checkboxChange,
}) {
  const [openCombobox, setOpenCombobox] = useState(false);
  const [valueCombobox, setValueCombobox] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const folders = userFolders.map((folder) => folder.name);

  // Move selected bookmarks to the selected folder
  const moveBookmarkToFolder = (folder) => {
    const selectedBookmarks = selectedFolder.bookmarks.filter((bookmark) => checkboxValues.includes(bookmark.id));
    setUserFolders((prev) => {
      const indexNew = prev.findIndex((f) => f.name === folder);
      const currentIndex = prev.findIndex((f) => f.name === selectedFolder.name);
      // If the selected folder is the same as the new folder, return
      if (indexNew === currentIndex) return [...prev];
      // Remove selected bookmarks from the current folder
      prev[currentIndex].bookmarks = prev[currentIndex].bookmarks.filter((bookmark) => !checkboxValues.includes(bookmark.id));
      // Add selected bookmarks to the new folder
      prev[indexNew].bookmarks = [...prev[indexNew].bookmarks, ...selectedBookmarks];
      return [...prev];
    });
    setValueCombobox("");
    setIsChecked(false);
  };

  // Reset the checkboxes state when the selected folder changes
  useEffect(() => {
    setCheckboxValues([]);
    setValueCombobox("");
    setIsChecked(false);
  }, [selectedFolder]);

  return (
    <div className="px-5 py-3 border-b border-border flex justify-between ">
      <div className="flex gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Checkbox
                className="self-center"
                checked={isChecked}
                onCheckedChange={() => {
                  if (selectedFolder.bookmarks.length > 0) setIsChecked(!isChecked);
                  checkboxChange(selectedFolder.bookmarks.map((bookmark) => bookmark.id));
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Select all</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between min-w-36">
              {valueCombobox ? valueCombobox : "Move to ..."}
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
                    onSelect={() => {
                      setValueCombobox(folder);
                      setOpenCombobox(false);
                      moveBookmarkToFolder(folder);
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", valueCombobox === folder ? "opacity-100" : "opacity-0")} />
                    {folder}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setUserFolders((prev) => {
                    const folderIndex = prev.findIndex((f) => f.name === selectedFolder.name);
                    prev[folderIndex].bookmarks = prev[folderIndex].bookmarks.filter((b) => !checkboxValues.includes(b.id));
                    return [...prev];
                  });
                  setCheckboxValues([]);
                }}
                className={`p-2 flex justify-center items-center transition`}
              >
                <RxTrash className="h-5 w-5 font-black" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                importBookmarks();
                setIsImported(true);
              }}
              className={`p-2 flex justify-center items-center transition ${isImported ? "hidden" : "flex"}`}
            >
              <LuImport className="h-5 w-5 font-black" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Import bookmarks from your browser</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
