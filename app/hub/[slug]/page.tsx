import type { Metadata } from "next";
import Link from "next/link";
import hubsData from "@/data/hubs.json";
import agentsData from "@/data/agents.json";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import Breadcrumb from "@/app/components/Breadcrumb";

type HubLink = { href: string; label: string; category: string };
type HubSection = { heading: string; content: string };
type HubFAQ = { q: string; a: string };

type Hub = {
  slug: string;
  title: string;
  description: string;
  heroKeyword: string;
  heroStat: string;
  heroDescription: string;
  sections: HubSection[];
  links: HubLink[];
  faqs: HubFAQ[];
};

type Agent = (typeof agentsData)[number];

const hubs = hubsData as Hub[];

function getHub(slug: string): Hub | undefined {
  return hubs.find((h) => h.slug === slug);
}

export async function generateStaticParams() {
  return hubs.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hub = getHub(slug);
  if (!hub) return { title: "ハブガイド | AIキャリアラボ" };

  return {
    title: `${hub.title} | AIキャリアラボ`,
    description: hub.description,
    keywords: `${hub.heroKeyword}, AI転職, ${hub.heroKeyword} 年収, ${hub.heroKeyword} 求人`,
    openGraph: {
      title: hub.title,
      description: hub.description,
      type: "article",
      locale: "ja_JP",
    },
    alternates: {
      canonical: `/hub/${hub.slug}/`,
    },
  };
}

export default async function HubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hub = getHub(slug);

  if (!hub) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-text-secondary">ページが見つかりませんでした。</p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  // Pick 2 agent slugs from links for CTA
  const agentLinks = hub.links.filter((l) => l.category === "エージェント").slice(0, 2);
  const ctaAgents: Agent[] = agentLinks
    .map((l) => {
      const slug = l.href.replace("/agent/", "").replace("/", "");
      return agentsData.find((a) => a.slug === slug);
    })
    .filter((a): a is Agent => !!a);

  // Group links by category
  const linksByCategory: Record<string, HubLink[]> = {};
  for (const link of hub.links) {
    if (!linksByCategory[link.category]) linksByCategory[link.category] = [];
    linksByCategory[link.category].push(link);
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: hub.title,
        description: hub.description,
        author: { "@type": "Organization", name: "AIキャリアラボ編集部" },
        publisher: { "@type": "Organization", name: "AIキャリアラボ" },
        datePublished: "2026-01-01",
        dateModified: "2026-04-27",
      },
      {
        "@type": "FAQPage",
        mainEntity: hub.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFF]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <SiteHeader />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: "総合ガイド", href: "/" },
              { label: hub.heroKeyword },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="hero-pattern pt-6 pb-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                完全ガイド
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-surface border border-border text-text-secondary">
                2026年最新
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-text-primary leading-tight mb-4">
              <span className="gradient-text">{hub.title}</span>
            </h1>

            {/* Hero stat */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20 shadow-sm mb-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-black gradient-text">{hub.heroStat}</p>
                  <p className="text-sm text-text-secondary leading-relaxed mt-1">
                    {hub.heroDescription}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm">
              <p className="text-text-secondary leading-relaxed">{hub.description}</p>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-8 bg-surface">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-2xl border border-border p-5">
              <h2 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h8" />
                </svg>
                目次
              </h2>
              <ol className="space-y-2">
                {hub.sections.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="flex-shrink-0 text-primary font-bold">{i + 1}.</span>
                    <a href={`#section-${i}`} className="text-primary hover:underline leading-snug">
                      {s.heading}
                    </a>
                  </li>
                ))}
                <li className="flex items-start gap-2 text-sm">
                  <span className="flex-shrink-0 text-primary font-bold">{hub.sections.length + 1}.</span>
                  <a href="#related-links" className="text-primary hover:underline leading-snug">
                    関連ページ一覧
                  </a>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="flex-shrink-0 text-primary font-bold">{hub.sections.length + 2}.</span>
                  <a href="#faq" className="text-primary hover:underline leading-snug">
                    よくある質問
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        {hub.sections.map((section, i) => (
          <section
            key={i}
            id={`section-${i}`}
            className={`py-12 ${i % 2 === 0 ? "" : "bg-surface"}`}
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl font-black text-text-primary mb-6 pb-3 border-b-2 border-primary/20">
                <span className="inline-flex items-center gap-3">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-black">
                    {i + 1}
                  </span>
                  {section.heading}
                </span>
              </h2>
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                {section.content.split("。").filter(Boolean).map((sentence, j) => (
                  <p key={j} className="text-text-secondary leading-relaxed mb-3 last:mb-0 text-sm">
                    {sentence.trim()}。
                  </p>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Related Links Hub */}
        <section className="py-14 bg-surface" id="related-links">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              <span className="gradient-text">関連ページ一覧</span>
            </h2>
            <p className="text-sm text-text-muted mb-8">
              このテーマに関連する全ページへのリンク（{hub.links.length}件）
            </p>

            {Object.entries(linksByCategory).map(([category, links]) => (
              <div key={category} className="mb-8">
                <h3 className="text-base font-bold text-text-primary mb-3 flex items-center gap-2">
                  <span className="w-2 h-5 rounded-full gradient-bg" />
                  {category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 bg-white rounded-xl p-4 border border-border shadow-sm card-hover group"
                    >
                      <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold whitespace-nowrap">
                        {category}
                      </span>
                      <span className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors leading-snug">
                        {link.label}
                      </span>
                      <svg className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors flex-shrink-0 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Agent CTA */}
        {ctaAgents.length > 0 && (
          <section className="py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl font-black text-text-primary mb-2">
                <span className="gradient-text">おすすめ転職エージェント</span>
              </h2>
              <p className="text-sm text-text-muted mb-6">このテーマの転職に強いエージェント</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ctaAgents.map((agent) => (
                  <div
                    key={agent.slug}
                    className="bg-surface rounded-2xl border border-border p-5 shadow-sm card-hover"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {agent.name.slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-bold text-text-primary">{agent.name}</p>
                        <p className="text-xs text-text-muted">{agent.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <span className="text-text-muted">AI求人 <span className="font-bold text-primary">{agent.aiJobCount.toLocaleString()}件+</span></span>
                      <span className="text-text-muted">平均年収UP <span className="font-bold text-green-600">+{agent.avgSalaryUp}万円</span></span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/agent/${agent.slug}/`}
                        className="flex-1 text-center py-2.5 rounded-xl border-2 border-primary text-primary text-xs font-bold hover:bg-primary hover:text-white transition-colors"
                      >
                        詳細を見る
                      </Link>
                      <a
                        href={agent.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="flex-1 text-center py-2.5 rounded-xl gradient-bg text-white text-xs font-bold hover:opacity-90 transition-opacity"
                      >
                        無料登録する
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-text-muted mt-3">※ PRを含みます</p>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="py-12 bg-surface" id="faq">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              よくある<span className="gradient-text">質問</span>
            </h2>
            <p className="text-sm text-text-muted mb-8">{hub.heroKeyword}に関するQ&A</p>
            <div className="space-y-4">
              {hub.faqs.map((faq, i) => (
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

        {/* Bottom CTA */}
        <section className="py-14 tech-grid">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-surface rounded-3xl p-8 sm:p-12 border border-border shadow-lg glow text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20 mb-4">
                無料・登録2分
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-text-primary mb-3">
                AI転職を<span className="gradient-text">プロに相談</span>しよう
              </h2>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
                AI・ML領域に強い転職エージェントへの登録は無料。あなたのスキルと希望に合った求人を紹介してもらえます。
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
      </main>

      <SiteFooter />
    </div>
  );
}
