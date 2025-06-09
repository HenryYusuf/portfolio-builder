import React from "react";

import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

function ProtectedLayoutHeader() {
  return (
    <div className="bg-secondary p-5 flex justify-between items-center">
      <h1 className="font-bold text-2xl text-primary">P | B</h1>

      <div className="flex gap-5 items-center">
        <span className="text-sm text-foreground">User name</span>
        <Button variant={"ghost"} className="cursor-pointer">
          <MenuIcon size={15} className="text-foreground" />
        </Button>
      </div>
    </div>
  );
}

export default ProtectedLayoutHeader;
