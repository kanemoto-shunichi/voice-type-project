"use client";

import { useState, useRef } from "react";
import { Mic, Square, Loader2, RefreshCcw, Share2 } from "lucide-react";
import WaveVisualizer from "@/components/ui/WaveVisualizer"; // 背景共通化

export default function DiagnosePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ type: string; metrics: any } | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // 録音開始
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      sendToBackend(audioBlob);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  // 録音停止
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    setIsAnalyzing(true);
  };

  // バックエンドへ送信
  const sendToBackend = async (blob: Blob) => {
    const formData = new FormData();
    formData.append("file", blob, "voice.wav");
    formData.append("user_id", "temp_user_123"); // 実際はAuthから取得

    try {
      const res = await fetch("http://localhost:8000/analyze?user_id=temp_user_123", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Analysis failed", error);
      alert("解析に失敗しました。サーバーが起動しているか確認してください。");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-white">
      <WaveVisualizer />

      <div className="relative z-10 w-full max-w-xl">
        {!result ? (
          <div className="space-y-12 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {isAnalyzing ? "AIが深層心理を解析中..." : "あなたの声を聴かせてください"}
              </h2>
              <p className="text-gray-400">
                {isRecording 
                  ? "「今日の気分」や「好きなこと」を10秒ほど自由に話してください" 
                  : "ボタンを押すと録音が始まります"}
              </p>
            </div>

            <div className="flex justify-center">
              {isAnalyzing ? (
                <div className="relative h-32 w-32 flex items-center justify-center">
                  <div className="absolute inset-0 animate-ping rounded-full bg-cyan-500/20"></div>
                  <Loader2 className="h-12 w-12 animate-spin text-cyan-400" />
                </div>
              ) : (
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`group relative h-32 w-32 rounded-full transition-all duration-500 ${
                    isRecording 
                    ? "bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)] scale-110" 
                    : "bg-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-105"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {isRecording ? <Square className="h-10 w-10 fill-white" /> : <Mic className="h-12 w-12 text-white" />}
                  </div>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* --- 結果表示セクション --- */
          <div className="animate-fade-in-up space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="text-center">
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">Analysis Result</span>
              <h2 className="mt-2 text-6xl font-black tracking-tighter text-white sm:text-7xl">
                {result.type}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <MetricCard label="Pitch (T/F)" value={result.metrics.pitch_cv} />
              <MetricCard label="Silence (E/I)" value={result.metrics.silence} />
              <MetricCard label="Excitement" value={result.metrics.excitement} />
              <MetricCard label="Calmness" value={result.metrics.calmness} />
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setResult(null)}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/10 py-4 font-bold hover:bg-white/20 transition-all"
              >
                <RefreshCcw className="h-4 w-4" /> もう一度
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-cyan-500 py-4 font-bold hover:bg-cyan-400 transition-all text-gray-900">
                <Share2 className="h-4 w-4" /> 結果をシェア
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-white/5 p-4 border border-white/5">
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="text-xl font-mono font-bold text-cyan-300">{(value * 100).toFixed(1)}%</div>
    </div>
  );
}