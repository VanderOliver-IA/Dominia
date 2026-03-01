"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    Map,
    BookOpen,
    Trophy,
    Users,
    Settings,
    Flame,
    Heart,
    Crown,
    LogOut,
    ChevronRight,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const navItems = [
    { icon: Home, label: "Início", href: "/dashboard" },
    { icon: Map, label: "Mapa", href: "/dashboard/mapa" },
    { icon: BookOpen, label: "Trilhas", href: "/dashboard/trilhas" },
    { icon: Users, label: "Comunidade", href: "/dashboard/comunidade" },
    { icon: Trophy, label: "Missões", href: "/dashboard/missoes" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 glass border-r border-surface-800 hidden lg:flex flex-col z-40">
            {/* Brand */}
            <div className="p-6">
                <Link href="/dashboard" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center transition-transform group-hover:scale-110">
                        <Crown className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-display font-bold text-lg text-surface-50">Dominia</span>
                </Link>
            </div>

            {/* Stats Gamificados (Sempre visíveis na Sidebar Desktop) */}
            <div className="px-6 space-y-3 mb-8">
                <div className="flex items-center justify-between p-2 rounded-xl bg-surface-900/50 border border-surface-800">
                    <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-warn-500 animate-pulse" />
                        <span className="text-sm font-bold text-surface-100">12</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-error-500" />
                        <span className="text-sm font-bold text-surface-100">5/5</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(51,144,255,0.5)]" />
                        <span className="text-xs font-bold text-surface-400">LV. 1</span>
                    </div>
                </div>
                <div className="px-1">
                    <div className="flex justify-between text-[10px] text-surface-400 mb-1">
                        <span>XP: 140 / 200</span>
                        <span>70%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-800 rounded-full overflow-hidden">
                        <div className="h-full gradient-xp w-[70%] transition-all duration-1000" />
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                ${isActive
                                    ? "bg-brand-500/10 text-brand-400 border border-brand-500/20 shadow-[0_0_15px_rgba(51,144,255,0.05)]"
                                    : "text-surface-400 hover:bg-surface-800 hover:text-surface-100"
                                }
              `}
                        >
                            <item.icon
                                className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? "text-brand-400" : "text-surface-500 group-hover:text-surface-300"
                                    }`}
                            />
                            {item.label}
                            {isActive && (
                                <ChevronRight className="w-4 h-4 ml-auto text-brand-500/50" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Profile Mini */}
            <div className="p-4 mt-auto border-t border-surface-800">
                <Link
                    href="/dashboard/perfil"
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-800 transition-colors mb-3"
                >
                    <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center font-display font-bold text-white shadow-sm">
                        V
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-surface-50 truncate">Vanderson</p>
                        <Badge variant="brand" size="sm" className="scale-75 origin-left">Explore</Badge>
                    </div>
                    <Settings className="w-4 h-4 text-surface-500 group-hover:rotate-45 transition-transform" />
                </Link>
                <Button variant="ghost" size="sm" fullWidth className="text-error-400 hover:text-error-300 hover:bg-error-500/10">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                </Button>
            </div>
        </aside>
    );
}
