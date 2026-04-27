import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import Breadcrumb from "@/app/components/Breadcrumb";
import interviewsData from "@/data/interviews.json";

/* ─── Types ─────────────────────────────────────────────── */
type QA = { q: string; a: string };
type Section = { heading: string; questions: QA[] };
type Platform = { name: string; desc: string; difficulty: string; focus: string };
type PrepPhase = { phase: string; actions: string[] };
type Pattern = { pattern: string; example: string; tips: string };
type MustHave = { item: string; desc: string; priority: string };
type ProjectIdea = { title: string; desc: string; techStack: string; impact: string };
type MedalTier = { tier: string; effect: string; difficulty: string };
type CompetitionType = { type: string; recommended: string; desc: string };
type Role = { title: string; salaryRange: string; coreSkills: string[]; advancedSkills: string[]; softSkills: string[]; description: string };
type LevelRow = { level: string; expectations: string[]; targetSalary: string };
type TrendSkill = { skill: string; demand: string; desc: string };

type InterviewData = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  overview?: string;
  sections?: Section[];
  tips?: string[];
  platforms?: Platform[];
  prepStrategy?: PrepPhase[];
  commonPatterns?: Pattern[];
  mustHave?: MustHave[];
  projectIdeas?: ProjectIdea[];
  githubTips?: string[];
  medalTiers?: MedalTier[];
  competitionTypes?: CompetitionType[];
  agentStrategy?: string;
  roles?: Role[];
  levelMatrix?: LevelRow[];
  trendSkills2026?: TrendSkill[];
  faqs?: QA[];
};

