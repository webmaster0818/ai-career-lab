import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import Breadcrumb from "@/app/components/Breadcrumb";
import jobsData from "@/data/jobs.json";
import agentsData from "@/data/agents.json";

// ----------------------------------------------------------------
// Types
// ----------------------------------------------------------------
type Skill = { name: string; level: string; desc: string };
type CareerStep = { year: string; role: string; salary: string; desc: string };
type FAQ = { q: string; a: string };

type Job = {
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  avgSalary: number;
  salaryRange: string;
  growth: string;
  demand: string;
  requiredSkills: Skill[];
  careerPath: CareerStep[];
  dayInLife: string[];
  recommendedAgents: string[];
  relatedJobs: string[];
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

const jobs = jobsData as Job[];
const agents = agentsData as Agent[];

// ----------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------
function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}

function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}

function demandColor(demand: string): string {
  if (demand.includes("非常に高い") || demand.includes("急上昇"))
    return "bg-red-100 text-red-700";
  if (demand.includes("高い")) return "bg-orange-100 text-orange-700";
  return "bg-blue-100 text-blue-700";
}

function skillLevelColor(level: string): string {
  if (level === "必須") return "bg-primary/10 text-primary font-semibold";
  if (level === "推奨") return "bg-accent/10 text-accent-dark font-medium";
  return "bg-surface-alt text-text-muted";
}

// ----------------------------------------------------------------
// generateStaticParams
// ----------------------------------------------------------------
export async function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

// ----------------------------------------------------------------
// generateMetadata
// ----------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) {
    return {
      title: "職種ガイド | AIキャリアラボ",
      description: "AIキャリアラボの職種別ガイドページです。",
    };
  }

  const title = `${job.title}（${job.titleEn}）の転職ガイド｜年収・スキル・キャリアパス【2026年最新】`;
  const description = `${job.title}の年収相場（${job.salaryRange}）・必須スキル・キャリアパスを徹底解説。おすすめ転職エージェントや1日のスケジュールも紹介。需要は「${job.demand}」（前年比${job.growth}）。`;

  return {
    title,
    description,
    keywords: `${job.title} 転職, ${job.titleEn} 求人, ${job.title} 年収, ${job.title} スキル, AI転職エージェント`,
    openGraph: {
      title,
      description,
      type: "article",
      locale: "ja_JP",
    },
    alternates: {
      canonical: `/job/${job.slug}/`,
    },
  };
}

