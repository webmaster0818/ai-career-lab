import type { Metadata } from "next";
import Link from "next/link";
import regionsData from "@/data/regions.json";
import agentsData from "@/data/agents.json";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import Breadcrumb from "@/app/components/Breadcrumb";

type FAQ = { q: string; a: string };

type Region = {
  slug: string;
  title: string;
  description: string;
  jobCount: number;
  avgSalary: number;
  majorCompanies: string[];
  characteristics: string;
  recommendedAgents: string[];
  faqs: FAQ[];
};

type Agent = {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  aiJobCount: number;
  avgSalaryUp: number;
  officialUrl: string;
};

const regions = regionsData as Region[];
const agents = agentsData as Agent[];

function getRegion(slug: string): Region | undefined {
  return regions.find((r) => r.slug === slug);
}

function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}

export async function generateStaticParams() {
  return regions.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) return { title: "地域ガイド | AIキャリアラボ" };

  const description = `${region.title}。求人数${region.jobCount.toLocaleString()}件・平均年収${region.avgSalary}万円。主要企業・地域の特徴・おすすめ転職エージェントを解説。`;

  return {
    title: `${region.title} | AIキャリアラボ`,
    description,
    keywords: `${region.slug} AIエンジニア 求人, ${region.slug} AI転職, ${region.slug} データサイエンティスト`,
    openGraph: {
      title: region.title,
      description,
      type: "article",
      locale: "ja_JP",
    },
    alternates: {
      canonical: `/region/${region.slug}/`,
    },
  };
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const region = getRegion(slug);

  if (!region) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-text-secondary">地域情報が見つかりませんでした。</p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const recommendedAgentData = region.recommendedAgents
    .map(getAgentBySlug)
    .filter((a): a is Agent => !!a);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: region.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFF]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SiteHeader />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: "地域別ガイド", href: "/region/" },
              { label: region.title.split("の")[0] },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="hero-pattern pt-6 pb-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                地域別ガイド
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-surface border border-border text-text-secondary">
                2026年最新
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-text-primary leading-tight mb-4">
              <span className="gradient-text">{region.title}</span>
            </h1>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-surface rounded-2xl p-5 border border-border shadow-sm text-center card-hover glow">
                <p className="text-xs text-text-muted mb-1">AI求人数</p>
                <p className="text-3xl font-black gradient-text">{region.jobCount.toLocaleString()}</p>
                <p className="text-xs text-text-muted">件以上</p>
              </div>
              <div className="bg-surface rounded-2xl p-5 border border-border shadow-sm text-center card-hover glow">
                <p className="text-xs text-text-muted mb-1">平均年収</p>
                <p className="text-3xl font-black gradient-text">{region.avgSalary}</p>
                <p className="text-xs text-text-muted">万円</p>
              </div>
            </div>

            <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm">
              <p className="text-text-secondary leading-relaxed">{region.description}</p>
            </div>
          </div>
        </section>

        {/* Major Companies */}
        <section className="py-12 bg-surface" id="companies">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              <span className="gradient-text">主要企業</span>・採用企業
            </h2>
            <p className="text-sm text-text-muted mb-6">AIエンジニア・データサイエンティストを採用中の主要企業</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {region.majorCompanies.map((company, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-[#F8FAFF] rounded-xl p-3 border border-border shadow-sm card-hover"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-black">
                    {i + 1}
                  </span>
                  <span className="text-text-primary font-medium text-xs leading-snug">{company}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Region Characteristics */}
        <section className="py-12" id="characteristics">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              この地域の<span className="gradient-text">AI転職市場の特徴</span>
            </h2>
            <p className="text-sm text-text-muted mb-6">転職を成功させるためのポイント</p>
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-primary/15 p-6 shadow-sm">
              <p className="text-text-secondary leading-relaxed">{region.characteristics}</p>
            </div>
          </div>
        </section>

        {/* Salary Data */}
        <section className="py-12 bg-surface" id="salary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              <span className="gradient-text">年収データ</span>
            </h2>
            <p className="text-sm text-text-muted mb-6">この地域のAI職種別年収相場（2026年版）</p>
            <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
                    <th className="text-left px-5 py-3 font-semibold text-text-secondary">職種</th>
                    <th className="text-right px-5 py-3 font-semibold text-text-secondary">年収目安</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { role: "AIエンジニア", salary: `${Math.round(region.avgSalary * 0.95)}〜${Math.round(region.avgSalary * 1.2)}万円` },
                    { role: "機械学習エンジニア", salary: `${Math.round(region.avgSalary * 0.9)}〜${Math.round(region.avgSalary * 1.3)}万円` },
                    { role: "データサイエンティスト", salary: `${Math.round(region.avgSalary * 0.85)}〜${Math.round(region.avgSalary * 1.2)}万円` },
                    { role: "データエンジニア", salary: `${Math.round(region.avgSalary * 0.8)}〜${Math.round(region.avgSalary * 1.1)}万円` },
                    { role: "MLOpsエンジニア", salary: `${Math.round(region.avgSalary * 0.9)}〜${Math.round(region.avgSalary * 1.25)}万円` },
                  ].map((row, i) => (
                    <tr key={i} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-surface-alt/40"}`}>
                      <td className="px-5 py-4 font-medium text-text-primary">{row.role}</td>
                      <td className="px-5 py-4 text-right font-bold text-primary">{row.salary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-muted mt-3">※ 編集部調査による推計値。企業・経験・スキルにより異なります。</p>
          </div>
        </section>

        {/* Recommended Agents */}
        <section className="py-12" id="agents">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              <span className="gradient-text">おすすめ</span>転職エージェント
            </h2>
            <p className="text-sm text-text-muted mb-6">この地域のAI求人保有数・対応エリアで選定</p>
            <div className="space-y-4">
              {recommendedAgentData.map((agent, i) => (
                <Link
                  key={agent.slug}
                  href={`/agent/${agent.slug}/`}
                  className="flex items-center gap-4 bg-surface rounded-2xl border border-border p-5 shadow-sm card-hover group"
                >
                  <div
                    className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold ${
                      i === 0 ? "bg-yellow-400" : i === 1 ? "bg-gray-300" : i === 2 ? "bg-amber-600" : "gradient-bg"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-text-primary group-hover:text-primary transition-colors">{agent.name}</p>
                    <p className="text-xs text-text-muted truncate">{agent.tagline}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-text-muted">AI求人</p>
                    <p className="text-sm font-black text-primary">{agent.aiJobCount.toLocaleString()}件+</p>
                  </div>
                  <svg className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-surface" id="faq">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              よくある<span className="gradient-text">質問</span>
            </h2>
            <p className="text-sm text-text-muted mb-8">地域のAI転職に関するQ&A</p>
            <div className="space-y-4">
              {region.faqs.map((faq, i) => (
                <div key={i} className="bg-[#F8FAFF] rounded-2xl border border-border overflow-hidden">
                  <div className="flex items-start gap-4 p-5">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-black">
                      Q
                    </span>
                    <p className="font-bold text-text-primary leading-relaxed pt-0.5">{faq.q}</p>
                  </div>
                  <div className="flex items-start gap-4 p-5 pt-0 border-t border-border bg-surface">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-sm font-black">
                      A
                    </span>
                    <p className="text-text-secondary text-sm leading-relaxed pt-0.5">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 関連コンテンツ */}
        <section className="py-12 bg-surface" id="related">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              <span className="gradient-text">関連コンテンツ</span>
            </h2>
            <p className="text-sm text-text-muted mb-6">あわせて読みたいページ</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/company/google-japan/", label: "Google Japan AIエンジニア転職ガイド", category: "企業ガイド" },
                { href: "/company/amazon-japan/", label: "Amazon Japan AIエンジニア転職ガイド", category: "企業ガイド" },
                { href: "/company/mercari/", label: "メルカリ AIエンジニア転職ガイド", category: "企業ガイド" },
                { href: "/agent/geekly/", label: "GeeklyのAI求人・特徴・評判", category: "エージェント" },
                { href: "/agent/levtech-career/", label: "レバテックキャリアのAI求人・評判", category: "エージェント" },
                { href: "/agent/bizreach/", label: "ビズリーチのAIハイクラス求人・評判", category: "エージェント" },
                { href: "/salary/ranking/", label: "AI・ML職種別 年収ランキング2026", category: "年収情報" },
                { href: "/job/ai-engineer/", label: "AIエンジニアの仕事内容・年収・求人", category: "職種ガイド" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 bg-[#F8FAFF] rounded-xl p-4 border border-border shadow-sm card-hover group"
                >
                  <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold whitespace-nowrap">
                    {item.category}
                  </span>
                  <span className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors leading-snug">
                    {item.label}
                  </span>
                  <svg className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors flex-shrink-0 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 tech-grid">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="gradient-bg rounded-3xl p-8 sm:p-12 text-white text-center">
              <p className="text-sm opacity-80 mb-2">この地域でのAI転職を始めよう</p>
              <h2 className="text-2xl sm:text-3xl font-black mb-4">
                おすすめエージェントで<br className="hidden sm:block" />年収アップを実現
              </h2>
              <p className="text-sm opacity-80 mb-8 max-w-lg mx-auto">
                AI・ML領域に強い転職エージェント10社を徹底比較。地域・スキルに合ったエージェントを選べます。
              </p>
              <Link
                href="/#ranking"
                className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-surface transition-colors shadow-lg text-sm sm:text-base"
              >
                エージェントランキングを見る →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
