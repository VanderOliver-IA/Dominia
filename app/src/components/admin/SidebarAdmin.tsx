"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    CreditCard,
    BookOpen,
    Settings,
    LogOut,
    Crown,
    Gift,
    TrendingUp
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const MENU_ITEMS = [
    { name: "Painel Principal", href: "/admin", icon: LayoutDashboard },
    { name: "Usuários", href: "/admin/usuarios", icon: Users },
    { name: "Conteúdo & Trilhas", href: "/admin/conteudo", icon: BookOpen },
    { name: "Financeiro & Promo", href: "/admin/financeiro", icon: CreditCard },
    { name: "Benefícios & VIP", href: "/admin/beneficios", icon: Gift },
    { name: "Métricas", href: "/admin/metricas", icon: TrendingUp },
];

export default function SidebarAdmin() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/auth");
    };

    return (
        <aside className="w-64 bg-surface-900 border-r border-surface-800 h-dvh flex flex-col hidden md:flex sticky top-0">
            {/* Logo */}
            <div className="p-6">
                <Link href="/admin" className="flex items-center gap-3 w-fit">
                    <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shadow-lg shadow-brand-500/20">
                        <Crown className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-display font-bold text-xl text-surface-50 tracking-tight">
                        Dominia<span className="text-brand-400">Admin</span>
                    </span>
                </Link>
            </div>

            {/* Menu */}
            <nav className="flex-1 px-4 py-4 space-y-1">
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                    ? "bg-brand-500/10 text-brand-400 font-semibold"
                                    : "text-surface-400 hover:text-surface-100 hover:bg-surface-800"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? "text-brand-400" : ""}`} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-surface-800 space-y-2">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-surface-400 hover:text-surface-100 hover:bg-surface-800 transition-colors"
                >
                    <LayoutDashboard className="w-5 h-5" />
                    Voltar pro App
                </Link>
                <Link
                    href="/admin/configuracoes"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-surface-400 hover:text-surface-100 hover:bg-surface-800 transition-colors"
                >
                    <Settings className="w-5 h-5" />
                    Configurações
                </Link>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-error-400 hover:bg-error-500/10 w-full transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Sair
                </button>
            </div>
        </aside>
    );
}
