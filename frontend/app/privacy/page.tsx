"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  const operatorName = '株式会社 PassionSmile'; 
  const contactEmail = 'manifold.smile.tmis@gmail.com';

  return (
    <div className="bg-black text-white selection:bg-cyan-500/30">
      <Navbar />

      <main className="min-h-screen flex items-center justify-center px-4 py-32">
        <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-2xl p-8 md:p-12 space-y-10">
          
          <header className="space-y-4 border-b border-white/10 pb-8">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
              Privacy Policy
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter">
              プライバシーポリシー
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed">
              本ポリシーは、音声解析診断サービス「VOICETYPE16」（以下「当サービス」）における音声データおよび個人情報の取り扱い方針を定めたものです。
            </p>
          </header>

          <div className="space-y-10 text-sm md:text-base text-gray-300 leading-relaxed">
            
            <section className="space-y-3">
              <p>
                {operatorName}は、利用者のプライバシーを尊重し、音声データを適切に取り扱うことを重要な責務と考えています。AIによる高度な解析を行うにあたり、以下の通り情報の管理を徹底いたします。
              </p>
            </section>

            {/* 1. 取得する情報 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                1. 取得する情報
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-400">
                <li>解析のために利用者が録音・アップロードした音声ファイル</li>
                <li>音声波形から算出された特徴量データ（ピッチ、リズム、周波数成分等の数値）</li>
                <li>診断結果（16タイプコード）および関連スコア</li>
                <li>お問い合わせ時に提供される氏名、メールアドレス等の連絡先</li>
              </ul>
            </section>

            {/* 2. 利用目的 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                2. 利用目的
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-400">
                <li>AI音声解析による性格タイプの推定および結果表示のため</li>
                <li>診断精度の向上、解析エンジンの機械学習・アルゴリズム改善のため</li>
                <li>サービスの不正利用防止およびセキュリティ維持のため</li>
                <li>ユーザーからのサポート依頼への対応のため</li>
              </ul>
            </section>

            {/* 3. 音声データの保護と保管 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                3. 音声データの保護と保管
              </h2>
              <p>音声データについては、厳格な管理体制の下で取り扱います。</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-400">
                <li>アップロードされた音声は、解析に必要な期間（最大3か月）保管された後、自動的にサーバーから削除されます。</li>
                <li>音声そのものを、利用者の同意なく第三者に公開・提供することはありません。</li>
                <li>通信はすべてSSL/TLSによって暗号化され、外部からの傍受を防止します。</li>
              </ul>
            </section>

            {/* 4. 第三者提供 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                4. 第三者提供
              </h2>
              <p>
                当サービスは、法令に基づく場合、または業務委託先（クラウドサーバー提供者等）との間で適切な契約を締結している場合を除き、個人情報を第三者に提供することはありません。
              </p>
            </section>

            {/* 5. 利用者の権利 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                5. 利用者の権利
              </h2>
              <p>
                利用者は、自身のデータについて開示、訂正、または削除を求めることができます。これらをご希望の場合は、下記のお問い合わせ先までご連絡ください。
              </p>
            </section>

            {/* 10. お問い合わせ */}
            <section className="mt-12 pt-8 border-t border-white/10">
              <p className="text-xs text-gray-500 mb-2">CONTACT INFO</p>
              <address className="not-italic text-sm">
                運営者：{operatorName}<br />
                Email：<a href={`mailto:${contactEmail}`} className="text-cyan-400 hover:underline">{contactEmail}</a>
              </address>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}