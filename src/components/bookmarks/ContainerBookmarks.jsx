import { defaultFolders } from "../../data/defaultFolders";
import { useEffect, useState } from "react";
import { mockBookmarks } from "../../data/bookmarks";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IoAlertCircleOutline } from "react-icons/io5";
import Bookmark from "./Bookmark";
import FolderBlock from "./FolderBlock";
import CreateBlock from "./CreateBlock";

import SortBlock from "./SortBlock";

export default function ContainerBookmarks() {
  const [userBookmarks, setUserBookmarks] = useState([]);
  const [userFolders, setUserFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState({ name: "Social", bookmarks: [] });
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const [isImported, setIsImported] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState([]);

  useEffect(() => {
    setUserFolders(defaultFolders);
  }, []);

  const importBookmarks = async () => {
    if (mockBookmarks.length === 0) return;
    const newFolder = {
      name: "Imported",
      bookmarks: mockBookmarks,
    };
    setUserFolders([...userFolders, newFolder]);
  };

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

  // Extract bookmarks from the browser
  // function extractBookmarks(bookmarkNodes) {
  //   let bookmarks = [];
  //   function traverseNodes(nodes) {
  //     for (let node of nodes) {
  //       if (node.url && node.url !== "about:blank") {
  //         bookmarks.push({ title: node.title, url: node.url });
  //       }
  //       if (node.children) {
  //         traverseNodes(node.children);
  //       }
  //     }
  //   }

  //   traverseNodes(bookmarkNodes);
  //   return bookmarks;
  // }
  // chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
  //   const bookmarks = extractBookmarks(bookmarkTreeNodes);
  //   setUserBookmarks(bookmarks);
  // });

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
        />
        <div className="p-4">
          {selectedFolder.bookmarks.length > 0 ? (
            selectedFolder.bookmarks.map((bookmark) => (
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
              />
            ))
          ) : (
            <Alert>
              <IoAlertCircleOutline className="h-5 w-5" />
              <AlertTitle>No bookmarks found!</AlertTitle>
              <AlertDescription>Seems like you don't have any bookmarks yet, no worries you can start by adding some manually.</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
