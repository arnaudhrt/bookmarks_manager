import { defaultFolders } from "../../data/defaultFolders";
import { useEffect, useState } from "react";
import { mockBookmarks } from "../../data/bookmarks";
import Bookmark from "./Bookmark";
import FolderBlock from "./FolderBlock";
import CreateBlock from "./CreateBlock";
import { v4 as uuidv4 } from "uuid";
import SortBlock from "./SortBlock";
import importlight from "../../assets/import_light.png";
import importdark from "../../assets/import_dark.png";
import { useTheme } from "../global/DarkmodeContext";

export default function ContainerBookmarks({ disableMarks, setDisableMarks }) {
  const [userFolders, setUserFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState({ name: "", bookmarks: [] });
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const [isImported, setIsImported] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState([]);

  const { theme } = useTheme();

  // Load the bookmarks from the local storage or set the default folders
  useEffect(() => {
    // PROD
    chrome.storage.local.get("bookmarks", function (result) {
      if (result.bookmarks) {
        setUserFolders(result.bookmarks);
      } else {
        setUserFolders(defaultFolders);
      }
    });

    chrome.storage.local.get("marks", function (result) {
      if (typeof result.marks !== "undefined") {
        console.log(result.marks);
        setDisableMarks(result.marks);
      } else {
        setDisableMarks(true);
      }
    });

    //DEV
    // setUserFolders(defaultFolders);
  }, []);

  // Save the bookmarks to the local storage (PROD)
  useEffect(() => {
    chrome.storage.local.set({ bookmarks: userFolders });
  }, [userFolders]);

  //Extract bookmarks from the browser
  function extractBookmarks(bookmarkNodes) {
    let bookmarks = [];
    function traverseNodes(nodes) {
      for (let node of nodes) {
        if (node.url && node.url !== "about:blank") {
          bookmarks.push({ title: node.title, url: node.url, id: uuidv4(), index: node.index });
        }
        if (node.children) {
          traverseNodes(node.children);
        }
      }
    }

    traverseNodes(bookmarkNodes);
    return bookmarks;
  }

  // Import existing bookmarks from the browser
  const importBookmarks = async () => {
    // PROD

    chrome.storage.local.set({ marks: false });
    setDisableMarks(false);

    chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
      const bookmarks = extractBookmarks(bookmarkTreeNodes);
      const newFolder = {
        name: "Imported",
        index: userFolders.length,
        bookmarks: bookmarks,
      };

      if (bookmarks.length === 0) return;
      if (userFolders.find((folder) => folder.name === "Imported")) {
        setUserFolders((prev) => {
          const index = prev.findIndex((folder) => folder.name === "Imported");
          prev[index].bookmarks = [...bookmarks];
          return [...prev];
        });
        return;
      }
      setUserFolders([...userFolders, newFolder]);
    });

    // DEV
    // const newFolder = {
    //   name: "Imported",
    //   index: userFolders.length,
    //   bookmarks: mockBookmarks,
    // };
    // setUserFolders([...userFolders, newFolder]);
  };

  // Handle the checkbox change
  const checkboxChange = (input) => {
    setCheckboxValues((prev) => {
      if (Array.isArray(input)) {
        const newSet = new Set(prev);
        input.forEach((id) => {
          if (newSet.has(id)) {
            newSet.delete(id);
          } else {
            newSet.add(id);
          }
        });
        return Array.from(newSet);
      } else {
        return prev.includes(input) ? prev.filter((value) => value !== input) : [...prev, input];
      }
    });
  };

  const [draggedBookmark, setDraggedBookmark] = useState(null);
  const [dragging, setDragging] = useState(null);

  return (
    <div className="mt-16 min-h-[300px] border border-border rounded-md shadow-xl flex">
      <div className="flex flex-col w-[500px] border-r border-border">
        <CreateBlock userFolders={userFolders} setUserFolders={setUserFolders} />
        <FolderBlock
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
          userFolders={userFolders}
          setUserFolders={setUserFolders}
        />
      </div>
      <div className="w-full grow relative">
        <SortBlock
          importBookmarks={importBookmarks}
          isImported={isImported}
          setIsImported={setIsImported}
          userFolders={userFolders}
          setUserFolders={setUserFolders}
          checkboxValues={checkboxValues}
          setCheckboxValues={setCheckboxValues}
          selectedFolder={selectedFolder}
          checkboxChange={checkboxChange}
          selectedBookmark={selectedBookmark}
          setDisableMarks={setDisableMarks}
          setSelectedFolder={setSelectedFolder}
        />
        <div className="p-4" onDragOver={(e) => e.preventDefault()}>
          {selectedFolder.bookmarks.length > 0 ? (
            selectedFolder.bookmarks.map((bookmark, index) => (
              <Bookmark
                id={bookmark.id}
                key={bookmark.id}
                url={bookmark.url}
                name={bookmark.title}
                description={bookmark.description}
                icon={`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=180`}
                checkboxValues={checkboxValues}
                setCheckboxValues={setCheckboxValues}
                checkboxChange={checkboxChange}
                setUserFolders={setUserFolders}
                userFolders={userFolders}
                setSelectedBookmark={setSelectedBookmark}
                selectedBookmark={selectedBookmark}
                selectedFolder={selectedFolder}
                setSelectedFolder={setSelectedFolder}
                setDragging={setDragging}
                dragging={dragging}
                setDraggedBookmark={setDraggedBookmark}
                draggedBookmark={draggedBookmark}
                index={index}
              />
            ))
          ) : (
            <div className="flex items-center mt-10 flex-col gap-3 ">
              <div className="flex gap-7 w-60">
                <p className="text-muted-foreground text-sm grow">Search on bookmarks</p>
                <kbd className=" pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>

              <div className="flex gap-7 w-60">
                <p className="text-muted-foreground text-sm grow">Search on Google</p>
                <kbd className=" pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>L
                </kbd>
              </div>

              <div className="flex gap-7 w-60">
                <p className="text-muted-foreground text-sm grow">Switch dark mode</p>
                <kbd className=" pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>U
                </kbd>
              </div>

              <div className="flex gap-7 w-60">
                <p className="text-muted-foreground text-sm grow">Create new bookmark</p>
                <kbd className=" pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>B
                </kbd>
              </div>
            </div>
          )}
        </div>
        {disableMarks && <img src={theme === "light" ? importlight : importdark} alt="" className="w-[30%] absolute top-16 right-6" />}
      </div>
    </div>
  );
}
