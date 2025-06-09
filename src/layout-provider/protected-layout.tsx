// Package
import React, { useEffect } from "react";

// Interfaces
import { IUser } from "@/interfaces";

// Actions
import { getCurrentUser } from "@/actions/users";

// Components
import ProtectedLayoutHeader from "./_components/header";
import Spinner from "@/components/ui/spinner";
import toast from "react-hot-toast";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<IUser | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchUser = async () => {
    try {
      setLoading(true);

      const response: any = await getCurrentUser();

      if (response.success) {
        setUser(response.data);
      } else {
        throw new Error("Error fetching user data");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!loading && !user) {
    return (
      <div>
        <h1>Error fetching user data</h1>
      </div>
    );
  }

  return (
    <div>
      <ProtectedLayoutHeader user={user!} />
      {children}
    </div>
  );
}

export default ProtectedLayout;
