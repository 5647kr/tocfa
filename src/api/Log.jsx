import supabase from "../supabaseClient"

async function LogIn({ email, password }) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { error };
}

function LogOut() {}

export { LogIn, LogOut };
