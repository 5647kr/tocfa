import supabase from "../supabaseClient";

export default async function CategoryApi(userType) {
  try {
    const { data, error } = await supabase
      .from("category")
      .select("*")
      .eq("userType", userType);

    if (error) {
      throw new Error("네트워크에 오류가 있음");
    }
    return data;
  } catch (error) {
    return error;
  }
}
