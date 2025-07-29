import supabase from "../supabaseClient";

export default async function LogoutApi() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error("로그아웃 오류 발생");
    }
  } catch (error) {
    throw error;
  }
}
