import supabase from "../supabaseClient";

async function LogInApi(logInData) {
  try {
    const { error } = await supabase.auth.signInWithPassword(logInData);

    if (error) {
      throw new Error("로그인 오류");
    }
  } catch (error) {
    throw error
  }
}

async function LogOutApi() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error("로그인 오류");
    }
  } catch (error) {
    return error;
  }
}

export { LogInApi, LogOutApi };
