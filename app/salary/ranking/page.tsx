import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import Breadcrumb from "@/app/components/Breadcrumb";
import jobs from "@/data/jobs.json";
import agents from "@/data/agents.json";

export const metadata: Metadata = {
  title: "AI・ML職種別 年収ランキング2026【最新版】 | AIキャリアラボ",
  description:
    "AIエンジニア・データサイエンティスト・MLエンジニアなどAI・ML職種の年収ランキング2026年版。平均年収・経験別給与テーブル・一般ITとの比較を詳細解説。",
};

const sortedJobs = [...jobs].sort((a, b) => b.avgSalary - a.avgSalary);

const maxSalary = sortedJobs[0].avgSalary;

const rankIcons = ["🥇", "🥈", "🥉", "4位", "5位"];

const experienceSalaryTable: Record<
  string,
  { y1_3: string; y3_5: string; y5_8: string; y8plus: string }
> = {
  "ai-engineer": {
    y1_3: "400〜600万円",
    y3_5: "600〜900万円",
    y5_8: "800〜1,200万円",
    y8plus: "1,200〜2,000万円",
  },
  "data-scientist": {
    y1_3: "400〜550万円",
    y3_5: "550〜850万円",
    y5_8: "800〜1,100万円",
    y8plus: "1,000〜1,500万円",
  },
  "ml-engineer": {
    y1_3: "450〜650万円",
    y3_5: "650〜1,000万円",
    y5_8: "900〜1,300万円",
    y8plus: "1,200〜2,000万円",
  },
  "mlops-engineer": {
    y1_3: "450〜600万円",
    y3_5: "600〜900万円",
    y5_8: "800〜1,100万円",
    y8plus: "1,000〜1,400万円",
  },
  "data-analyst": {
    y1_3: "350〜450万円",
    y3_5: "450〜650万円",
    y5_8: "600〜800万円",
    y8plus: "700〜1,000万円",
  },
};

const salaryTips = [
  {
    icon: "💡",
    title: "技術スタックのアップグレード",
    desc: "PythonにLLM/RAG知識を追加するだけで平均+100〜150万円のプレミアムが発生。LangChain・OpenAI APIの実務経験が特に評価される。",
  },
  {
    icon: "🏆",
    title: "Kaggleや論文実装でポートフォリオを作る",
    desc: "Kaggleメダルや著名な論文の実装GitHubは書類選考で大きなアドバンテージ。上位20%に入るだけで年収交渉の幅が広がる。",
  },
  {
    icon: "🚀",
    title: "スタートアップ→大手のステップアップ転職",
    desc: "AIスタートアップで実務経験を積んでから大手・外資に転職すると、年収1.5〜2倍になるケースが多い。3〜5年目が最もレバレッジが効く。",
  },
  {
    icon: "📜",
    title: "クラウド認定資格で+50〜100万円",
    desc: "AWS ML Specialty・GCP Professional ML Engineer取得者には年収プレミアムが付くケースが増加。転職時の書類通過率も上がる。",
  },
  {
    icon: "💼",
    title: "ビズリーチでスカウト待ちを活用",
    desc: "年収600万円以上ならビズリーチに登録して企業・ヘッドハンターからのスカウトを待つだけで、提示年収が市場相場より高い場合が多い。",
  },
  {
    icon: "🌏",
    title: "外資系・グローバル企業を狙う",
    desc: "GAFAMの日本法人やグローバルAIスタートアップは、同等スキルでも国内大手の1.5〜2倍の年収を提示するケースが珍しくない。",
  },
];

