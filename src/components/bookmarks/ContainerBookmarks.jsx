import { Button } from "@/components/ui/button";
import { IoBookmarksOutline } from "react-icons/io5";
import { BiFolderPlus } from "react-icons/bi";
import { BiBookmarkPlus } from "react-icons/bi";

import { defaultFolders } from "../../data/defaultFolders";
import { useEffect, useState } from "react";
import { mockBookmarks } from "../../data/bookmarks";
import { CiImport } from "react-icons/ci";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IoAlertCircleOutline } from "react-icons/io5";
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "@/components/ui/popover";
import { Input } from "../ui/input";
import Bookmark from "./Bookmark";
import FolderBlock from "./FolderBlock";
import { useToast } from "@/components/ui/use-toast";
import CreateBlock from "./CreateBlock";

export default function ContainerBookmarks() {
  const { toast } = useToast();

  const [userBookmarks, setUserBookmarks] = useState([]);
  const [userFolders, setUserFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState({ name: "Social", bookmarks: [] });
  const [isImported, setIsImported] = useState(false);

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
    <>
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
        <div className="w-full grow p-4 relative">
          {selectedFolder.bookmarks.length > 0 ? (
            selectedFolder.bookmarks.map((bookmark) => (
              <Bookmark
                key={bookmark.id}
                url={bookmark.url}
                name={bookmark.title}
                description={bookmark.description}
                icon={`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=180`}
              />
            ))
          ) : (
            <Alert>
              <IoAlertCircleOutline className="h-5 w-5" />
              <AlertTitle>No bookmarks found!</AlertTitle>
              <AlertDescription>Seems like you don't have any bookmarks yet, no worries you can start by adding some manually.</AlertDescription>
            </Alert>
          )}
          <Button
            size="large"
            variant="outline"
            onClick={() => {
              importBookmarks();
              setIsImported(true);
            }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 flex justify-center items-center gap-2  hover:shadow-md transition ${
              isImported ? "hidden" : "flex"
            }`}
          >
            <CiImport className="h-4 w-4" />
            Import your bookmarks
          </Button>
        </div>
      </div>
    </>
  );
}
