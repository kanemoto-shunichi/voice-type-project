"use client";

import { motion } from "framer-motion";

// 波形の生成用データ
const wavePaths = [
  "M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50",
  "M0,50 C200,0 300,100 500,50 C700,0 800,100 1000,50",
  "M0,50 C100,80 400,20 500,50 C600,80 900,20 1000,50",
];

export default function WaveVisualizer() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden opacity-40 mix-blend-screen pointer-events-none">
      <svg
        className="w-full h-full md:w-[150%] md:h-[150%]" // モバイルとPCでサイズ調整
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
      >
        {/* 複数の波を重ねて複雑な干渉模様を作る */}
        {wavePaths.map((path, i) => (
          <motion.path
            key={i}
            d={path}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth={2 + i} // 波によって太さを変える
            strokeLinecap="round"
            initial={{ pathOffset: 0, opacity: 0.5 }}
            animate={{
              // 波を横に流すアニメーション
              pathOffset: [0, 1],
              // 縦に揺らすアニメーション
              translateY: [0, i % 2 === 0 ? 20 : -20, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 8 + i * 2, // 波によって速度を変える
              repeat: Infinity,
              ease: "linear",
              translateY: {
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              },
              opacity: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }}
            style={{
               filter: `drop-shadow(0 0 ${8 + i * 4}px rgba(0, 255, 255, 0.5))`
            }}
          />
        ))}
        {/* グラデーション定義 */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" /> {/* cyan-500 (透明) */}
            <stop offset="50%" stopColor="rgba(6, 182, 212, 1)" /> {/* cyan-500 */}
            <stop offset="100%" stopColor="rgba(147, 51, 234, 0)" /> {/* purple-600 (透明) */}
          </linearGradient>
        </defs>
      </svg>
      
      {/* 背景に深みを出すためのぼかし光源 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] -z-10"></div>
    </div>
  );
}