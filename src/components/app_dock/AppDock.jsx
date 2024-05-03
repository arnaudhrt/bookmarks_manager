import { useState, useEffect } from "react";
import AppButton from "./AppButton";
import { defaultDockApps } from "../../data/defaultDockApps";
import { RxExternalLink, RxPencil1, RxPlusCircled, RxTrash } from "react-icons/rx";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
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
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { checkUrl } from "@/lib/checkUrl";

export default function AppDock() {
  // SET UP USER APPS EITHER FROM LOCAL STORAGE EITHER FROM DEFAULT APPS
  const [userApps, setUserApps] = useState(defaultDockApps);

  // PROD
  // useEffect(() => {
  //   chrome.storage.local.get("userdock", function (result) {
  //     if (result.userdock) {
  //       console.log("Bookmarks found", result.bookmarks);
  //       setUserApps(result.userdock);
  //     } else {
  //       setUserApps(defaultDockApps);
  //     }
  //   });
  // }, []);

  //Save the bookmarks to the local storage (PROD)
  // useEffect(() => {
  //   chrome.storage.local.set({ userdock: userApps });
  // }, [userApps]);

  // MAX APPS IN DOCK ALLOWED
  const dockMaxApps = 8;

  // SELECTED APP ON RIGHT CLICK STATE
  const [selectedApp, setSelectedApp] = useState(null);

  // OPEN THE SELECTED APP
  const handleOpenApp = () => {
    if (!selectedApp) return;
    window.open(selectedApp.url, "_blank");
  };

  // STATES FOR THE CREATE NEW APP MODAL
  const [isModalCreateOpen, setisModalCreateOpen] = useState(false);
  const [isMaxAppsReached, setIsMaxAppsReached] = useState(false);
  const [emptyField, setEmptyField] = useState(false);
  const [newAppName, setNewAppName] = useState("");
  const [newAppUrl, setNewAppUrl] = useState("");

  // STATES FOR THE EDIT APP MODAL
  const [isModalEditOpen, setisModalEditOpen] = useState(false);
  const [editedAppName, setEditedAppName] = useState("");
  const [editedAppUrl, setEditedAppUrl] = useState("");

  useEffect(() => {
    if (isModalEditOpen && selectedApp) {
      setEditedAppName(selectedApp.name);
      setEditedAppUrl(selectedApp.url);
    }
  }, [isModalEditOpen, selectedApp]);

  const [draggedApp, setDraggedApp] = useState(null);
  const [dragging, setDragging] = useState(null);

  const updateIndexFolder = () => {
    setUserApps((prev) => {
      prev.forEach((folder, index) => {
        folder.index = index;
      });
      return [...prev];
    });
  };

  return (
    <>
      <ContextMenu>
        {/* APP DOCK */}
        <ContextMenuTrigger>
          <div className="mt-12 flex justify-center items-center gap-10 flex-wrap" onDragOver={(e) => e.preventDefault()}>
            {userApps.map((app) => (
              <div key={app.index} onContextMenu={() => setSelectedApp(app)}>
                <AppButton
                  index={app.index}
                  src={app.img_src}
                  name={app.name}
                  href={app.url}
                  dragging={dragging}
                  setDragging={setDragging}
                  draggedApp={draggedApp}
                  setDraggedApp={setDraggedApp}
                  userApps={userApps}
                  setUserApps={setUserApps}
                />
              </div>
            ))}
          </div>
        </ContextMenuTrigger>

        {/* RIGHT CLICK MENU */}
        <ContextMenuContent className="border border-border bg-background">
          {
            <>
              <ContextMenuItem className="flex items-center" onSelect={handleOpenApp}>
                <span className="grow">Open</span>
                <RxExternalLink className="text-sm ml-2" />
              </ContextMenuItem>
              <ContextMenuItem className="flex items-center" onSelect={() => setisModalEditOpen(true)}>
                <span className="grow">Edit</span>
                <RxPencil1 className="text-sm ml-2" />
              </ContextMenuItem>
              <ContextMenuItem
                className="flex items-center"
                onSelect={() => {
                  setUserApps((prevApps) => prevApps.filter((app) => app.index !== selectedApp.index));
                  setSelectedApp(null);
                  updateIndexFolder();
                }}
              >
                <span className="grow">Remove</span>
                <RxTrash className="text-sm ml-2" />
              </ContextMenuItem>
              <ContextMenuItem className="flex items-center" onSelect={() => setisModalCreateOpen(true)}>
                <span className="grow">Add</span>
                <RxPlusCircled className="text-sm ml-2" />
              </ContextMenuItem>
            </>
          }
        </ContextMenuContent>
      </ContextMenu>

      {/* CREATE NEW APP */}
      <AlertDialog open={isModalCreateOpen}>
        <AlertDialogContent className="border boder-boder bg-background">
          <AlertDialogHeader>
            <AlertDialogTitle>Add New App</AlertDialogTitle>
            <AlertDialogDescription>
              <div>
                <p>You can add up to 8 apps to your dock, if you want to add more, you need to remove some apps.</p>
              </div>
              <Separator className="my-5 bg-foreground/90" />
              <div className="mb-4">
                <Label htmlFor="app-name" className="text-xs mb-2 block">
                  App Name
                </Label>
                <Input
                  id="app-name"
                  placeholder="Netflix"
                  className="text-bg_dark placeholder:text-gray-400"
                  onChange={(e) => setNewAppName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="app-url" className="text-xs mb-2 block">
                  App URL
                </Label>
                <Input
                  id="app-url"
                  placeholder="https://www.netflix.com/browse"
                  className="text-bg_dark placeholder:text-gray-400"
                  onChange={(e) => setNewAppUrl(e.target.value)}
                />
              </div>
              <Alert variant="destructive" className={`mt-4 ${isMaxAppsReached ? "block" : "hidden"}`}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Number maximum of apps reached !</AlertTitle>
                <AlertDescription className="text-xs">Please remove some apps before adding new ones.</AlertDescription>
              </Alert>
              <Alert variant="destructive" className={`mt-4 ${emptyField ? "block" : "hidden"}`}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Form is not valid!</AlertTitle>
                <AlertDescription className="text-xs">Please fill all the fields correctly.</AlertDescription>
              </Alert>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-app_bg border boder-border hover:text-red-600 hover:bg-bg_input hover:border-red-600"
              onClick={() => setisModalCreateOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="border border-border bg-foreground/90 hover:border-green-800 hover:bg-green-500"
              onClick={() => {
                if (userApps.length >= dockMaxApps) {
                  setIsMaxAppsReached(true);
                  return;
                }
                if (newAppName === "" || newAppUrl === "") {
                  setEmptyField(true);
                  return;
                }
                if (!checkUrl(newAppUrl)) {
                  setEmptyField(true);
                  return;
                }
                setUserApps((prevApps) => [
                  ...prevApps,
                  {
                    index: prevApps.length,
                    name: newAppName,
                    img_src: `https://www.google.com/s2/favicons?domain=${newAppUrl}&sz=180`,
                    url: newAppUrl,
                  },
                ]);
                setisModalCreateOpen(false);
              }}
            >
              Add
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* EDIT APP */}
      <AlertDialog open={isModalEditOpen}>
        <AlertDialogContent className="border boder-boder bg-background">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit App</AlertDialogTitle>
            <AlertDialogDescription>
              <Separator className="my-5 bg-foreground/90" />
              <div className="mb-4">
                <Label htmlFor="app-name" className="text-xs mb-2 block">
                  App Name
                </Label>
                <Input id="app-name" className="" onChange={(e) => setEditedAppName(e.target.value)} defaultValue={selectedApp?.name} />
              </div>
              <div>
                <Label htmlFor="app-url" className="text-xs mb-2 block">
                  App URL
                </Label>
                <Input id="app-url" className="" onChange={(e) => setEditedAppUrl(e.target.value)} defaultValue={selectedApp?.url} />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-app_bg border boder-border hover:text-red-600 hover:bg-bg_input hover:border-red-600"
              onClick={() => setisModalEditOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="border border-border bg-foreground/90 hover:border-green-800 hover:bg-green-500"
              onClick={() => {
                setUserApps((prevApps) =>
                  prevApps.map((app) => {
                    if (app.index === selectedApp.index) {
                      return {
                        ...app,
                        name: editedAppName,
                        index: app.index,
                        img_src: `https://www.google.com/s2/favicons?domain=${editedAppUrl}&sz=180`,
                        url: editedAppUrl,
                      };
                    }
                    return app;
                  })
                );
                setEditedAppName("");
                setEditedAppUrl("");
                setisModalEditOpen(false);
              }}
            >
              Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
