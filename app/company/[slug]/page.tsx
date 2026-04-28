import type { Metadata } from "next";
import Link from "next/link";
import companiesData from "@/data/companies.json";
import agentsData from "@/data/agents.json";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import Breadcrumb from "@/app/components/Breadcrumb";

type FAQ = { q: string; a: string };

type Company = {
  slug: string;
  title: string;
  description: string;
  avgSalary: number;
  salaryRange: string;
  aiTeamSize: string;
  techStack: string;
  interviewProcess: string;
  workStyle: string;
  difficulty: string;
  pros: string[];
  cons: string[];
  positions: string[];
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

const companies = companiesData as Company[];
const agents = agentsData as Agent[];

function getCompany(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}

function difficultyColor(difficulty: string): string {
  if (difficulty === "非常に高い") return "bg-red-100 text-red-700 border-red-200";
  if (difficulty === "高い") return "bg-orange-100 text-orange-700 border-orange-200";
  return "bg-blue-100 text-blue-700 border-blue-200";
}

export async function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) return { title: "企業ガイド | AIキャリアラボ" };

  const description = `${company.title}。平均年収${company.avgSalary}万円・AI採用難易度「${company.difficulty}」。技術スタック（${company.techStack}）・選考プロセス・求められるスキルを詳しく解説。`;

  return {
    title: `${company.title} | AIキャリアラボ`,
    description,
    keywords: `${company.slug.replace(/-/g, " ")} AI転職, ${company.techStack}, AI採用 ${company.difficulty}`,
    openGraph: {
      title: company.title,
      description,
      type: "article",
      locale: "ja_JP",
    },
    alternates: {
      canonical: `/company/${company.slug}/`,
    },
  };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = getCompany(slug);

  if (!company) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-text-secondary">企業情報が見つかりませんでした。</p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const recommendedAgentData = company.recommendedAgents
    .map(getAgentBySlug)
    .filter((a): a is Agent => !!a);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: company.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const techStackList = company.techStack.split(",").map((t) => t.trim());

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
              { label: "企業別ガイド", href: "/company/" },
              { label: company.slug.toUpperCase() },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="hero-pattern pt-6 pb-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                企業別ガイド
              </span>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${difficultyColor(company.difficulty)}`}
              >
                採用難易度: {company.difficulty}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-surface border border-border text-text-secondary">
                2026年最新
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-text-primary leading-tight mb-4">
              <span className="gradient-text">{company.title}</span>
            </h1>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-surface rounded-2xl p-4 border border-border shadow-sm text-center card-hover">
                <p className="text-xs text-text-muted mb-1">平均年収</p>
                <p className="text-2xl font-black gradient-text">{company.avgSalary}</p>
                <p className="text-xs text-text-muted">万円</p>
              </div>
              <div className="bg-surface rounded-2xl p-4 border border-border shadow-sm text-center card-hover">
                <p className="text-xs text-text-muted mb-1">年収レンジ</p>
                <p className="text-sm font-black text-text-primary leading-tight mt-1">{company.salaryRange}</p>
              </div>
              <div className="bg-surface rounded-2xl p-4 border border-border shadow-sm text-center card-hover">
                <p className="text-xs text-text-muted mb-1">AIチーム規模</p>
                <p className="text-2xl font-black gradient-text">{company.aiTeamSize}</p>
                <p className="text-xs text-text-muted">名</p>
              </div>
              <div className="bg-surface rounded-2xl p-4 border border-border shadow-sm text-center card-hover">
                <p className="text-xs text-text-muted mb-1">勤務スタイル</p>
                <p className="text-xs font-bold text-text-primary leading-tight mt-2">{company.workStyle}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm">
              <p className="text-text-secondary leading-relaxed">{company.description}</p>
            </div>
          </div>
        </section>

        {/* Available Positions */}
        <section className="py-12 bg-surface" id="positions">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              募集中の<span className="gradient-text">AIポジション</span>
            </h2>
            <p className="text-sm text-text-muted mb-6">編集部調査による主要ポジション一覧</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {company.positions.map((pos, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-[#F8FAFF] rounded-xl p-4 border border-border card-hover"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-black">
                    {i + 1}
                  </span>
                  <span className="text-text-primary font-medium text-sm">{pos}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-12" id="tech-stack">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              主要<span className="gradient-text">技術スタック</span>
            </h2>
            <p className="text-sm text-text-muted mb-6">実務で使用する技術・フレームワーク</p>
            <div className="flex flex-wrap gap-3">
              {techStackList.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl text-sm font-bold text-text-primary card-hover"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Interview Process */}
        <section className="py-12 bg-surface" id="interview">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              <span className="gradient-text">選考プロセス</span>の流れ
            </h2>
            <p className="text-sm text-text-muted mb-6">一般的な採用フロー（編集部調査）</p>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />
              <div className="space-y-4 pl-14">
                {company.interviewProcess.split("→").map((step, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[2.25rem] top-1 w-5 h-5 rounded-full gradient-bg flex items-center justify-center ring-4 ring-white shadow">
                      <span className="text-white text-[9px] font-bold">{i + 1}</span>
                    </div>
                    <div className="bg-[#F8FAFF] rounded-xl border border-border p-4 shadow-sm card-hover">
                      <p className="font-bold text-text-primary text-sm">{step.trim()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="py-12" id="pros-cons">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-6">
              <span className="gradient-text">メリット</span>・デメリット
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-surface rounded-2xl p-6 border border-emerald-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <h3 className="font-black text-lg text-emerald-700">メリット</h3>
                </div>
                <ul className="space-y-3">
                  {company.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-secondary text-sm leading-relaxed">
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-surface rounded-2xl p-6 border border-rose-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <h3 className="font-black text-lg text-rose-700">デメリット・注意点</h3>
                </div>
                <ul className="space-y-3">
                  {company.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-secondary text-sm leading-relaxed">
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-rose-500" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Agents */}
        <section className="py-12 bg-surface" id="agents">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              この企業への転職に<span className="gradient-text">おすすめエージェント</span>
            </h2>
            <p className="text-sm text-text-muted mb-6">求人保有実績・選考対策力を基に選定</p>
            <div className="space-y-4">
              {recommendedAgentData.map((agent, i) => (
                <Link
                  key={agent.slug}
                  href={`/agent/${agent.slug}/`}
                  className="flex items-center gap-4 bg-[#F8FAFF] rounded-2xl border border-border p-5 shadow-sm card-hover group"
                >
                  <div
                    className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold ${
                      i === 0 ? "bg-yellow-400" : i === 1 ? "bg-gray-300" : "gradient-bg"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-text-primary group-hover:text-primary transition-colors">
                      {agent.name}
                    </p>
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
            <p className="text-sm text-text-muted mb-8">採用・転職に関するQ&A</p>
            <div className="space-y-4">
              {company.faqs.map((faq, i) => (
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
              <p className="text-sm opacity-80 mb-2">転職エージェントを活用して</p>
              <h2 className="text-2xl sm:text-3xl font-black mb-4">
                AI企業への転職を<br className="hidden sm:block" />成功させよう
              </h2>
              <p className="text-sm opacity-80 mb-8 max-w-lg mx-auto">
                AI・ML領域に強いエージェント10社を無料で比較。あなたに合ったエージェントを選べます。
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
