import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // フッターをインポート
import WaveVisualizer from "@/components/ui/WaveVisualizer";
import { Mic, ChevronDown, Sparkles, Activity, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black text-white selection:bg-cyan-500/30 scroll-smooth">
      <Navbar />
      
      {/* ヒーローセクション */}
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
        <WaveVisualizer />

        <div className="relative z-10 flex flex-col items-center space-y-8 pt-20">
          {/* 信頼性バッジ */}
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium backdrop-blur-md animate-fade-in">
            <Sparkles className="mr-2 h-3.5 w-3.5 text-cyan-400" />
            <span>AI Voice Analysis Engine v1.0</span>
          </div>

          <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl">
            声で暴く、<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">真実の自分。</span>
          </h1>
          
          <div className="flex flex-col items-center gap-6">
            <Link
              href="/voiceType"
              className="group relative flex items-center gap-3 rounded-full bg-white px-10 py-5 text-lg font-bold text-black transition-all hover:scale-105 active:scale-95"
            >
              <Mic className="h-6 w-6 text-cyan-600 transition-transform group-hover:rotate-12" />
              診断を始める
              <div className="absolute -inset-1 rounded-full bg-cyan-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            
            <a href="#about" className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
              概要と説明を見る <ChevronDown className="h-4 w-4 animate-bounce" />
            </a>
          </div>
        </div>
      </main>

      {/* 概要セクション (ID: about) */}
      <section id="about" className="relative z-10 mx-auto max-w-5xl px-6 py-32">
        <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-8 md:p-16 backdrop-blur-2xl">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold sm:text-5xl tracking-tight">VOICETYPE16</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              最新の音声信号処理技術と16タイプ性格診断を融合。あなたの「声」に含まれる非言語情報を解析します。
            </p>
            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* 特徴1 */}
            <div className="rounded-3xl bg-white/5 p-8 border border-white/5 hover:border-cyan-500/30 transition-colors">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold">周波数解析</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                声のピッチ変動（F0）から、論理的思考（T）と感情的判断（F）の傾向をミリ秒単位で算出します。
              </p>
            </div>

            {/* 特徴2 */}
            <div className="rounded-3xl bg-white/5 p-8 border border-white/5 hover:border-cyan-500/30 transition-colors">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                <Mic className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold">リズム推定</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                発話速度と無音区間の比率から、エネルギーの方向（E/I）と外部への接し方を特定します。
              </p>
            </div>

            {/* 特徴3 */}
            <div className="rounded-3xl bg-white/5 p-8 border border-white/5 hover:border-cyan-500/30 transition-colors">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold">高精度判定</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                AI感情分析モデルを組み合わせ、一時的な気分に左右されない「本来の気質」を導き出します。
              </p>
            </div>
          </div>

          <div className="mt-16 pt-10 text-center border-t border-white/10">
            <p className="text-sm text-gray-500 mb-8">
              FaceType16（顔タイプ診断）の結果と照らし合わせることで、<br className="hidden md:block" />
              あなたの外見的な印象と内面的なエネルギーのギャップを知ることができます。
            </p>
            <Link 
              href="/voiceType" 
              className="inline-flex items-center font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              今すぐ診断を開始する
              <ChevronDown className="ml-2 h-4 w-4 -rotate-90" />
            </Link>
          </div>
        </div>
      </section>

      {/* フッター */}
      <Footer />
    </div>
  );
}