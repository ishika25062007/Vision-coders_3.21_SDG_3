// 🔹 Supabase Helper
// 🔹 Supabase Helper
const SUPABASE_URL = typeof CONFIG !== 'undefined' ? CONFIG.SUPABASE_URL : "";
const SUPABASE_KEY = typeof CONFIG !== 'undefined' ? CONFIG.SUPABASE_KEY : "";

let supabase;

try {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  console.log("Supabase initialized");
} catch (error) {
  console.error("Failed to initialize Supabase:", error);
}

// 🔹 Auth Functions
async function signUp(email, password) {
  if (!supabase) return { error: { message: "Supabase not configured" } };

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

async function signIn(email, password) {
  if (!supabase) return { error: { message: "Supabase not configured" } };

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

async function signInWithGoogle() {
  if (!supabase) return { error: { message: "Supabase not configured" } };

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + '/logopopup/logopop.html', // Redirect back to this page
    },
  });
  return { data, error };
}

async function signOut() {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  return { error };
}

// 🔹 Get User
async function getCurrentUser() {
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
