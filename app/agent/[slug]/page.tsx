import type { Metadata } from "next";
import Link from "next/link";
import agentsData from "@/data/agents.json";
import jobsData from "@/data/jobs.json";
import techstacksData from "@/data/techstacks.json";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import Breadcrumb from "@/app/components/Breadcrumb";

type Agent = {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  specialty: string;
  features: string[];
  pros: string[];
  cons: string[];
  aiJobCount: number;
  avgSalaryUp: number;
  officialUrl: string;
};

const agents: Agent[] = agentsData as Agent[];

function getAgent(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}

// ---------- FAQ generation ----------

type FAQ = { q: string; a: string };

function generateFAQs(agent: Agent): FAQ[] {
  const name = agent.name;

  // Shared FAQ templates, customised per agent characteristics
  const faqs: FAQ[] = [];

  // Q1 — recommended user type
  if (agent.specialty.includes("未経験") || agent.aiJobCount <= 500) {
    faqs.push({
      q: `${name}はどんな人に向いていますか？`,
      a: `${name}は${agent.specialty}に特化しており、${agent.tagline.replace(/。$/, "")}。特に未経験からAI・IT業界へのキャリアチェンジを目指す方や、専門的なサポートを求める方におすすめです。`,
    });
  } else if (agent.avgSalaryUp >= 100 || agent.specialty.includes("ハイクラス")) {
    faqs.push({
      q: `${name}はどんな人に向いていますか？`,
      a: `${name}は年収アップを強く意識しているエンジニアに最適です。平均年収UP ${agent.avgSalaryUp}万円の実績があり、特に${agent.specialty}を求める方に向いています。`,
    });
  } else {
    faqs.push({
      q: `${name}はどんな人に向いていますか？`,
      a: `${name}は${agent.specialty}を強みとしており、AI・エンジニア系の転職を検討している幅広い方に向いています。AI関連求人を${agent.aiJobCount.toLocaleString()}件以上保有しているため、選択肢が豊富です。`,
    });
  }

  // Q2 — job count / matching
  faqs.push({
    q: `${name}のAI関連求人数はどのくらいですか？`,
    a: `${name}は現在AI・機械学習・データサイエンス関連の求人を約${agent.aiJobCount.toLocaleString()}件保有しています（編集部調査）。求人の内訳はAIエンジニア、機械学習エンジニア、データサイエンティスト、プロンプトエンジニアなど多岐にわたります。登録後に非公開求人を含めた全件を確認できます。`,
  });

  // Q3 — salary or registration
  if (agent.avgSalaryUp >= 70) {
    faqs.push({
      q: `${name}を使うと年収はどのくらい上がりますか？`,
      a: `${name}の公式データによると、転職成功者の平均年収UP額は約${agent.avgSalaryUp}万円です。ただし年収UPの幅は現職の状況・スキル・希望職種によって異なります。無料登録後にキャリアアドバイザーへ相談することで、より具体的な目安を把握できます。`,
    });
  } else {
    faqs.push({
      q: `${name}への登録方法と流れを教えてください。`,
      a: `${name}への登録は公式サイトから無料で行えます。①基本情報・経歴の入力（約5分）→ ②担当アドバイザーとの面談（オンライン可）→ ③求人提案・書類準備→ ④面接・内定・入社支援、の流れが一般的です。費用は一切かかりません。`,
    });
  }

  return faqs;
}

// ---------- Related agents ----------

function getRelatedAgents(current: Agent): Agent[] {
  return agents
    .filter((a) => a.slug !== current.slug)
    .sort((a, b) => b.aiJobCount - a.aiJobCount)
    .slice(0, 4);
}

// ---------- Static params ----------

export async function generateStaticParams() {
  return agents.map((agent) => ({ slug: agent.slug }));
}

// ---------- Metadata ----------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) return { title: "エージェント詳細 | AIキャリアラボ" };

  const title = `${agent.name}の評判・口コミ【2026年最新】AIエンジニア転職 | AIキャリアラボ`;
  const description = `${agent.name}（${agent.specialty}）の特徴・メリット・デメリットを徹底解説。AI関連求人${agent.aiJobCount.toLocaleString()}件以上、平均年収UP${agent.avgSalaryUp}万円の実績。${agent.tagline}`;

  return {
    title,
    description,
    keywords: `${agent.name}, ${agent.name} 評判, ${agent.name} 口コミ, AIエンジニア 転職エージェント, ${agent.specialty}`,
    openGraph: {
      title,
      description,
      type: "article",
      locale: "ja_JP",
    },
    alternates: {
      canonical: `/agent/${agent.slug}/`,
    },
  };
}

// ---------- Page ----------

