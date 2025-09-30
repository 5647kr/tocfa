import supabase from "../supabaseClient";

async function LogIn({ email, password }) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { error };
}

async function LogOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export { LogIn, LogOut };
