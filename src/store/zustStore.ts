import { create } from 'zustand'

type User = {
  email: string
  setEmail: (email: string) => void
}

export const useUser = create<User>()((set) => ({
  email: "",
  setEmail: (email) => set(() => ({ email: email })),
}))

