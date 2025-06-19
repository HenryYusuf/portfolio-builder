"use client";

import React, { useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";

import Editor from "react-simple-wysiwyg";
import toast from "react-hot-toast";
import { uploadFileAndGetUrl } from "@/utils/upload-image";
import { updateCurrentUser } from "@/actions/users";

function ProfilePage() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const { user } = usersGlobalStore() as IUsersGlobalStore;

  const formSchema = z.object({
    name: z.string().nonempty().min(3).max(50),
    title: z.string().nonempty().min(3).max(50),
    tag_line: z.string().nonempty(),
    bio: z.string(),
    hero_image: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      title: user?.title || "",
      tag_line: user?.tag_line || "",
      bio: user?.bio || "",
      hero_image: user?.hero_image || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const payload: any = { ...values };
      if (selectedFile) {
        payload.hero_image = await uploadFileAndGetUrl(selectedFile);
      }

      const response: any = await updateCurrentUser({
        ...payload,
        id: user?.id,
      });

      if (response.success) {
        toast.success("Profil Berhasil Diperbarui!");
      } else [toast.error(response.error)];
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const heroImagePreview = useMemo(() => {
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    }

    return user?.hero_image || "";
  }, [selectedFile]);

  return (
    <div>
      <h1 className="text-xl font-bold">Profil</h1>

      <hr className="my-4" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Kamu</FormLabel>
                <FormControl>
                  <Input placeholder="Lukaz Leonardo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titel / Posisi</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan Posisi Kamu (Desainer Grafis, Programmer, dll)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tag_line"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi Singkat</FormLabel>
                <FormControl>
                  <Input placeholder="Rolex, Uniqlo, Lous Vitton" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Biografi Kamu</FormLabel>
                <FormControl>
                  <Editor
                    value={field.value}
                    onChange={(e) => form.setValue("bio", e.target.value)}
                    className="bg-primary-foreground text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hero_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Foto Kamu</FormLabel>
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

          {heroImagePreview && (
            <div className="w-max p-2 border rounded">
              <img
                src={heroImagePreview}
                alt="Hero Image"
                className="w-32 h-32 rounded"
              />
            </div>
          )}

          <div className="flex justify-end gap-5">
            <Button disabled={loading} type="submit">Simpan</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ProfilePage;
