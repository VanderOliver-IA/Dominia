import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({ request });

    try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!url || !key) {
            console.error("Middleware: Variáveis do Supabase não encontradas.");
            return supabaseResponse;
        }

        const supabase = createServerClient(url, key, {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        });

        const {
            data: { user },
        } = await supabase.auth.getUser();

        const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
        const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

        if (!user && isDashboard) {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = "/auth";
            return NextResponse.redirect(redirectUrl);
        }

        if (user && isAuthPage) {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = "/dashboard";
            return NextResponse.redirect(redirectUrl);
        }

        return supabaseResponse;
    } catch (err) {
        console.error("Erro no middleware do Supabase:", err);
        // Em caso de erro (ex: URL mal formatada na Vercel), deixa a requisição passar sem crashar 500.
        // A página no cliente lidará com o estado deslogado/erro.
        return supabaseResponse;
    }
}

export const config = {
    matcher: ["/dashboard/:path*", "/auth/:path*"],
};
