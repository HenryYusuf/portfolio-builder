// Package
import React from "react";
import { MenuIcon } from "lucide-react";

// Components
import { Button } from "@/components/ui/button";

// Interfaces
import { IUser } from "@/interfaces";

function ProtectedLayoutHeader({ user }: { user: IUser }) {
  return (
    <div className="bg-secondary p-5 flex justify-between items-center">
      <h1 className="font-bold text-2xl text-primary">P | B</h1>

      <div className="flex gap-5 items-center">
        <span className="text-sm text-foreground">{user.name}</span>
        <Button variant={"ghost"} className="cursor-pointer">
          <MenuIcon size={15} className="text-foreground" />
        </Button>
      </div>
    </div>
  );
}

export default ProtectedLayoutHeader;
