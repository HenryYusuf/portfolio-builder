"use client";

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
import { IExperience } from "@/interfaces";

import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteExperienceById } from "@/actions/experiences";

function ExperiencesTable({ experiences }: { experiences: IExperience[] }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedExperienceIdToDelete, setSelectedExperienceIdToDelete] =
    React.useState<string | null>(null);
  const router = useRouter();
  const columns = [
    "Role",
    "Company",
    "Start Date",
    "End Date",
    "Location",
    "Created At",
    "Actions",
  ];

  const deleteExperienceHandler = async (id: string | null) => {
    try {
      setLoading(true);

      setSelectedExperienceIdToDelete(id);
      let response = await deleteExperienceById(id!);

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSelectedExperienceIdToDelete(null);
      setLoading(false);
    }
  };

  const openAlertDialog = (id: string) => {
    setSelectedExperienceIdToDelete(id);
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
          {experiences.map((experience, index) => (
            <TableRow key={experience.id}>
              <TableCell>{experience.role}</TableCell>
              <TableCell>{experience.company}</TableCell>
              <TableCell>
                {dayjs(experience.start_date).format("DD MMMM YYYY")}
              </TableCell>
              <TableCell>
                {dayjs(experience.end_date).format("DD MMMM YYYY")}
              </TableCell>
              <TableCell>{experience.location}</TableCell>
              <TableCell>
                {dayjs(experience.created_at).format("DD MMMM YYYY")}
              </TableCell>
              <TableCell>
                <div className="flex gap-5">
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => openAlertDialog(experience.id)}
                    className="cursor-pointer"
                  >
                    <Trash2 size={12} />
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    className="cursor-pointer"
                    onClick={() =>
                      router.push(`/account/experiences/edit/${experience.id}`)
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
              onClick={() => deleteExperienceHandler(selectedExperienceIdToDelete)}
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

export default ExperiencesTable;
