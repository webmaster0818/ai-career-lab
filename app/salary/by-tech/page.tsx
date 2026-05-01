import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import Breadcrumb from "@/app/components/Breadcrumb";
import techstacks from "@/data/techstacks.json";
import agents from "@/data/agents.json";

export const metadata: Metadata = {
  title: "技術スタック別 年収比較2026【AI・ML】 | AIキャリアラボ",
  description:
    "Python・PyTorch・LLM/RAG・AWSなどAI技術スタック別の年収を2026年最新データで比較。どの技術を習得すれば年収が最大化するか、ロードマップとともに解説。",
};

const sortedTech = [...techstacks].sort((a, b) => b.avgSalary - a.avgSalary);
const maxSalary = sortedTech[0].avgSalary;

const techCombinations = [
  {
    combo: "Python + LLM/RAG",
    premium: "+250万円",
    badge: "最高プレミアム",
    badgeColor: "bg-secondary/10 text-secondary",
    desc: "最も需要が急増している組み合わせ。LangChain・RAGパイプライン構築の実務経験があれば、平均950万円超も狙える。",
    avgSalary: 950,
  },
  {
    combo: "PyTorch + LLM",
    premium: "+200万円",
    badge: "高プレミアム",
    badgeColor: "bg-primary/10 text-primary",
    desc: "LLMのファインチューニング（LoRA/QLoRA）ができるエンジニアは引く手あまた。研究職・スタートアップで特に評価が高い。",
    avgSalary: 900,
  },
  {
    combo: "Python + AWS/GCP + MLOps",
    premium: "+180万円",
    badge: "高プレミアム",
    badgeColor: "bg-primary/10 text-primary",
    desc: "クラウドMLパイプラインをエンドツーエンドで構築できる人材は不足している。認定資格があればさらに有利。",
    avgSalary: 880,
  },
  {
    combo: "Python + PyTorch",
    premium: "+120万円",
    badge: "標準プレミアム",
    badgeColor: "bg-accent/10 text-accent-dark",
    desc: "深層学習の実装力の基本セット。CNNや自然言語処理の実装経験があれば、MLエンジニア・AIエンジニアとして転職可能。",
    avgSalary: 820,
  },
  {
    combo: "Python + scikit-learn + SQL",
    premium: "+80万円",
    badge: "入門セット",
    badgeColor: "bg-green-100 text-green-700",
    desc: "データアナリスト・ジュニアDSのスタートラインとなるセット。3〜6ヶ月で習得可能で、転職市場でのベースになる。",
    avgSalary: 680,
  },
];

const learningRoadmap = [
  {
    step: 1,
    tech: "Python基礎",
    duration: "1〜2ヶ月",
    salaryTarget: "入門",
    color: "var(--accent)",
    desc: "変数・関数・クラス・データ構造。全てのAI系キャリアの出発点。",
  },
  {
    step: 2,
    tech: "Python + scikit-learn + SQL",
    duration: "+2〜3ヶ月",
    salaryTarget: "600〜700万円",
    color: "var(--gradient-start)",
    desc: "データアナリスト・ジュニアDSとして転職できるレベル。",
  },
  {
    step: 3,
    tech: "+ PyTorch / TensorFlow",
    duration: "+3〜4ヶ月",
    salaryTarget: "700〜850万円",
    color: "var(--gradient-mid)",
    desc: "MLエンジニア・AIエンジニアの実装力。深層学習モデルを設計・学習できる。",
  },
  {
    step: 4,
    tech: "+ AWS/GCP ML Services",
    duration: "+2〜3ヶ月",
    salaryTarget: "800〜950万円",
    color: "var(--secondary)",
    desc: "クラウドML基盤でモデルを本番化・運用できるMLエンジニアへ。",
  },
  {
    step: 5,
    tech: "+ LLM / RAG / LangChain",
    duration: "+2〜3ヶ月",
    salaryTarget: "900〜1,500万円+",
    color: "#7C3AED",
    desc: "現在最も年収プレミアムが高いスキル。LLMアプリ・RAGシステムを構築できる希少人材に。",
  },
];

