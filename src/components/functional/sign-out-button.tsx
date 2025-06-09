"use client";

// Package
import React from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// Components
import { Button } from "../ui/button";

function SignOutButton() {
  const { signOut } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const onSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="w-full cursor-pointer"
      disabled={loading}
      onClick={onSignOut}
    >
      Sign Out
    </Button>
  );
}

export default SignOutButton;
