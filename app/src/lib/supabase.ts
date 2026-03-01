"use client";

import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
        // Se estivermos em tempo de build, retornamos um cliente nulo
        // para não quebrar o prerendering da Vercel.
        // As variáveis PRECISAM ser adicionadas no painel da Vercel.
        if (typeof window === "undefined") {
            console.warn("⚠️ Supabase: URL ou Chave não encontradas. Isso pode ser normal durante o build (fase de Prerendering) se as Env Vars não estiverem no painel da Vercel.");
            return {} as any;
        }
    }

    return createBrowserClient(url!, key!);
};

export const supabase = typeof window !== "undefined" ? createClient() : ({} as any);