const faqs = [
  {
    q: "AI・ML職種の平均年収が高い理由は？",
    a: "需要に対して供給が圧倒的に不足しているためです。経済産業省の試算では2030年までにAI人材が約12万人不足するとされており、希少性が高い年収につながっています。特にLLM・生成AI関連のスキルは2024年以降に急速に求められるようになった新しい分野で、経験者が極めて少ない状態です。",
  },
  {
    q: "未経験からAI職種に転職した場合の年収は？",
    a: "未経験からのポテンシャル採用では400〜500万円が相場です。ただし、Kaggleのメダル実績やGitHubのポートフォリオ、個人プロジェクトの質によっては500〜600万円からスタートできるケースもあります。JAICやマイナビITエージェントが未経験転職の支援に強みを持っています。",
  },
  {
    q: "年収1,000万円を超えるにはどうすれば？",
    a: "経験5〜8年以上でシニアポジションに就くか、マネジメント経験を積むのが王道です。MLエンジニア・AIエンジニアでは経験5年以上で900万円超えが現実的。また外資系企業・スタートアップのリードポジションなら経験3〜5年でも1,000万円超のオファーが出ることがあります。",
  },
  {
    q: "データアナリストとMLエンジニアの年収差が大きい理由は？",
    a: "MLエンジニアはソフトウェアエンジニアリングスキル×機械学習スキルという「かけ算」の希少性が年収に反映されています。一方データアナリストはビジネス側の需要は安定していますが、AI特化の希少性はMLエンジニア・AIエンジニアより低いため、年収レンジが低くなります。",
  },
  {
    q: "転職エージェントを使うと年収交渉できる？",
    a: "できます。エージェントは企業の採用予算を把握しており、求職者の代わりに年収交渉を行います。特にレバテックキャリア（平均70万円UP）・Geekly（平均80万円UP）・ウィルオブテック（年収UP率100%）は年収交渉の実績が高いエージェントです。",
  },
];

const agentMap = Object.fromEntries(agents.map((a) => [a.slug, a]));

