import { create } from "zustand";

type User = {
  email: string;
  mood: string;
  setEmail: (email: string) => void;
  setMood: (mood: string) => void;
};

export const useUser = create<User>()((set) => ({
  email: "",
  mood: "neutral",
  setEmail: (email) => set(() => ({ email: email })),
  setMood: (mood: string) => set(() => ({ mood: mood })),
}));
