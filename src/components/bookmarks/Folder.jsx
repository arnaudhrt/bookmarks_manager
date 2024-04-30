import { useState, useRef } from "react";
import { CiFolderOn } from "react-icons/ci";
import { useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Folder({ name, counter, selected, onClick, onContextMenu, editFolder, setEditFolder, setUserFolders, index }) {
  const [dragging, setDragging] = useState(false);

  const inputRef = useRef(null);
  const dragNode = useRef(null);
  const dragNodeIndex = useRef(null);

  useEffect(() => {
    if (editFolder === name) {
      setTimeout(() => {
        inputRef.current.focus();
        console.log("focused");
      }, 100);
    }
  }, [editFolder, name]);

  const handleDragStart = (e) => {
    dragNode.current = e.target;
    dragNodeIndex.current = index;
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnd = () => {
    setDragging(false);
    dragNode.current = null;
    dragNodeIndex.current = null;
  };

  const handleDragEnter = (e) => {
    console.log(e.target);
  };

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-sm hover:bg-accent cursor-pointer ${selected} ${dragging ? "opacity-0" : ""}`}
      onClick={onClick}
      onContextMenu={onContextMenu}
      draggable
      onDragStart={(e) => handleDragStart(e)}
      onDragEnd={(e) => handleDragEnd(e)}
      onDragEnter={(e) => {
        handleDragEnter(e);
      }}
    >
      <div className="grow flex items-center gap-2">
        <CiFolderOn className="h-5 w-5" />
        {editFolder === name ? (
          <input
            autoFocus
            ref={inputRef}
            type="text"
            onBlur={() => {
              setEditFolder("");
              setUserFolders((prev) => {
                const index = prev.findIndex((folder) => folder.name === name);
                prev[index].name = inputRef.current.value;
                return [...prev];
              });
            }}
            defaultValue={name}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setEditFolder("");
                // Want to update the folder name in userFolders state
                setUserFolders((prev) => {
                  const index = prev.findIndex((folder) => folder.name === name);
                  prev[index].name = inputRef.current.value;
                  return [...prev];
                });
              }
            }}
            className={`bg-accent border border-accent-foreground/20 rounded px-2 focus-visible:ring-2 focus-visible:ring-bleu-100
    
      `}
          />
        ) : (
          <div className="">{name}</div>
        )}
      </div>
      <span>{counter}</span>
    </div>
  );
}
