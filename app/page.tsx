import Link from "next/link";
import agents from "@/data/agents.json";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";

const top3 = agents.slice(0, 3);

const jobCategories = [
  {
    title: "AIエンジニア",
    slug: "ai-engineer",
    icon: "🤖",
    desc: "LLM・生成AI・深層学習モデルの���発",
    salary: "600〜1,200万円",
  },
  {
    title: "データサイエンティスト",
    slug: "data-scientist",
    icon: "📊",
    desc: "データ分析・統計モデリング・BI",
    salary: "550〜1,100万円",
  },
  {
    title: "MLエンジニア",
    slug: "ml-engineer",
    icon: "⚙️",
    desc: "機械学習パイプライン構築・モデル実装",
    salary: "600〜1,300万円",
  },
  {
    title: "MLOpsエンジニア",
    slug: "mlops-engineer",
    icon: "🚀",
    desc: "ML基盤構築・モデル運用・CI/CD",
    salary: "650〜1,200万円",
  },
  {
    title: "データアナリスト",
    slug: "data-analyst",
    icon: "📈",
    desc: "データ集計・可視化・意思決定支援",
    salary: "450〜800万円",
  },
];

const techStacks = [
  {
    name: "Python / scikit-learn",
    slug: "python",
    desc: "データ分析・ML基礎",
    recommended: ["レバテックキャリア", "マイナビITエージェント", "doda"],
    color: "#3776AB",
  },
  {
    name: "PyTorch / TensorFlow",
    slug: "pytorch",
    desc: "深層学習・モデル開発",
    recommended: ["Geekly", "レバテックキャリア", "Symbiorise"],
    color: "#EE4C2C",
  },
  {
    name: "LLM / RAG / LangChain",
    slug: "llm",
    desc: "生成AI・LLMアプリ開発",
    recommended: ["Geekly", "Symbiorise", "ウィルオブテック"],
    color: "#8B5CF6",
  },
  {
    name: "AWS / GCP ML Services",
    slug: "aws-ml",
    desc: "クラウドML基盤・MLOps",
    recommended: ["ウィルオブテック", "ビズリーチ", "レバテックキャリア"],
    color: "#FF9900",
  },
];

const salaryData = [
  {
    role: "AIエンジニア",
    avg: 780,
    range: "500〜1,500万円",
    growth: "+15%",
  },
  {
    role: "データサイエンティスト",
    avg: 720,
    range: "450〜1,300万円",
    growth: "+12%",
  },
  {
    role: "MLエンジニア",
    avg: 820,
    range: "550〜1,500万円",
    growth: "+18%",
  },
  {
    role: "MLOpsエンジニア",
    avg: 750,
    range: "500〜1,200万円",
    growth: "+22%",
  },
  {
    role: "プロンプトエンジニア",
    avg: 650,
    range: "400〜1,000万円",
    growth: "+35%",
  },
];

const howToChoose = [
  {
    num: "01",
    title: "AI・ML求人の専門性で選ぶ",
    desc: "AI領域に特化したエージェントは、求人の質・アドバイザーの技術理解が段違い。SymbiroseやGeeklyなど特化型を優先しましょう。",
  },
  {
    num: "02",
    title: "保有求人数と非公開求人をチェック",
    desc: "AI求人は非公開が多いのが特徴。レバテック（3,000件+）やビズリーチ（8,500件+）など、求人数の多さは選択肢の広さに直結します。",
  },
  {
    num: "03",
    title: "年収UP実績で比較する",
    desc: "エージェントによって年収交渉力に大きな差があります。ウィルオブテック（平均100万UP）やGeekly（平均80万UP）など実績データを確認。",
  },
  {
    num: "04",
    title: "自分の技術スタックとの相性",
    desc: "Python/PyTorch/LLMなど、自分の得意技術に強い求人を持つエージェントを選ぶことで、スキルを最大限活かせるポジションに出会えます。",
  },
  {
    num: "05",
    title: "複数エージェントの併用がベスト",
    desc: "特化型1〜2社＋総合型1社の組み合わせが最適。特化型で専門求人を、総合型で幅広い選択肢をカバーしましょう。",
  },
];

