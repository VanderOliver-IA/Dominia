"use client";

import SidebarAdmin from "@/components/admin/SidebarAdmin";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-dvh flex bg-surface-950">
            {/* Sidebar (Desktop) */}
            <SidebarAdmin />

            {/* TODO: Mobile Admin Header */}

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0 h-dvh overflow-y-auto">
                <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
