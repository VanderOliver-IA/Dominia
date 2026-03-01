"use client";

import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
        console.warn("⚠️ Supabase: URL ou Chave não encontradas. Verifique as variáveis de ambiente na Vercel e faça um novo Deploy.");
        // Retorna um objeto falso seguro para não crashar a UI inteira
        return {
            auth: {
                getUser: async () => ({ data: { user: null } }),
                signInWithPassword: async () => ({ error: new Error("Supabase não configurado") }),
                signUp: async () => ({ error: new Error("Supabase não configurado") }),
            }
        } as any;
    }

    return createBrowserClient(url, key);
};

export const supabase = createClient();
