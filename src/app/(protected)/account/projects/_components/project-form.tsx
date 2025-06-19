"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { addNewProject, editProjectById } from "@/actions/projects";
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";

interface IProjectFormProps {
  formType?: "add" | "edit";
  initialValues?: any;
}

function ProjectForm({
  formType = "add",
  initialValues = {},
}: IProjectFormProps) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const { user } = usersGlobalStore() as IUsersGlobalStore;

  const formSchema = z.object({
    name: z.string().nonempty().min(3).max(50),
    description: z.string().nonempty(),
    demo_link: z.string().nonempty(),
    repo_link: z.string().nonempty(),
    tech_stack: z.string().nonempty(),
    image: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      demo_link: initialValues?.demo_link || "",
      repo_link: initialValues?.repo_link || "",
      tech_stack: initialValues?.tech_stack || "",
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
        response = await addNewProject(payload);
      } else {
        response = await editProjectById(initialValues.id, payload);
      }

      if (response.success) {
        toast.success(response.message);
        router.push("/account/projects");
      } else {
        toast.error(response.error);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const projectImagePreview = useMemo(() => {
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    }

    return initialValues?.image || "";
  }, [selectedFile]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Project</FormLabel>
                <FormControl>
                  <Input placeholder="Spotify Clone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi Project</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Masukkan deskripsi singkat tentang project kamu"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tech_stack"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tech Stack</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan tech stack yang kamu gunakan (Laravel, React, MySQL)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="demo_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Demo</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="repo_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Repository</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gambar Project</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => {
                      setSelectedFile(e.target.files![0]);
                    }}
                    className="w-max"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {projectImagePreview && (
            <div className="w-max p-2 border rounded">
              <img
                src={projectImagePreview}
                alt="Image"
                className="w-32 h-32 rounded"
              />
            </div>
          )}

          <div className="flex justify-end gap-5">
            <Button
              disabled={loading}
              variant={"secondary"}
              onClick={() => router.back()}
              type="button"
              className="cursor-pointer"
            >
              Batal
            </Button>
            <Button disabled={loading} type="submit" className="cursor-pointer">
              Simpan
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ProjectForm;
