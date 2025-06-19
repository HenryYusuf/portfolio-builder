import React, { useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import toast from "react-hot-toast";
import { uploadFileAndGetUrl } from "@/utils/upload-image";
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { addNewSkill, editSkillById } from "@/actions/skills";

interface SkillFormProps {
  formType: "add" | "edit";
  initialValues?: any;
  openSkillForm: boolean;
  setOpenSkillForm: (open: boolean) => void;
  reloadData: () => void;
}

function SkillForm({
  formType,
  initialValues,
  openSkillForm,
  setOpenSkillForm,
  reloadData,
}: SkillFormProps) {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const { user } = usersGlobalStore() as IUsersGlobalStore;

  const formSchema = z.object({
    name: z.string().nonempty().min(3).max(50),
    level: z.number(),
    image: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || "",
      level: initialValues?.level || 0,
      image: initialValues?.image || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const payload: any = { ...values };
      if (selectedFile) {
        payload.image = await uploadFileAndGetUrl(selectedFile);
      }

      payload.user_id = user?.id || null;
      let response: any = null;

      if (formType === "add") {
        response = await addNewSkill(payload);
      } else {
        response = await editSkillById(initialValues.id, payload);
      }

      if (response.success) {
        toast.success(response.message);
        reloadData();
        setOpenSkillForm(false);
      } else {
        toast.error(response.error);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const skillImagePreview = useMemo(() => {
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    }

    return initialValues?.image || "";
  }, [selectedFile]);

  return (
    <Dialog open={openSkillForm} onOpenChange={setOpenSkillForm}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {formType === "add" ? "Tambah Skill" : "Edit Skill"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Skill</FormLabel>
                  <FormControl>
                    <Input placeholder="NextJs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        form.setValue("level", parseInt(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gambar Skill</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => {
                        setSelectedFile(e.target.files![0]);
                      }}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {skillImagePreview && (
              <div className="w-max p-2 border rounded">
                <img
                  src={skillImagePreview}
                  alt="Image"
                  className="w-32 h-32 rounded"
                />
              </div>
            )}

            <div className="flex justify-end gap-5">
              <Button
                disabled={loading}
                type="submit"
                className="cursor-pointer"
              >
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default SkillForm;
