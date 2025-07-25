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
import { useRouter } from "next/navigation";
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";
import { addNewEducation, editEducationById } from "@/actions/educations";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EducationFormProps {
  initialValues?: any;
  formType?: "add" | "edit";
}
function EducationForm({
  formType = "add",
  initialValues,
}: EducationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { user } = usersGlobalStore() as IUsersGlobalStore;

  const formSchema = z.object({
    degree: z.string().nonempty().min(3).max(50),
    institution: z.string().nonempty().min(3).max(50),
    start_date: z.string().nonempty(),
    end_date: z.string().nonempty(),
    location: z.string().nonempty(),
    percentage: z.number().min(0).max(100),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      degree: initialValues?.degree || "",
      institution: initialValues?.institution || "",
      start_date: initialValues?.start_date || "",
      end_date: initialValues?.end_date || "",
      location: initialValues?.location || "",
      percentage: initialValues?.percentage || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const payload: any = { ...values };

      payload.user_id = user?.id || null;
      let response: any = null;

      if (formType === "add") {
        response = await addNewEducation(payload);
      } else {
        response = await editEducationById(initialValues.id, payload);
      }

      if (response.success) {
        toast.success(response.message);
        router.push("/account/educations");
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
          <div className="grid grid-cols-3 gap-5">
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gelar Kamu</FormLabel>
                  <FormControl>
                    <Input placeholder="Sarjana Teknik" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lembaga</FormLabel>
                  <FormControl>
                    <Input placeholder="Oxford University" {...field} />
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
                    <Input placeholder="London" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="percentage"
              render={({ field }) => (
                <FormItem>
                  <Tooltip>
                    <TooltipTrigger className="w-max">
                      <FormLabel>
                        Nilai <span className="text-destructive">*</span>
                      </FormLabel>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Jika nilai IPK kamu 3.5, maka persentase kamu adalah
                        ((nilai ipk|gpa / 4) * 100).
                      </p>
                      <p>Kemudian bulatkan ke atas agar tidak terjadi error</p>
                    </TooltipContent>
                  </Tooltip>
                  <FormControl>
                    <Input
                      placeholder="75"
                      {...field}
                      onChange={(e) => {
                        form.setValue("percentage", parseInt(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

export default EducationForm;
