"use server";

import supabase from "@/config/supabase-db-config";

export const saveConfigurations = async ({
  userId,
  payload,
}: {
  userId: string;
  payload: any;
}) => {
  try {
    // Check if the configurations already exists for the user
    const { data, error } = await supabase
      .from("configurations")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      throw new Error(error.message);
    }

    let response = null;
    if (data.length) {
      response = await supabase
        .from("configurations")
        .update(payload)
        .match({ user_id: userId });
    } else {
      response = await supabase.from("configurations").insert(payload);
    }

    if (response.error) throw new Error(response.error.message);

    return {
      success: true,
      message: "Configurations saved successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getConfigurations = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("configurations")
      .select("*")
      .eq("user_id", userId);

    if (error) throw new Error(error.message);

    if (data.length) {
      return {
        success: true,
        data: data[0],
      };
    } else {
      return {
        success: true,
        data: "Configurations not found",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
