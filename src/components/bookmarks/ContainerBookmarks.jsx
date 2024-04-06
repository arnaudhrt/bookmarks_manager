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

  const [folderName, setFolderName] = useState("");
  const [hasSameName, setHasSameName] = useState(false);
  const createFolder = () => {
    const newFolder = {
      name: folderName,
      bookmarks: [],
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
          <div className="flex justify-between items-center border-b border-border px-5 py-3 w-full">
            <div className="flex gap-2 justify-center items-center">
              <IoBookmarksOutline className="h-5 w-5" />
              <h3>Bookmarks</h3>
            </div>
            <div className="flex gap-2">
              <Popover
                onOpenChange={() => {
                  setFolderName("");
                }}
              >
                <PopoverTrigger>
                  <Button variant="outline" size="icon">
                    <BiFolderPlus className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
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

              <Button variant="outline" size="icon">
                <BiBookmarkPlus className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <FolderBlock
            selectedFolder={selectedFolder}
            setSelectedFolder={setSelectedFolder}
            userFolders={userFolders}
            setUserFolders={setUserFolders}
          />
        </div>
        <div className="w-full grow p-4 relative">
          {selectedFolder.bookmarks.length > 0 ? (
            mockBookmarks.map((bookmark) => (
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
