import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import Breadcrumb from "@/app/components/Breadcrumb";
import comparesData from "@/data/compares.json";
import agentsData from "@/data/agents.json";

type Compare = (typeof comparesData)[number];
type Agent = (typeof agentsData)[number];

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return comparesData.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const compare = comparesData.find((c) => c.slug === slug);
  if (!compare) return {};

  const siteUrl = "https://ai-career-lab.com";
  const pageUrl = `${siteUrl}/compare/${compare.slug}/`;

  return {
    title: `${compare.title} | AIキャリアラボ`,
    description: compare.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: compare.title,
      description: compare.description,
      url: pageUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: compare.title,
      description: compare.description,
    },
  };
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const compare = comparesData.find((c) => c.slug === slug) as Compare | undefined;

  if (!compare) {
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

  const topAgents = agentsData.slice(0, 4) as Agent[];

  return (
    <div className="min-h-screen bg-surface">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="hero-pattern py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <Breadcrumb
              items={[
                { label: "比較", href: "/compare/" },
                { label: compare.title },
              ]}
            />
            <div className="mt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20 mb-4">
                比較記事
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text-primary leading-tight mb-4">
                {compare.title}
              </h1>
              <p className="text-text-secondary text-base leading-relaxed max-w-2xl">
                {compare.description}
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-6">
              <span className="gradient-text">比較表</span>
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="gradient-bg text-white">
                    {compare.tableData.headers.map((h, i) => (
                      <th key={i} className="px-4 py-3 text-left font-bold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compare.tableData.rows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-primary/3"}>
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`px-4 py-3 border-b border-border/50 ${
                            j === 0 ? "font-semibold text-text-primary" : "text-text-secondary"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Winners by Category */}
        <section className="py-12 bg-surface">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-6">
              カテゴリ別<span className="gradient-text">ウィナー</span>
            </h2>
            <div className="space-y-4">
              {compare.winners.map((w, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-5 card-hover">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-black text-sm">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-text-muted">{w.category}</span>
                        <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-bold border border-accent/20">
                          {w.winner}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">{w.reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommendation */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-6">
              あなたへの<span className="gradient-text">おすすめ</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(compare.recommendation).map(([key, value]) => (
                <div key={key} className="bg-surface rounded-2xl border border-border p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-text-primary capitalize">
                      {key === "geekly" ? "Geeklyが向いている方" :
                       key === "levtech" ? "レバテックが向いている方" :
                       key === "specialized" ? "特化型が向いている方" :
                       key === "general" ? "総合型が向いている方" :
                       key === "forJobseeker" ? "求職者へのアドバイス" :
                       key === "watchOut" ? "注意すべき点" :
                       key === "highSupport" ? "高サポートを求める方" :
                       key === "techInterview" ? "技術面接に不安な方" :
                       key === "fullRemote" ? "フルリモートを希望する方" :
                       key === "local" ? "地方からの転職を検討する方" :
                       key}
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 tech-grid">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-surface rounded-3xl p-8 sm:p-12 border border-border shadow-lg glow text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20 mb-4">
                無料・登録2分
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-text-primary mb-3">
                まずは複数エージェントに<span className="gradient-text">無料登録</span>
              </h2>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
                複数のエージェントに並行登録することで、より多くの求人情報と条件比較ができます。
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {topAgents.slice(0, 2).map((agent) => (
                  <a
                    key={agent.slug}
                    href={agent.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white text-sm font-bold shadow-lg hover:opacity-90 transition-all"
                  >
                    {agent.name}に無料登録
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
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
            <p className="text-sm text-text-muted mb-8">Q&A</p>
            <div className="space-y-4">
              {compare.faqs.map((faq, i) => (
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

        {/* Related compares */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-black text-text-primary mb-6">関連する比較記事</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {comparesData
                .filter((c) => c.slug !== slug)
                .slice(0, 4)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/compare/${c.slug}/`}
                    className="block p-4 bg-surface rounded-xl border border-border card-hover"
                  >
                    <p className="text-xs text-primary font-semibold mb-1">比較</p>
                    <p className="text-sm font-bold text-text-primary leading-snug">{c.title}</p>
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