const faqs = [
  {
    q: "どの技術スタックが最も年収が高い？",
    a: "2026年現在、LLM/RAG/LangChainが平均年収900万円と最高水準です。需要の急増に対して供給が極端に不足しており、年収プレミアムが発生しています。次いでPyTorch/TensorFlow（820万円）、AWS/GCP ML（780万円）の順です。",
  },
  {
    q: "Pythonだけでも転職できる？",
    a: "Python + SQL + scikit-learn があれば、データアナリスト・ジュニアデータサイエンティストとしての転職は可能です。ただし、より高い年収を目指すならPyTorchやLLM関連の知識を追加することを強くおすすめします。",
  },
  {
    q: "LLMエンジニアになるには何から始めるべき？",
    a: "まずPython基礎（1〜2ヶ月）→ OpenAI/Claude APIの利用（2〜4週間）→ LangChain・RAGの構築（1〜2ヶ月）というルートが最短です。Web開発経験がある方は特に習得が早いです。GeeklyやSymbiroseがLLMエンジニア向けの求人を多数保有しています。",
  },
  {
    q: "AWS・GCPの認定資格は取るべき？",
    a: "取得すれば有利になります。AWS ML Specialty・GCP Professional ML Engineer取得者には50〜100万円の年収プレミアムが付くケースが増えています。書類選考通過率も上がる傾向があります。ただし資格より実務経験・ポートフォリオの方が重視されることも多いため、実装経験と並行して取得するのがベストです。",
  },
  {
    q: "技術スタック別の転職に強いエージェントは？",
    a: "LLM/生成AI系はGeekly・Symbiorise、深層学習系はGeekly・レバテックキャリア、クラウドML系はウィルオブテック・レバテックキャリア、入門（Python/scikit-learn）はレバテックキャリア・マイナビITエージェントが強みを持っています。",
  },
  {
    q: "技術スタックの習得に独学とスクールどちらが良い？",
    a: "時間があるなら独学（Kaggle Learn・fast.ai・Udemy）が費用対効果が高いです。ただし学習の方向性に迷いやすく、ポートフォリオ作成のフィードバックが得にくい面があります。3〜6ヶ月で集中的に転職を目指す場合は、AI特化スクール（受講後エージェント紹介がある場合も）が効果的な場合もあります。",
  },
];

const agentMap = Object.fromEntries(agents.map((a) => [a.slug, a]));

