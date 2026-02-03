"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, Mic, Camera, Info, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. 初回のログイン状態チェック
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    checkUser();

    // 2. ログイン・ログアウトのリアルタイム監視
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* ロゴ */}
        <Link href="/" className="text-xl font-black tracking-tighter text-white hover:opacity-80">
          VOICETYPE<span className="text-cyan-400">16</span>
        </Link>

        {/* メインメニュー */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/voiceType" className="flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
            <Mic className="h-4 w-4" /> 声タイプ診断
          </Link>
          <a href="https://facetype16.com" target="_blank" className="flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-pink-400 transition-colors">
            <Camera className="h-4 w-4" /> 顔タイプ診断
          </a>
          <Link href="/#about" className="flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors">
            <Info className="h-4 w-4" /> 概要
          </Link>
        </div>

        {/* 右側アクション */}
        <div className="flex items-center gap-4">
          <Link 
            href="/voiceType" 
            className="hidden rounded-full bg-cyan-500 px-4 py-2 text-xs font-bold text-black transition-all hover:bg-cyan-400 sm:block shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            診断スタート
          </Link>

          {/* ログイン状態に応じたアイコン表示 */}
          <Link 
            href={user ? "/mypage" : "/login"} 
            className={`relative rounded-full border p-2 transition-all duration-300 ${
              loading 
                ? "border-white/10 text-gray-600" 
                : user 
                  ? "border-cyan-500/50 text-cyan-400 bg-cyan-500/10 shadow-[0_0_10px_rgba(6,182,212,0.2)]" 
                  : "border-white/20 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <User className="h-5 w-5" />
                {/* ログイン中のみ右上にインジケーターを表示 */}
                {user && (
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-cyan-500 border border-black animate-pulse" />
                )}
              </>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}