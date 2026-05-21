import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";

export const metadata: Metadata = {
  title: "運営者情報・サイトについて｜AIキャリアラボ",
  description:
    "AIキャリアラボの運営者情報、運営方針、編集ポリシー、お問い合わせ先を掲載しています。",
  alternates: { canonical: "/about" },
};

const SITE_NAME = "AIキャリアラボ";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:underline">トップ</Link>
          <span className="mx-2">&gt;</span>
          <span>運営者情報</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold mb-8">運営者情報・サイトについて</h1>

        <section className="mb-10 prose prose-gray max-w-none text-sm leading-relaxed space-y-4">
          <h2 className="text-xl font-bold mt-2 mb-3">{SITE_NAME} について</h2>
          <p>
            {SITE_NAME} は、株式会社MediaXが運営する比較・情報サイトです。利用者が業者選び・サービス選定で失敗しないよう、独自調査・公式情報・業界データに基づく信頼できるコンテンツを提供することを目的としています。
          </p>
          <p>
            当サイトのコンテンツは、最新の業界動向・公式発表・公的データを参照し、編集部による事実確認(ファクトチェック)を経て公開しています。執筆プロセスにAIツールを活用する場合がありますが、すべての記事は人間の編集者による監督・編集を経た上で公開されます。
          </p>
        </section>

        <section className="mb-10 prose prose-gray max-w-none text-sm leading-relaxed space-y-4">
          <h2 className="text-xl font-bold mt-2 mb-3">運営会社</h2>
          <dl className="grid grid-cols-1 md:grid-cols-[160px,1fr] gap-y-2 border border-gray-200 rounded-lg p-6">
            <dt className="font-semibold">会社名</dt>
            <dd>株式会社MediaX</dd>
            <dt className="font-semibold">所在地</dt>
            <dd>東京都内（詳細はお問い合わせください）</dd>
            <dt className="font-semibold">事業内容</dt>
            <dd>Web メディア運営、比較情報サイトの企画・運営、SEO 関連サービス</dd>
            <dt className="font-semibold">公式サイト</dt>
            <dd>
              <a href="https://mediax.biz" target="_blank" rel="noopener" className="text-blue-600 hover:underline">
                https://mediax.biz
              </a>
            </dd>
          </dl>
        </section>

        <section className="mb-10 prose prose-gray max-w-none text-sm leading-relaxed space-y-4">
          <h2 className="text-xl font-bold mt-2 mb-3">編集方針</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>独自性</strong>：他サイトの転載ではなく、独自の調査・分析・比較に基づき作成しています</li>
            <li><strong>正確性</strong>：公式サイト・公的データを参照し、事実確認を経て公開しています</li>
            <li><strong>中立性</strong>：特定の事業者を不当に優遇することなく、客観的な比較情報を提供します</li>
            <li><strong>透明性</strong>：アフィリエイトリンクの存在を明示し、収益構造を開示しています</li>
            <li><strong>更新性</strong>：法令・サービス内容の変更に応じて、コンテンツを継続的に更新しています</li>
          </ul>
        </section>

        <section className="mb-10 prose prose-gray max-w-none text-sm leading-relaxed space-y-4">
          <h2 className="text-xl font-bold mt-2 mb-3">AI利用方針</h2>
          <p>
            当サイトでは、編集効率化のためにAIツール（大規模言語モデル等）を活用する場合があります。ただし、すべてのAI生成コンテンツは人間の編集者による事実確認・編集・改善を経た上で公開されています。Googleの「Scaled Content Abuse」ポリシーに準拠し、ユーザーに価値を提供しない大量生成コンテンツの公開は行いません。
          </p>
        </section>

        <section className="mb-10 prose prose-gray max-w-none text-sm leading-relaxed space-y-4">
          <h2 className="text-xl font-bold mt-2 mb-3">お問い合わせ</h2>
          <p>
            記事の内容に関するお問い合わせ、修正依頼、取材・掲載のご相談は以下までご連絡ください。
          </p>
          <p>
            メール：<a href="mailto:webmaster@mediax.biz" className="text-blue-600 hover:underline">webmaster@mediax.biz</a>
          </p>
        </section>

        <p className="text-xs text-gray-500 mt-12">最終更新日：2026年5月21日</p>
      </main>
      <SiteFooter />
    </div>
  );
}
