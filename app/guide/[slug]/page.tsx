import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import Breadcrumb from "@/app/components/Breadcrumb";
import guidesData from "@/data/guides.json";
import agentsData from "@/data/agents.json";

type Guide = (typeof guidesData)[number];
type Agent = (typeof agentsData)[number];

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return guidesData.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guidesData.find((g) => g.slug === slug);
  if (!guide) return {};

  const siteUrl = "https://ai-career-lab.com";
  const pageUrl = `${siteUrl}/guide/${guide.slug}/`;

  return {
    title: `${guide.title} | AIキャリアラボ`,
    description: guide.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: pageUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guidesData.find((g) => g.slug === slug) as Guide | undefined;

  if (!guide) {
    return (
      <>
        <SiteHeader />
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-text-secondary">ガイドが見つかりませんでした。</p>
        </main>
        <SiteFooter />
      </>
    );
  }

  const relatedGuides = guidesData.filter((g) => g.slug !== guide.slug);

  const recommendedAgents: Agent[] = guide.recommendedAgents
    .map((agentSlug) => agentsData.find((a) => a.slug === agentSlug))
    .filter((a): a is Agent => !!a);

  const siteUrl = "https://ai-career-lab.com";
  const pageUrl = `${siteUrl}/guide/${guide.slug}/`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "TOP", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "キャリアガイド",
        item: `${siteUrl}/guide/`,
      },
      { "@type": "ListItem", position: 3, name: guide.shortTitle, item: pageUrl },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    url: pageUrl,
    publisher: {
      "@type": "Organization",
      name: "AIキャリアラボ",
      url: siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <SiteHeader />

      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "キャリアガイド", href: "/guide/" },
              { label: guide.shortTitle },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="hero-pattern py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                {guide.targetAudience}
              </span>
              {guide.estimatedTime && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {guide.estimatedTime}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary leading-tight mb-5">
              {guide.title}
            </h1>

            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-3xl">
              {guide.heroText}
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
          {/* Steps / Timeline Section */}
          <section aria-labelledby="steps-heading">
            <h2
              id="steps-heading"
              className="text-xl sm:text-2xl font-bold text-text-primary mb-8 flex items-center gap-2"
            >
              <span className="w-1 h-7 rounded-full gradient-bg inline-block" />
              <span className="gradient-text">ステップ別ロードマップ</span>
            </h2>

            <ol className="relative border-l-2 border-border ml-4 space-y-0">
              {guide.steps.map((step, index) => (
                <li key={index} className="ml-8 pb-10 last:pb-0">
                  {/* Timeline dot */}
                  <span className="absolute -left-[11px] flex items-center justify-center w-5 h-5 rounded-full gradient-bg ring-4 ring-background">
                    <span className="w-2 h-2 rounded-full bg-white" />
                  </span>

                  <div className="bg-surface border border-border rounded-2xl p-5 sm:p-6 card-hover">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                        {step.phase}
                      </span>
                      {step.duration && (
                        <span className="text-xs text-text-muted flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 h-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {step.duration}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-text-primary mb-3">
                      {step.title}
                    </h3>

                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {step.content}
                    </p>

                    {step.resources && step.resources.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                          おすすめリソース
                        </p>
                        <ul className="space-y-1">
                          {step.resources.map((res, ri) => (
                            <li
                              key={ri}
                              className="flex items-center gap-2 text-sm text-text-secondary"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                              {res}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {step.goal && (
                      <div className="flex items-start gap-2 bg-primary/5 rounded-xl px-4 py-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-primary mt-0.5 flex-shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <p className="text-sm font-medium text-primary">
                          ゴール: {step.goal}
                        </p>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Tips Section */}
          {guide.tips && guide.tips.length > 0 && (
            <section aria-labelledby="tips-heading">
              <h2
                id="tips-heading"
                className="text-xl sm:text-2xl font-bold text-text-primary mb-6 flex items-center gap-2"
              >
                <span className="w-1 h-7 rounded-full gradient-bg inline-block" />
                <span className="gradient-text">実践的なアドバイス</span>
              </h2>

              <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 glow">
                <ul className="space-y-4">
                  {guide.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </span>
                      <p className="text-text-secondary text-sm sm:text-base leading-relaxed pt-0.5">
                        {tip}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Recommended Agents Section */}
          {recommendedAgents.length > 0 && (
            <section aria-labelledby="agents-heading">
              <h2
                id="agents-heading"
                className="text-xl sm:text-2xl font-bold text-text-primary mb-6 flex items-center gap-2"
              >
                <span className="w-1 h-7 rounded-full gradient-bg inline-block" />
                <span className="gradient-text">おすすめ転職エージェント</span>
              </h2>
              <p className="text-text-secondary text-sm mb-6">
                このガイドの転職に特に相性の良いエージェントを厳選しました。
              </p>

              <div className="space-y-4">
                {recommendedAgents.map((agent, index) => (
                  <Link
                    key={agent.slug}
                    href={`/agent/${agent.slug}/`}
                    className="block"
                  >
                    <div className="bg-surface border border-border rounded-2xl p-5 sm:p-6 card-hover flex items-start sm:items-center gap-4 flex-col sm:flex-row">
                      <div className="flex-shrink-0 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-surface-alt border border-border flex items-center justify-center">
                          <span className="text-lg font-bold text-primary">
                            {agent.name.charAt(0)}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-bold text-text-primary">
                            {agent.name}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                            {agent.specialty}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary line-clamp-2">
                          {agent.tagline}
                        </p>
                      </div>

                      <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-xs text-text-muted">AI求人数</p>
                          <p className="text-sm font-bold text-primary">
                            {agent.aiJobCount.toLocaleString()}件+
                          </p>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-text-muted"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* FAQ Section */}
          {guide.faqs && guide.faqs.length > 0 && (
            <section aria-labelledby="faq-heading">
              <h2
                id="faq-heading"
                className="text-xl sm:text-2xl font-bold text-text-primary mb-6 flex items-center gap-2"
              >
                <span className="w-1 h-7 rounded-full gradient-bg inline-block" />
                <span className="gradient-text">よくある質問</span>
              </h2>

              <div className="space-y-4">
                {guide.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-surface border border-border rounded-2xl overflow-hidden"
                  >
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-7 h-7 rounded-lg gradient-bg flex items-center justify-center text-white text-xs font-bold">
                          Q
                        </span>
                        <p className="font-semibold text-text-primary text-sm sm:text-base">
                          {faq.q}
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-border bg-surface-alt px-5 sm:px-6 py-4 sm:py-5">
                      <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
                          A
                        </span>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="rounded-2xl overflow-hidden gradient-bg p-8 sm:p-10 text-center text-white">
            <p className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-2">
              転職エージェントを比較する
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              あなたに最適なエージェントを見つけよう
            </h2>
            <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-6">
              AI・データサイエンス領域に強い転職エージェントを徹底比較。専門家が厳選した10社のランキングで失敗しない転職を。
            </p>
            <Link
              href="/#ranking"
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-all shadow-lg"
            >
              エージェントランキングを見る
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </section>

          {/* Related Guides */}
          {relatedGuides.length > 0 && (
            <section aria-labelledby="related-heading">
              <h2
                id="related-heading"
                className="text-xl sm:text-2xl font-bold text-text-primary mb-6 flex items-center gap-2"
              >
                <span className="w-1 h-7 rounded-full gradient-bg inline-block" />
                関連キャリアガイド
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {relatedGuides.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/guide/${related.slug}/`}
                    className="block group"
                  >
                    <div className="bg-surface border border-border rounded-2xl p-5 card-hover h-full">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                          ガイド
                        </span>
                        {related.estimatedTime && (
                          <span className="text-xs text-text-muted">
                            {related.estimatedTime}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-text-primary text-sm sm:text-base leading-snug mb-2 group-hover:text-primary transition-colors">
                        {related.shortTitle}
                      </h3>
                      <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                        {related.description}
                      </p>
                      <p className="mt-3 text-xs font-medium text-primary flex items-center gap-1">
                        続きを読む
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
