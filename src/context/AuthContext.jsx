import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("[Auth] Checking session...");

    if (!supabase) {
      setLoading(false);
      return;
    }

    let mounted = true;

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (!mounted) return;
      if (s) {
        console.log("[Auth] Session restored");
      } else {
        console.log("[Auth] No session found");
      }
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
      console.log("[Auth] Loading complete");
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!mounted) return;
      setSession(s);
      setUser(s?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email, password) => {
    if (!supabase) {
      throw new Error("Supabase client is not available. Check your environment variables.");
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      const message =
        error.message === "Invalid login credentials"
          ? "Invalid email or password."
          : error.message;
      throw new Error(message);
    }
    return data;
  }, []);

  const logout = useCallback(async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message || "Failed to sign out.");
  }, []);

  const value = {
    user,
    session,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
