"use client";

import Link from "next/link";
import { User, Mic, Camera, Info, PlayCircle } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* ロゴ */}
        <Link href="/" className="text-xl font-black tracking-tighter text-white hover:opacity-80">
          VOICETYPE<span className="text-cyan-400">16</span>
        </Link>

        {/* メインメニュー */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/diagnose" className="flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
            <Mic className="h-4 w-4" /> 声タイプ診断
          </Link>
          <a href="https://facetype16.com" target="_blank" className="flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-pink-400 transition-colors">
            <Camera className="h-4 w-4" /> 顔タイプ診断
          </a>
          <a href="#about" className="flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors">
            <Info className="h-4 w-4" /> 概要
          </a>
        </div>

        {/* 右側アクション */}
        <div className="flex items-center gap-4">
          <Link href="/diagnose" className="hidden rounded-full bg-cyan-500 px-4 py-2 text-xs font-bold text-black transition-all hover:bg-cyan-400 sm:block">
            診断スタート
          </Link>
          <Link href="/mypage" className="rounded-full border border-white/20 p-2 text-gray-300 hover:bg-white/10 hover:text-white transition-all">
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}