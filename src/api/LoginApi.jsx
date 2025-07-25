import supabase from "../supabaseClient"

export default async function LoginApi(loginData) {
  try {
    const {data, error} = await supabase.auth.signInWithPassword(loginData);

    if(error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw error
  }
}
