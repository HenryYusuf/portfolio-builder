import supabase from "@/config/supabase-db-config";

export const uploadFileAndGetUrl = async (file: File) => {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("public.image")
      .upload(fileName, file);

    if (error) {
      throw new Error(error.message);
    }

    const response = supabase.storage.from("public.image").getPublicUrl(fileName);

    return response.data.publicUrl;
  } catch (error: any) {
    throw new Error(error);
  }
};
