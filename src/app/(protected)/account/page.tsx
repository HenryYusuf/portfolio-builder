// Package
import React from "react";
import { currentUser } from "@clerk/nextjs/server";

// Components
import { UserButton } from "@clerk/nextjs";
import SignOutButton from "@/components/functional/sign-out-button";

async function AccountPage() {
  const loggedInUser = await currentUser();

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1>Account Page</h1>
      <h1>First Name: {loggedInUser?.id}</h1>
      <h1>First Name: {loggedInUser?.firstName}</h1>
      <h1>Last Name: {loggedInUser?.lastName}</h1>
      <h1>Email Address: {loggedInUser?.emailAddresses[0].emailAddress}</h1>
      <UserButton />
      <SignOutButton />
    </div>
  );
}

export default AccountPage;
