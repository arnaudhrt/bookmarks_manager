import { useRef } from "react";
import { CiFolderOn } from "react-icons/ci";
import { useEffect } from "react";

export default function Folder({
  name,
  counter,
  selected,
  onClick,
  onContextMenu,
  editFolder,
  setEditFolder,
  setUserFolders,
  index,
  userFolders,
  draggedFolder,
  setDraggedFolder,
  setDragging,
  dragging,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (editFolder === name) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [editFolder, name]);

  const handleDragStart = () => {
    setDraggedFolder(userFolders[index]);
    setTimeout(() => {
      setDragging(name);
    }, 0);
  };

  const handleDragEnd = () => {
    setDragging(null);
  };

  const handleDragEnter = () => {
    if (draggedFolder === null) {
      return;
    }
    setUserFolders((prev) => {
      if (draggedFolder.index === index) {
        return [...prev];
      }
      prev.splice(draggedFolder.index, 1);
      prev.splice(index, 0, draggedFolder);
      prev.forEach((folder, index) => {
        folder.index = index;
      });
      return [...prev];
    });
  };

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-sm hover:bg-accent cursor-pointer ${dragging === null ? selected : ""} ${
        dragging === name ? "opacity-0" : ""
      }`}
      onClick={onClick}
      onContextMenu={onContextMenu}
      draggable
      onDragStart={(e) => handleDragStart(e)}
      onDragEnd={(e) => handleDragEnd(e)}
      onDragEnter={() => {
        handleDragEnter();
      }}
      data-index={index}
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
