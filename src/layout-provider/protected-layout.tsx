// Package
import React, { useEffect } from "react";
import toast from "react-hot-toast";

// Actions
import { getCurrentUser } from "@/actions/users";

// Components
import ProtectedLayoutHeader from "./_components/header";
import Spinner from "@/components/ui/spinner";

// Global Store
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, setUser } = usersGlobalStore() as IUsersGlobalStore;
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
    if (!user) {
      fetchUser();
    }
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
      <ProtectedLayoutHeader />
      <div className="p-5">{children}</div>
    </div>
  );
}

export default ProtectedLayout;
