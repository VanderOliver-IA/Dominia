import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LearningLevel = "Explorer" | "Builder" | "Master";

interface UserProfile {
    id: string;
    username: string;
    display_name: string | null;
    avatar_url: string | null;
    level: LearningLevel;
    xp: number;
    streak: number;
    hearts: number;
    is_premium: boolean;
}

interface UserState {
    profile: UserProfile | null;
    setProfile: (profile: UserProfile | null) => void;
    updateXP: (amount: number) => void;
    loseHeart: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            profile: null,
            setProfile: (profile) => set({ profile }),
            updateXP: (amount) =>
                set((state) => ({
                    profile: state.profile
                        ? { ...state.profile, xp: state.profile.xp + amount }
                        : null,
                })),
            loseHeart: () =>
                set((state) => ({
                    profile: state.profile
                        ? { ...state.profile, hearts: Math.max(0, state.profile.hearts - 1) }
                        : null,
                })),
        }),
        {
            name: "dominia-user-storage",
        }
    )
);
