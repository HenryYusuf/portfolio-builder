import React from "react";
import ProjectForm from "../_components/project-form";

function AddProjectPage() {
  return (
    <div>
      <h1 className="text-xl font-bold">Tambah Project</h1>
      <hr className="my-4" />
      <ProjectForm formType="add" />
    </div>
  );
}

export default AddProjectPage;
