import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/10 bg-black py-12 px-6">
      <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-6 md:flex-row">
        
        {/* ロゴ & コピーライト */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xl font-black tracking-tighter text-white">
            VoiceType16
          </span>
          <p className="text-xs text-gray-500">
            © 2026 VoiceType16. All rights reserved.
          </p>
        </div>

        {/* リンク群 */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link href="/tokushoho" className="hover:text-white transition-colors font-medium text-gray-300">
            特定商取引法に基づく表記
          </Link>
        </div>
      </div>
    </footer>
  );
}