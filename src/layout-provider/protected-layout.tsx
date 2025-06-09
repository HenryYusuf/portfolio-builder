import React from "react";
import ProtectedLayoutHeader from "./_components/header";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ProtectedLayoutHeader />
      {children}
    </div>
  );
}

export default ProtectedLayout;
