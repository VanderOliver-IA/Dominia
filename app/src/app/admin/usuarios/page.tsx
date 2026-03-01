"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Search, Filter, Shield, Award, Flame, Crown, Crown as CrownIcon, MoreVertical, Trash2, Heart } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

type UserProfile = {
    id: string;
    username: string;
    display_name: string;
    level: string;
    xp: number;
    hearts: number;
    streak: number;
    is_premium: boolean;
    is_admin: boolean;
    created_at: string;
};

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error && data) {
            setUsers(data);
        }
        setLoading(false);
    };

    const handleGiveLife = async (userId: string, currentHearts: number) => {
        // Exemplo de ação rápida (dar vida)
        const { error } = await supabase
            .from("profiles")
            .update({ hearts: Math.min(currentHearts + 1, 5) })
            .eq("id", userId);

        if (!error) {
            fetchUsers(); // recarrega a tabela
        }
    };

    const filteredUsers = users.filter((u) =>
        u.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold text-surface-50">Gestão de Alunos</h1>
                    <p className="text-surface-400 mt-1">Supervisione e interaja com sua base de usuários. Total: {users.length}</p>
                </div>
                <Button>
                    Exportar CSV
                </Button>
            </div>

            {/* Controle da Tabela */}
            <Card className="p-4 border-surface-800 bg-surface-900/50 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou @username"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-surface-800 border border-surface-700 rounded-lg text-sm text-surface-100 placeholder:text-surface-500 focus:outline-none focus:border-brand-500 transition-colors"
                    />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button variant="secondary" className="w-full sm:w-auto">
                        <Filter className="w-4 h-4" />
                        Filtros
                    </Button>
                </div>
            </Card>

            {/* Tabela de Usuários */}
            <div className="overflow-x-auto rounded-2xl border border-surface-800 bg-surface-900/50">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-surface-800/50 text-surface-400 border-b border-surface-800">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Aluno</th>
                            <th className="px-6 py-4 font-semibold">Status / Plano</th>
                            <th className="px-6 py-4 font-semibold">Métricas de Jogo</th>
                            <th className="px-6 py-4 font-semibold">Data Cadastro</th>
                            <th className="px-6 py-4 font-semibold text-right">Ações Rápidas</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-800/60">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-surface-400">
                                    Carregando base de dados...
                                </td>
                            </tr>
                        ) : filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-surface-400">
                                    Nenhum aluno encontrado para "{searchTerm}".
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-surface-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-surface-800 flex items-center justify-center font-bold text-surface-300">
                                                {user.display_name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-surface-100 flex items-center gap-2">
                                                    {user.display_name}
                                                    {user.is_admin && (
                                                        <Shield className="w-3.5 h-3.5 text-error-400" />
                                                    )}
                                                </div>
                                                <div className="text-xs text-surface-500">@{user.username}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        {user.is_premium ? (
                                            <Badge variant="brand" size="sm" className="bg-brand-500/10 text-brand-400 border-brand-500/20">
                                                <CrownIcon className="w-3 h-3" /> VIP Premium
                                            </Badge>
                                        ) : (
                                            <Badge variant="default" size="sm">
                                                Grátis
                                            </Badge>
                                        )}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4 text-xs">
                                            <div className="flex items-center gap-1 text-xp-400" title="XP Total">
                                                <Award className="w-4 h-4" /> {user.xp} XP
                                            </div>
                                            <div className="flex items-center gap-1 text-error-400" title="Vidas">
                                                <Heart className="w-4 h-4" /> {user.hearts}
                                            </div>
                                            <div className="flex items-center gap-1 text-accent-400" title="Dias de Ofensiva">
                                                <Flame className="w-4 h-4" /> {user.streak}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-surface-400 text-xs">
                                        {new Date(user.created_at).toLocaleDateString("pt-BR")}
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleGiveLife(user.id, user.hearts)}
                                                className="p-1.5 rounded-md text-surface-400 hover:text-error-400 hover:bg-error-500/10 transition-colors"
                                                title="Dar 1 Vida de presente"
                                            >
                                                <Heart className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="p-1.5 rounded-md text-surface-400 hover:text-brand-400 hover:bg-brand-500/10 transition-colors"
                                                title="Promover a VIP"
                                            >
                                                <Crown className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="p-1.5 rounded-md text-surface-500 hover:text-surface-100 hover:bg-surface-800 transition-colors"
                                                title="Mais opções"
                                            >
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <p className="text-xs text-surface-500 text-center">
                Nota: Atualizações de Votos, Vidas ou XP pelo painel têm efeito imediato no aplicativo do aluno.
            </p>
        </div>
    );
}
