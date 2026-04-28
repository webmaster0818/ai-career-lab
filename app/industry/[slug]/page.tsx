import type { Metadata } from "next";
import Link from "next/link";
import industriesData from "@/data/industries.json";
import agentsData from "@/data/agents.json";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import Breadcrumb from "@/app/components/Breadcrumb";

type FAQ = { q: string; a: string };
type KeyApplication = { name: string; desc: string };

type Industry = {
  slug: string;
  title: string;
  description: string;
  marketSize: string;
  growthRate: string;
  avgSalary: number;
  keyApplications: KeyApplication[];
  majorCompanies: string[];
  requiredSkills: string[];
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

const industries = industriesData as Industry[];
const agents = agentsData as Agent[];

function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return { title: "業界ガイド | AIキャリアラボ" };

  const description = `${industry.description} 市場規模${industry.marketSize}・成長率${industry.growthRate}・平均年収${industry.avgSalary}万円。必要スキル・主要企業・おすすめ転職エージェントを解説。`;

  return {
    title: `${industry.title} | AIキャリアラボ`,
    description,
    keywords: `${industry.slug} AI転職, ${industry.slug} AIエンジニア, ${industry.requiredSkills.slice(0, 3).join(", ")}`,
    openGraph: {
      title: industry.title,
      description,
      type: "article",
      locale: "ja_JP",
    },
    alternates: {
      canonical: `/industry/${industry.slug}/`,
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-text-secondary">業界情報が見つかりませんでした。</p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const recommendedAgentData = industry.recommendedAgents
    .map(getAgentBySlug)
    .filter((a): a is Agent => !!a);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: industry.faqs.map((faq) => ({
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
              { label: "業界別ガイド", href: "/industry/" },
              { label: industry.title.split("【")[0].trim() },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="hero-pattern pt-6 pb-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                業界別ガイド
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                成長率 {industry.growthRate}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-surface border border-border text-text-secondary">
                2026年最新
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-text-primary leading-tight mb-4">
              <span className="gradient-text">{industry.title}</span>
            </h1>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-surface rounded-2xl p-4 border border-border shadow-sm text-center card-hover glow">
                <p className="text-xs text-text-muted mb-1">市場規模</p>
                <p className="text-lg font-black gradient-text leading-tight">{industry.marketSize}</p>
              </div>
              <div className="bg-surface rounded-2xl p-4 border border-border shadow-sm text-center card-hover glow">
                <p className="text-xs text-text-muted mb-1">年間成長率</p>
                <p className="text-lg font-black text-green-600">{industry.growthRate}</p>
              </div>
              <div className="bg-surface rounded-2xl p-4 border border-border shadow-sm text-center card-hover glow">
                <p className="text-xs text-text-muted mb-1">平均年収</p>
                <p className="text-2xl font-black gradient-text">{industry.avgSalary}</p>
                <p className="text-xs text-text-muted">万円</p>
              </div>
            </div>

            <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm">
              <p className="text-text-secondary leading-relaxed">{industry.description}</p>
            </div>
          </div>
        </section>

        {/* Key AI Applications */}
        <section className="py-12 bg-surface" id="applications">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              主要な<span className="gradient-text">AI活用事例</span>
            </h2>
            <p className="text-sm text-text-muted mb-6">この業界で実際に使われているAI技術</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {industry.keyApplications.map((app, i) => (
                <div
                  key={i}
                  className="bg-[#F8FAFF] rounded-2xl border border-border p-5 shadow-sm card-hover"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-black">
                      {i + 1}
                    </span>
                    <h3 className="font-bold text-text-primary text-sm leading-snug">{app.name}</h3>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed pl-10">{app.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Major Companies */}
        <section className="py-12" id="companies">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              <span className="gradient-text">主要企業</span>一覧
            </h2>
            <p className="text-sm text-text-muted mb-6">AIエンジニア採用を積極的に行っている企業</p>
            <div className="flex flex-wrap gap-3">
              {industry.majorCompanies.map((company, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-surface border border-border rounded-xl text-sm font-medium text-text-primary card-hover shadow-sm"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Required Skills */}
        <section className="py-12 bg-surface" id="skills">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              求められる<span className="gradient-text">スキルセット</span>
            </h2>
            <p className="text-sm text-text-muted mb-6">この業界でのAI職に必要なスキル</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {industry.requiredSkills.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 border border-primary/10 card-hover"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full gradient-bg flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-text-primary font-medium text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Salary Data */}
        <section className="py-12" id="salary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              <span className="gradient-text">年収データ</span>
            </h2>
            <p className="text-sm text-text-muted mb-6">業界×AI職種の年収相場（2026年版）</p>
            <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
                    <th className="text-left px-5 py-3 font-semibold text-text-secondary">職種・レベル</th>
                    <th className="text-right px-5 py-3 font-semibold text-text-secondary">年収レンジ</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { role: "ジュニア AIエンジニア（〜3年）", range: `${Math.round(industry.avgSalary * 0.6)}〜${Math.round(industry.avgSalary * 0.8)}万円` },
                    { role: "ミドル AIエンジニア（3〜7年）", range: `${Math.round(industry.avgSalary * 0.85)}〜${Math.round(industry.avgSalary * 1.1)}万円` },
                    { role: "シニア AIエンジニア（7年+）", range: `${Math.round(industry.avgSalary * 1.1)}〜${Math.round(industry.avgSalary * 1.5)}万円` },
                    { role: "MLリード・テックリード", range: `${Math.round(industry.avgSalary * 1.3)}〜${Math.round(industry.avgSalary * 1.8)}万円` },
                  ].map((row, i) => (
                    <tr key={i} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-surface-alt/40"}`}>
                      <td className="px-5 py-4 font-medium text-text-primary">{row.role}</td>
                      <td className="px-5 py-4 text-right font-bold text-primary">{row.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-muted mt-3">※ 編集部調査による推計値。企業規模・経験・スキルにより異なります。</p>
          </div>
        </section>

        {/* Recommended Agents */}
        <section className="py-12 bg-surface" id="agents">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              <span className="gradient-text">おすすめ</span>転職エージェント
            </h2>
            <p className="text-sm text-text-muted mb-6">この業界のAI求人保有数・支援実績で選定</p>
            <div className="space-y-4">
              {recommendedAgentData.map((agent, i) => (
                <Link
                  key={agent.slug}
                  href={`/agent/${agent.slug}/`}
                  className="flex items-center gap-4 bg-[#F8FAFF] rounded-2xl border border-border p-5 shadow-sm card-hover group"
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
        <section className="py-12" id="faq">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              よくある<span className="gradient-text">質問</span>
            </h2>
            <p className="text-sm text-text-muted mb-8">業界転職に関するQ&A</p>
            <div className="space-y-4">
              {industry.faqs.map((faq, i) => (
                <div key={i} className="bg-surface rounded-2xl border border-border overflow-hidden">
                  <div className="flex items-start gap-4 p-5">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-black">
                      Q
                    </span>
                    <p className="font-bold text-text-primary leading-relaxed pt-0.5">{faq.q}</p>
                  </div>
                  <div className="flex items-start gap-4 p-5 pt-0 border-t border-border bg-[#F8FAFF]">
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

        {/* CTA */}
        <section className="py-14 tech-grid">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="gradient-bg rounded-3xl p-8 sm:p-12 text-white text-center">
              <p className="text-sm opacity-80 mb-2">{industry.title.split("【")[0].trim()}への転職を検討中の方へ</p>
              <h2 className="text-2xl sm:text-3xl font-black mb-4">
                おすすめエージェントで<br className="hidden sm:block" />年収アップを実現しよう
              </h2>
              <p className="text-sm opacity-80 mb-8 max-w-lg mx-auto">
                AI・ML領域に強い転職エージェント10社を徹底比較。あなたのスキルと希望年収に合ったエージェントが見つかります。
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
