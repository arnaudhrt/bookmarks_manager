import AppButton from "./AppButton";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { RxExternalLink } from "react-icons/rx";
import { RxPencil1 } from "react-icons/rx";
import { RxPlusCircled } from "react-icons/rx";
import { RxTrash } from "react-icons/rx";
import { useState, useEffect } from "react";
import { defaultDockApps } from "../../data/defaultDockApps";
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

export default function AppDock() {
  // SET UP USER APPS EITHER FROM LOCAL STORAGE EITHER FROM DEFAULT APPS
  const [userApps, setUserApps] = useState(() => {
    const savedApps = localStorage.getItem("userApps");
    return savedApps ? JSON.parse(savedApps) : defaultDockApps;
  });

  // SAVE USER APPS TO LOCAL STORAGE WHEN UPDATED
  useEffect(() => {
    localStorage.setItem("userApps", JSON.stringify(userApps));
    console.log(userApps);
  }, [userApps]);

  // MAX APPS IN DOCK ALLOWED
  const dockMaxApps = 10;

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

  return (
    <>
      <ContextMenu>
        {/* APP DOCK */}
        <ContextMenuTrigger>
          <div className="mt-12 flex justify-center items-center gap-10 flex-wrap">
            {userApps.map((app) => (
              <div key={app.id} onContextMenu={() => setSelectedApp(app)}>
                <AppButton src={app.img_src} name={app.name} href={app.url} />
              </div>
            ))}
          </div>
        </ContextMenuTrigger>

        {/* RIGHT CLICK MENU */}
        <ContextMenuContent className="border border-border_color bg-bg_input text-bg_light">
          {selectedApp ? (
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
                  setUserApps((prevApps) => prevApps.filter((app) => app.id !== selectedApp.id));
                  setSelectedApp(null);
                }}
              >
                <span className="grow">Remove</span>
                <RxTrash className="text-sm ml-2" />
              </ContextMenuItem>
            </>
          ) : (
            <ContextMenuItem className="flex items-center" onSelect={() => setisModalCreateOpen(true)}>
              <span className="grow">Add</span>
              <RxPlusCircled className="text-sm ml-2" />
            </ContextMenuItem>
          )}
        </ContextMenuContent>
      </ContextMenu>

      {/* CREATE NEW APP */}
      <AlertDialog open={isModalCreateOpen}>
        <AlertDialogContent className="border boder-boder_color bg-bg_input text-bg_light">
          <AlertDialogHeader>
            <AlertDialogTitle>Add New App</AlertDialogTitle>
            <AlertDialogDescription className="text-bg_light">
              <div>
                <p>You can add up to 10 apps to your dock, if you want to add more, you need to remove some apps.</p>
              </div>
              <Separator className="my-5" />
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
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-bg_input border boder-border_color hover:text-red-600 hover:bg-bg_input hover:border-red-600"
              onClick={() => setisModalCreateOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="border bg-bg_light text-black hover:text-white hover:border-green-800 hover:bg-green-500"
              onClick={() => {
                if (userApps.length >= dockMaxApps) {
                  setIsMaxAppsReached(true);
                  return;
                }
                setUserApps((prevApps) => [
                  ...prevApps,
                  {
                    id: Date.now(),
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
        <AlertDialogContent className="border boder-boder_color bg-bg_input text-bg_light">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit App</AlertDialogTitle>
            <AlertDialogDescription className="text-bg_light">
              <Separator className="my-5" />
              <div className="mb-4">
                <Label htmlFor="app-name" className="text-xs mb-2 block">
                  App Name
                </Label>
                <Input
                  id="app-name"
                  className="text-bg_dark placeholder:text-gray-400"
                  onChange={(e) => setEditedAppName(e.target.value)}
                  defaultValue={selectedApp?.name}
                />
              </div>
              <div>
                <Label htmlFor="app-url" className="text-xs mb-2 block">
                  App URL
                </Label>
                <Input
                  id="app-url"
                  className="text-bg_dark placeholder:text-gray-400"
                  onChange={(e) => setEditedAppUrl(e.target.value)}
                  defaultValue={selectedApp?.url}
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-bg_input border boder-border_color hover:text-red-600 hover:bg-bg_input hover:border-red-600"
              onClick={() => setisModalEditOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="border bg-bg_light text-black hover:text-white hover:border-green-800 hover:bg-green-500"
              onClick={() => {
                setUserApps((prevApps) =>
                  prevApps.map((app) => {
                    if (app.id === selectedApp.id) {
                      return {
                        ...app,
                        name: editedAppName,
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
