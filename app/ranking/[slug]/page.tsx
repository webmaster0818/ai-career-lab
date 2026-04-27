import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import Breadcrumb from "@/app/components/Breadcrumb";
import agentsData from "@/data/agents.json";

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

type RankingConfig = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  targetUser: string;
  agentSlugs: string[];
  selectionCriteria: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
};

const rankingConfigs: RankingConfig[] = [
  {
    slug: "ai-engineer",
    title: "AIエンジニア向けおすすめ転職エージェントランキング",
    subtitle: "AI・機械学習エンジニアが選ぶべきエージェント厳選5社",
    description:
      "AIエンジニア（機械学習・LLM・MLOps）として転職を目指す方向けに、AI求人数・専門性・年収UP実績で厳選した転職エージェントランキングです。2026年最新の求人動向と実績データで5社を比較します。",
    targetUser: "AIエンジニア・機械学習エンジニア・LLMエンジニア・MLOpsエンジニア",
    agentSlugs: ["levtech-career", "geekly", "symbiorise", "willof-tech", "bizreach"],
    selectionCriteria: [
      { title: "AI・ML求人数", desc: "AIエンジニア・機械学習エンジニア向けの求人数が充実しているか" },
      { title: "技術理解の深さ", desc: "アドバイザーがPythonやMLフレームワークなど技術を理解しているか" },
      { title: "年収UP実績", desc: "転職後の平均年収UP額と実績数" },
      { title: "企業とのネットワーク", desc: "AI系スタートアップや大手テック企業との関係性" },
      { title: "サポート品質", desc: "書類添削・面接対策・条件交渉の支援が手厚いか" },
    ],
    faqs: [
      {
        q: "AIエンジニアの転職に特化したエージェントはありますか？",
        a: "Symbiroseが唯一のAI・データサイエンス完全特化エージェントです。AI企業出身のアドバイザーが在籍し、専門性の高い求人紹介が強みです。ただし求人数は限られるため、レバテックキャリアやGeeklyと組み合わせて利用するのがベストです。",
      },
      {
        q: "AIエンジニアの平均年収はどのくらいですか？",
        a: "2026年時点でAIエンジニアの平均年収は680〜900万円程度です。LLM・MLOps特化のエンジニアは1,000万円超も珍しくありません。転職エージェントを通じた転職では平均70〜100万円の年収UPが見込めます。",
      },
      {
        q: "複数のエージェントに登録しても問題ありませんか？",
        a: "まったく問題ありません。むしろ推奨です。エージェントによって保有する非公開求人が異なるため、2〜3社に同時登録して求人の幅を広げることが一般的です。同じ求人への重複応募にならないよう担当者に伝えましょう。",
      },
      {
        q: "未経験でもAIエンジニアへの転職は可能ですか？",
        a: "Webエンジニアやデータアナリストからの転職は現実的です。完全未経験の場合、まずマイナビITエージェントやJAICの支援プログラムを活用することをおすすめします。",
      },
    ],
  },
  {
    slug: "data-scientist",
    title: "データサイエンティスト向けおすすめ転職エージェントランキング",
    subtitle: "データサイエンティスト・データアナリストが選ぶべきエージェント",
    description:
      "データサイエンティスト・データアナリストの転職に強いエージェントを厳選。統計・ML・SQL・BI系の求人数と、データ職種の専門性で評価した5社ランキングです。",
    targetUser: "データサイエンティスト・データアナリスト・ビジネスインテリジェンス担当",
    agentSlugs: ["bizreach", "symbiorise", "levtech-career", "doda", "recruit-agent"],
    selectionCriteria: [
      { title: "DS・DA求人数", desc: "データサイエンティスト・データアナリストの求人数が豊富か" },
      { title: "業種の多様性", desc: "金融・EC・製造・広告など多様な業界のデータ職種があるか" },
      { title: "統計・SQL理解", desc: "アドバイザーがデータ職種の技術を理解しているか" },
      { title: "キャリアパス支援", desc: "DA→DS→ML系へのキャリアアップ支援ができるか" },
      { title: "年収交渉力", desc: "希望年収の交渉・実現サポートの実績" },
    ],
    faqs: [
      {
        q: "データサイエンティストとデータアナリストの転職エージェント選びの違いは？",
        a: "データサイエンティストはAI・ML特化エージェント（Symbiorise・レバテックキャリア）が向いています。データアナリストはdoda・リクルートエージェントのような総合型も有効で、業種の選択肢が広がります。",
      },
      {
        q: "データサイエンティストに転職するために必要なスキルは？",
        a: "Python（Pandas・scikit-learn）・SQL・統計学の基礎が最低限必要です。さらにKaggle実績・GitHubポートフォリオがあれば書類通過率が大幅に上がります。未経験からはデータアナリストを経由してキャリアアップするルートが現実的です。",
      },
      {
        q: "ビズリーチはデータサイエンティストに向いていますか？",
        a: "年収600万円以上のシニアDS職を狙う場合は非常に有効です。企業・ヘッドハンターからのスカウトで、公開されていない高年収ポジションにアクセスできます。ジュニアレベルの場合はレバテックキャリアやマイナビITエージェントの方が求人の幅が広いです。",
      },
      {
        q: "文系・非エンジニアからデータサイエンティストになれますか？",
        a: "可能です。特に金融・マーケティング・コンサルティングのバックグラウンドがある場合、ドメイン知識+データスキルの組み合わせで差別化できます。まずSQL・PythonとTableauを習得し、データアナリストとしてキャリアを始めることをおすすめします。",
      },
    ],
  },
  {
    slug: "inexperienced",
    title: "未経験からAI転職におすすめ転職エージェントランキング",
    subtitle: "異業種・未経験からAI業界へのキャリアチェンジを支援",
    description:
      "AI・IT業界への転職が未経験の方向けにエージェントを厳選。キャリアチェンジ支援・研修プログラム・ポテンシャル採用求人を重視した5社ランキングです。",
    targetUser: "IT未経験者・異業種からのキャリアチェンジ希望者・20代第二新卒",
    agentSlugs: ["jaic", "mynavi-it-agent", "doda", "recruit-agent", "green"],
    selectionCriteria: [
      { title: "未経験・ポテンシャル採用求人数", desc: "未経験からでも応募できる求人が豊富か" },
      { title: "研修・スキルアップ支援", desc: "入社前・入社後の学習支援プログラムがあるか" },
      { title: "キャリアチェンジ実績", desc: "異業種からAI・IT業界への転職支援実績" },
      { title: "20代サポート実績", desc: "若手・第二新卒への転職支援の強さ" },
      { title: "入社後の定着率", desc: "転職後の定着率・満足度の高さ" },
    ],
    faqs: [
      {
        q: "完全未経験からAIエンジニアになれますか？",
        a: "完全未経験から直接AIエンジニアは難しいですが、段階的なキャリアパスが現実的です。まずJAICやマイナビITエージェントで「IT業界入門」→「データアナリスト」→「データサイエンティスト」→「AIエンジニア」のステップを踏むのが王道です。",
      },
      {
        q: "JAICはどんな人に向いていますか？",
        a: "20代前半〜30代前半で、IT・AI業界への転職を目指す未経験者に最適です。無料の研修プログラムと面接会セットの支援で、経験なしでもAI系企業に就職できる可能性があります。ただし年収レンジは300〜450万円のエントリーポジションが中心です。",
      },
      {
        q: "未経験でも年収500万円以上を目指せますか？",
        a: "即時は難しいですが、入社後1〜2年でスキルを積めば現実的です。未経験でも前職での業務知識（金融・医療・製造等）があれば、その知識を活かしてデータアナリストとして400〜550万円でのスタートが可能なケースもあります。",
      },
      {
        q: "未経験転職のために今すぐできることは？",
        a: "今すぐSQL（HackerRankで練習）とPython基礎（Progateか『Pythonでスクラッチ』）を始めましょう。Kaggle Learnの無料コースも効果的です。3ヶ月の学習で「ポテンシャル採用」の対象になれる可能性が大きく上がります。",
      },
    ],
  },
  {
    slug: "high-class",
    title: "年収1000万超ハイクラスAI転職おすすめエージェントランキング",
    subtitle: "年収1,000万円〜2,000万円のAI・データ系ハイクラス求人に強い",
    description:
      "AI・データサイエンス系で年収1,000万円以上を目指すハイクラス転職向けエージェントを厳選。スカウト型・ヘッドハンティング・エグゼクティブ向け求人を重視したランキングです。",
    targetUser: "年収600万円以上のAIエンジニア・DS・MLエンジニア・AI系CxO候補",
    agentSlugs: ["bizreach", "willof-tech", "geekly", "symbiorise", "levtech-career"],
    selectionCriteria: [
      { title: "ハイクラス求人（年収1000万+）の数", desc: "年収1,000万円以上の求人を多数保有しているか" },
      { title: "CxO・リード職の取り扱い", desc: "AIリード・CTOなどエグゼクティブポジションへのアクセス" },
      { title: "スカウト機能の質", desc: "企業・ヘッドハンターからの質の高いスカウトが届くか" },
      { title: "外資・メガベンチャー求人", desc: "GAFAMやメガベンチャーのAI職の取り扱いがあるか" },
      { title: "年収交渉の実績", desc: "現年収から大幅な年収アップを実現した実績" },
    ],
    faqs: [
      {
        q: "AIエンジニアで年収1,000万円を超えるには何が必要ですか？",
        a: "LLM/MLOps特化のハイスキルとリード経験が必要です。具体的には：①5年以上の実務経験、②チームリード・アーキテクチャ設計経験、③LLM・MLOpsなどの先端スキル、④Kaggle実績や論文発表などの客観的な実力証明。ビズリーチへの登録とウィルオブテックへの相談を並行して行うのがおすすめです。",
      },
      {
        q: "ビズリーチとウィルオブテックはどう使い分けますか？",
        a: "ビズリーチは「待ち」のスカウト型で、複数のヘッドハンターから直接アプローチが届きます。ウィルオブテックは「攻め」のエージェント型で、CA+RAの2名体制でハイクラス求人を積極紹介。両方に登録して組み合わせるのが理想的です。",
      },
      {
        q: "年収1,000万円のAI職にはどんな企業がありますか？",
        a: "①GAFAM日本法人（GoogleJapan・Microsoft等）、②国内メガベンチャー（メルカリ・サイバーエージェント・LINE等）、③AIスタートアップ（シリーズB以降）、④大手金融・コンサル（野村・ゴールドマン・アクセンチュア等のデータ部門）が代表的です。",
      },
      {
        q: "現年収600万円からどのくらい年収UPできますか？",
        a: "ハイクラスエージェント経由では、スキルと経験次第で200〜500万円のUPが可能です。ウィルオブテックの公式実績では年収UP率100%（全員が年収UP）、ビズリーチ利用者の平均年収はIT系で900万円超となっています。具体的な年収交渉はエージェントに任せることで、自分での交渉より高い提示を引き出しやすくなります。",
      },
    ],
  },
];

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return rankingConfigs.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = rankingConfigs.find((r) => r.slug === slug);
  if (!config) return {};

  return {
    title: `${config.title}【2026年最新】｜AIキャリアラボ`,
    description: config.description,
    keywords: `AI転職エージェント ランキング, ${config.targetUser}, 転職 おすすめ`,
    openGraph: {
      title: `${config.title}【2026年最新】`,
      description: config.description,
      type: "article",
      locale: "ja_JP",
    },
  };
}

