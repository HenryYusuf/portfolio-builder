import React from "react";
import ExperienceForm from "../../_components/experience-form";
import { getExperienceById } from "@/actions/experiences";

interface IEditExperienceProps {
  params: {
    id: string;
  };
}

async function EditExperience({ params }: IEditExperienceProps) {
  const {id} = await params

  const experienceResponse = await getExperienceById(id);

  if (!experienceResponse.success) {
    return <div>Failed to load experience data</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold">Edit Experience</h1>
      <hr className="my-4" />
      <ExperienceForm initialValues={experienceResponse.data} formType="edit" />
    </div>
  );
}

export default EditExperience;
