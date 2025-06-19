"use client";

import React from "react";

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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";
import { addNewExperience, editExperienceById } from "@/actions/experiences";

interface ExperienceFormProps {
  initialValues?: any;
  formType?: "add" | "edit";
}

function ExperienceForm({ initialValues, formType='add' }: ExperienceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { user } = usersGlobalStore() as IUsersGlobalStore;

  const formSchema = z.object({
    company: z.string().nonempty().min(3).max(50),
    role: z.string().nonempty().min(3).max(50),
    start_date: z.string().nonempty(),
    end_date: z.string().nonempty(),
    description: z.string().nonempty(),
    location: z.string().nonempty(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: initialValues?.company || "",
      role: initialValues?.role || "",
      start_date: initialValues?.start_date || "",
      end_date: initialValues?.end_date || "",
      description: initialValues?.description || "",
      location: initialValues?.location || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const payload: any = { ...values };

      payload.user_id = user?.id || null;
      let response: any = null;

      if (formType === "add") {
        response = await addNewExperience(payload);
      } else {
        response = await editExperienceById(initialValues.id, payload);
      }

      if (response.success) {
        toast.success(response.message);
        router.push("/account/experiences");
      } else {
        toast.error(response.error);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Senior Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Perusahaan</FormLabel>
                  <FormControl>
                    <Input placeholder="PT. Cinta Sejati Indonesia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-5">
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tahun Mulai</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tahun Selesai</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lokasi</FormLabel>
                  <FormControl>
                    <Input placeholder="Gang Seribu Bunga" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

export default ExperienceForm;
