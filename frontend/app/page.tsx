import WaveVisualizer from "@/components/ui/WaveVisualizer";
import { Mic, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
      
      {/* 背景のオーディオビジュアライザー */}
      <WaveVisualizer />

      {/* メインコンテンツ (z-indexで背景より手前に表示) */}
      <div className="relative z-10 max-w-4xl space-y-8">
        
        {/* 信頼性のための小さなバッジ */}
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm backdrop-blur-md animate-fade-in-down">
          <Sparkles className="mr-2 h-4 w-4 text-cyan-400" />
          <span className="text-gray-300">AI音声解析による性格診断</span>
        </div>

        {/* メインタイトル */}
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl animate-fade-in-up delay-100">
          声は、語る。<br />
          <span className="text-gradient-cyan block mt-2">あなたの真実を。</span>
        </h1>

        {/* サブタイトル */}
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400 sm:text-xl animate-fade-in-up delay-200 leading-relaxed">
          voicetypeは、最新のAI音声解析技術を用いて、<br className="hidden sm:block"/>
          声色、抑揚、リズムから、あなたの隠された性格タイプを精密に診断します。
        </p>

        {/* CTAボタンエリア */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
          <Link
            href="/diagnose" // 診断ページへのリンク（後で作成）
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 font-bold text-gray-900 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            {/* ボタンの背景グラデーション効果 */}
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 transition-opacity group-hover:opacity-10"></span>
            
            <Mic className="mr-2 h-5 w-5 text-cyan-600" />
            診断を始める
            <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <Link href="/about" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
            voicetypeとは？
          </Link>
        </div>

        {/* 実績っぽい数字（オプション） */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400 animate-fade-in-up delay-500">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">16 Types</div>
            <div className="text-sm">診断タイプ</div>
          </div>
          <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">98.2%</div>
            <div className="text-sm">AI解析精度 (理論値)</div>
          </div>
        </div>

      </div>
      
      {/* フッターっぽい装飾 */}
      <div className="absolute bottom-4 text-center text-xs text-gray-500 animate-pulse">
        Scroll to explore more
      </div>
    </main>
  );
}