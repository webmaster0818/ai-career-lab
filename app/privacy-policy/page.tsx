import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";

export const metadata: Metadata = {
  title: "プライバシーポリシー｜AIキャリアラボ",
  description:
    "AIキャリアラボのプライバシーポリシーです。個人情報の取扱い、Cookie使用、Google Analytics等について記載しています。",
  alternates: { canonical: "/privacy-policy" },
};

const SITE_NAME = "AIキャリアラボ";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:underline">トップ</Link>
          <span className="mx-2">&gt;</span>
          <span>プライバシーポリシー</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold mb-8">プライバシーポリシー</h1>
        <div className="prose prose-gray max-w-none text-sm leading-relaxed space-y-6">
          <p>
            株式会社MediaX（以下「当社」といいます。）は、当社が運営するウェブサイト「{SITE_NAME}」（以下「本サイト」といいます。）における利用者の個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定めます。
          </p>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">第1条（個人情報）</h2>
            <p>「個人情報」とは、個人情報保護法に定める「個人情報」を指し、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報、および個人識別符号が含まれる情報を指します。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">第2条（個人情報の収集方法）</h2>
            <p>当社は、利用者が本サイトを閲覧する際に、以下の情報を自動的に取得することがあります。</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>IPアドレス、ブラウザの種類、リファラ等のアクセスログ情報</li>
              <li>Cookie等を用いた閲覧・利用履歴</li>
              <li>お問い合わせフォーム送信時に入力された氏名・メールアドレス等の情報</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">第3条（個人情報を収集・利用する目的）</h2>
            <p>当社が個人情報を収集・利用する目的は、以下のとおりです。</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>本サイトの提供・運営・改善のため</li>
              <li>利用者からのお問い合わせに回答するため</li>
              <li>サービスのご案内、アクセス解析、新サービスの開発・改善のため</li>
              <li>利用規約に違反した利用者の特定・対応のため</li>
              <li>上記の利用目的に付随する目的</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">第4条（利用目的の変更）</h2>
            <p>当社は、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。利用目的の変更を行った場合には、変更後の目的について本サイト上に公表します。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">第5条（個人情報の第三者提供）</h2>
            <p>当社は、次に掲げる場合を除いて、あらかじめ利用者の同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>法令に基づく場合</li>
              <li>人の生命、身体または財産の保護のために必要がある場合</li>
              <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
              <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して、協力する必要がある場合</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">第6条（Cookieの使用について）</h2>
            <p>本サイトでは、利用者の利便性向上のためCookieを使用しています。Cookieとはサーバーコンピュータからブラウザに送信され、ユーザーのコンピュータに蓄積される情報です。Cookieには個人を特定する情報は一切含まれません。ブラウザの設定によりCookieの受け取りを拒否することができますが、その場合、本サイトの一部機能をご利用いただけない可能性があります。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">第7条（アクセス解析ツールについて）</h2>
            <p>本サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。GoogleアナリティクスはトラフィックデータをCookieにより収集します。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすることで収集を拒否することが可能ですので、ブラウザの設定をご確認ください。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">第8条（個人情報の開示・訂正・削除）</h2>
            <p>当社は、利用者からご本人の個人情報の開示を求められたときは、利用者ご本人からのご請求であることを確認のうえ、本人に対し、遅滞なくこれを開示します。当社は、利用者から、個人情報の訂正、追加または削除を求められた場合には、必要な調査を行ったうえで、これに応じます。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">第9条（プライバシーポリシーの変更）</h2>
            <p>本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、利用者に通知することなく、変更することができるものとします。当社が別途定める場合を除いて、変更後のプライバシーポリシーは、本サイトに掲載したときから効力を生じるものとします。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-8 mb-3">第10条（お問い合わせ窓口）</h2>
            <p>本ポリシーに関するお問い合わせは、本サイトのお問い合わせフォームまたは下記の連絡先までお願いいたします。</p>
            <p className="mt-2">
              運営：株式会社MediaX<br />
              メール：webmaster@mediax.biz
            </p>
          </section>

          <p className="text-xs text-gray-500 mt-12">最終改定日：2026年5月21日</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
