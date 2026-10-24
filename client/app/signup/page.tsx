'use client'
import React from 'react'
import { LoaderCircle, User, LockKeyhole, AtSign } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signup } from '@/lib/user'
import { useAuthStore } from '@/store/auth'
import Link from 'next/link'

export default function SignupPage() {
  
  const inputClass = 'w-full rounded-lg border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-white outline-none focus:border-sky-400'
  const router = useRouter()
  const setUser = useAuthStore((s) => s.setUser)
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const [loading, setLoading] = useState(false)


  async function handleSubmit() {
    if(!name || !email || !password) return alert('please fill all input')
    setLoading(true)
    try {
      const user = await signup(name, email, password)
      setUser(user)
      router.replace('dashboard')
    } catch (err) {
      alert('could not process request')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <main 
      className='flex min-h-screen items-center justify-center bg-slate-950 px-4'
    >
      <div
        className='w-full max-w-sm space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-8'
      >
        <h1 
          className='text-2xl font-bold text-white'
        >
          Create your account
        </h1>
        <p
          className='mt-1 text-sm text-slate-400'
        >
          It takes less than a minute
        </p>

        <div className='relative'>
          <User 
            className='absolute left-3 top-3.5 text-slate-500'
            size={20}
          />
          <input 
            type='text'
            placeholder='Name'
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className='relative'>
          <AtSign
            className='absolute left-3 top-3.5 text-slate-500'
            size={20}
          />
          <input 
            type='text'
            placeholder='@gmail'
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className='relative'>
          <LockKeyhole
            className='absolute left-3 top-3.5 text-slate-500'
            size={20}
          />
          <input 
            type='text'
            placeholder='*******'
            className={inputClass}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          className='flex w-full items-center justify-center gap-2 rounded-lg bg-sky-400 py-3 font-semibold text-slate-950 transition hover:bg-sky-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60'
        >
          {loading && <LoaderCircle className='animate-spin' size={20} />}
          {loading ? 'Creating account' : 'Create account'}
        </button>
        <Link href='/login'>Go to login page</Link>
      </div>
    </main>
  )
}