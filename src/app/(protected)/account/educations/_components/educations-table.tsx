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

import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IEducation } from "@/interfaces";
import { deleteEducationById } from "@/actions/educations";

function EducationsTable({ educations }: { educations: IEducation[] }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedEducationIdToDelete, setSelectedEducationIdToDelete] =
    React.useState<string | null>(null);
  const router = useRouter();
  const columns = [
    "Degree",
    "Institution",
    "Location",
    "Start Date",
    "End Date",
    "Percentage",
    "Created At",
    "Actions",
  ];

  const deleteEducationHandler = async (id: string | null) => {
    try {
      setLoading(true);

      setSelectedEducationIdToDelete(id);
      let response = await deleteEducationById(id!);

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSelectedEducationIdToDelete(null);
      setLoading(false);
    }
  };

  const openAlertDialog = (id: string) => {
    setSelectedEducationIdToDelete(id);
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
          {educations.map((education, index) => (
            <TableRow key={education.id}>
              <TableCell>{education.degree}</TableCell>
              <TableCell>{education.institution}</TableCell>
              <TableCell>{education.location}</TableCell>
              <TableCell>
                {dayjs(education.start_date).format("DD MMMM YYYY")}
              </TableCell>
              <TableCell>
                {dayjs(education.end_date).format("DD MMMM YYYY")}
              </TableCell>
              <TableCell>{education.percentage}</TableCell>
              <TableCell>
                {dayjs(education.created_at).format("DD MMMM YYYY")}
              </TableCell>
              <TableCell>
                <div className="flex gap-5">
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => openAlertDialog(education.id)}
                    className="cursor-pointer"
                  >
                    <Trash2 size={12} />
                  </Button>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    className="cursor-pointer"
                    onClick={() =>
                      router.push(`/account/educations/edit/${education.id}`)
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
              onClick={() =>
                deleteEducationHandler(selectedEducationIdToDelete)
              }
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

export default EducationsTable;
