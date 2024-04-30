import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "@/components/ui/popover";
import { IoBookmarksOutline } from "react-icons/io5";
import { BiFolderPlus } from "react-icons/bi";
import { BiBookmarkPlus } from "react-icons/bi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function CreateBlock({ userFolders, setUserFolders }) {
  const folders = userFolders.map((folder) => folder.name);
  const [createBookmark, setCreateBookmark] = useState(false);
  const [openCombobox, setOpenCombobox] = useState(false);
  const [valueCombobox, setValueCombobox] = useState("");
  const [newBookmarkName, setNewBookmarkName] = useState("");
  const [newBookmarkUrl, setNewBookmarkUrl] = useState("");
  const [newBookmarkDescription, setNewBookmarkDescription] = useState("");
  const [errorCreateBookmark, setErrorCreateBookmark] = useState(false);
  console.log(userFolders);
  console.log(valueCombobox);
  const { toast } = useToast();
  const [folderName, setFolderName] = useState("");
  const createFolder = () => {
    const newFolder = {
      name: folderName,
      bookmarks: [],
    };
    setUserFolders([...userFolders, newFolder]);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="flex justify-between items-center border-b border-border px-5 py-3 w-full">
      <div className="flex gap-2 justify-center items-center">
        <IoBookmarksOutline className="h-5 w-5" />
        <h3>Bookmarks</h3>
      </div>
      <div className="flex gap-2">
        {/* CREATE NEW FOLDER  */}
        <Popover
          onOpenChange={() => {
            setFolderName("");
          }}
        >
          <PopoverTrigger>
            {/* CREATE NEW FOLDER BUTTON  */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <BiFolderPlus className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create new folder</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </PopoverTrigger>

          {/* CREATE NEW FOLDER POP UP */}
          <PopoverContent>
            <div className="p-2">
              <h4 className="text-md font-medium ml-1">Create a new folder</h4>
              <Input
                type="text"
                placeholder="Folder name"
                className="w-full rounded-sm px-3 py-2 mt-4"
                onChange={(e) => setFolderName(e.target.value)}
              />
              <PopoverClose>
                <Button
                  onClick={() => {
                    for (let folder of userFolders) {
                      if (folder.name === folderName) {
                        toast({
                          variant: "destructive",
                          title: "Folder already exists!",
                          description: "Please choose another name.",
                        });
                        return;
                      }
                    }
                    if (folderName === "") {
                      return;
                    }
                    createFolder();
                  }}
                  className="mt-3 hover:border-green-800 hover:bg-green-500"
                >
                  Create
                </Button>
              </PopoverClose>
            </div>
          </PopoverContent>
        </Popover>

        {/* CREATE NEW BOOKMARK  */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => setCreateBookmark(true)}>
                <BiBookmarkPlus className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create new bookmark</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* CREATE NEW BOOKMARK MODAL */}
        <AlertDialog open={createBookmark}>
          <AlertDialogContent className="border boder-boder bg-background">
            <AlertDialogHeader>
              <AlertDialogTitle>Create a bookmark</AlertDialogTitle>
              <AlertDialogDescription>
                <Separator className="my-5 bg-foreground/90" />
                <div className="mb-4">
                  <Label htmlFor="bookmark-name" className="text-xs mb-2 block">
                    Bookmark title
                  </Label>
                  <Input
                    id="bookmark-name"
                    placeholder="Netflix"
                    className=" placeholder:text-gray-400"
                    onChange={(e) => setNewBookmarkName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="bookmark-url" className="text-xs mb-2 block">
                    Bookmark URL
                  </Label>
                  <Input
                    id="bookmark-url"
                    placeholder="https://www.netflix.com/browse"
                    className=" placeholder:text-gray-400"
                    onChange={(e) => setNewBookmarkUrl(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="bookmark-url" className="text-xs mb-2 block">
                    Bookmark Description
                  </Label>
                  <Input
                    id="bookmark-description"
                    placeholder="Stream your favorite movies and TV shows"
                    className=" placeholder:text-gray-400"
                    onChange={(e) => setNewBookmarkDescription(e.target.value)}
                  />
                </div>

                {/* SELECT INPUT CHOOSE FOLDER */}
                <div className="mb-4">
                  <p className="text-xs mb-2 block">Folder</p>
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
                  {errorCreateBookmark ? (
                    <Alert variant="destructive" className={`mt-4 "block" "hidden"`}>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Form is not valid!</AlertTitle>
                      <AlertDescription className="text-xs">Please fill all the fields correctly.</AlertDescription>
                    </Alert>
                  ) : null}
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>

            {/* ACTION & CANCEL BUTTON */}
            <AlertDialogFooter>
              <AlertDialogCancel
                className="bg-app_bg border boder-border hover:text-red-600 hover:bg-bg_input hover:border-red-600"
                onClick={() => {
                  setValueCombobox("");
                  setCreateBookmark(false);
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="border border-border bg-foreground/90 hover:border-green-800 hover:bg-green-500"
                onClick={() => {
                  if (valueCombobox === "" || newBookmarkName === "" || newBookmarkUrl === "") {
                    setErrorCreateBookmark(true);
                    return;
                  }
                  // Add new bookmark with the provided values to the selected folder in the userFolders state
                  const newBookmark = {
                    id: uuidv4(),
                    title: newBookmarkName,
                    url: newBookmarkUrl,
                    description: newBookmarkDescription,
                  };
                  // Create a new copy of userFolders with the new bookmark added to the selected folder
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

                  // Update the state with the new userFolders
                  setUserFolders(newUserFolders);

                  setCreateBookmark(false);
                  setValueCombobox("");
                  setErrorCreateBookmark(false);
                }}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
