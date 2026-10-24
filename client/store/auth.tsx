'use client'

import { useEffect } from 'react'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { verifyUser, type, UserProps } from '@/lib/user'


type AuthState = {
  user: UserProps | undefined;
  loading: boolean;
  setUser: (user: UserProps | null) => void;
  setLoading: (loading: boolean | null) => void;
  logout: () => void;
}



export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,
      setUser:(user) => set({ user }),
      setLoading:(loading) => set({ loading }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-profile',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ user: state.user}),
      skipHydration: true,
    }
  )
)



export function AuthProvider({ children }: { children : React.ReactNode}) {
  useEffect(() => {
    async function checkUser() {
      await useAuthStore.persist.rehydrate();
      try {
        const user = await verifyUser()
        useAuthStore.getState().setUser(user)
      } catch {
        useAuthStore.getState().logout()
      } finally {
        useAuthStore.getState().setLoading(false)
      }
    }
    checkUser()
  },[]);
  
  return <>{children}</>;
}


