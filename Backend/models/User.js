import { supabase } from "../config/supabaseClient.js";

export const createUser = async (user) => {
    const { data, error } = await supabase
        .from("users")
        .insert([user])
        .select();

    if (error) throw error;
    return data[0];
};

export const getUserByEmail = async (email) => {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

    if (error) return null;
    return data;
};