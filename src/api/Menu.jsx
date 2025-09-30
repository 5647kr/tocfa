import supabase from "../supabaseClient";

export default async function Menu() {
  try {
    const { data, error } = await supabase.from("adminMenu").select("*");

    if (error) throw new Error("메뉴 조회 불가");
    return data;
  } catch (error) {
    return error;
  }
}
