import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import Breadcrumb from "@/app/components/Breadcrumb";
import techStacksData from "@/data/techstacks.json";
import agentsData from "@/data/agents.json";

type TechStack = {
  slug: string;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  description: string;
  marketOverview: string;
  avgSalary: number;
  salaryRange: string;
  jobCount: string;
  demandTrend: string;
  keyLibraries: { name: string; desc: string }[];
  careerPaths: string[];
  recommendedAgents: string[];
  studyRoadmap: { step: number; title: string; duration: string; desc: string }[];
  faqs: { q: string; a: string }[];
};

type Agent = {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  officialUrl: string;
  aiJobCount: number;
  avgSalaryUp: number;
};

const techStacks: TechStack[] = techStacksData as TechStack[];
const agents: Agent[] = agentsData as Agent[];

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return techStacks.map((tech) => ({ slug: tech.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tech = techStacks.find((t) => t.slug === slug);
  if (!tech) return {};

  return {
    title: `${tech.title}エンジニア転職｜求人${tech.jobCount}・平均年収${tech.avgSalary}万円【2026年最新】`,
    description: `${tech.title}を使うAIエンジニアの転職完全ガイド。平均年収${tech.avgSalary}万円（${tech.salaryRange}）、求人${tech.jobCount}のリアルなデータと、スタディロードマップ・おすすめ転職エージェントを徹底解説。`,
    keywords: `${tech.title} 転職, ${tech.title} エンジニア 求人, ${tech.title} 年収, AI転職 ${tech.title}`,
    openGraph: {
      title: `${tech.title}エンジニアの転職・年収ガイド【2026年版】｜AIキャリアラボ`,
      description: `${tech.title}スキルを活かした転職。平均年収${tech.avgSalary}万円・求人${tech.jobCount}のデータ、学習ロードマップ、厳選エージェント情報。`,
      type: "article",
      locale: "ja_JP",
    },
  };
}

function getDemandBadgeStyle(trend: string): string {
  if (trend.includes("爆発")) return "bg-red-100 text-red-700 border border-red-200";
  if (trend.includes("急上昇")) return "bg-orange-100 text-orange-700 border border-orange-200";
  return "bg-green-100 text-green-700 border border-green-200";
}

export default async function TechStackPage({ params }: Props) {
  const { slug } = await params;
  const tech = techStacks.find((t) => t.slug === slug);

  if (!tech) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-muted">ページが見つかりません</p>
      </div>
    );
  }

  const recommendedAgentList = tech.recommendedAgents
    .map((agSlug) => agents.find((a) => a.slug === agSlug))
    .filter((a): a is Agent => Boolean(a));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tech.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SiteHeader />

      <main className="flex-1 bg-background">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "技術スタック別", href: "/#tech-stack" },
              { label: tech.title },
            ]}
          />
        </div>

        {/* ===== HERO ===== */}
        <section className="hero-pattern border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              {/* Icon box */}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 text-white text-2xl font-black"
                style={{ backgroundColor: tech.color }}
              >
                {tech.icon}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-text-primary leading-tight mb-2">
                  <span className="gradient-text">{tech.title}</span>
                  <span className="block text-xl md:text-2xl font-bold text-text-secondary mt-1">
                    エンジニアの転職・年収ガイド
                  </span>
                </h1>
                <p className="text-text-secondary text-lg">{tech.subtitle}</p>
              </div>
            </div>

            {/* Stats badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-sm border border-border">
                <span className="text-2xl font-black gradient-text">{tech.avgSalary}万円</span>
                <span className="text-xs text-text-muted leading-tight">
                  平均年収<br />
                  <span className="text-text-secondary font-medium">{tech.salaryRange}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-sm border border-border">
                <span className="text-2xl font-black text-accent">{tech.jobCount}</span>
                <span className="text-xs text-text-muted leading-tight">
                  求人数<br />
                  <span className="text-text-secondary font-medium">2026年4月時点</span>
                </span>
              </div>
              <div className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold ${getDemandBadgeStyle(tech.demandTrend)}`}>
                <span>📈</span>
                <span>{tech.demandTrend}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-text-secondary leading-relaxed max-w-3xl text-base md:text-lg">
              {tech.description}
            </p>
          </div>
        </section>

        {/* ===== MARKET OVERVIEW ===== */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-text-primary mb-4">
                  <span className="gradient-text">市場・需要動向</span>
                </h2>
                <p className="text-text-secondary leading-relaxed text-base md:text-lg">
                  {tech.marketOverview}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-border text-center card-hover">
                  <div className="text-3xl font-black gradient-text mb-1">{tech.avgSalary}万</div>
                  <div className="text-xs text-text-muted">平均年収</div>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-border text-center card-hover">
                  <div className="text-2xl font-black text-accent mb-1">{tech.jobCount}</div>
                  <div className="text-xs text-text-muted">公開求人数</div>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-border text-center card-hover col-span-2">
                  <div className="text-sm font-bold text-text-secondary mb-1">年収レンジ</div>
                  <div className="text-xl font-black text-text-primary">{tech.salaryRange}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== KEY LIBRARIES / TOOLS ===== */}
        <section className="py-12 md:py-16 bg-surface-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-text-primary mb-3">
                主要ライブラリ・ツール
              </h2>
              <p className="text-text-muted">
                {tech.title}エンジニアが実務で使うコア技術
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tech.keyLibraries.map((lib, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-border card-hover"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                      style={{ backgroundColor: tech.color }}
                    >
                      {lib.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-text-primary text-sm mb-1">{lib.name}</h3>
                      <p className="text-xs text-text-secondary leading-relaxed">{lib.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CAREER PATHS ===== */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-text-primary mb-3">
                {tech.title}からのキャリアパス
              </h2>
              <p className="text-text-muted">このスキルを身に付けた後に目指せる職種</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {tech.careerPaths.map((path, i) => {
                const [role, detail] = path.split("→").map((s) => s.trim());
                return (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-5 border border-border shadow-sm card-hover flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-bold text-text-primary text-sm">{role}</div>
                      {detail && (
                        <div className="text-xs text-text-secondary mt-1">{detail}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== STUDY ROADMAP ===== */}
        <section className="py-12 md:py-16 bg-surface-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-text-primary mb-3">
                学習ロードマップ
              </h2>
              <p className="text-text-muted">
                {tech.title}をゼロから実務レベルに引き上げるステップ
              </p>
            </div>
            <div className="max-w-3xl mx-auto relative">
              {/* Vertical line */}
              <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden sm:block" />

              <div className="space-y-6">
                {tech.studyRoadmap.map((step, i) => (
                  <div key={i} className="relative flex gap-6 items-start">
                    {/* Step circle */}
                    <div className="relative z-10 w-14 h-14 rounded-full gradient-bg flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-white font-black text-lg">0{step.step}</span>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-border flex-1 card-hover">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-black text-text-primary">{step.title}</h3>
                        <span className="text-xs text-white gradient-bg rounded-full px-3 py-1 font-medium flex-shrink-0">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== RECOMMENDED AGENTS ===== */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-text-primary mb-3">
                {tech.title}転職におすすめのエージェント
              </h2>
              <p className="text-text-muted">
                {tech.title}求人に強い転職エージェントを厳選
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {recommendedAgentList.map((agent, i) => (
                <div
                  key={agent.slug}
                  className="bg-white rounded-2xl p-6 border border-border shadow-sm card-hover flex flex-col"
                >
                  {i === 0 && (
                    <div className="mb-3">
                      <span className="text-xs font-bold text-white gradient-bg rounded-full px-3 py-1">
                        最もおすすめ
                      </span>
                    </div>
                  )}
                  <h3 className="text-lg font-black text-text-primary mb-1">{agent.name}</h3>
                  <p className="text-xs text-text-muted mb-3">{agent.tagline}</p>
                  <div className="flex gap-3 mb-4">
                    <div className="flex-1 bg-surface-alt rounded-lg p-2 text-center">
                      <div className="font-black text-accent text-sm">{agent.aiJobCount.toLocaleString()}件+</div>
                      <div className="text-[10px] text-text-muted">AI求人数</div>
                    </div>
                    <div className="flex-1 bg-surface-alt rounded-lg p-2 text-center">
                      <div className="font-black gradient-text text-sm">+{agent.avgSalaryUp}万円</div>
                      <div className="text-[10px] text-text-muted">平均年収UP</div>
                    </div>
                  </div>
                  <div className="mt-auto flex flex-col gap-2">
                    <Link
                      href={`/agent/${agent.slug}/`}
                      className="block text-center py-2.5 rounded-xl border-2 border-primary text-primary text-sm font-bold hover:bg-primary hover:text-white transition-colors"
                    >
                      詳しく見る
                    </Link>
                    <a
                      href={agent.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center py-2.5 rounded-xl gradient-bg text-white text-sm font-bold hover:opacity-90 transition-opacity"
                    >
                      公式サイトで無料登録
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/#ranking"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium text-sm transition-colors"
              >
                全エージェントを比較する →
              </Link>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="py-12 md:py-16 bg-surface-alt">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-text-primary mb-3">
                よくある質問
              </h2>
              <p className="text-text-muted">{tech.title}転職についての疑問に答えます</p>
            </div>
            <div className="space-y-4">
              {tech.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden group"
                >
                  <summary className="flex items-start justify-between gap-4 p-5 cursor-pointer list-none font-bold text-text-primary hover:bg-surface-alt transition-colors">
                    <span className="flex gap-3">
                      <span className="gradient-text font-black flex-shrink-0">Q{i + 1}.</span>
                      <span>{faq.q}</span>
                    </span>
                    <span className="text-text-muted text-xl flex-shrink-0 group-open:rotate-180 transition-transform">
                      ↓
                    </span>
                  </summary>
                  <div className="px-5 pb-5 pt-1 border-t border-border">
                    <p className="text-sm text-text-secondary leading-relaxed">
                      <span className="font-bold text-accent mr-2">A.</span>
                      {faq.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl gradient-bg text-white text-center px-8 py-14 md:py-16 glow">
              {/* Background decoration */}
              <div className="absolute inset-0 tech-grid opacity-20" />
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 animate-float" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/5 animate-float" style={{ animationDelay: "3s" }} />

              <div className="relative z-10">
                <div
                  className="inline-block w-16 h-16 rounded-2xl bg-white/20 backdrop-blur mb-6 flex items-center justify-center text-2xl font-black mx-auto"
                  style={{ color: tech.color }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white text-xl font-black">
                    {tech.icon}
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-black mb-4">
                  {tech.title}スキルを活かして<br className="hidden sm:block" />
                  年収アップを実現しませんか？
                </h2>
                <p className="text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
                  平均年収{tech.avgSalary}万円・求人{tech.jobCount}の{tech.title}市場。
                  専門エージェントに相談して、あなたのキャリアを次のステージへ。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {recommendedAgentList[0] && (
                    <a
                      href={recommendedAgentList[0].officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-xl text-primary font-black hover:bg-white/90 transition-colors shadow-lg"
                    >
                      {recommendedAgentList[0].name}に無料相談する →
                    </a>
                  )}
                  <Link
                    href="/#ranking"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur rounded-xl text-white font-bold hover:bg-white/30 transition-colors border border-white/30"
                  >
                    全エージェントを比較する
                  </Link>
                </div>
                <p className="text-white/60 text-xs mt-6">
                  ※ 登録無料・相談無料。エージェントのサービスはすべて転職者側無料です。
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
