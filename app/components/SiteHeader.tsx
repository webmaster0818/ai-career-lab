"use client";
import { useState } from "react";
import Link from "next/link";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-white/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <span className="text-lg font-bold text-text-primary">AIキャリアラボ</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
            <Link href="/#ranking" className="hover:text-primary transition-colors">ランキング</Link>
            <Link href="/#tech-stack" className="hover:text-primary transition-colors">技術スタック別</Link>
            <Link href="/salary/ranking/" className="hover:text-primary transition-colors">年収データ</Link>
            <Link href="/guide/roadmap/" className="hover:text-primary transition-colors">キャリアガイド</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/#ranking" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 transition-opacity">
              エージェントを比較する
            </Link>
            <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="メニュー">
              <span className={`block w-6 h-0.5 bg-text-primary transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-text-primary transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-text-primary transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden bg-white border-t border-border max-h-[80vh] overflow-y-auto">
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              <p className="text-xs text-text-muted font-medium tracking-wider mb-2">TOP</p>
              <Link href="/" onClick={() => setOpen(false)} className="block py-2.5 px-3 text-text-primary hover:bg-surface-alt rounded-lg">トップページ</Link>

              <div className="border-t border-border my-3" />
              <p className="text-xs text-text-muted font-medium tracking-wider mb-2">エージェント</p>
              {[
                { name: "Geekly", slug: "geekly" },
                { name: "レバテックキャリア", slug: "levtech-career" },
                { name: "ウィルオブテック", slug: "willof-tech" },
                { name: "Symbiorise", slug: "symbiorise" },
                { name: "マイナビITエージェント", slug: "mynavi-it-agent" },
                { name: "ビズリーチ", slug: "bizreach" },
                { name: "doda", slug: "doda" },
                { name: "リクルートエージェント", slug: "recruit-agent" },
                { name: "Green", slug: "green" },
                { name: "JAIC", slug: "jaic" },
              ].map((a) => (
                <Link key={a.slug} href={`/agent/${a.slug}/`} onClick={() => setOpen(false)} className="block py-2.5 px-3 text-text-primary hover:bg-surface-alt rounded-lg">{a.name}</Link>
              ))}

              <div className="border-t border-border my-3" />
              <p className="text-xs text-text-muted font-medium tracking-wider mb-2">職種別ガイド</p>
              {[
                { name: "AIエンジニア", slug: "ai-engineer" },
                { name: "データサイエンティスト", slug: "data-scientist" },
                { name: "MLエンジニア", slug: "ml-engineer" },
                { name: "MLOpsエンジニア", slug: "mlops-engineer" },
                { name: "データアナリスト", slug: "data-analyst" },
              ].map((j) => (
                <Link key={j.slug} href={`/job/${j.slug}/`} onClick={() => setOpen(false)} className="block py-2.5 px-3 text-text-primary hover:bg-surface-alt rounded-lg">{j.name}</Link>
              ))}

              <div className="border-t border-border my-3" />
              <p className="text-xs text-text-muted font-medium tracking-wider mb-2">技術スタック別</p>
              {[
                { name: "Python / scikit-learn", slug: "python" },
                { name: "PyTorch / TensorFlow", slug: "pytorch" },
                { name: "LLM / RAG / LangChain", slug: "llm" },
                { name: "AWS / GCP ML Services", slug: "aws-ml" },
              ].map((t) => (
                <Link key={t.slug} href={`/tech/${t.slug}/`} onClick={() => setOpen(false)} className="block py-2.5 px-3 text-text-primary hover:bg-surface-alt rounded-lg">{t.name}</Link>
              ))}

              <div className="border-t border-border my-3" />
              <p className="text-xs text-text-muted font-medium tracking-wider mb-2">キャリアガイド</p>
              {[
                { name: "未経験→AIエンジニア ロードマップ", slug: "roadmap" },
                { name: "SIer→AIエンジニア転職", slug: "sier-to-ai" },
                { name: "Web系→データサイエンティスト転職", slug: "web-to-ds" },
                { name: "AIエンジニアに必要な資格5選", slug: "qualifications" },
                { name: "AI業界の将来性と市場規模", slug: "future" },
              ].map((g) => (
                <Link key={g.slug} href={`/guide/${g.slug}/`} onClick={() => setOpen(false)} className="block py-2.5 px-3 text-text-primary hover:bg-surface-alt rounded-lg">{g.name}</Link>
              ))}

              <div className="border-t border-border my-3" />
              <p className="text-xs text-text-muted font-medium tracking-wider mb-2">年収データ</p>
              <Link href="/salary/ranking/" onClick={() => setOpen(false)} className="block py-2.5 px-3 text-text-primary hover:bg-surface-alt rounded-lg">職種別 年収ランキング</Link>
              <Link href="/salary/by-tech/" onClick={() => setOpen(false)} className="block py-2.5 px-3 text-text-primary hover:bg-surface-alt rounded-lg">技術スタック別 年収比較</Link>
            </nav>
          </div>
        )}
      </div>
      <div className="bg-primary/5 py-1 px-4">
        <div className="max-w-7xl mx-auto text-right">
          <span className="text-[10px] text-text-muted">PRを含みます</span>
        </div>
      </div>
    </header>
  );
}
