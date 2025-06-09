import React from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Book,
  Home,
  LaptopMinimalCheck,
  ListCheck,
  Presentation,
  User,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import SignOutButton from "@/components/functional/sign-out-button";

function ProtectedLayoutSidebar({
  onClose,
  openSidebar,
}: {
  onClose: () => void;
  openSidebar: boolean;
}) {
  const pathName = usePathname();
  const router = useRouter();
  const menuItems = [
    {
      title: "Home",
      path: "/account",
      icon: <Home size={25} />,
    },
    {
      title: "Profile",
      path: "/account/profile",
      icon: <User size={25} />,
    },
    {
      title: "Educations",
      path: "/account/educations",
      icon: <Book size={25} />,
    },
    {
      title: "Skills",
      path: "/account/skills",
      icon: <LaptopMinimalCheck size={25} />,
    },
    {
      title: "Projects",
      path: "/account/projects",
      icon: <Presentation size={25} />,
    },
    {
      title: "Experiences",
      path: "/account/experiences",
      icon: <ListCheck size={25} />,
    },
  ];

  return (
    <Sheet open={openSidebar} onOpenChange={onClose}>
      <SheetContent className="min-w-[300px]">
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-7 mx-10 mt-10">
          {menuItems.map((item) => (
            <div
              key={item.title}
              className={`flex gap-4 items-center p-3 cursor-pointer ${
                pathName === item.path
                  ? "bg-primary border-2 border-secondary rounded-md text-primary-foreground hover:bg-primary/90"
                  : "hover:bg-accent hover:rounded-md"
              }`}
              onClick={() => {
                router.push(item.path);
                onClose(); 
              }}
            >
              {item.icon}
              <span className="text-sm font-bold">{item.title}</span>
            </div>
          ))}

          <SignOutButton />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default ProtectedLayoutSidebar;
