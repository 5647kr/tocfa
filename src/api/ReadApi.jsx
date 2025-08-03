import supabase from "../supabaseClient";

export default async function ReadApi(typeSelected) {
  try {
    const { data, error } = await supabase.from(`${typeSelected}`).select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}
