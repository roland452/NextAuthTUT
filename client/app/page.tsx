import Link from "next/link"; 
import { LogIn, UserPlus, LayoutDashboard } from "lucide-react"; 

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-sm space-y-8 text-center">
 
        <div>
          <h1 className="text-4xl font-bold text-white">
            easy<span className="text-sky-400">Dev</span> Auth 
          </h1>
          <p className="mt-2 text-slate-400">Full-stack authentication tutorial</p> 
        </div>

      
        <div className="space-y-3">
 
          <Link
            href="/login" 
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-sky-400 py-3 font-semibold text-slate-950 transition hover:bg-sky-300"
          >
            <LogIn size={20} />
            Log in
          </Link>

          <Link
            href="/signup"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            <UserPlus size={20} /> 
            Sign up
          </Link>

     
          <Link
            href="/dashboard" 
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            <LayoutDashboard size={20} /> 
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}