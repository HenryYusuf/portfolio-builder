import Spinner from "@/components/ui/spinner";
import React from "react";

function Loading() {
  return (
    <div className="h-[75vh] flex justify-center items-center">
      <Spinner />
    </div>
  );
}

export default Loading;