export default async function AgentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = getAgent(slug);

  if (!agent) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-text-secondary">エージェントが見つかりませんでした。</p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const faqs = generateFAQs(agent);
  const related = getRelatedAgents(agent);

  // Structured data — Article + FAQ
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${agent.name}の評判・口コミ【2026年最新】AIエンジニア転職`,
        description: agent.description,
        author: {
          "@type": "Organization",
          name: "AIキャリアラボ編集部",
        },
        publisher: {
          "@type": "Organization",
          name: "AIキャリアラボ",
        },
        datePublished: "2026-01-01",
        dateModified: "2026-04-27",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };

  // こんな人におすすめ — derived from agent data
  const recommendations: string[] = [];
  if (agent.avgSalaryUp >= 80) {
    recommendations.push("年収を大幅にアップさせたいエンジニア");
  }
  if (agent.aiJobCount >= 2000) {
    recommendations.push("多くのAI求人から最適な企業を選びたい方");
  }
  if (agent.specialty.includes("ハイクラス")) {
    recommendations.push("年収600万円以上のハイクラス転職を検討中の方");
  }
  if (agent.specialty.includes("未経験") || agent.name === "JAIC") {
    recommendations.push("未経験からAI・IT業界に挑戦したい方");
  }
  if (agent.specialty.includes("スカウト") || agent.name === "ビズリーチ") {
    recommendations.push("転職活動を受け身で進めたい（スカウト待ち）方");
  }
  if (agent.specialty.includes("2名") || agent.specialty.includes("手厚")) {
    recommendations.push("徹底したサポートを受けながら転職活動したい方");
  }
  if (agent.specialty.includes("AI・データサイエンス")) {
    recommendations.push("AI・データサイエンス領域の専門求人を探している方");
  }
  if (agent.specialty.includes("カジュアル")) {
    recommendations.push("カジュアル面談でじっくり企業を見極めたい方");
  }
  if (recommendations.length < 3) {
    recommendations.push(`${agent.specialty}での転職を希望するエンジニア`);
  }
  const topRecs = recommendations.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFF]">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <SiteHeader />

      <main className="flex-1">
        {/* ===== Breadcrumb ===== */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: "エージェント", href: "/#ranking" },
              { label: agent.name },
            ]}
          />
        </div>

        {/* ===== Hero Section ===== */}
        <section className="hero-pattern pt-6 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Agent badge */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                {agent.specialty}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-surface border border-border text-text-secondary">
                2026年最新
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-black text-text-primary leading-tight mb-3">
              <span className="gradient-text">{agent.name}</span>
              <span className="block text-2xl sm:text-3xl mt-1 text-text-secondary font-bold">
                の評判・口コミ・特徴
              </span>
            </h1>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8 max-w-2xl">
              {agent.tagline}
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-surface rounded-2xl p-5 border border-border shadow-sm text-center card-hover glow">
                <p className="text-xs text-text-muted mb-1 font-medium">AI求人数</p>
                <p className="text-3xl font-black gradient-text">
                  {agent.aiJobCount >= 1000
                    ? `${(agent.aiJobCount / 1000).toFixed(agent.aiJobCount % 1000 === 0 ? 0 : 1)}k`
                    : agent.aiJobCount.toLocaleString()}
                </p>
                <p className="text-xs text-text-muted mt-1">件以上</p>
              </div>
              <div className="bg-surface rounded-2xl p-5 border border-border shadow-sm text-center card-hover glow">
                <p className="text-xs text-text-muted mb-1 font-medium">平均年収UP</p>
                <p className="text-3xl font-black gradient-text">+{agent.avgSalaryUp}</p>
                <p className="text-xs text-text-muted mt-1">万円</p>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-5 border border-primary/20 shadow-sm text-center card-hover flex flex-col items-center justify-center">
                <p className="text-xs text-text-muted mb-2 font-medium">公式サイト</p>
                <a
                  href={agent.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg gradient-bg text-white text-sm font-bold hover:opacity-90 transition-opacity shadow"
                >
                  無料登録する
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Description */}
            <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm">
              <p className="text-text-secondary leading-relaxed">{agent.description}</p>
            </div>
          </div>
        </section>

        {/* ===== 特徴セクション ===== */}
        <section className="py-12 bg-surface" id="features">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              {agent.name}の<span className="gradient-text">特徴</span>
            </h2>
            <p className="text-sm text-text-muted mb-6">編集部が厳選した5つのポイント</p>
            <ul className="space-y-3">
              {agent.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 bg-[#F8FAFF] rounded-xl p-4 border border-border card-hover"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-black">
                    {i + 1}
                  </span>
                  <span className="text-text-primary font-medium leading-relaxed pt-0.5">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ===== メリット・デメリット ===== */}
        <section className="py-12" id="pros-cons">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-6">
              <span className="gradient-text">メリット</span>・デメリット
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Pros */}
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
                  {agent.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-secondary text-sm leading-relaxed">
                      <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Cons */}
              <div className="bg-surface rounded-2xl p-6 border border-rose-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <h3 className="font-black text-lg text-rose-700">デメリット</h3>
                </div>
                <ul className="space-y-3">
                  {agent.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-secondary text-sm leading-relaxed">
                      <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-rose-500" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== こんな人におすすめ ===== */}
        <section className="py-12 bg-surface" id="recommended-for">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              こんな人に<span className="gradient-text">おすすめ</span>
            </h2>
            <p className="text-sm text-text-muted mb-6">{agent.name}が特に力を発揮するケース</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topRecs.map((rec, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 border border-primary/10 card-hover"
                >
                  <span className="flex-shrink-0 w-9 h-9 rounded-full gradient-bg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <span className="text-text-primary font-medium text-sm leading-relaxed">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 他のエージェントとの比較 ===== */}
        <section className="py-12" id="comparison">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              他のエージェントとの<span className="gradient-text">比較</span>
            </h2>
            <p className="text-sm text-text-muted mb-6">AI求人数が多い順にピックアップ</p>
            <div className="space-y-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/agent/${rel.slug}/`}
                  className="flex items-center gap-4 bg-surface rounded-xl p-4 border border-border shadow-sm card-hover group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                    <span className="text-white text-xs font-black">{rel.name.slice(0, 2)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-text-primary group-hover:text-primary transition-colors truncate">
                      {rel.name}
                    </p>
                    <p className="text-xs text-text-muted truncate">{rel.tagline}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs text-text-muted">AI求人</p>
                    <p className="font-black text-primary text-sm">
                      {rel.aiJobCount >= 1000
                        ? `${(rel.aiJobCount / 1000).toFixed(rel.aiJobCount % 1000 === 0 ? 0 : 1)}k`
                        : rel.aiJobCount}
                      件+
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/#ranking"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white transition-all"
              >
                全エージェントを比較する
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-14 tech-grid" id="cta">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-surface rounded-3xl p-8 sm:p-12 border border-border shadow-lg glow text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20 mb-4">
                無料・登録2分
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-text-primary mb-3">
                {agent.name}に<span className="gradient-text">無料登録</span>する
              </h2>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
                {agent.description.slice(0, 60)}…まずは無料登録で求人を確認しましょう。
              </p>
              <a
                href={agent.officialUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl gradient-bg text-white text-base font-black shadow-lg hover:opacity-90 hover:shadow-xl transition-all"
              >
                {agent.name}の公式サイトを見る
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <p className="mt-4 text-xs text-text-muted">
                ※ 本リンクはアフィリエイトリンクを含みます（PR）
              </p>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="py-12 bg-surface" id="faq">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              よくある<span className="gradient-text">質問</span>
            </h2>
            <p className="text-sm text-text-muted mb-8">{agent.name}に関するQ&A</p>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-[#F8FAFF] rounded-2xl border border-border overflow-hidden">
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

        {/* ===== 関連コンテンツ ===== */}
        <section className="py-12 bg-surface" id="related">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              <span className="gradient-text">関連コンテンツ</span>
            </h2>
            <p className="text-sm text-text-muted mb-6">あわせて読みたいページ</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/job/ai-engineer/", label: "AIエンジニアの仕事内容・年収・求人", category: "職種ガイド" },
                { href: "/job/ml-engineer/", label: "機械学習エンジニアの仕事内容・年収", category: "職種ガイド" },
                { href: "/job/data-scientist/", label: "データサイエンティストの仕事内容・年収", category: "職種ガイド" },
                { href: "/ranking/ai-engineer/", label: "AIエンジニア向けエージェントランキング", category: "ランキング" },
                { href: "/ranking/high-class/", label: "ハイクラスAI転職エージェントランキング", category: "ランキング" },
                { href: "/tech/python/", label: "Python習得でAI転職を有利に進める", category: "技術ガイド" },
                { href: "/tech/llm/", label: "LLM・生成AI技術で年収1000万円超を目指す", category: "技術ガイド" },
                { href: "/salary/ranking/", label: "AI・ML職種別 年収ランキング2026", category: "年収情報" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 bg-[#F8FAFF] rounded-xl p-4 border border-border shadow-sm card-hover group"
                >
                  <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold whitespace-nowrap">
                    {item.category}
                  </span>
                  <span className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors leading-snug">
                    {item.label}
                  </span>
                  <svg className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors flex-shrink-0 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Bottom CTA strip ===== */}
        <div className="py-8 gradient-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white font-black text-lg">{agent.name}で転職活動を始めよう</p>
              <p className="text-white/80 text-sm">無料登録で非公開求人も確認できます</p>
            </div>
            <a
              href={agent.officialUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-black text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              無料で登録する
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