function getRankBadge(rank: number) {
  if (rank === 1)
    return (
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 text-white font-black text-lg shadow-md">
        1
      </span>
    );
  if (rank === 2)
    return (
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 text-white font-black text-lg shadow-md">
        2
      </span>
    );
  if (rank === 3)
    return (
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-600 text-white font-black text-lg shadow-md">
        3
      </span>
    );
  return (
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface-alt border-2 border-border text-text-secondary font-black text-lg">
      {rank}
    </span>
  );
}

export default async function RankingPage({ params }: Props) {
  const { slug } = await params;
  const config = rankingConfigs.find((r) => r.slug === slug);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-muted">ページが見つかりません</p>
      </div>
    );
  }

  const rankedAgents = config.agentSlugs
    .map((s) => agents.find((a) => a.slug === s))
    .filter((a): a is Agent => Boolean(a));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SiteHeader />

      <main className="flex-1 bg-background">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "ランキング", href: "/ranking/ai-engineer/" },
              { label: config.title },
            ]}
          />
        </div>

        {/* ===== HERO ===== */}
        <section className="hero-pattern border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-5">
              <span>2026年最新ランキング</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-text-primary leading-tight mb-4">
              <span className="gradient-text">{config.title}</span>
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed max-w-3xl mb-6">
              {config.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-surface-alt px-3 py-1.5 rounded-full text-text-muted border border-border">
                対象: {config.targetUser}
              </span>
              <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium border border-primary/20">
                厳選5社
              </span>
            </div>
          </div>
        </section>

        {/* ===== RANKING CARDS ===== */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-text-primary mb-3">
                おすすめ転職エージェント <span className="gradient-text">TOP 5</span>
              </h2>
              <p className="text-text-muted">AI求人数・専門性・年収UP実績で厳選</p>
            </div>

            <div className="space-y-5">
              {rankedAgents.map((agent, i) => (
                <div
                  key={agent.slug}
                  className={`bg-white rounded-2xl border shadow-sm overflow-hidden card-hover ${
                    i === 0 ? "border-yellow-300 shadow-yellow-100 shadow-md" : "border-border"
                  }`}
                >
                  {i === 0 && (
                    <div className="gradient-bg text-white text-center text-sm font-bold py-2">
                      編集部イチ推し！ 最もおすすめ
                    </div>
                  )}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      {getRankBadge(i + 1)}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                          <h3 className="text-xl font-black text-text-primary">{agent.name}</h3>
                          <span className="text-xs px-2 py-1 bg-surface-alt rounded-full text-text-muted border border-border">
                            {agent.specialty}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary mb-3">{agent.tagline}</p>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-3 mb-4">
                          <div className="bg-surface-alt rounded-xl px-4 py-2 text-center">
                            <div className="text-lg font-black text-accent">
                              {agent.aiJobCount.toLocaleString()}件+
                            </div>
                            <div className="text-[10px] text-text-muted">AI求人数</div>
                          </div>
                          <div className="bg-surface-alt rounded-xl px-4 py-2 text-center">
                            <div className="text-lg font-black gradient-text">+{agent.avgSalaryUp}万円</div>
                            <div className="text-[10px] text-text-muted">平均年収UP</div>
                          </div>
                        </div>

                        {/* Features */}
                        <ul className="grid sm:grid-cols-2 gap-1 mb-4">
                          {agent.features.slice(0, 4).map((f, fi) => (
                            <li key={fi} className="flex items-start gap-1.5 text-xs text-text-secondary">
                              <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Pros/Cons */}
                        <div className="grid sm:grid-cols-2 gap-3 mb-4">
                          <div className="bg-green-50 rounded-xl p-3 border border-green-100">
                            <p className="text-xs font-bold text-green-700 mb-1.5">おすすめポイント</p>
                            {agent.pros.slice(0, 2).map((p, pi) => (
                              <p key={pi} className="text-[11px] text-green-800">
                                • {p}
                              </p>
                            ))}
                          </div>
                          <div className="bg-red-50 rounded-xl p-3 border border-red-100">
                            <p className="text-xs font-bold text-red-700 mb-1.5">デメリット</p>
                            {agent.cons.slice(0, 2).map((c, ci) => (
                              <p key={ci} className="text-[11px] text-red-800">
                                • {c}
                              </p>
                            ))}
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Link
                            href={`/agent/${agent.slug}/`}
                            className="flex-1 text-center py-2.5 rounded-xl border-2 border-primary text-primary text-sm font-bold hover:bg-primary hover:text-white transition-colors"
                          >
                            詳しく見る
                          </Link>
                          <a
                            href={agent.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center py-2.5 rounded-xl gradient-bg text-white text-sm font-bold hover:opacity-90 transition-opacity"
                          >
                            公式サイトで無料登録 →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== COMPARISON TABLE ===== */}
        <section className="py-12 md:py-16 bg-surface-alt">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-text-primary mb-3">
                エージェント <span className="gradient-text">比較表</span>
              </h2>
              <p className="text-text-muted">5社の主要指標を一覧で比較</p>
            </div>
            <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="gradient-bg text-white">
                      <th className="text-left px-4 py-3 font-bold">エージェント</th>
                      <th className="text-center px-4 py-3 font-bold">AI求人数</th>
                      <th className="text-center px-4 py-3 font-bold">平均年収UP</th>
                      <th className="text-center px-4 py-3 font-bold">特徴</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankedAgents.map((agent, i) => (
                      <tr key={agent.slug} className={i % 2 === 0 ? "bg-white" : "bg-surface-alt"}>
                        <td className="px-4 py-3 font-bold text-text-primary">
                          <span className="inline-flex items-center gap-2">
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white ${
                                i === 0
                                  ? "bg-yellow-400"
                                  : i === 1
                                  ? "bg-gray-400"
                                  : i === 2
                                  ? "bg-amber-600"
                                  : "bg-text-muted"
                              }`}
                            >
                              {i + 1}
                            </span>
                            {agent.name}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center font-black text-accent">
                          {agent.aiJobCount.toLocaleString()}件+
                        </td>
                        <td className="px-4 py-3 text-center font-black gradient-text">
                          +{agent.avgSalaryUp}万円
                        </td>
                        <td className="px-4 py-3 text-center text-xs text-text-secondary">
                          {agent.specialty}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SELECTION CRITERIA ===== */}
        <section className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-text-primary mb-3">
                <span className="gradient-text">選定基準</span>
              </h2>
              <p className="text-text-muted">本ランキングはこの5つの基準で評価しています</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {config.selectionCriteria.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-border shadow-sm card-hover">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-black text-lg mb-3">
                    {i + 1}
                  </div>
                  <h3 className="font-black text-text-primary mb-1.5">{c.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="py-12 md:py-16 bg-surface-alt">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-text-primary mb-3">
                よくある質問
              </h2>
            </div>
            <div className="space-y-4">
              {config.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden group"
                >
                  <summary className="flex items-start justify-between gap-4 p-5 cursor-pointer list-none font-bold text-text-primary hover:bg-surface-alt transition-colors">
                    <span className="flex gap-3">
                      <span className="gradient-text font-black flex-shrink-0">Q{i + 1}.</span>
                      <span>{faq.q}</span>
                    </span>
                    <span className="text-text-muted text-xl flex-shrink-0 group-open:rotate-180 transition-transform">
                      ↓
                    </span>
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

        {/* ===== CTA ===== */}
        <section className="py-14 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl gradient-bg text-white text-center px-8 py-14 glow">
              <div className="absolute inset-0 tech-grid opacity-20" />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-black mb-4">
                  まずは1位の{rankedAgents[0]?.name}に無料相談を
                </h2>
                <p className="text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
                  相談・登録はすべて無料。あなたのキャリア目標に合わせた求人を紹介してもらいましょう。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {rankedAgents[0] && (
                    <a
                      href={rankedAgents[0].officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-xl text-primary font-black hover:bg-white/90 transition-colors shadow-lg"
                    >
                      {rankedAgents[0].name}に無料登録する →
                    </a>
                  )}
                  <Link
                    href="/#ranking"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur rounded-xl text-white font-bold hover:bg-white/30 transition-colors border border-white/30"
                  >
                    全エージェントを比較する
                  </Link>
                </div>
                <p className="text-white/60 text-xs mt-6">
                  ※ 転職エージェントのご利用はすべて無料です（企業から手数料をいただく仕組みです）
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