export default function SalaryByTechPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "年収データ", href: "/salary/ranking/" },
              { label: "技術スタック別" },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="hero-pattern py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary text-xs font-semibold px-4 py-2 rounded-full mb-5">
              <span>⚡</span>
              <span>2026年最新データ</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary mb-5">
              <span className="gradient-text">技術スタック別</span>
              <br className="sm:hidden" />
              年収比較2026
            </h1>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto mb-8">
              Python・PyTorch・LLM・AWSなど、AI・ML技術別の平均年収を徹底比較。
              どの技術を習得すれば年収が最大化するか、キャリアロードマップとともに解説します。
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                LLM平均年収 <strong className="text-text-primary">900万円</strong>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Python平均年収 <strong className="text-text-primary">680万円</strong>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                最高年収帯 <strong className="text-text-primary">1,800万円+</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Comparison Cards */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-2">
              技術スタック別 年収比較
            </h2>
            <p className="text-text-secondary text-sm mb-8">
              平均年収の高い順。各技術の求人数・需要トレンドも合わせて確認してください。
            </p>
            <div className="space-y-5">
              {sortedTech.map((tech, i) => {
                const barPct = Math.round((tech.avgSalary / maxSalary) * 100);
                const rankLabel = ["🥇 1位", "🥈 2位", "🥉 3位", "4位", "5位"][i];
                return (
                  <div
                    key={tech.slug}
                    className="bg-surface border border-border rounded-2xl p-5 md:p-6 card-hover"
                  >
                    <div className="flex flex-col lg:flex-row gap-5">
                      {/* Left: Rank + Tech Info */}
                      <div className="flex items-start gap-4 lg:w-72 shrink-0">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                          style={{ backgroundColor: tech.color }}
                        >
                          {tech.icon}
                        </div>
                        <div>
                          <p className="text-xs text-text-muted mb-0.5">{rankLabel}</p>
                          <Link
                            href={`/tech/${tech.slug}/`}
                            className="font-bold text-text-primary hover:text-primary transition-colors"
                          >
                            {tech.title}
                          </Link>
                          <p className="text-xs text-text-muted mt-0.5">{tech.subtitle}</p>
                        </div>
                      </div>

                      {/* Center: Salary + Bar */}
                      <div className="flex-1">
                        <div className="flex items-end gap-2 mb-2">
                          <span className="text-3xl font-extrabold gradient-text">
                            {tech.avgSalary}
                          </span>
                          <span className="text-text-secondary text-sm mb-1">万円</span>
                          <span className="text-xs text-text-muted mb-1">平均年収</span>
                          <span className="ml-auto text-xs text-text-muted">{tech.salaryRange}</span>
                        </div>
                        {/* Visual bar */}
                        <div className="w-full bg-surface-alt rounded-full h-3 overflow-hidden mb-3">
                          <div
                            className="h-3 rounded-full transition-all duration-700"
                            style={{
                              width: `${barPct}%`,
                              backgroundColor: tech.color,
                            }}
                          />
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                          {tech.marketOverview}
                        </p>
                      </div>

                      {/* Right: Badges */}
                      <div className="flex flex-col gap-2 lg:w-40 shrink-0">
                        <div className="bg-surface-alt rounded-xl px-3 py-2 text-center">
                          <p className="text-xs text-text-muted">求人数</p>
                          <p className="font-bold text-text-primary">{tech.jobCount}</p>
                        </div>
                        <div className="bg-surface-alt rounded-xl px-3 py-2 text-center">
                          <p className="text-xs text-text-muted">需要トレンド</p>
                          <p className="font-semibold text-primary text-xs">{tech.demandTrend}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Visual Chart (CSS bars) */}
        <section className="py-12 bg-surface-alt">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-2">
              平均年収 ビジュアル比較
            </h2>
            <p className="text-text-secondary text-sm mb-8">
              技術スタックごとの年収を横棒グラフで比較。
            </p>
            <div className="bg-surface rounded-2xl border border-border p-6 md:p-8">
              <div className="space-y-5">
                {sortedTech.map((tech) => {
                  const pct = Math.round((tech.avgSalary / maxSalary) * 100);
                  return (
                    <div key={tech.slug} className="flex items-center gap-3">
                      <div className="w-36 shrink-0 text-right">
                        <span className="text-sm font-semibold text-text-primary">
                          {tech.title.split(" /")[0]}
                        </span>
                      </div>
                      <div className="flex-1 bg-surface-alt rounded-full h-8 overflow-hidden relative">
                        <div
                          className="h-8 rounded-full flex items-center justify-end pr-3 transition-all duration-700"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: tech.color,
                          }}
                        >
                          <span className="text-white text-xs font-bold whitespace-nowrap">
                            {tech.avgSalary}万円
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-text-muted mt-5 text-right">
                ※ 平均年収（中央値）をもとにした参考値
              </p>
            </div>
          </div>
        </section>

        {/* Tech Combinations */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-2">
              技術の組み合わせによる年収プレミアム
            </h2>
            <p className="text-text-secondary text-sm mb-8">
              単一スキルより組み合わせの方が年収は跳ね上がります。最も稼げる組み合わせはこちら。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {techCombinations.map((combo) => (
                <div
                  key={combo.combo}
                  className="bg-surface border border-border rounded-2xl p-5 card-hover"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-text-primary">{combo.combo}</h3>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full shrink-0 ml-2 ${combo.badgeColor}`}
                    >
                      {combo.badge}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-2xl font-extrabold gradient-text">
                      {combo.avgSalary}
                    </span>
                    <span className="text-sm text-text-secondary">万円</span>
                    <span className="ml-2 text-sm font-bold text-green-600">{combo.premium}</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{combo.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Roadmap */}
        <section className="py-12 bg-surface-alt">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-2">
              年収最大化のための技術習得ロードマップ
            </h2>
            <p className="text-text-secondary text-sm mb-8">
              ステップごとに習得することで、段階的に年収が上がっていく学習計画。
            </p>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border hidden sm:block" />
              <div className="space-y-5">
                {learningRoadmap.map((step, i) => (
                  <div key={i} className="flex gap-5">
                    {/* Step circle */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 z-10"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.step}
                    </div>
                    <div className="flex-1 bg-surface border border-border rounded-2xl p-4 md:p-5">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold text-text-primary">{step.tech}</h3>
                        <span className="text-xs text-text-muted">（目安: {step.duration}）</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: step.color }}>
                          目標年収: {step.salaryTarget}
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

        {/* Recommended Agents per Tech */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-2">
              技術スタック別 おすすめエージェント
            </h2>
            <p className="text-text-secondary text-sm mb-8">
              各技術スタックに強みを持つエージェントを紹介します。
            </p>
            <div className="space-y-6">
              {sortedTech.map((tech) => {
                const recAgents = tech.recommendedAgents
                  .map((slug) => agentMap[slug])
                  .filter(Boolean);
                return (
                  <div key={tech.slug} className="bg-surface border border-border rounded-2xl p-5 md:p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0"
                        style={{ backgroundColor: tech.color }}
                      >
                        {tech.icon}
                      </div>
                      <h3 className="font-bold text-text-primary">{tech.title}</h3>
                      <span className="ml-auto text-xs text-text-muted">平均 {tech.avgSalary}万円</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {recAgents.map((agent) => (
                        <Link
                          key={agent.slug}
                          href={`/agent/${agent.slug}/`}
                          className="flex items-center gap-2 p-3 bg-surface-alt rounded-xl hover:bg-primary/5 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-xs shrink-0">
                            {agent.name.substring(0, 2)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-text-primary text-sm truncate">
                              {agent.name}
                            </p>
                            <p className="text-xs text-green-600">+{agent.avgSalaryUp}万円UP</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-surface-alt">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center">
              よくある質問
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-surface border border-border rounded-2xl p-5 md:p-6"
                >
                  <p className="font-bold text-text-primary mb-2 flex items-start gap-2">
                    <span className="text-primary font-extrabold shrink-0">Q.</span>
                    {faq.q}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed pl-6">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-bold text-text-primary mb-4">関連ページ</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/salary/ranking/"
                className="inline-flex items-center gap-1 bg-surface border border-border rounded-xl px-4 py-2 text-sm text-text-secondary hover:text-primary hover:border-primary transition-colors"
              >
                職種別 年収ランキング →
              </Link>
              {sortedTech.map((tech) => (
                <Link
                  key={tech.slug}
                  href={`/tech/${tech.slug}/`}
                  className="inline-flex items-center gap-1 bg-surface border border-border rounded-xl px-4 py-2 text-sm text-text-secondary hover:text-primary hover:border-primary transition-colors"
                >
                  {tech.title} ガイド →
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 関連コンテンツ */}
        <section className="py-12 bg-surface" id="related">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-text-primary mb-2">
              <span className="gradient-text">関連コンテンツ</span>
            </h2>
            <p className="text-sm text-text-muted mb-6">あわせて読みたいページ</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/job/ai-engineer/", label: "AIエンジニアの仕事内容・年収・求人", category: "職種ガイド" },
                { href: "/job/ml-engineer/", label: "機械学習エンジニアの仕事内容・年収", category: "職種ガイド" },
                { href: "/job/data-scientist/", label: "データサイエンティストの仕事内容・年収", category: "職種ガイド" },
                { href: "/job/mlops-engineer/", label: "MLOpsエンジニアの仕事内容・年収", category: "職種ガイド" },
                { href: "/agent/levtech-career/", label: "レバテックキャリアのAI求人・評判", category: "エージェント" },
                { href: "/agent/geekly/", label: "GeeklyのAI求人・特徴・評判", category: "エージェント" },
                { href: "/guide/roadmap/", label: "AIエンジニアになるためのロードマップ", category: "ガイド" },
                { href: "/guide/qualifications/", label: "AI転職で役立つ資格・スキル完全ガイド", category: "ガイド" },
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

        {/* CTA */}
        <section className="py-12 gradient-bg">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              学んだ技術を年収に変えよう
            </h2>
            <p className="text-white/80 mb-8">
              技術スタックを習得したら、次は転職エージェントで市場価値を確かめるステップ。
              <br />
              AI特化エージェントなら、あなたのスキルに見合った求人を紹介してもらえます。
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/agent/geekly/"
                className="inline-flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all"
              >
                Geeklyで相談する（無料）
              </Link>
              <Link
                href="/agent/symbiorise/"
                className="inline-flex items-center gap-2 bg-white/20 border border-white/40 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/30 transition-all"
              >
                Symbiroseに登録する
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
