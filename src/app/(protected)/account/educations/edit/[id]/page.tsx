import React from "react";
import { getEducationById } from "@/actions/educations";
import EducationForm from "../../_components/education-form";

interface IEditEducationProps {
  params: {
    id: string;
  };
}
async function EditEducationPage({ params }: IEditEducationProps) {
  const { id } = await params;

  const educationResponse = await getEducationById(id);

  if (!educationResponse.success) {
    return <div>Failed to load education data</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold">Edit Education</h1>
      <hr className="my-4" />
      <EducationForm initialValues={educationResponse.data} formType="edit" />
    </div>
  );
}

export default EditEducationPage;