const faqs = [
  {
    q: "AIエンジニアに未経験から転職できますか？",
    a: "可能です。Pythonの基礎、機械学習の基本概念、ポートフォリオがあれば未経験でもAI業界への転職は十分に可能です。JAICやマイナビITエージェントは未経験者のサポートに強みがあります。まずはKaggleのコンペやAtCoderなどで実力を証明できるとベターです。",
  },
  {
    q: "データサイエンティストとAIエンジニアの違いは？",
    a: "データサイエンティストはデータ分析・統計モデリング・ビジネス課題の解決がメイン。AIエンジニアは機械学習モデルの実装・デプロイ・システム構築がメインです。最近はLLMの台頭により、両者の境界は曖昧になりつつあります。",
  },
  {
    q: "転職エージェントは何社登録すべきですか？",
    a: "AI・ML領域では2〜3社の併用がおすすめです。特化型エージェント（Geekly、レバテック、Symbirise等）を1〜2社、総合型（doda、リクルートエージェント等）を1社の組み合わせが効率的です。",
  },
  {
    q: "AIエンジニアの平均年収はどのくらいですか？",
    a: "2026年現在、AIエンジニアの平均年収は約780万円です。経験3年以上で800〜1,000万円、リードクラスで1,200〜1,500万円が目安。LLM・生成AI領域は特に需要が高く、さらに高い水準が期待できます。",
  },
  {
    q: "転職活動にはどのくらいの期間がかかりますか？",
    a: "AI・ML領域の転職は平均2〜3ヶ月です。技術試験（コーディングテスト）がある企業が多いため、対策期間も含めると3〜4ヶ月を見込むと安心です。並行して複数社に応募するのが効率的です。",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* ===== Hero ===== */}
        <section className="hero-pattern tech-grid relative overflow-hidden py-20 sm:py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-sm text-primary font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              2026年4月最新版
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6">
              <span className="gradient-text">AIの時代に、</span>
              <br />
              <span className="gradient-text">最高のキャリアを。</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              AIエンジニア・データサイエンティストの転職に本当に強い
              <br className="hidden sm:block" />
              エージェント10社を、求人数・年収UP率・技術スタック別に徹底比較。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a
                href="#ranking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl gradient-bg text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                TOP3ランキングを見る
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
              <a
                href="#tech-stack"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border-2 border-primary/20 text-primary font-bold text-lg hover:border-primary/40 transition-colors"
              >
                技術スタック別で探す
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
              {[
                { num: "10社", label: "厳選比較" },
                { num: "AI職種", label: "専門特化" },
                { num: "年収UP", label: "実績データ掲載" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/80 backdrop-blur border border-border shadow-sm"
                >
                  <span className="text-2xl font-black gradient-text">
                    {badge.num}
                  </span>
                  <span className="text-sm text-text-secondary font-medium">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 職種別ナビ ===== */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-black mb-3">
                AI・データサイエンス
                <span className="gradient-text">職種別ガイド</span>
              </h2>
              <p className="text-text-secondary">
                あなたの目指すポジションに合ったエージェントを見つけましょう
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {jobCategories.map((job) => (
                <Link
                  key={job.title}
                  href={`/job/${job.slug}/`}
                  className="card-hover p-6 rounded-2xl bg-surface-alt border border-border hover:border-primary/30 cursor-pointer block"
                >
                  <div className="text-3xl mb-3">{job.icon}</div>
                  <h3 className="font-bold text-lg mb-1">{job.title}</h3>
                  <p className="text-sm text-text-muted mb-3">{job.desc}</p>
                  <div className="text-sm font-bold text-primary">
                    {job.salary}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Agent TOP3 Ranking ===== */}
        <section id="ranking" className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-black mb-3">
                AI転職エージェント
                <span className="gradient-text">おすすめTOP3</span>
              </h2>
              <p className="text-text-secondary">
                AI・ML求人数、年収UP実績、専門性を総合評価
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {top3.map((agent, i) => {
                const rankColors = [
                  "from-yellow-400 to-amber-500",
                  "from-gray-300 to-gray-400",
                  "from-orange-300 to-orange-400",
                ];
                const rankLabels = ["1st", "2nd", "3rd"];
                return (
                  <div
                    key={agent.id}
                    className={`card-hover relative rounded-2xl bg-white border-2 ${i === 0 ? "border-primary shadow-lg shadow-primary/10" : "border-border"} overflow-hidden`}
                  >
                    {/* Rank Badge */}
                    <div
                      className={`absolute top-4 left-4 w-10 h-10 rounded-full bg-gradient-to-br ${rankColors[i]} flex items-center justify-center text-white font-black text-sm shadow-md`}
                    >
                      {rankLabels[i]}
                    </div>
                    {i === 0 && (
                      <div className="gradient-bg text-white text-center text-xs font-bold py-1.5">
                        総合おすすめNo.1
                      </div>
                    )}
                    <div className="p-6 pt-8">
                      <h3 className="text-xl font-black mb-1 mt-4">
                        {agent.name}
                      </h3>
                      <p className="text-sm text-text-muted mb-4">
                        {agent.tagline}
                      </p>

                      {/* Key Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="bg-primary/5 rounded-xl p-3 text-center">
                          <div className="text-2xl font-black text-primary">
                            {agent.aiJobCount.toLocaleString()}
                            <span className="text-xs font-medium">件+</span>
                          </div>
                          <div className="text-xs text-text-muted mt-0.5">
                            AI求人数
                          </div>
                        </div>
                        <div className="bg-accent/5 rounded-xl p-3 text-center">
                          <div className="text-2xl font-black text-accent-dark">
                            {agent.avgSalaryUp}
                            <span className="text-xs font-medium">万円</span>
                          </div>
                          <div className="text-xs text-text-muted mt-0.5">
                            平均年収UP
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                        {agent.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-5">
                        {agent.features.slice(0, 3).map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2 text-sm"
                          >
                            <svg
                              className="w-4 h-4 text-primary mt-0.5 shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex gap-2">
                        <Link
                          href={`/agent/${agent.slug}/`}
                          className="flex-1 text-center py-3 rounded-xl bg-surface-alt border border-primary/20 text-primary font-bold hover:bg-primary/5 transition-colors"
                        >
                          詳細を見る
                        </Link>
                        <a
                          href={agent.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="flex-1 text-center py-3 rounded-xl gradient-bg text-white font-bold hover:opacity-90 transition-opacity"
                        >
                          公式サイト
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Full Agent List */}
            <div className="mt-16">
              <h3 className="text-xl font-black mb-6 text-center">
                全10社
                <span className="gradient-text">一覧比較表</span>
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-surface-alt">
                      <th className="text-left px-4 py-3 font-bold">順位</th>
                      <th className="text-left px-4 py-3 font-bold">
                        エージェント
                      </th>
                      <th className="text-left px-4 py-3 font-bold">特徴</th>
                      <th className="text-right px-4 py-3 font-bold">
                        AI求人数
                      </th>
                      <th className="text-right px-4 py-3 font-bold">
                        平均年収UP
                      </th>
                      <th className="text-center px-4 py-3 font-bold">
                        公式サイト
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map((agent, i) => (
                      <tr
                        key={agent.id}
                        className={`border-t border-border ${i < 3 ? "bg-primary/[0.02]" : ""}`}
                      >
                        <td className="px-4 py-3 font-black text-primary">
                          {i + 1}
                        </td>
                        <td className="px-4 py-3 font-bold whitespace-nowrap">
                          {agent.name}
                        </td>
                        <td className="px-4 py-3 text-text-secondary">
                          {agent.tagline}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-primary">
                          {agent.aiJobCount.toLocaleString()}件+
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-accent-dark">
                          {agent.avgSalaryUp}万円
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Link
                            href={`/agent/${agent.slug}/`}
                            className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                          >
                            詳細
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 技術スタック別おすすめ ===== */}
        <section id="tech-stack" className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold mb-3">
                競合にない独自コンテンツ
              </div>
              <h2 className="text-2xl sm:text-3xl font-black mb-3">
                <span className="gradient-text">技術スタック別</span>
                おすすめエージェント
              </h2>
              <p className="text-text-secondary">
                あなたの得意技術に強いエージェントを選ぶことで、最適なポジションに出会えます
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {techStacks.map((stack) => (
                <Link
                  href={`/tech/${stack.slug}/`}
                  key={stack.name}
                  className="card-hover rounded-2xl bg-surface-alt border border-border p-6 relative overflow-hidden block"
                >
                  <div
                    className="absolute top-0 left-0 w-1 h-full"
                    style={{ backgroundColor: stack.color }}
                  />
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-mono text-xs font-bold shrink-0"
                      style={{ backgroundColor: stack.color }}
                    >
                      {stack.name.split(" ")[0].slice(0, 3).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{stack.name}</h3>
                      <p className="text-sm text-text-muted mb-3">
                        {stack.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {stack.recommended.map((name) => (
                          <span
                            key={name}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-border text-sm font-medium"
                          >
                            <svg
                              className="w-3.5 h-3.5 text-primary"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 年収データセクション ===== */}
        <section id="salary" className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-black mb-3">
                AI・ML職種の
                <span className="gradient-text">年収データ 2026</span>
              </h2>
              <p className="text-text-secondary">
                各職種の平均年収・年収レンジ・前年比成長率
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {salaryData.map((data) => (
                <div
                  key={data.role}
                  className="card-hover rounded-2xl bg-white border border-border p-5 text-center"
                >
                  <h4 className="font-bold text-sm mb-3">{data.role}</h4>
                  <div className="text-3xl font-black gradient-text mb-1">
                    {data.avg}
                    <span className="text-lg">万円</span>
                  </div>
                  <div className="text-xs text-text-muted mb-2">平均年収</div>
                  <div className="text-sm text-text-secondary mb-1">
                    {data.range}
                  </div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-xs font-bold">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                    前年比{data.growth}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-text-muted text-center mt-6">
              ※ 各転職エージェントの公開データ、経済産業省「IT人材に関する各国比較調査」等を基に編集部が算出（2026年4月時点）
            </p>
          </div>
        </section>

        {/* ===== How to Choose ===== */}
        <section id="how-to-choose" className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-black mb-3">
                AI転職エージェントの
                <span className="gradient-text">選び方 5つのポイント</span>
              </h2>
              <p className="text-text-secondary">
                失敗しないエージェント選びのために押さえるべきポイント
              </p>
            </div>
            <div className="space-y-4 max-w-3xl mx-auto">
              {howToChoose.map((item) => (
                <div
                  key={item.num}
                  className="flex gap-5 p-6 rounded-2xl bg-surface-alt border border-border"
                >
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white font-black text-lg shrink-0">
                    {item.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section id="faq" className="py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-black mb-3">
                <span className="gradient-text">よくある質問</span>
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-2xl bg-white border border-border overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer font-bold text-text-primary hover:text-primary transition-colors list-none">
                    <span className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-black flex items-center justify-center shrink-0">
                        Q
                      </span>
                      {faq.q}
                    </span>
                    <svg
                      className="w-5 h-5 text-text-muted group-open:rotate-180 transition-transform shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 pt-0">
                    <div className="flex gap-3">
                      <span className="w-7 h-7 rounded-lg bg-accent/10 text-accent-dark text-xs font-black flex items-center justify-center shrink-0">
                        A
                      </span>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="gradient-bg rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="tech-grid w-full h-full" />
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-black mb-4">
                  AIキャリアの第一歩を踏み出そう
                </h2>
                <p className="text-white/80 mb-8 max-w-lg mx-auto">
                  まずは特化型エージェント1〜2社に登録して、非公開求人をチェック。
                  あなたの技術スタックを最大限活かせるポジションが見つかります。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="#ranking"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-primary font-bold text-lg hover:bg-white/90 transition-colors"
                  >
                    おすすめTOP3を見る
                  </a>
                  <a
                    href="#tech-stack"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/10 border-2 border-white/30 text-white font-bold text-lg hover:bg-white/20 transition-colors"
                  >
                    技術スタック別で選ぶ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