export default function SalaryRankingPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "年収データ", href: "/salary/ranking/" },
              { label: "職種別ランキング" },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="hero-pattern py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-2 rounded-full mb-5">
              <span>💰</span>
              <span>2026年最新データ</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary mb-5">
              <span className="gradient-text">AI・ML職種</span>の
              <br className="sm:hidden" />
              年収ランキング2026
            </h1>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto mb-8">
              AIエンジニア・データサイエンティスト・MLエンジニアなど、
              AI・ML職種5種の平均年収・給与レンジを徹底比較。
              転職市場の最新データをもとに、年収を最大化するための戦略も解説。
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                AI平均年収 <strong className="text-text-primary">780万円</strong>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                一般IT平均 <strong className="text-text-primary">550万円</strong>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                最高年収帯 <strong className="text-text-primary">2,000万円+</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Banner */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="gradient-bg rounded-2xl p-6 md:p-8 text-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="text-center">
                  <p className="text-white/70 text-sm mb-1">一般ITエンジニア平均</p>
                  <p className="text-3xl font-extrabold">550<span className="text-lg">万円</span></p>
                </div>
                <div className="text-center">
                  <div className="inline-flex flex-col items-center">
                    <span className="text-white/70 text-xs mb-1">AIキャリアで</span>
                    <div className="bg-white/20 rounded-xl px-5 py-3">
                      <span className="text-2xl font-extrabold">+230万円</span>
                      <span className="text-sm ml-1">UP</span>
                    </div>
                    <span className="text-white/70 text-xs mt-1">平均差額</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-white/70 text-sm mb-1">AI職種平均年収</p>
                  <p className="text-3xl font-extrabold">780<span className="text-lg">万円</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ranking Cards */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-2">
              職種別 年収ランキング
            </h2>
            <p className="text-text-secondary text-sm mb-8">
              平均年収の高い順に並べています。各職種の特徴・求人数・成長率もチェック。
            </p>
            <div className="space-y-4">
              {sortedJobs.map((job, i) => {
                const barPct = Math.round((job.avgSalary / maxSalary) * 100);
                return (
                  <div
                    key={job.slug}
                    className="bg-surface border border-border rounded-2xl p-5 md:p-6 card-hover"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Rank + Title */}
                      <div className="flex items-center gap-3 md:w-64 shrink-0">
                        <span className="text-2xl w-10 text-center">{rankIcons[i]}</span>
                        <div>
                          <Link
                            href={`/job/${job.slug}/`}
                            className="font-bold text-text-primary hover:text-primary transition-colors text-base"
                          >
                            {job.title}
                          </Link>
                          <p className="text-xs text-text-muted">{job.titleEn}</p>
                        </div>
                      </div>

                      {/* Salary Info */}
                      <div className="flex-1">
                        <div className="flex items-end gap-2 mb-2">
                          <span className="text-3xl font-extrabold gradient-text">
                            {job.avgSalary}
                          </span>
                          <span className="text-text-secondary text-sm mb-1">万円</span>
                          <span className="text-xs text-text-muted mb-1">平均年収</span>
                          <span className="ml-auto text-xs text-text-muted">{job.salaryRange}</span>
                        </div>
                        {/* Bar Chart */}
                        <div className="w-full bg-surface-alt rounded-full h-3 overflow-hidden">
                          <div
                            className="h-3 rounded-full gradient-bg transition-all duration-700"
                            style={{ width: `${barPct}%` }}
                          />
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 md:w-44 shrink-0">
                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                          成長率 {job.growth}
                        </span>
                        <span className="inline-flex items-center bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                          需要: {job.demand}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Experience-based Salary Table */}
        <section className="py-12 bg-surface-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-2">
              経験年数別 年収テーブル
            </h2>
            <p className="text-text-secondary text-sm mb-8">
              各職種の経験年数ごとのモデル年収。転職のタイミングを計る際の参考に。
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-alt">
                    <th className="text-left px-5 py-4 font-bold text-text-secondary">職種</th>
                    <th className="text-center px-4 py-4 font-bold text-text-secondary">1〜3年目</th>
                    <th className="text-center px-4 py-4 font-bold text-text-secondary">3〜5年目</th>
                    <th className="text-center px-4 py-4 font-bold text-text-secondary">5〜8年目</th>
                    <th className="text-center px-4 py-4 font-bold text-text-secondary">8年目〜</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedJobs.map((job, i) => {
                    const exp = experienceSalaryTable[job.slug];
                    return (
                      <tr
                        key={job.slug}
                        className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-surface-alt/40"}`}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{rankIcons[i]}</span>
                            <span className="font-semibold text-text-primary">{job.title}</span>
                          </div>
                        </td>
                        <td className="text-center px-4 py-4 text-text-secondary">{exp.y1_3}</td>
                        <td className="text-center px-4 py-4 text-text-secondary">{exp.y3_5}</td>
                        <td className="text-center px-4 py-4 font-semibold text-primary">
                          {exp.y5_8}
                        </td>
                        <td className="text-center px-4 py-4 font-bold text-secondary">
                          {exp.y8plus}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-muted mt-3">
              ※ 上記は国内求人データの中央値をもとにした参考値です。企業・地域・個人スキルにより異なります。
            </p>
          </div>
        </section>

        {/* Salary Tips */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-2">
              年収を最大化する6つの戦略
            </h2>
            <p className="text-text-secondary text-sm mb-8">
              AI・ML職種での年収アップに効果的なアクションをまとめました。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {salaryTips.map((tip) => (
                <div
                  key={tip.title}
                  className="bg-surface border border-border rounded-2xl p-5 card-hover"
                >
                  <div className="text-3xl mb-3">{tip.icon}</div>
                  <h3 className="font-bold text-text-primary mb-2">{tip.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top 3 Agents for High Salary */}
        <section className="py-12 bg-surface-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-2">
              高年収転職に強いエージェント
            </h2>
            <p className="text-text-secondary text-sm mb-8">
              年収アップ実績が高い転職エージェントを厳選。登録は無料です。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {["willof-tech", "bizreach", "geekly"].map((slug) => {
                const agent = agentMap[slug];
                if (!agent) return null;
                return (
                  <div
                    key={slug}
                    className="bg-surface border border-border rounded-2xl p-5 card-hover"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {agent.name.substring(0, 2)}
                      </div>
                      <div>
                        <h3 className="font-bold text-text-primary">{agent.name}</h3>
                        <p className="text-xs text-text-muted">{agent.specialty}</p>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary mb-4 leading-relaxed line-clamp-3">
                      {agent.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
                        平均+{agent.avgSalaryUp}万円UP
                      </span>
                      <Link
                        href={`/agent/${slug}/`}
                        className="text-xs text-primary font-semibold hover:underline"
                      >
                        詳しく見る →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
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

        {/* CTA */}
        <section className="py-12 gradient-bg">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              まずは無料相談から始めよう
            </h2>
            <p className="text-white/80 mb-8">
              AI・ML職種で年収アップを目指すなら、IT特化エージェントへの登録が最短ルート。
              <br />
              複数のエージェントに登録して、条件を比較するのがおすすめです。
            </p>
            <Link
              href="/agent/levtech-career/"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:shadow-lg transition-all"
            >
              レバテックキャリアで相談する（無料）
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