// ----------------------------------------------------------------
// Page Component
// ----------------------------------------------------------------
export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);

  if (!job) {
    return (
      <>
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center py-24">
          <p className="text-text-muted text-lg">ページが見つかりませんでした。</p>
        </main>
        <SiteFooter />
      </>
    );
  }

  const recommendedAgentData = job.recommendedAgents
    .map(getAgentBySlug)
    .filter((a): a is Agent => !!a);

  const relatedJobData = job.relatedJobs
    .map((s) => getJob(s))
    .filter((j): j is Job => !!j);

  // JSON-LD: FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: job.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  // JSON-LD: BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "TOP",
        item: "https://ai-career-lab.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "職種別ガイド",
        item: "https://ai-career-lab.com/job/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: job.title,
        item: `https://ai-career-lab.com/job/${job.slug}/`,
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <SiteHeader />

      <main className="flex-1">
        {/* ---- Breadcrumb ---- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "職種別ガイド", href: "/job/" },
              { label: job.title },
            ]}
          />
        </div>

        {/* ================================================================
            1. HERO
        ================================================================ */}
        <section className="relative hero-pattern py-16 sm:py-20 overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary/5 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/5 translate-y-1/2 -translate-x-1/3 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                  職種別ガイド
                </span>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${demandColor(
                    job.demand
                  )}`}
                >
                  需要: {job.demand}
                </span>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-100 text-green-700">
                  成長率 {job.growth}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-black mb-2 leading-tight">
                <span className="gradient-text">{job.title}</span>
              </h1>
              <p className="text-xl text-text-secondary font-medium mb-6">
                {job.titleEn}
              </p>

              {/* Description */}
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8 max-w-2xl">
                {job.description}
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-4">
                <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-border">
                  <p className="text-xs text-text-muted mb-1">年収レンジ</p>
                  <p className="text-xl font-bold text-primary">{job.salaryRange}</p>
                </div>
                <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-border">
                  <p className="text-xs text-text-muted mb-1">平均年収</p>
                  <p className="text-xl font-bold text-text-primary">
                    {job.avgSalary}
                    <span className="text-sm font-normal text-text-muted ml-1">万円</span>
                  </p>
                </div>
                <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-border">
                  <p className="text-xs text-text-muted mb-1">市場成長率</p>
                  <p className="text-xl font-bold text-green-600">{job.growth}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            Content area (two-column on large screens)
        ================================================================ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">

            {/* ---- Main column ---- */}
            <div className="space-y-14">

              {/* ============================================================
                  2. REQUIRED SKILLS
              ============================================================ */}
              <section id="skills">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 rounded-full gradient-bg shrink-0" />
                  必須・推奨スキル一覧
                </h2>
                <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-surface-alt border-b border-border">
                        <th className="text-left px-5 py-3 font-semibold text-text-secondary w-1/4">
                          スキル
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-text-secondary w-1/6">
                          レベル
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-text-secondary">
                          概要
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {job.requiredSkills.map((skill, i) => (
                        <tr
                          key={skill.name}
                          className={`border-b border-border last:border-0 ${
                            i % 2 === 0 ? "bg-white" : "bg-surface-alt/40"
                          }`}
                        >
                          <td className="px-5 py-4 font-semibold text-text-primary">
                            {skill.name}
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`inline-block text-xs px-2.5 py-1 rounded-full ${skillLevelColor(
                                skill.level
                              )}`}
                            >
                              {skill.level}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-text-secondary leading-relaxed">
                            {skill.desc}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ============================================================
                  3. CAREER PATH
              ============================================================ */}
              <section id="career-path">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 rounded-full gradient-bg shrink-0" />
                  キャリアパス・タイムライン
                </h2>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

                  <div className="space-y-6 pl-16">
                    {job.careerPath.map((step, i) => (
                      <div key={i} className="relative">
                        {/* Circle on timeline */}
                        <div
                          className="absolute -left-[2.75rem] top-1 w-5 h-5 rounded-full gradient-bg flex items-center justify-center ring-4 ring-white shadow"
                        >
                          <span className="text-white text-[9px] font-bold">
                            {i + 1}
                          </span>
                        </div>

                        <div className="bg-white rounded-2xl border border-border p-5 shadow-sm card-hover">
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <div>
                              <span className="text-xs font-medium text-text-muted">
                                {step.year}
                              </span>
                              <h3 className="text-base font-bold text-text-primary mt-0.5">
                                {step.role}
                              </h3>
                            </div>
                            <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">
                              {step.salary}
                            </span>
                          </div>
                          <p className="text-sm text-text-secondary leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ============================================================
                  4. DAY IN THE LIFE
              ============================================================ */}
              <section id="day-in-life">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 rounded-full gradient-bg shrink-0" />
                  1日のスケジュール
                </h2>
                <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                  {job.dayInLife.map((item, i) => {
                    // Split on first space after time (e.g. "09:30 出社..." → ["09:30", "出社..."])
                    const spaceIdx = item.indexOf(" ");
                    const time = spaceIdx > -1 ? item.slice(0, spaceIdx) : item;
                    const text = spaceIdx > -1 ? item.slice(spaceIdx + 1) : "";
                    return (
                      <div
                        key={i}
                        className={`flex items-start gap-4 px-5 py-4 ${
                          i !== job.dayInLife.length - 1
                            ? "border-b border-border"
                            : ""
                        } ${i % 2 === 0 ? "bg-white" : "bg-surface-alt/30"}`}
                      >
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg min-w-[52px] text-center shrink-0 mt-0.5">
                          {time}
                        </span>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* ============================================================
                  5. RECOMMENDED AGENTS
              ============================================================ */}
              <section id="recommended-agents">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2 flex items-center gap-3">
                  <span className="w-1 h-8 rounded-full gradient-bg shrink-0" />
                  おすすめ転職エージェント
                </h2>
                <p className="text-sm text-text-muted mb-6">
                  {job.title}への転職実績・求人数を基に厳選しました。
                </p>
                <div className="space-y-4">
                  {recommendedAgentData.map((agent, i) => (
                    <Link
                      key={agent.slug}
                      href={`/agent/${agent.slug}/`}
                      className="block bg-white rounded-2xl border border-border p-5 shadow-sm card-hover"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          {/* Rank badge */}
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0 ${
                              i === 0
                                ? "bg-yellow-400"
                                : i === 1
                                ? "bg-gray-300"
                                : i === 2
                                ? "bg-amber-600"
                                : "gradient-bg"
                            }`}
                          >
                            {i + 1}
                          </div>
                          <div>
                            <p className="font-bold text-text-primary">
                              {agent.name}
                            </p>
                            <p className="text-xs text-text-muted mt-0.5">
                              {agent.tagline}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3 text-right shrink-0">
                          <div>
                            <p className="text-xs text-text-muted">AI求人数</p>
                            <p className="text-sm font-bold text-primary">
                              {agent.aiJobCount.toLocaleString()}件+
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-text-muted">年収UP</p>
                            <p className="text-sm font-bold text-green-600">
                              +{agent.avgSalaryUp}万円
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-primary font-medium">
                          詳細レビューを見る →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* ============================================================
                  6. FAQ
              ============================================================ */}
              <section id="faq">
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 rounded-full gradient-bg shrink-0" />
                  よくある質問
                </h2>
                <div className="space-y-4">
                  {job.faqs.map((faq, i) => (
                    <details
                      key={i}
                      className="group bg-white rounded-2xl border border-border overflow-hidden shadow-sm"
                    >
                      <summary className="flex items-start justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none hover:bg-surface-alt/50 transition-colors">
                        <span className="font-semibold text-text-primary text-sm sm:text-base leading-snug flex-1">
                          <span className="text-primary mr-2">Q.</span>
                          {faq.q}
                        </span>
                        <span className="shrink-0 w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold mt-0.5 group-open:rotate-45 transition-transform">
                          +
                        </span>
                      </summary>
                      <div className="px-6 pb-5 pt-0 border-t border-border">
                        <p className="text-sm text-text-secondary leading-relaxed pt-4">
                          <span className="text-accent font-semibold mr-2">A.</span>
                          {faq.a}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              {/* ============================================================
                  7. RELATED JOBS
              ============================================================ */}
              {relatedJobData.length > 0 && (
                <section id="related-jobs">
                  <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
                    <span className="w-1 h-8 rounded-full gradient-bg shrink-0" />
                    関連職種
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {relatedJobData.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/job/${related.slug}/`}
                        className="bg-white rounded-2xl border border-border p-4 shadow-sm card-hover group"
                      >
                        <p className="font-bold text-text-primary text-sm group-hover:text-primary transition-colors mb-1">
                          {related.title}
                        </p>
                        <p className="text-xs text-text-muted mb-2">
                          {related.titleEn}
                        </p>
                        <p className="text-xs font-semibold text-primary">
                          {related.salaryRange}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* ============================================================
                  8. CTA — Rankings
              ============================================================ */}
              <section className="rounded-3xl overflow-hidden gradient-bg p-8 sm:p-12 text-white text-center">
                <p className="text-sm font-medium opacity-80 mb-2">
                  {job.title}への転職を検討中の方へ
                </p>
                <h2 className="text-2xl sm:text-3xl font-black mb-4">
                  おすすめエージェントを比較して
                  <br className="hidden sm:block" />
                  年収アップを実現しよう
                </h2>
                <p className="text-sm opacity-80 mb-8 max-w-lg mx-auto">
                  AI・ML領域に強い転職エージェント10社を徹底比較。
                  あなたのスキルと希望年収に合ったエージェントを見つけましょう。
                </p>
                <Link
                  href="/#ranking"
                  className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-surface transition-colors shadow-lg text-sm sm:text-base"
                >
                  エージェントランキングを見る
                  <span className="text-lg">→</span>
                </Link>
              </section>
            </div>

            {/* ================================================================
                Sidebar (sticky on large screens)
            ================================================================ */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">

                {/* Quick stats card */}
                <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                  <h3 className="font-bold text-text-primary mb-4 text-sm">
                    {job.title} 概要
                  </h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <dt className="text-text-muted">年収レンジ</dt>
                      <dd className="font-bold text-primary">{job.salaryRange}</dd>
                    </div>
                    <div className="flex justify-between items-center border-t border-border pt-3">
                      <dt className="text-text-muted">平均年収</dt>
                      <dd className="font-bold text-text-primary">
                        {job.avgSalary}万円
                      </dd>
                    </div>
                    <div className="flex justify-between items-center border-t border-border pt-3">
                      <dt className="text-text-muted">需要</dt>
                      <dd>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${demandColor(
                            job.demand
                          )}`}
                        >
                          {job.demand}
                        </span>
                      </dd>
                    </div>
                    <div className="flex justify-between items-center border-t border-border pt-3">
                      <dt className="text-text-muted">市場成長率</dt>
                      <dd className="font-bold text-green-600">{job.growth}</dd>
                    </div>
                  </dl>
                </div>

                {/* In-page navigation */}
                <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                  <h3 className="font-bold text-text-primary mb-4 text-sm">
                    目次
                  </h3>
                  <nav>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      {[
                        { href: "#skills", label: "必須・推奨スキル" },
                        { href: "#career-path", label: "キャリアパス" },
                        { href: "#day-in-life", label: "1日のスケジュール" },
                        {
                          href: "#recommended-agents",
                          label: "おすすめ転職エージェント",
                        },
                        { href: "#faq", label: "よくある質問" },
                        { href: "#related-jobs", label: "関連職種" },
                      ].map((item) => (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            className="flex items-center gap-2 hover:text-primary transition-colors py-1"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                {/* Mini CTA */}
                <div className="gradient-bg rounded-2xl p-6 text-white text-center">
                  <p className="text-xs opacity-80 mb-1">無料・登録3分</p>
                  <p className="font-bold text-sm mb-4">
                    おすすめエージェントを
                    <br />
                    一括チェック
                  </p>
                  <Link
                    href="/#ranking"
                    className="inline-block bg-white text-primary font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-surface transition-colors"
                  >
                    ランキングを見る →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Mobile CTA bar */}
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-border px-4 py-3 shadow-lg">
          <Link
            href="/#ranking"
            className="flex items-center justify-center gap-2 w-full gradient-bg text-white font-bold py-3 rounded-xl text-sm"
          >
            おすすめエージェントを比較する →
          </Link>
        </div>
        {/* Bottom padding for mobile CTA */}
        <div className="lg:hidden h-20" />
      </main>

      <SiteFooter />
    </>
  );
}
