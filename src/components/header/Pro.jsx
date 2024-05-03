import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

export default function Pro() {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button className="text-xs">Upgrade</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="px-10 py-6 max-w-[800px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              <h3 className="text-center text-2xl mt-3">Upgrade to unlock all features</h3>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p className="text-center text-md">
                No hidden fees & No recurring billing.
                <br /> One payment for lifetime access.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="h-[1px] w-full bg-foreground mt-2 " />
          <div className="flex gap-4 justify-center items-start p-5">
            {/* FREE PLAN */}
            <div className="flex-col border border-border rounded-md p-5 basis-1/2">
              <div className="text-center">
                <h3 className="text-lg">Free</h3>
                <p className="text-[35px] font-bold">$0</p>
                <p className="text-xs text-muted-foreground">Forever</p>
              </div>
              <div className="h-[1px] w-full bg-foreground my-3 " />
              <ul className="flex flex-col gap-2 py-2">
                <li className="flex gap-2 items-center text-sm">
                  <IoCheckmarkCircleSharp className="size-4" />
                  No adds
                </li>
                <li className="flex gap-2 items-center text-sm">
                  <IoCheckmarkCircleSharp className="size-4" />
                  Up to 5 folders
                </li>
                <li className="flex gap-2 items-center text-sm">
                  <IoCheckmarkCircleSharp className="size-4" />
                  Up to 15 Bookmark per folder
                </li>
                <li className="flex gap-2 items-center text-sm">
                  <IoCheckmarkCircleSharp className="size-4" />
                  Default theme
                </li>
                <li className="flex gap-2 items-center text-sm">
                  <IoCheckmarkCircleSharp className="size-4" />
                  No AI tools
                </li>
              </ul>
            </div>

            {/* PREMIUM PLAN */}
            <div className="flex-col border border-border rounded-md p-5 basis-1/2">
              <div className="text-center">
                <h3 className="text-lg">Premium</h3>
                <p className="text-[35px] font-bold">$12</p>
                <p className="text-xs text-muted-foreground">Lifetime payment</p>
              </div>
              <div className="h-[1px] w-full bg-foreground my-3 " />
              <ul className="flex flex-col gap-2 py-2 mb-5">
                <li className="flex gap-2 items-center text-sm">
                  <IoCheckmarkCircleSharp className="size-4" />
                  No adds
                </li>
                <li className="flex gap-2 items-center text-sm">
                  <IoCheckmarkCircleSharp className="size-4" />
                  Unlimited folders
                </li>
                <li className="flex gap-2 items-center text-sm">
                  <IoCheckmarkCircleSharp className="size-4" />
                  Unlimited Bookmarks
                </li>
                <li className="flex gap-2 items-center text-sm">
                  <IoCheckmarkCircleSharp className="size-4" />
                  Custom themes
                </li>
                <li className="flex gap-2 items-center text-sm">
                  <IoCheckmarkCircleSharp className="size-4" />
                  Organize folder with AI
                </li>
                <li className="flex gap-2 items-center text-sm">
                  <IoCheckmarkCircleSharp className="size-4" />
                  Clean bookmarks with AI
                </li>
                <li className="flex gap-2 items-center text-sm">
                  <IoCheckmarkCircleSharp className="size-4" />
                  All future updates & features
                </li>
              </ul>
              <Button className="w-full">Coming Soon</Button>
            </div>
          </div>

          <AlertDialogCancel className="absolute top-4 right-4 hover:border-foreground">
            <IoClose className="size-5" />
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
