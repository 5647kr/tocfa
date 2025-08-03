import supabase from "../supabaseClient";

export default async function DeleteApi({ id, typeSelected }) {
  try {
    const { error } = await supabase
      .from(`${typeSelected}`)
      .delete()
      .eq("id", id);

      if(error) {
        throw new Error(error.message)
      }
  } catch (error) {
    throw error
  }
}
