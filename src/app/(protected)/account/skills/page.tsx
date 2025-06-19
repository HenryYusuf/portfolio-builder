"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import SkillForm from "./_components/skill-form";
import toast from "react-hot-toast";
import { deleteSkillById, getSkillsByUserId } from "@/actions/skills";
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";
import Spinner from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PencilIcon, Trash2 } from "lucide-react";
import { ISkill } from "@/interfaces";
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

function SkillsPage() {
  const [openSkillForm, setOpenSkillForm] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [skills, setSkills] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedSkill, setSelectedSkill] = React.useState<ISkill | null>(null);
  const { user } = usersGlobalStore() as IUsersGlobalStore;

  const fetchData = async () => {
    try {
      setLoading(true);

      const response: any = await getSkillsByUserId(user?.id!);

      if (!response.success) {
        throw new Error(response.message);
      }

      setSkills(response.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = ["", "Name", "Level", "Actions"];

  const openAlertDialog = (skill: ISkill | null) => {
    setSelectedSkill(skill);
    setOpen(true);
  };

  const deleteSkillHandler = async (skill: ISkill | null) => {
    try {
      setLoading(true);

      setSelectedSkill(skill);
      let response = await deleteSkillById(skill?.id!);

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message);
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSelectedSkill(null);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Skills</h1>
        <Button
          onClick={() => {
            setSelectedSkill(null);
            setOpenSkillForm(true);
          }}
        >
          Tambah Skill
        </Button>
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-40">
          <Spinner />
        </div>
      )}

      {skills.length && !loading && (
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
            {skills.map((skill: ISkill, index: number) => (
              <TableRow key={skill.id}>
                <TableCell>
                  {skill.image && (
                    <img
                      src={skill.image}
                      alt={skill.name}
                      className="w-20 h-20 rounded"
                    />
                  )}
                </TableCell>
                <TableCell>{skill.name}</TableCell>
                <TableCell>{skill.level}</TableCell>
                <TableCell>
                  <div className="flex gap-5">
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      onClick={() => openAlertDialog(skill)}
                      className="cursor-pointer"
                    >
                      <Trash2 size={12} />
                    </Button>
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedSkill(skill);
                        setOpenSkillForm(true);
                      }}
                    >
                      <PencilIcon size={12} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {openSkillForm && (
        <SkillForm
          openSkillForm={openSkillForm}
          setOpenSkillForm={setOpenSkillForm}
          formType={selectedSkill ? "edit" : "add"}
          reloadData={fetchData}
          initialValues={selectedSkill}
        />
      )}

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
            <AlertDialogAction
              onClick={() => deleteSkillHandler(selectedSkill)}
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

export default SkillsPage;
