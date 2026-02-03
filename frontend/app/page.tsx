import Navbar from "@/components/Navbar";
import WaveVisualizer from "@/components/ui/WaveVisualizer";
import { Mic, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black text-white selection:bg-cyan-500/30">
      <Navbar />
      
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
        <WaveVisualizer />

        {/* ヒーローセクション */}
        <div className="relative z-10 flex flex-col items-center space-y-8 pt-20">
          <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl">
            声で暴く、<br />
            <span className="text-gradient-cyan">真実の自分。</span>
          </h1>
          
          <div className="flex flex-col items-center gap-6">
            <Link
              href="/voiceType"
              className="group flex items-center gap-3 rounded-full bg-white px-10 py-5 text-lg font-bold text-black transition-all hover:scale-105"
            >
              <Mic className="h-6 w-6 text-cyan-600" />
              診断を始める
            </Link>
            
            <a href="#about" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              概要を見る <ChevronDown className="h-4 w-4 animate-bounce" />
            </a>
          </div>
        </div>
      </main>

      {/* 概要セクション */}
      <section id="about" className="relative z-10 mx-auto max-w-4xl px-6 py-32">
        <div className="space-y-16 rounded-[2.5rem] border border-white/10 bg-white/5 p-12 backdrop-blur-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">VOICETYPE16とは？</h2>
            <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-cyan-500"></div>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-cyan-400">AI音声解析エンジン</h3>
              <p className="leading-relaxed text-gray-400">
                あなたの声の周波数、リズム、抑揚をミリ秒単位で解析。
                従来の質問形式の診断では見えてこない、無意識の性格傾向をデータ化します。
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-cyan-400">16の性格タイプ</h3>
              <p className="leading-relaxed text-gray-400">
                心理学的な16タイプ指標に基づき、あなたの声がどのタイプに近いかを判定。
                「外面」ではなく「本質」に近いエネルギーを可視化します。
              </p>
            </div>
          </div>

          <div className="pt-8 text-center border-t border-white/10">
            <p className="text-sm text-gray-500 mb-6">
              FaceType16（顔タイプ診断）と組み合わせることで、より立体的な自己分析が可能です。
            </p>
            <Link href="/diagnose" className="text-cyan-400 font-bold hover:underline">
              さっそく声を解析する →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}