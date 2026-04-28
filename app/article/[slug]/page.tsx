import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import Breadcrumb from "@/app/components/Breadcrumb";
import articlesData from "@/data/articles.json";
import agentsData from "@/data/agents.json";

type Article = (typeof articlesData)[number];
type Agent = (typeof agentsData)[number];

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return articlesData.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articlesData.find((a) => a.slug === slug);
  if (!article) return {};

  const siteUrl = "https://ai-career-lab.com";
  const pageUrl = `${siteUrl}/article/${article.slug}/`;

  return {
    title: `${article.title} | AIキャリアラボ`,
    description: article.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: article.title,
      description: article.description,
      url: pageUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articlesData.find((a) => a.slug === slug) as Article | undefined;

  if (!article) {
    return (
      <>
        <SiteHeader />
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-text-secondary">記事が見つかりませんでした。</p>
        </main>
        <SiteFooter />
      </>
    );
  }

  const recommendedAgents = agentsData.filter((a) =>
    article.recommendedAgents.includes(a.slug)
  ) as Agent[];

  const relatedArticles = articlesData
    .filter((a) => a.slug !== slug)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-surface">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="hero-pattern py-12 sm:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <Breadcrumb
              items={[
                { label: "コラム", href: "/article/" },
                { label: article.title },
              ]}
            />
            <div className="mt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold border border-accent/20 mb-4">
                コラム
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text-primary leading-tight mb-4">
                {article.title}
              </h1>
              <p className="text-text-secondary text-base leading-relaxed max-w-2xl">
                {article.description}
              </p>
            </div>
          </div>
        </section>

        {/* Main content with sidebar layout */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Table of Contents */}
              <div className="bg-white rounded-2xl border border-border p-5 mb-8">
                <h2 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h8" />
                  </svg>
                  目次
                </h2>
                <ol className="space-y-2">
                  {article.sections.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="flex-shrink-0 text-primary font-bold">{i + 1}.</span>
                      <a href={`#section-${i}`} className="text-primary hover:underline leading-snug">
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Content Sections */}
              {article.sections.map((section, i) => (
                <section key={i} id={`section-${i}`} className="mb-10">
                  <h2 className="text-xl sm:text-2xl font-black text-text-primary mb-5 pb-3 border-b-2 border-primary/20">
                    {section.heading}
                  </h2>
                  <div className="text-text-secondary leading-relaxed space-y-3">
                    {section.content.split("\n").map((line, j) => {
                      if (line.startsWith("【") && line.endsWith("】")) {
                        return (
                          <h3 key={j} className="text-base font-bold text-text-primary mt-5 mb-2 bg-primary/5 px-3 py-2 rounded-lg border-l-4 border-primary">
                            {line}
                          </h3>
                        );
                      }
                      if (line.startsWith("✅")) {
                        return (
                          <p key={j} className="flex items-start gap-2 text-sm">
                            <span className="flex-shrink-0 text-green-500 mt-0.5">✅</span>
                            <span>{line.slice(1)}</span>
                          </p>
                        );
                      }
                      if (line.startsWith("・")) {
                        return (
                          <p key={j} className="flex items-start gap-2 text-sm pl-2">
                            <span className="flex-shrink-0 text-primary mt-1.5">•</span>
                            <span>{line.slice(1)}</span>
                          </p>
                        );
                      }
                      if (line.trim() === "") return <div key={j} className="h-2" />;
                      return <p key={j} className="text-sm">{line}</p>;
                    })}
                  </div>
                </section>
              ))}

              {/* Key Takeaways */}
              <div className="bg-primary/5 rounded-2xl border border-primary/10 p-6 mb-8">
                <h2 className="text-lg font-black text-text-primary mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  この記事のまとめ
                </h2>
                <ul className="space-y-2">
                  {article.keyTakeaways.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-black mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-text-primary font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQ */}
              <div className="mb-8">
                <h2 className="text-2xl font-black text-text-primary mb-2">
                  よくある<span className="gradient-text">質問</span>
                </h2>
                <p className="text-sm text-text-muted mb-6">Q&A</p>
                <div className="space-y-4">
                  {article.faqs.map((faq, i) => (
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
            </div>

            {/* Sidebar */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Agent recommendations */}
                <div className="bg-white rounded-2xl border border-border p-5">
                  <h3 className="font-black text-text-primary mb-4 text-sm">おすすめエージェント</h3>
                  <div className="space-y-3">
                    {recommendedAgents.map((agent) => (
                      <div key={agent.slug} className="border border-border rounded-xl p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-sm text-text-primary">{agent.name}</span>
                          <span className="text-xs text-accent font-semibold">{agent.avgSalaryUp}万円UP</span>
                        </div>
                        <p className="text-xs text-text-muted mb-2">AI求人 {agent.aiJobCount.toLocaleString()}件</p>
                        <a
                          href={agent.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="block w-full text-center py-2 px-3 rounded-lg gradient-bg text-white text-xs font-bold hover:opacity-90 transition-opacity"
                        >
                          無料で相談する
                        </a>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-text-muted mt-3">※ PRを含みます</p>
                </div>

                {/* Related articles */}
                <div className="bg-white rounded-2xl border border-border p-5">
                  <h3 className="font-black text-text-primary mb-4 text-sm">関連記事</h3>
                  <div className="space-y-3">
                    {relatedArticles.map((a) => (
                      <Link
                        key={a.slug}
                        href={`/article/${a.slug}/`}
                        className="block text-xs text-primary hover:underline leading-snug font-medium"
                      >
                        {a.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

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
                AI転職エージェントへの登録は無料。あなたのスキルと希望に合った求人を紹介してもらえます。
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
