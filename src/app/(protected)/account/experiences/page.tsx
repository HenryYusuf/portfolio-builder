import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import ExperiencesTable from "./_components/experiences-table";
import { getCurrentUser } from "@/actions/users";
import { getExperiencesByUserId } from "@/actions/experiences";

async function ExperiencesPage() {
  const userResponse = await getCurrentUser();
    if (!userResponse.success) {
      return <div>Failed to load user data</div>;
    }
  
    const experienceResponse = await getExperiencesByUserId(userResponse.data.id);
  
    if (!experienceResponse.success) {
      return <div>Failed to load experiences</div>;
    }
  
    const experiences: any = experienceResponse.data;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Experiences</h1>

        <Button>
          <Link href="/account/experiences/add">Tambah Experience</Link>
        </Button>
      </div>

      <ExperiencesTable experiences={experiences} />
    </div>
  );
}

export default ExperiencesPage;
