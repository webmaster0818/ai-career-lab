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
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-text-secondary">
            <Link href="/ranking/ai-engineer/" className="hover:text-primary transition-colors">ランキング</Link>
            <Link href="/#tech-stack" className="hover:text-primary transition-colors">技術スタック別</Link>
            <Link href="/interview/questions/" className="hover:text-primary transition-colors">面接対策</Link>
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
              <p className="text-xs text-text-muted font-medium tracking-wider mb-2">ランキング</p>
              {[
                { name: "AIエンジニア向けランキング", slug: "ai-engineer" },
                { name: "データサイエンティスト向けランキング", slug: "data-scientist" },
                { name: "未経験向けランキング", slug: "inexperienced" },
                { name: "ハイクラス（1000万+）ランキング", slug: "high-class" },
              ].map((r) => (
                <Link key={r.slug} href={`/ranking/${r.slug}/`} onClick={() => setOpen(false)} className="block py-2.5 px-3 text-text-primary hover:bg-surface-alt rounded-lg">{r.name}</Link>
              ))}

              <div className="border-t border-border my-3" />
              <p className="text-xs text-text-muted font-medium tracking-wider mb-2">面接・スキル対策</p>
              {[
                { name: "よく聞かれる質問30選", slug: "questions" },
                { name: "コーディングテスト対策", slug: "coding-test" },
                { name: "ポートフォリオの作り方", slug: "portfolio" },
                { name: "Kaggle活用ガイド", slug: "kaggle" },
                { name: "スキルマップ2026", slug: "skill-map" },
              ].map((iv) => (
                <Link key={iv.slug} href={`/interview/${iv.slug}/`} onClick={() => setOpen(false)} className="block py-2.5 px-3 text-text-primary hover:bg-surface-alt rounded-lg">{iv.name}</Link>
              ))}

              <div className="border-t border-border my-3" />
              <p className="text-xs text-text-muted font-medium tracking-wider mb-2">年収データ</p>
              <Link href="/salary/ranking/" onClick={() => setOpen(false)} className="block py-2.5 px-3 text-text-primary hover:bg-surface-alt rounded-lg">職種別 年収ランキング</Link>
              <Link href="/salary/by-tech/" onClick={() => setOpen(false)} className="block py-2.5 px-3 text-text-primary hover:bg-surface-alt rounded-lg">技術スタック別 年収比較</Link>

              <div className="border-t border-border my-3" />
              <p className="text-xs text-text-muted font-medium tracking-wider mb-2">比較</p>
              {[
                { name: "Geekly vs レバテック比較", slug: "geekly-vs-levtech" },
                { name: "特化型 vs 総合型", slug: "specialized-vs-general" },
                { name: "手数料・マージン比較", slug: "agent-fees" },
                { name: "サポート品質ランキング", slug: "support-quality" },
                { name: "リモート求人比較", slug: "remote-jobs" },
              ].map((c) => (
                <Link key={c.slug} href={`/compare/${c.slug}/`} onClick={() => setOpen(false)} className="block py-2.5 px-3 text-text-primary hover:bg-surface-alt rounded-lg">{c.name}</Link>
              ))}

              <div className="border-t border-border my-3" />
              <p className="text-xs text-text-muted font-medium tracking-wider mb-2">企業別</p>
              {[
                { name: "Google日本", slug: "google-japan" },
                { name: "Amazon Japan", slug: "amazon-japan" },
                { name: "メルカリ", slug: "mercari" },
                { name: "Preferred Networks", slug: "pfn" },
              ].map((c) => (
                <Link key={c.slug} href={`/company/${c.slug}/`} onClick={() => setOpen(false)} className="block py-2.5 px-3 text-text-primary hover:bg-surface-alt rounded-lg">{c.name}</Link>
              ))}

              <div className="border-t border-border my-3" />
              <p className="text-xs text-text-muted font-medium tracking-wider mb-2">業界別</p>
              {[
                { name: "金融×AI", slug: "finance" },
                { name: "医療×AI", slug: "healthcare" },
                { name: "製造×AI", slug: "manufacturing" },
                { name: "自動車×AI（自動運転）", slug: "automotive" },
              ].map((ind) => (
                <Link key={ind.slug} href={`/industry/${ind.slug}/`} onClick={() => setOpen(false)} className="block py-2.5 px-3 text-text-primary hover:bg-surface-alt rounded-lg">{ind.name}</Link>
              ))}

              <div className="border-t border-border my-3" />
              <p className="text-xs text-text-muted font-medium tracking-wider mb-2">地域別</p>
              {[
                { name: "東京", slug: "tokyo" },
                { name: "大阪", slug: "osaka" },
                { name: "福岡", slug: "fukuoka" },
                { name: "フルリモート", slug: "full-remote" },
              ].map((r) => (
                <Link key={r.slug} href={`/region/${r.slug}/`} onClick={() => setOpen(false)} className="block py-2.5 px-3 text-text-primary hover:bg-surface-alt rounded-lg">{r.name}</Link>
              ))}

              <div className="border-t border-border my-3" />
              <p className="text-xs text-text-muted font-medium tracking-wider mb-2">未経験向け</p>
              {[
                { name: "AI転職の第一歩ガイド", slug: "first-step" },
                { name: "独学6ヶ月学習プラン", slug: "study-plan" },
                { name: "ポートフォリオ実例集", slug: "portfolio-examples" },
              ].map((b) => (
                <Link key={b.slug} href={`/beginner/${b.slug}/`} onClick={() => setOpen(false)} className="block py-2.5 px-3 text-text-primary hover:bg-surface-alt rounded-lg">{b.name}</Link>
              ))}

              <div className="border-t border-border my-3" />
              <p className="text-xs text-text-muted font-medium tracking-wider mb-2">コラム</p>
              {[
                { name: "AIエンジニアの将来性", slug: "ai-engineer-future" },
                { name: "LLMエンジニアとは？", slug: "llm-engineer-career" },
                { name: "30代からのAI転職", slug: "career-change-30s" },
                { name: "AI転職の年収交渉術", slug: "ai-salary-negotiation" },
                { name: "AI企業の面接対策", slug: "ai-interview-prep" },
              ].map((a) => (
                <Link key={a.slug} href={`/article/${a.slug}/`} onClick={() => setOpen(false)} className="block py-2.5 px-3 text-text-primary hover:bg-surface-alt rounded-lg">{a.name}</Link>
              ))}
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
