import supabase from "../supabaseClient";

export default async function LoginApi(loginData) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword(loginData);

    if (error) {
      throw new Error("로그인 오류 발생");
    }
    return data;
  } catch (error) {
    throw error;
  }
}
