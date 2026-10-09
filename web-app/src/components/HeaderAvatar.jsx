"use client";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";

export default function HeaderAvatar({ fallbackName, fallbackRole }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL, 
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    supabase.auth.getUser().then(({ data }) => setUser(data?.user));
  }, []);

  const avatarUrl = user?.user_metadata?.avatar_url;
  const firstName = user?.user_metadata?.first_name || fallbackName?.split(' ')[0] || "User";
  const lastName = user?.user_metadata?.last_name || fallbackName?.split(' ')[1] || "";
  const role = fallbackRole;

  const initials = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();

  return (
    <Link href="/dashboard/settings" className="flex items-center gap-2.5 pl-2 border-l border-slate-200 hover:opacity-80 transition-opacity cursor-pointer">
      <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center overflow-hidden shadow-sm">
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          initials
        )}
      </div>
      <div className="hidden md:flex flex-col text-left">
        <span className="text-xs font-semibold text-slate-900 leading-tight">{firstName} {lastName}</span>
        <span className="text-[10px] text-slate-500">{role}</span>
      </div>
    </Link>
  );
}
