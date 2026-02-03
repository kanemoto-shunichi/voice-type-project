'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mic, Camera, LogOut, History, Zap, Activity, BarChart3, ChevronRight } from 'lucide-react';

// ----------------------------------------------------------------------
// 1. 型定義
// ----------------------------------------------------------------------

type VoiceResult = {
  id: string;
  user_id: string;
  voice_type: string;
  pitch_fluctuation: number;
  silence_ratio: number;
  excitement_score: number;
  calmness_score: number;
  created_at: string;
};

type FaceResult = {
  id: string;
  user_id: string;
  type_code: string;
  created_at: string;
};

// ----------------------------------------------------------------------
// 2. コンポーネント実装
// ----------------------------------------------------------------------

export default function MyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [voiceHistory, setVoiceHistory] = useState<VoiceResult[]>([]);
  const [faceHistory, setFaceHistory] = useState<FaceResult[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        router.push('/login');
        return;
      }

      setUser(session.user);

      // 声と顔の履歴を並列で取得
      const [voiceRes, faceRes] = await Promise.all([
        supabase
          .from('voicetype_results')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('face_results')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
      ]);

      if (voiceRes.data) setVoiceHistory(voiceRes.data);
      if (faceRes.data) setFaceHistory(faceRes.data);

      setLoading(false);
    };

    fetchAllData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-black items-center justify-center">
        <Activity className="h-10 w-10 animate-spin text-cyan-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* --- ヘッダーエリア --- */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-400">
                <Zap className="h-3 w-3" /> {user?.email}
              </div>
              <h1 className="text-4xl font-black tracking-tighter sm:text-5xl">Dashboard</h1>
              <p className="text-gray-400">声と顔、ふたつのデータからあなたを分析します。</p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500 transition-all"
            >
              <LogOut className="h-4 w-4" /> ログアウト
            </button>
          </div>

          {/* --- メインコンテンツ：2カラム --- */}
          <div className="grid gap-10 lg:grid-cols-2">
            
            {/* 左：音声診断履歴 (VOICETYPE16) */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Mic className="text-cyan-400 h-5 w-5" /> 声タイプ履歴
                  <span className="text-xs font-normal text-gray-500 ml-2">{voiceHistory.length} 件</span>
                </h2>
                <Link href="/voiceType" className="text-xs font-bold text-cyan-400 hover:underline">新規診断 →</Link>
              </div>

              <div className="space-y-4">
                {voiceHistory.length > 0 ? (
                  voiceHistory.map((item) => (
                    <div key={item.id} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-cyan-500/50 transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="text-3xl font-black tracking-tighter text-cyan-400">{item.voice_type}</div>
                          <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                            {new Date(item.created_at).toLocaleDateString('ja-JP')}
                          </div>
                        </div>
                        <BarChart3 className="text-gray-700 h-5 w-5" />
                      </div>
                      
                      {/* ミニ統計グラフ */}
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-4 border-t border-white/5">
                        <MiniProgress label="Pitch" value={item.pitch_fluctuation} color="bg-cyan-500" />
                        <MiniProgress label="Silence" value={item.silence_ratio} color="bg-blue-500" />
                        <MiniProgress label="Excitement" value={item.excitement_score} color="bg-purple-500" />
                        <MiniProgress label="Calmness" value={item.calmness_score} color="bg-emerald-500" />
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyCard title="音声診断データなし" href="/voiceType" icon={<Mic />} />
                )}
              </div>
            </section>

            {/* 右：顔診断履歴 (FaceType16) */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Camera className="text-pink-400 h-5 w-5" /> 顔タイプ履歴
                  <span className="text-xs font-normal text-gray-500 ml-2">{faceHistory.length} 件</span>
                </h2>
                <a href="https://facetype16.com" className="text-xs font-bold text-pink-400 hover:underline">新規診断 →</a>
              </div>

              <div className="space-y-4">
                {faceHistory.length > 0 ? (
                  faceHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-pink-500/50 transition-all">
                      <div>
                        <div className="text-3xl font-black tracking-tighter text-pink-400">{item.type_code}</div>
                        <div className="text-[10px] text-gray-500 tracking-widest mt-1">
                          {new Date(item.created_at).toLocaleDateString('ja-JP')}
                        </div>
                      </div>
                      <ChevronRight className="text-gray-600 h-5 w-5" />
                    </div>
                  ))
                ) : (
                  <EmptyCard title="顔診断データなし" href="https://facetype16.com" icon={<Camera />} />
                )}
              </div>

              {/* 統合分析バッジ (おまけ) */}
              {(voiceHistory.length > 0 && faceHistory.length > 0) && (
                <div className="rounded-3xl bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border border-white/10 p-8 text-center">
                  <h3 className="text-lg font-bold mb-2">統合分析が可能です</h3>
                  <p className="text-sm text-gray-400 mb-4">声と顔のギャップから、あなたの多面性を解き明かします。</p>
                  <button className="text-sm font-black bg-white text-black px-6 py-2 rounded-full hover:scale-105 transition-transform">
                    フルレポートを見る
                  </button>
                </div>
              )}
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

// サブコンポーネント：ミニ進捗バー
function MiniProgress({ label, value, color }: { label: string; value: number; color: string }) {
  const percent = Math.min(Math.max(value * 100, 5), 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase tracking-tighter">
        <span>{label}</span>
        <span>{Math.round(percent)}%</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full ${color} opacity-80`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

// サブコンポーネント：空の状態
function EmptyCard({ title, href, icon }: { title: string; href: string; icon: React.ReactNode }) {
  return (
    <Link href={href} className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/5 bg-white/[0.02] py-12 hover:bg-white/5 transition-all group">
      <div className="mb-4 text-gray-600 group-hover:text-white transition-colors">
        {React.isValidElement(icon) 
          ? React.cloneElement(icon as React.ReactElement<any>, { size: 32 }) 
          : icon
        }
      </div>
      <p className="text-sm font-bold text-gray-500">{title}</p>
      <span className="text-[10px] text-cyan-400 mt-2">今すぐ診断を開始 →</span>
    </Link>
  );
}