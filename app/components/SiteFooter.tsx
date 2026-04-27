import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-[#1a1a2e] text-white/70 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              <span className="text-lg font-bold text-white">AIキャリアラボ</span>
            </div>
            <p className="text-sm leading-relaxed">
              AIエンジニア・データサイエンティストの転職を支援する情報メディアです。
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">エージェント</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/agent/geekly/" className="hover:text-white transition-colors">Geekly</Link></li>
              <li><Link href="/agent/levtech-career/" className="hover:text-white transition-colors">レバテックキャリア</Link></li>
              <li><Link href="/agent/willof-tech/" className="hover:text-white transition-colors">ウィルオブテック</Link></li>
              <li><Link href="/agent/symbiorise/" className="hover:text-white transition-colors">Symbiorise</Link></li>
              <li><Link href="/agent/bizreach/" className="hover:text-white transition-colors">ビズリーチ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">職種・技術</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/job/ai-engineer/" className="hover:text-white transition-colors">AIエンジニア</Link></li>
              <li><Link href="/job/data-scientist/" className="hover:text-white transition-colors">データサイエンティスト</Link></li>
              <li><Link href="/tech/python/" className="hover:text-white transition-colors">Python転職</Link></li>
              <li><Link href="/tech/llm/" className="hover:text-white transition-colors">LLM/生成AI転職</Link></li>
              <li><Link href="/salary/ranking/" className="hover:text-white transition-colors">年収ランキング</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3">キャリアガイド</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/guide/roadmap/" className="hover:text-white transition-colors">未経験→AIエンジニア</Link></li>
              <li><Link href="/guide/sier-to-ai/" className="hover:text-white transition-colors">SIer→AI転職</Link></li>
              <li><Link href="/guide/qualifications/" className="hover:text-white transition-colors">必要な資格5選</Link></li>
              <li><Link href="/guide/future/" className="hover:text-white transition-colors">AI業界の将来性</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-xs">
          <p className="mb-2">
            ※ 本サイトはアフィリエイトプログラムに参加しています。ランキング・おすすめは編集部が独自に評価したものです。
          </p>
          <p>&copy; 2026 AIキャリアラボ - 株式会社MediaX All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
