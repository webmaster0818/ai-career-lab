import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";

export const metadata: Metadata = {
  title: "記事制作ポリシー｜AIキャリアラボ",
  description:
    "AIキャリアラボ の記事制作ポリシー。編集方針、ファクトチェック工程、AI 利用方針、修正対応方針を記載しています。",
  alternates: { canonical: "/content-policy" },
};

const SITE_NAME = "AIキャリアラボ";

export default function ContentPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:underline">トップ</Link>
          <span className="mx-2">&gt;</span>
          <span>記事制作ポリシー</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold mb-8">記事制作ポリシー</h1>

        <div className="prose prose-gray max-w-none text-sm leading-relaxed space-y-8">
          <p>
            {SITE_NAME} では、利用者が信頼できる情報をもとに最適な選択ができるよう、以下のポリシーに基づき記事を制作しています。
          </p>

          <section>
            <h2 className="text-xl font-bold mt-4 mb-3">1. 編集の基本方針</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>ユーザーファースト</strong>：利用者の意思決定に役立つ情報提供を最優先とします</li>
              <li><strong>独自性</strong>：他サイトの転載ではなく、独自の調査・分析・比較に基づき作成します</li>
              <li><strong>中立性</strong>：特定の事業者・サービスを不当に優遇することなく、客観的な情報を提供します</li>
              <li><strong>透明性</strong>：アフィリエイトリンクの存在を明示し、収益構造を開示します</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-4 mb-3">2. ファクトチェック工程</h2>
            <p>
              すべての記事は、公開前に以下の工程を経ています。
            </p>
            <ol className="list-decimal pl-6 space-y-1">
              <li>公式サイト・公的データを参照した情報源の確認</li>
              <li>数値・料金・サービス内容の二重チェック</li>
              <li>編集責任者によるレビュー</li>
              <li>法令・業界規制への適合確認</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-4 mb-3">3. AI（生成AI）の利用方針</h2>
            <p>
              当サイトでは、編集効率化のためにAIツール（大規模言語モデル等）を活用する場合があります。ただし以下を厳守しています。
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>AI生成内容は必ず人間の編集者がレビュー・修正・改善する</li>
              <li>事実に基づく記載は公式ソースで裏取りを行う</li>
              <li>Googleの「Scaled Content Abuse」ポリシーに準拠し、ユーザーに価値を提供しない大量生成コンテンツは公開しない</li>
              <li>AI 生成画像・図表を用いる場合は適切に明示する</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-4 mb-3">4. 更新ポリシー</h2>
            <p>
              法令・業界の変化、提携先の料金・サービス内容変更などを継続的に追跡し、コンテンツの最新性を維持するよう努めています。重要な変更があった場合は、記事内に更新日と内容を明示します。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-4 mb-3">5. 修正・削除依頼への対応</h2>
            <p>
              記事内容に誤りがあった場合、または事業者様より掲載情報の修正・削除依頼があった場合、速やかに事実確認のうえ対応いたします。ご連絡は以下までお願いします。
            </p>
            <p>
              メール：<a href="mailto:webmaster@mediax.biz" className="text-blue-600 hover:underline">webmaster@mediax.biz</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-4 mb-3">6. 利益相反の開示</h2>
            <p>
              当サイトは、紹介する事業者へのアフィリエイトリンクを通じて収益を得ている場合があります。ただし、収益発生は記事内のランキング・評価には影響しません。すべての評価は独立した編集判断に基づきます。
            </p>
          </section>

          <p className="text-xs text-gray-500 mt-12">最終改定日：2026年5月21日</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
