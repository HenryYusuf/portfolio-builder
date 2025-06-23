"use client";

import React, { useEffect } from "react";

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
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import {
  getConfigurations,
  saveConfigurations,
} from "@/actions/configurations";

function ConfigurationsPage() {
  const { user } = usersGlobalStore() as IUsersGlobalStore;
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [initialValues, setInitialValues] = React.useState<any>({
    show_education: true,
    show_percentage_in_educations: true,
    show_icons_in_skills: true,
    show_levels_in_skills: true,
  });

  const formSchema = z.object({
    show_education: z.boolean(),
    show_percentage_in_educations: z.boolean(),
    show_icons_in_skills: z.boolean(),
    show_levels_in_skills: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await saveConfigurations({
        userId: user?.id!,
        payload: {
          ...data,
          user_id: user?.id,
        },
      });

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchConfiguration = async () => {
    try {
      setLoading(true);

      const response = await getConfigurations(user?.id!);

      if (response.success) {
        setInitialValues(response.data);
        form.reset(response.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfiguration();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold">Configurations</h1>
      <hr className="my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
          <FormField
            control={form.control}
            name="show_education"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-5">
                <FormLabel>Tampilkan Educations</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="show_percentage_in_educations"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-5">
                <FormLabel>Tampilkan Persentase Educations</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="show_icons_in_skills"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-5">
                <FormLabel>Tampilkan Icon Skill</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="show_levels_in_skills"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-5">
                <FormLabel>Tampilkan Level Skill</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-5">
            <Button disabled={loading} type="submit" className="cursor-pointer">
              Simpan
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ConfigurationsPage;
