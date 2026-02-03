"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function TermsPage() {
  const operatorName = '株式会社 PassionSmile';
  const contactEmail = 'manifold.smile.tmis@gmail.com';

  return (
    <div className="bg-black text-white selection:bg-cyan-500/30">
      <Navbar />

      <main className="min-h-screen flex items-center justify-center px-4 py-32">
        <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-2xl p-8 md:p-12 space-y-10">
          
          <header className="space-y-4 border-b border-white/10 pb-8">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400">
              Terms of Use
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter">
              利用規約
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed">
              本利用規約（以下「本規約」）は、{operatorName}が提供する音声解析診断サービス「VOICETYPE16」（以下「本サービス」）の利用条件を定めるものです。
            </p>
          </header>

          <div className="space-y-10 text-sm md:text-base text-gray-300 leading-relaxed">
            
            {/* 1. 適用 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                1. 適用
              </h2>
              <p>
                利用者は、本サービスを利用することにより、本規約の全ての条項に同意したものとみなされます。本規約は、利用に関わる一切の関係に適用されます。
              </p>
            </section>

            {/* 2. 本サービスの内容 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                2. 本サービスの内容
              </h2>
              <p>
                本サービスは、利用者が録音・アップロードした音声データをもとに、AIアルゴリズムを用いて声質や抑揚を解析し、性格タイプの傾向を推定するエンターテインメントサービスです。
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-400 text-sm">
                <li>解析結果は統計的な傾向を示すものであり、医学的・心理学的な断定を行うものではありません。</li>
                <li>当サービスは、結果の正確性、完全性、特定の目的への適合性についていかなる保証も行いません。</li>
              </ul>
            </section>

            {/* 3. 音声データの取り扱い */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                3. 音声データの取り扱い
              </h2>
              <p>
                利用者がアップロードした音声データ（以下「ユーザーデータ」）の著作権は利用者に帰属しますが、当サービスは運営および品質向上のために必要な範囲で利用できるものとします。
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-400 text-sm">
                <li>当サービスは、ユーザーデータをAIモデルの学習・精度改善のために利用することがあります。この際、個人を特定できないよう統計化・匿名化を行います。</li>
                <li>利用者は、第三者の権利（著作権、肖像権、パブリシティ権等）を侵害する音声をアップロードしてはなりません。</li>
                <li>解析結果に基づく成果物（統計データ等）の知的財産権は、原則として当サービスに帰属します。</li>
              </ul>
            </section>

            {/* 4. 有料サービスおよび決済 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                4. 有料サービスおよび決済
              </h2>
              <p>
                有料診断の利用料金は購入画面に表示されます。決済完了後のキャンセル・返金は、デジタルコンテンツの性質上、原則としてお受けできません。詳細は
                <Link href="/tokushoho" className="text-cyan-400 underline ml-1">特定商取引法に基づく表記</Link>
                をご確認ください。
              </p>
            </section>

            {/* 5. 禁止事項 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                5. 禁止事項
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-400 text-sm">
                <li>他人の声を無断で録音・アップロードする行為。</li>
                <li>本サービスの解析アルゴリズムをリバースエンジニアリング等により解析する行為。</li>
                <li>診断結果を不適切な差別やハラスメントに利用する行為。</li>
                <li>その他、公序良俗に反する全ての行為。</li>
              </ul>
            </section>

            {/* 6. 免責事項 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                6. 免責事項
              </h2>
              <p>
                当サービスは、本サービスの利用により利用者に生じた損害について、当サービスの故意または重過失による場合を除き、一切の責任を負いません。
              </p>
            </section>

            {/* 7. 準拠法・管轄 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                7. 準拠法・管轄
              </h2>
              <p>
                本規約の準拠法は日本法とし、紛争が生じた場合は、当サービスの所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。
              </p>
            </section>

            {/* お問い合わせ */}
            <section className="mt-12 pt-8 border-t border-white/10">
              <p className="text-xs text-gray-500 mb-2">CONTACT</p>
              <address className="not-italic text-sm">
                運営：{operatorName}<br />
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