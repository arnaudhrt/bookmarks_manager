import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { RxPencil1 } from "react-icons/rx";
import { RxTrash } from "react-icons/rx";
import Folder from "./Folder";
import { useEffect, useState } from "react";

export default function FolderBlock({ userFolders, setUserFolders, selectedFolder, setSelectedFolder }) {
  const [editFolder, setEditFolder] = useState("");

  useEffect(() => {}, [userFolders]);

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="p-3 flex flex-col gap-1">
            <div className="h-[1px] w-full"></div>
            {userFolders.map((folder) => (
              <Folder
                key={folder.id}
                name={folder.name}
                counter={folder.bookmarks.length}
                onClick={() => setSelectedFolder(folder)}
                selected={selectedFolder.name === folder.name ? "bg-accent" : ""}
                onContextMenu={() => {
                  setSelectedFolder(folder);
                }}
                editFolder={editFolder}
                setEditFolder={setEditFolder}
                setUserFolders={setUserFolders}
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
              setSelectedFolder(userFolders[0]);
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
