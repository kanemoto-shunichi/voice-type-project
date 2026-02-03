import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TokushohoPage() {
  return (
    <div className="bg-black text-white selection:bg-cyan-500/30">
      <Navbar />

      <main className="min-h-screen flex items-center justify-center px-4 py-32">
        <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-2xl p-8 md:p-12 space-y-10">
          
          <header className="space-y-4 border-b border-white/10 pb-8">
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter">
              特定商取引法に基づく表記
            </h1>
            <p className="text-sm text-gray-400">
              「特定商取引に関する法律」第11条に基づき、VOICETYPE16のサービス提供における諸条件を表示いたします。
            </p>
          </header>

          <div className="space-y-8 text-sm md:text-base text-gray-300">
            
            {/* 販売事業者 */}
            <Section 
              title="販売事業者名" 
              content="株式会社 PassionSmile" 
            />

            {/* 代表責任者 */}
            <Section 
              title="運営統括責任者" 
              content="金本俊一" 
            />

            {/* メールアドレス */}
            <Section 
              title="メールアドレス" 
              content="manifold.smile.tmis@gmail.com" 
            />

            {/* 販売価格 */}
            <Section 
              title="販売価格" 
              content="購入手続き画面に表示されます（診断プランごとに異なります）。" 
            />

            {/* 商品代金以外の必要料金 */}
            <Section 
              title="商品代金以外の必要料金" 
              content="音声データのアップロード時、またはサイト閲覧時におけるインターネット接続料金および通信料金はお客様の負担となります。" 
            />

            {/* 引き渡し時期 */}
            <Section 
              title="提供時期" 
              content="決済完了後、ただちにAI解析エンジンが起動し、Webブラウザ上で診断結果を表示いたします。" 
            />

            {/* お支払い方法 */}
            <Section 
              title="お支払い方法" 
              content="・クレジットカード決済 (Stripe決済システムを利用)" 
            />

            {/* 返品・キャンセル */}
            <Section 
              title="返品・キャンセルについて" 
              content={
                <>
                  サービスの性質上（即時発行のデジタルコンテンツ）、決済完了後のお客様都合による返品・返金・キャンセルはお受けできません。あらかじめご了承ください。<br />
                  万が一、システムエラーにより解析が正常に完了しなかった場合は、速やかにお問い合わせ窓口までご連絡ください。
                </>
              }
            />

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// レイアウト用のサブコンポーネント
function Section({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-3 gap-3 md:gap-8 border-b border-white/5 pb-6 last:border-0">
      <h3 className="font-bold text-cyan-400 text-sm tracking-widest uppercase">{title}</h3>
      <div className="md:col-span-2 text-white leading-relaxed">
        {content}
      </div>
    </div>
  );
}