'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { verifyUser } from '@/lib/user'
import { useAuthStore } from '@/store/auth'


export default function ProtectedLayout({
  children
}: { children: React.ReactNode}) {

  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const setUser = useAuthStore((s) => s.setUser)
  const logout = useAuthStore((s) => s.logout)

  const [checking, setChecking] = useState(true)

  useEffect(() => {
    verifyUser()
    .then((u) => setUser(u))
    .catch((err) => {
      console.log(err.response?.status, err.response?.data, err.message)
      logout()
      router.replace('/login')
    })
    .finally(() => { setChecking(false) })
  },[])

  if(checking) return <p className='text-center p-8 text-slate-400'>loading user details</p>

  if(!user) return null
  
  return (
    <> {children}</>
  )
}