const allInterviews: InterviewData[] = interviewsData as InterviewData[];

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return allInterviews.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = allInterviews.find((i) => i.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title}【2026年最新】｜AIキャリアラボ`,
    description: item.description,
    keywords: `AI転職 ${item.category}, AIエンジニア ${item.title}`,
    openGraph: {
      title: `${item.title}【2026年版】`,
      description: item.description,
      type: "article",
      locale: "ja_JP",
    },
  };
}

/* ─── Sub-renderers ──────────────────────────────────────── */

function QuestionsPage({ item }: { item: InterviewData }) {
  return (
    <>
      {/* Tips box */}
      {item.tips && (
        <section className="py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
              <h2 className="font-black text-text-primary mb-3 text-lg">面接対策の5つのポイント</h2>
              <ul className="space-y-2">
                {item.tips!.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-primary font-bold flex-shrink-0">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Sections */}
      {item.sections?.map((section, si) => (
        <section key={si} className={`py-12 ${si % 2 === 1 ? "bg-surface-alt" : ""}`}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl md:text-2xl font-black text-text-primary mb-6">
              <span className="gradient-text">{section.heading}</span>
            </h2>
            <div className="space-y-4">
              {section.questions.map((qa, qi) => (
                <details key={qi} className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden group">
                  <summary className="flex items-start justify-between gap-4 p-5 cursor-pointer list-none font-bold text-text-primary hover:bg-surface-alt transition-colors">
                    <span className="flex gap-3">
                      <span className="gradient-text font-black flex-shrink-0 text-sm">Q{qi + 1}.</span>
                      <span className="text-sm">{qa.q}</span>
                    </span>
                    <span className="text-text-muted text-lg flex-shrink-0 group-open:rotate-180 transition-transform">↓</span>
                  </summary>
                  <div className="px-5 pb-5 pt-1 border-t border-border">
                    <p className="text-sm text-text-secondary leading-relaxed">
                      <span className="font-bold text-accent mr-2">A.</span>
                      {qa.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

function CodingTestPage({ item }: { item: InterviewData }) {
  return (
    <>
      {/* Overview */}
      {item.overview && (
        <section className="py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-text-secondary leading-relaxed text-base">{item.overview}</p>
          </div>
        </section>
      )}

      {/* Platforms */}
      {item.platforms && (
        <section className="py-12 bg-surface-alt">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-text-primary mb-6 text-center">
              <span className="gradient-text">主要プラットフォーム</span>別の特徴
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {item.platforms!.map((p, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-border shadow-sm card-hover">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-black text-text-primary">{p.name}</h3>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">{p.focus}</span>
                  </div>
                  <p className="text-sm text-text-secondary mb-2 leading-relaxed">{p.desc}</p>
                  <span className="text-xs text-text-muted">難易度: {p.difficulty}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prep Strategy */}
      {item.prepStrategy && (
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-text-primary mb-6 text-center">
              <span className="gradient-text">準備スケジュール</span>
            </h2>
            <div className="space-y-5">
              {item.prepStrategy!.map((phase, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-border shadow-sm">
                  <h3 className="font-black text-text-primary mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg gradient-bg text-white flex items-center justify-center text-sm font-black">{i + 1}</span>
                    {phase.phase}
                  </h3>
                  <ul className="space-y-1.5">
                    {phase.actions.map((action, ai) => (
                      <li key={ai} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Common Patterns */}
      {item.commonPatterns && (
        <section className="py-12 bg-surface-alt">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-text-primary mb-6 text-center">
              <span className="gradient-text">頻出パターン</span>と対策
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {item.commonPatterns!.map((pat, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-border shadow-sm card-hover">
                  <h3 className="font-black text-text-primary mb-1">{pat.pattern}</h3>
                  <p className="text-xs text-text-muted mb-2">例: {pat.example}</p>
                  <div className="text-sm text-primary font-medium bg-primary/5 rounded-lg px-3 py-2">
                    ポイント: {pat.tips}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {item.faqs && <FaqSection faqs={item.faqs} />}
    </>
  );
}

function PortfolioPage({ item }: { item: InterviewData }) {
  return (
    <>
      {item.overview && (
        <section className="py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-text-secondary leading-relaxed">{item.overview}</p>
          </div>
        </section>
      )}

      {item.mustHave && (
        <section className="py-12 bg-surface-alt">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-text-primary mb-6 text-center">
              <span className="gradient-text">必須コンテンツ</span>チェックリスト
            </h2>
            <div className="space-y-3">
              {item.mustHave!.map((m, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-border shadow-sm flex items-start gap-4 card-hover">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 ${
                    m.priority === "必須"
                      ? "bg-red-100 text-red-700"
                      : m.priority === "高推奨"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {m.priority}
                  </span>
                  <div>
                    <h3 className="font-black text-text-primary mb-1">{m.item}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {item.projectIdeas && (
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-text-primary mb-6 text-center">
              おすすめ<span className="gradient-text">プロジェクトアイデア</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {item.projectIdeas!.map((proj, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-border shadow-sm card-hover">
                  <h3 className="font-black text-text-primary mb-2">{proj.title}</h3>
                  <p className="text-sm text-text-secondary mb-3 leading-relaxed">{proj.desc}</p>
                  <div className="text-xs text-text-muted bg-surface-alt rounded-lg px-3 py-2 mb-2 font-mono">
                    {proj.techStack}
                  </div>
                  <div className="text-xs text-primary font-medium">{proj.impact}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {item.githubTips && (
        <section className="py-12 bg-surface-alt">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-text-primary mb-6 text-center">
              <span className="gradient-text">GitHub活用</span>のコツ
            </h2>
            <div className="space-y-3">
              {item.githubTips!.map((tip, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-border shadow-sm flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full gradient-bg text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-text-secondary">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {item.faqs && <FaqSection faqs={item.faqs} />}
    </>
  );
}

function KagglePage({ item }: { item: InterviewData }) {
  return (
    <>
      {item.overview && (
        <section className="py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-text-secondary leading-relaxed">{item.overview}</p>
          </div>
        </section>
      )}

      {item.medalTiers && (
        <section className="py-12 bg-surface-alt">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-text-primary mb-6 text-center">
              <span className="gradient-text">メダル別</span>転職への影響
            </h2>
            <div className="space-y-4">
              {item.medalTiers!.map((medal, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-border shadow-sm card-hover">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <h3 className="font-black text-text-primary">{medal.tier}</h3>
                    <span className="text-xs text-text-muted bg-surface-alt px-3 py-1 rounded-full border border-border">
                      {medal.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{medal.effect}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {item.competitionTypes && (
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-text-primary mb-6 text-center">
              <span className="gradient-text">コンペ種類別</span>ガイド
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {item.competitionTypes!.map((ct, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-border shadow-sm card-hover">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-black text-text-primary text-sm">{ct.type}</h3>
                    <span className="text-[10px] px-2 py-1 bg-primary/10 text-primary rounded-full font-medium flex-shrink-0">
                      {ct.recommended}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{ct.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {item.agentStrategy && (
        <section className="py-10 bg-surface-alt">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-6 border border-primary/20 shadow-sm">
              <h2 className="font-black text-text-primary mb-3">エージェントへの伝え方</h2>
              <p className="text-sm text-text-secondary leading-relaxed">{item.agentStrategy}</p>
            </div>
          </div>
        </section>
      )}

      {item.faqs && <FaqSection faqs={item.faqs} />}
    </>
  );
}

function SkillMapPage({ item }: { item: InterviewData }) {
  const demandColor = (d: string) => {
    if (d.includes("急上昇")) return "bg-red-100 text-red-700 border-red-200";
    if (d.includes("安定")) return "bg-green-100 text-green-700 border-green-200";
    return "bg-orange-100 text-orange-700 border-orange-200";
  };

  return (
    <>
      {item.overview && (
        <section className="py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-text-secondary leading-relaxed">{item.overview}</p>
          </div>
        </section>
      )}

      {/* Roles */}
      {item.roles && (
        <section className="py-12 bg-surface-alt">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-text-primary mb-6 text-center">
              <span className="gradient-text">職種別</span>スキルマップ
            </h2>
            <div className="space-y-5">
              {item.roles!.map((role, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-border shadow-sm card-hover">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <h3 className="text-lg font-black text-text-primary">{role.title}</h3>
                    <span className="text-sm font-black gradient-text">{role.salaryRange}</span>
                  </div>
                  <p className="text-sm text-text-secondary mb-4 leading-relaxed">{role.description}</p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs font-bold text-text-muted mb-1.5">コアスキル</p>
                      <div className="flex flex-wrap gap-1">
                        {role.coreSkills.map((s, si) => (
                          <span key={si} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20 font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-text-muted mb-1.5">アドバンスト</p>
                      <div className="flex flex-wrap gap-1">
                        {role.advancedSkills.map((s, si) => (
                          <span key={si} className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full border border-secondary/20 font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-text-muted mb-1.5">ソフトスキル</p>
                      <div className="flex flex-wrap gap-1">
                        {role.softSkills.map((s, si) => (
                          <span key={si} className="text-[10px] bg-surface-alt text-text-secondary px-2 py-0.5 rounded-full border border-border font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Level Matrix */}
      {item.levelMatrix && (
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-text-primary mb-6 text-center">
              <span className="gradient-text">レベル別</span>期待値・年収
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {item.levelMatrix!.map((lv, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-border shadow-sm card-hover">
                  <div className="w-full mb-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      i === 0 ? "bg-green-100 text-green-700" : i === 1 ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                    }`}>
                      {lv.level}
                    </span>
                  </div>
                  <p className="text-lg font-black gradient-text mb-3">{lv.targetSalary}</p>
                  <ul className="space-y-1.5">
                    {lv.expectations.map((ex, ei) => (
                      <li key={ei} className="flex items-start gap-1.5 text-xs text-text-secondary">
                        <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trend Skills */}
      {item.trendSkills2026 && (
        <section className="py-12 bg-surface-alt">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-text-primary mb-6 text-center">
              <span className="gradient-text">2026年注目</span>トレンドスキル
            </h2>
            <div className="space-y-3">
              {item.trendSkills2026!.map((ts, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-border shadow-sm flex items-start gap-4 card-hover">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border flex-shrink-0 ${demandColor(ts.demand)}`}>
                    {ts.demand}
                  </span>
                  <div>
                    <h3 className="font-black text-text-primary mb-1">{ts.skill}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{ts.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {item.faqs && <FaqSection faqs={item.faqs} />}
    </>
  );
}

function FaqSection({ faqs }: { faqs: QA[] }) {
  return (
    <section className="py-12 md:py-16 bg-surface-alt">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-text-primary mb-2">よくある質問</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden group">
              <summary className="flex items-start justify-between gap-4 p-5 cursor-pointer list-none font-bold text-text-primary hover:bg-surface-alt transition-colors">
                <span className="flex gap-3 text-sm">
                  <span className="gradient-text font-black flex-shrink-0">Q{i + 1}.</span>
                  <span>{faq.q}</span>
                </span>
                <span className="text-text-muted text-xl flex-shrink-0 group-open:rotate-180 transition-transform">↓</span>
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
  );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default async function InterviewPage({ params }: Props) {
  const { slug } = await params;
  const item = allInterviews.find((i) => i.slug === slug);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-muted">ページが見つかりません</p>
      </div>
    );
  }

  const faqJsonLd = item.faqs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: item.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      }
    : null;

  return (
    <>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <SiteHeader />

      <main className="flex-1 bg-background">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "面接・スキル対策", href: "/interview/questions/" },
              { label: item.title },
            ]}
          />
        </div>

        {/* ===== HERO ===== */}
        <section className="hero-pattern border-b border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-18">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 font-bold">
                {item.category}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-surface-alt text-text-muted border border-border">
                読了時間: {item.readTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-text-primary leading-tight mb-4">
              <span className="gradient-text">{item.title}</span>
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed max-w-3xl">
              {item.description}
            </p>
          </div>
        </section>

        {/* ===== CONTENT (slug-specific) ===== */}
        {slug === "questions" && <QuestionsPage item={item} />}
        {slug === "coding-test" && <CodingTestPage item={item} />}
        {slug === "portfolio" && <PortfolioPage item={item} />}
        {slug === "kaggle" && <KagglePage item={item} />}
        {slug === "skill-map" && <SkillMapPage item={item} />}

        {/* ===== CTA ===== */}
        <section className="py-14 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl gradient-bg text-white text-center px-8 py-14 glow">
              <div className="absolute inset-0 tech-grid opacity-20" />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-black mb-4">
                  スキルを磨いたら、転職エージェントに相談しよう
                </h2>
                <p className="text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
                  AI転職に強い専門エージェントが、あなたのスキルと経験に合った求人を無料で紹介します。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/ranking/ai-engineer/"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-xl text-primary font-black hover:bg-white/90 transition-colors shadow-lg"
                  >
                    AI転職エージェントランキングを見る →
                  </Link>
                  <Link
                    href="/#ranking"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur rounded-xl text-white font-bold hover:bg-white/30 transition-colors border border-white/30"
                  >
                    全エージェントを比較する
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
