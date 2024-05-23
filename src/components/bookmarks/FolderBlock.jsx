import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { RxPencil1 } from "react-icons/rx";
import { RxTrash } from "react-icons/rx";
import Folder from "./Folder";
import { useState } from "react";

export default function FolderBlock({ userFolders, setUserFolders, selectedFolder, setSelectedFolder }) {
  const [editFolder, setEditFolder] = useState("");
  const [draggedFolder, setDraggedFolder] = useState(null);
  const [dragging, setDragging] = useState(null);

  // Update the index of the folders after a folder is removed
  const updateIndexFolder = () => {
    setUserFolders((prev) => {
      prev.forEach((folder, index) => {
        folder.index = index;
      });
      return [...prev];
    });
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="p-3 flex flex-col gap-1" onDragOver={(e) => e.preventDefault()} onDragLeave={() => setDragging(null)}>
            {userFolders.map((folder) => (
              <Folder
                index={folder.index}
                key={folder.id}
                name={folder.name}
                counter={folder.bookmarks.length}
                onClick={() => {
                  setSelectedFolder(folder);
                }}
                selected={selectedFolder.name === folder.name ? "bg-accent" : ""}
                onContextMenu={() => {
                  setSelectedFolder(folder);
                }}
                editFolder={editFolder}
                setEditFolder={setEditFolder}
                setUserFolders={setUserFolders}
                userFolders={userFolders}
                setDraggedFolder={setDraggedFolder}
                draggedFolder={draggedFolder}
                setDragging={setDragging}
                dragging={dragging}
                setSelectedFolder={setSelectedFolder}
              />
            ))}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="border border-border bg-background">
          <ContextMenuItem
            className="flex items-center"
            onSelect={() => {
              setEditFolder(userFolders.find((folder) => folder.name === selectedFolder.name).name);
            }}
          >
            <span className="grow">Edit</span>
            <RxPencil1 className="text-sm ml-2" />
          </ContextMenuItem>
          <ContextMenuItem
            className="flex items-center"
            onSelect={() => {
              setUserFolders(userFolders.filter((folder) => folder.name !== selectedFolder.name));
              setSelectedFolder({ name: "", bookmarks: [] });
              updateIndexFolder();
            }}
          >
            <span className="grow">Remove</span>
            <RxTrash className="text-sm ml-2" />
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}
