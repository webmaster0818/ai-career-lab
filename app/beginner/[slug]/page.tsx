import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import Breadcrumb from "@/app/components/Breadcrumb";
import beginnersData from "@/data/beginners.json";
import agentsData from "@/data/agents.json";

type Beginner = (typeof beginnersData)[number];
type Agent = (typeof agentsData)[number];

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return beginnersData.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const beginner = beginnersData.find((b) => b.slug === slug);
  if (!beginner) return {};

  const siteUrl = "https://ai-career-lab.com";
  const pageUrl = `${siteUrl}/beginner/${beginner.slug}/`;

  return {
    title: `${beginner.title} | AIキャリアラボ`,
    description: beginner.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: beginner.title,
      description: beginner.description,
      url: pageUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: beginner.title,
      description: beginner.description,
    },
  };
}

export default async function BeginnerPage({ params }: Props) {
  const { slug } = await params;
  const beginner = beginnersData.find((b) => b.slug === slug) as Beginner | undefined;

  if (!beginner) {
    return (
      <>
        <SiteHeader />
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-text-secondary">ページが見つかりませんでした。</p>
        </main>
        <SiteFooter />
      </>
    );
  }

  const recommendedAgents = agentsData.filter((a) =>
    beginner.recommendedAgents.includes(a.slug)
  ) as Agent[];

  return (
    <div className="min-h-screen bg-surface">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="hero-pattern py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <Breadcrumb
              items={[
                { label: "未経験向け", href: "/beginner/" },
                { label: beginner.title },
              ]}
            />
            <div className="mt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold border border-secondary/20 mb-4">
                未経験向けガイド
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text-primary leading-tight mb-4">
                {beginner.title}
              </h1>
              <p className="text-text-secondary text-base leading-relaxed max-w-2xl">
                {beginner.description}
              </p>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-8 bg-white border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-surface rounded-2xl border border-border p-5">
              <h2 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h8" />
                </svg>
                目次
              </h2>
              <ol className="space-y-2">
                {beginner.sections.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <a href={`#section-${i}`} className="text-primary hover:underline">{s.heading}</a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        {beginner.sections.map((section, i) => (
          <section key={i} id={`section-${i}`} className={`py-12 ${i % 2 === 0 ? "bg-surface" : "bg-white"}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h2 className="text-xl sm:text-2xl font-black text-text-primary mb-6 flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-xl gradient-bg flex items-center justify-center text-white text-sm font-black mt-0.5">
                  {i + 1}
                </span>
                {section.heading}
              </h2>
              <div className="prose prose-sm max-w-none text-text-secondary leading-relaxed">
                {section.content.split("\n").map((line, j) => {
                  if (line.startsWith("【") && line.endsWith("】")) {
                    return (
                      <h3 key={j} className="text-base font-bold text-text-primary mt-4 mb-2">
                        {line}
                      </h3>
                    );
                  }
                  if (line.startsWith("✅") || line.startsWith("・") || line.startsWith("●")) {
                    return (
                      <p key={j} className="flex items-start gap-2 mb-1">
                        <span className="flex-shrink-0 mt-0.5">{line.charAt(0)}</span>
                        <span>{line.slice(1)}</span>
                      </p>
                    );
                  }
                  if (line.trim() === "") return <br key={j} />;
                  return <p key={j} className="mb-2">{line}</p>;
                })}
              </div>
            </div>
          </section>
        ))}

        {/* Key Takeaways */}
        <section className="py-12 bg-primary/5 border-y border-primary/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-6">
              この記事の<span className="gradient-text">まとめ</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {beginner.keyTakeaways.map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-primary/10 p-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-black mt-0.5">
                    ✓
                  </span>
                  <p className="text-sm text-text-primary font-medium leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended Agents */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              おすすめ<span className="gradient-text">エージェント</span>
            </h2>
            <p className="text-sm text-text-muted mb-6">このガイドの内容に基づいたおすすめエージェント</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedAgents.map((agent) => (
                <div key={agent.slug} className="bg-surface rounded-2xl border border-border p-5 card-hover">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-black text-text-primary">{agent.name}</h3>
                      <p className="text-xs text-text-muted mt-0.5">{agent.specialty}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span className="text-xs font-bold text-accent">AI求人 {agent.aiJobCount.toLocaleString()}件</span>
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed mb-4">{agent.description.slice(0, 80)}…</p>
                  <a
                    href={agent.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block w-full text-center py-2.5 px-4 rounded-xl gradient-bg text-white text-sm font-bold hover:opacity-90 transition-opacity"
                  >
                    無料で相談する →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 tech-grid">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-surface rounded-3xl p-8 sm:p-12 border border-border shadow-lg glow text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold border border-secondary/20 mb-4">
                まずは無料相談
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-text-primary mb-3">
                AI転職の第一歩を<span className="gradient-text">今すぐ始めよう</span>
              </h2>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
                転職エージェントへの相談は無料です。今の状況を話すだけで、あなたに合った求人と戦略を提案してもらえます。
              </p>
              <Link
                href="/#ranking"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl gradient-bg text-white text-base font-black shadow-lg hover:opacity-90 hover:shadow-xl transition-all"
              >
                エージェントを比較する
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <p className="mt-4 text-xs text-text-muted">※ 本リンクはアフィリエイトリンクを含みます（PR）</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-surface" id="faq">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              よくある<span className="gradient-text">質問</span>
            </h2>
            <p className="text-sm text-text-muted mb-8">未経験者からの疑問に答えます</p>
            <div className="space-y-4">
              {beginner.faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border overflow-hidden">
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

        {/* Related pages */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-black text-text-primary mb-6">関連する未経験向けガイド</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {beginnersData
                .filter((b) => b.slug !== slug)
                .map((b) => (
                  <Link
                    key={b.slug}
                    href={`/beginner/${b.slug}/`}
                    className="block p-4 bg-surface rounded-xl border border-border card-hover"
                  >
                    <p className="text-xs text-secondary font-semibold mb-1">未経験向け</p>
                    <p className="text-sm font-bold text-text-primary leading-snug">{b.title}</p>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
