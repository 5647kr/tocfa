import supabase from "../supabaseClient";

export default async function PostApi({ data, typeSelected }) {
  try {
    const { error } = await supabase
      .from(`${typeSelected}`)
      .insert(data)
      .select();

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}
