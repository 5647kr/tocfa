import supabase from "../supabaseClient";

async function LogInApi({ email, password }) {
  console.log(email, password);
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { error };
}

async function LogOutApi() {}

export { LogInApi, LogOutApi };
