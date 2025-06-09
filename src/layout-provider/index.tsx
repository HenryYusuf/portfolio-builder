"use client";

import React from "react";
import { usePathname } from "next/navigation";
import ProtectedLayout from "./protected-layout";
import PublicLayout from "./public-layout";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  if (pathName.startsWith("/account")) {
    return <ProtectedLayout>{children}</ProtectedLayout>;
  }

  return <PublicLayout>{children}</PublicLayout>;
}

export default LayoutProvider;
