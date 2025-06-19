"use client";

import { IProject } from "@/interfaces";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteProjectById } from "@/actions/projects";

function ProjectsTable({ projects }: { projects: IProject[] }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedProjectIdToDelete, setSelectedProjectIdToDelete] =
    React.useState<string | null>(null);
  const router = useRouter();
  const columns = ["Name", "Demo Link", "Repo Link", "Created At", "Actions"];

  const deleteProjectHandler = async (id: string | null) => {
    try {
      setLoading(true);

      setSelectedProjectIdToDelete(id);
      let response = await deleteProjectById(id!);

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSelectedProjectIdToDelete(null);
      setLoading(false);
    }
  };

  const openAlertDialog = (id: string) => {
    setSelectedProjectIdToDelete(id);
    setOpen(true);
  };

  return (
    <div className="mt-7">
      <Table className="border">
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead className="font-semibold" key={index}>
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project, index) => (
            <TableRow key={project.id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.demo_link}</TableCell>
              <TableCell>{project.repo_link}</TableCell>
              <TableCell>
                {dayjs(project.created_at).format("DD MMMM YYYY")}
              </TableCell>
              <TableCell>
                <div className="flex gap-5">
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => openAlertDialog(project.id)}
                    className="cursor-pointer"
                  >
                    <Trash2 size={12} />
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    className="cursor-pointer"
                    onClick={() =>
                      router.push(`/account/projects/edit/${project.id}`)
                    }
                  >
                    <PencilIcon size={12} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteProjectHandler(selectedProjectIdToDelete)}
              disabled={loading}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ProjectsTable;
