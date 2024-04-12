import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { RxPencil1 } from "react-icons/rx";
import { RxTrash } from "react-icons/rx";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Bookmark({
  url,
  name,
  description,
  icon,
  id,
  checkboxValues,
  setCheckboxValues,
  checkboxChange,
  setSelectedBookmark,
  selectedBookmark,
  userFolders,
  setUserFolders,
  selectedFolder,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [editBookmark, setEditBookmark] = useState(false);
  const [editBookmarkName, setEditBookmarkName] = useState(name);
  const [editBookmarkUrl, setEditBookmarkUrl] = useState(url);
  const [editBookmarkDescription, setEditBookmarkDescription] = useState(description);
  const [errorEditBookmark, setErrorEditBookmark] = useState(false);

  console.log(checkboxValues);

  useEffect(() => {
    if (checkboxValues.includes(id)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [checkboxValues]);
  console.log(userFolders);
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="flex gap-2 my-1">
            <Checkbox id={name} className="self-center" onCheckedChange={() => checkboxChange(id)} checked={isChecked} />

            <a
              href={url}
              onContextMenu={() => {
                setSelectedBookmark(id);
              }}
              className={`flex gap-5 hover:bg-accent rounded-sm px-5 py-4 grow ${isChecked ? "bg-accent" : ""}`}
            >
              <div className="flex w-12 h-12 bg-white border border-card-foreground/20 rounded-sm p-1">
                <img src={icon} alt="icon bookmark" className="rounded-sm" />
              </div>
              <div>
                <h3 className="text-md font-medium mb-1">{name}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </a>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            className="flex items-center"
            onSelect={() => {
              setEditBookmark(true);
            }}
          >
            <span className="grow">Edit</span>
            <RxPencil1 className="text-sm ml-2" />
          </ContextMenuItem>
          <ContextMenuItem
            className="flex items-center"
            onSelect={() => {
              setUserFolders((prev) => {
                const folderIndex = prev.findIndex((f) => f.name === selectedFolder.name);
                if (checkboxValues.length > 0) {
                  prev[folderIndex].bookmarks = prev[folderIndex].bookmarks.filter((b) => !checkboxValues.includes(b.id));
                  return [...prev];
                } else {
                  prev[folderIndex].bookmarks = prev[folderIndex].bookmarks.filter((b) => b.id !== id);
                  return [...prev];
                }
              });
              setCheckboxValues([]);
            }}
          >
            <span className="grow">Remove</span>
            <RxTrash className="text-sm ml-2" />
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {/* EDIT BOOKMARK MODAL */}
      <AlertDialog open={editBookmark}>
        <AlertDialogContent className="border boder-boder bg-background">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit a bookmark</AlertDialogTitle>
            <AlertDialogDescription>
              <Separator className="my-5 bg-foreground/90" />
              <div className="mb-4">
                <Label htmlFor="bookmark-name" className="text-xs mb-2 block">
                  Bookmark title
                </Label>
                <Input
                  id="bookmark-name"
                  placeholder="Netflix"
                  className="text-bg_dark placeholder:text-gray-400"
                  onChange={(e) => setEditBookmarkName(e.target.value)}
                  defaultValue={name}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="bookmark-url" className="text-xs mb-2 block">
                  Bookmark URL
                </Label>
                <Input
                  id="bookmark-url"
                  placeholder="https://www.netflix.com/browse"
                  className="text-bg_dark placeholder:text-gray-400"
                  onChange={(e) => setEditBookmarkUrl(e.target.value)}
                  defaultValue={url}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="bookmark-url" className="text-xs mb-2 block">
                  Bookmark Description
                </Label>
                <Input
                  id="bookmark-description"
                  placeholder="Stream your favorite movies and TV shows"
                  className="text-bg_dark placeholder:text-gray-400"
                  onChange={(e) => setEditBookmarkDescription(e.target.value)}
                  defaultValue={description}
                />
              </div>
              {errorEditBookmark ? (
                <Alert variant="destructive" className={`mt-4 "block" "hidden"`}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Form is not valid!</AlertTitle>
                  <AlertDescription className="text-xs">Please fill all the fields correctly.</AlertDescription>
                </Alert>
              ) : null}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* ACTION & CANCEL BUTTON */}
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-app_bg border boder-border hover:text-red-600 hover:bg-bg_input hover:border-red-600"
              onClick={() => {
                setEditBookmark(false);
                setErrorEditBookmark(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="border border-border bg-foreground/90 hover:border-green-800 hover:bg-green-500"
              onClick={() => {
                if (editBookmarkName === "" || editBookmarkUrl === "") {
                  setErrorEditBookmark(true);
                  return;
                }

                setUserFolders((prev) => {
                  const folderIndex = prev.findIndex((f) => f.name === selectedFolder.name);
                  const bookmarkIndex = prev[folderIndex].bookmarks.findIndex((b) => b.id === selectedBookmark);
                  const editedBookmark = {
                    ...prev[folderIndex].bookmarks[bookmarkIndex],
                    title: editBookmarkName,
                    url: editBookmarkUrl,
                    description: editBookmarkDescription,
                  };
                  prev[folderIndex].bookmarks[bookmarkIndex] = editedBookmark;
                  return [...prev];
                });

                setEditBookmark(false);
                setErrorEditBookmark(false);
              }}
            >
              Edit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
