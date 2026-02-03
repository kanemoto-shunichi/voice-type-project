'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { Mic, Sparkles, ArrowRight, Loader2, Mail, Lock } from 'lucide-react';

type Mode = 'login' | 'signup';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!email || !password) throw new Error('情報を入力してください。');

      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('アカウントを作成しました。メールを確認してログインしてください。');
        setMode('login');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push('/mypage');
      }
    } catch (e: any) {
      setError(e.message ?? 'エラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async () => {
    setOauthLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/mypage` },
      });
      if (error) throw error;
    } catch (e: any) {
      setError(e.message ?? 'エラーが発生しました。');
      setOauthLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-cyan-500/30 overflow-hidden flex items-center justify-center px-4">
      {/* 背景装飾 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* 左側：メッセージ */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 text-center lg:text-left space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-cyan-400 text-xs font-bold tracking-widest uppercase">
            <Sparkles className="h-3 w-3" />
            Unified Account System
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
            ひとつのIDで、<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              すべてを可視化。
            </span>
          </h1>

          <p className="text-gray-400 text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
            FaceType16のアカウントでログイン可能。<br />
            あなたの声と顔のデータを、一つの場所で管理しましょう。
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
             <div className="flex items-center gap-2 text-sm text-gray-500 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" /> 診断履歴の共有
             </div>
             <div className="flex items-center gap-2 text-sm text-gray-500 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" /> 高精度な自己分析
             </div>
          </div>
        </motion.div>

        {/* 右側：フォームカード */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="relative p-8 md:p-10 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-2xl">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold">{mode === 'login' ? 'おかえりなさい' : '新しく始める'}</h2>
              <p className="text-sm text-gray-400 mt-2">情報を入力してVOICETYPE16にアクセス</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleOAuthLogin}
                disabled={oauthLoading || loading}
                className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-bold transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                {oauthLoading ? <Loader2 className="animate-spin" /> : <GoogleIcon />}
                Googleで{mode === 'login' ? 'ログイン' : 'サインアップ'}
              </button>

              <div className="flex items-center gap-4 py-2">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">OR</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-cyan-400" />
                  <input
                    type="email"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-cyan-400" />
                  <input
                    type="password"
                    placeholder="パスワード"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-400 bg-red-400/10 p-3 rounded-xl border border-red-400/20">
                  {error}
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading || oauthLoading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : mode === 'login' ? 'ログイン' : 'アカウント作成'}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>

            <div className="mt-8 text-center space-y-4">
              <button
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {mode === 'login' ? 'アカウントをお持ちでないですか？' : 'すでにアカウントをお持ちですか？'}
              </button>
              <div>
                <Link href="/" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                  トップページに戻る
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}