// Package
import React from "react";
import { MenuIcon } from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import ProtectedLayoutSidebar from "./sidebar";

// Global Store
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";

function ProtectedLayoutHeader() {
  const { user } = usersGlobalStore() as IUsersGlobalStore;
  const [openSidebar, setOpenSidebar] = React.useState(false);

  return (
    <div className="bg-secondary p-5 flex justify-between items-center">
      <h1 className="font-bold text-2xl text-primary">P | B</h1>

      <div className="flex gap-5 items-center">
        <span className="text-sm text-foreground font-semibold">
          {user?.name}
        </span>
        <Button
          variant={"ghost"}
          className="cursor-pointer"
          onClick={() => setOpenSidebar(true)}
        >
          <MenuIcon size={15} className="text-foreground" />
        </Button>

        {openSidebar && (
          <ProtectedLayoutSidebar
            openSidebar={openSidebar}
            onClose={() => setOpenSidebar(false)}
          />
        )}
      </div>
    </div>
  );
}

export default ProtectedLayoutHeader;
