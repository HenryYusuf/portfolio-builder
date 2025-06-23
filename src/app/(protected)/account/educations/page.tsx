import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { getCurrentUser } from "@/actions/users";
import { getEducationsByUserId } from "@/actions/educations";
import EducationsTable from "./_components/educations-table";

async function EducationsPage() {
  const userResponse = await getCurrentUser();
  if (!userResponse.success) {
    return <div>Failed to load user data</div>;
  }

  const educationResponse = await getEducationsByUserId(userResponse.data.id);

  if (!educationResponse.success) {
    return <div>Failed to load educations</div>;
  }

  const educations: any = educationResponse.data;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Educations</h1>

        <Button>
          <Link href="/account/educations/add">Tambah Experience</Link>
        </Button>
      </div>

      <EducationsTable educations={educations} />
    </div>
  );
}

export default EducationsPage;
