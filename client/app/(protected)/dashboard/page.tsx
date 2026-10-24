'use client'
import React from 'react'
import { LogOut, Mail, ShieldCheck, Database, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { logoutUser } from '@/lib/user'
import { useAuthStore } from '@/store/auth'

const cards = [
  { icon: ShieldCheck, title: "JWT cookie", text: "Your login token" }, 
  { icon: Database, title: "Session storage", text: "User saved in the browser" }, 
  { icon: Lock, title: "Protected route", text: "Only for logged in users" },
]

export default function DashboardPage() {
  const router = useRouter()
  const logout = useAuthStore((s) => s.logout)
  const user = useAuthStore((s) => s.user)

  const firstName = user?.name?.split(' ')[0]?? 'there'


  
  async function handleLogout() {
    try {
      await logoutUser()
    } catch (error) {
      console.log(error)
    }
    logout()
    router.replace('/login')
  }

  
  return (
    <main className='min-h-screen bg-slate-950 text-white'>
      <header 
        className='flex items-center justify-between border-b border-slate-800 px-6 py-4'
      >
        <span className='text-lg font-bold'>
          easy <span className='text-sky-400'>Dev</span>
        </span>
        <button
          onClick={handleLogout}
          className='flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white'
        >
          <LogOut size={16} /> Log out
        </button>
      </header>

      <section
        className='mx-auto max-w-3xl space-y-6 px-6 py-10'
      >
        {/* header section*/}
        <div>
          <h1 className='text-3xl font-bold'>HI {firstName}</h1>
          <p className='mt-1 text-slate-400'>
            you are logged in and this page is protected
          </p>
        </div>

       {/* header section*/}
        <div 
          className="flex items-center gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6"
        >
          <div
            className="flex items-center h-16 w-16 shrink-0 justify-center rounded-full text-2xl font-bold text-slate-950"
            style={{ background: 'linear-gradient(135deg, #38bdf8, #6366f1)'}}
          >
            {firstName[0]}
          </div>

          <div className='min-w-0 flex-1'>
            <p
              className='truncate text-lg font-semibold'
            >
              {user?.name}
            </p>
            
            <p
              className='truncate flex items-centertext-lg text-sm text-slate-400 gap-1'
            >
              <Mail size={14} /> {user?.email}
            </p>
            
          </div>
        </div>


        {/* card section */}
          
        <div className="grid gap-4 sm:grid-cols-3">
          {cards.map(({ icon:Icon, title, text }) => {
            return (
              <div
                key={title}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <Icon 
                  size={14} 
                  className="mb-3 text-sky-400"
                />
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm text-slate-400">{text}</p>
              </div>
            )
          })}
        </div>
        
      </section>
    </main>
  )
}