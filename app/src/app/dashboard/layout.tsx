"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    Map,
    BookOpen,
    Trophy,
    Menu,
    X,
    Crown,
    Flame,
    Heart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/store/useUserStore";

const mobileNavItems = [
    { icon: Home, label: "Início", href: "/dashboard" },
    { icon: Map, label: "Mapa", href: "/dashboard/mapa" },
    { icon: BookOpen, label: "Trilhas", href: "/dashboard/trilhas" },
    { icon: Trophy, label: "Missões", href: "/dashboard/missoes" },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { profile, setProfile } = useUserStore();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                router.push("/auth");
                return;
            }

            const { data } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();

            if (data) {
                setProfile(data);
            }
        };

        if (!profile) {
            fetchProfile();
        }
    }, [profile, setProfile, router]);

    return (
        <div className="min-h-dvh bg-surface-950">
            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-50 glass border-b border-surface-800">
                <div className="flex items-center justify-between px-4 h-14">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center">
                            <Crown className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-display font-bold text-sm">Dominia</span>
                    </Link>

                    {/* Mobile Stats */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-warn-500" />
                            <span className="text-xs font-bold text-surface-200">
                                {profile?.streak ?? 0}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Heart className="w-3.5 h-3.5 text-error-500" />
                            <span className="text-xs font-bold text-surface-200">
                                {profile?.hearts ?? 5}
                            </span>
                        </div>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-1.5 rounded-lg hover:bg-surface-800 transition-colors"
                            aria-label="Menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-surface-950/80 backdrop-blur-sm lg:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-64 glass border-l border-surface-800"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="pt-20 px-4 space-y-1">
                                {mobileNavItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                                    ? "bg-brand-500/10 text-brand-400"
                                                    : "text-surface-400 hover:bg-surface-800 hover:text-surface-100"
                                                }`}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="lg:pl-64 pt-14 lg:pt-0 min-h-dvh">
                <div className="p-4 sm:p-6 lg:p-8">{children}</div>
            </main>

            {/* Mobile Bottom Nav */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-surface-800">
                <div className="flex items-center justify-around h-16">
                    {mobileNavItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${isActive
                                        ? "text-brand-400"
                                        : "text-surface-500 hover:text-surface-300"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? "scale-110" : ""} transition-transform`} />
                                <span className="text-[10px] font-medium">{item.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="mobile-nav-indicator"
                                        className="absolute bottom-1 w-1 h-1 rounded-full bg-brand-400"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
