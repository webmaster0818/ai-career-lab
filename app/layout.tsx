import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "AIキャリアラボ｜AIエンジニア・データサイエンティスト向け転職エージェント比較【2026年最新】",
  description:
    "AI・機械学習エンジニア、データサイエンティストの転職に強いエージェント10社を徹底比較。Python/PyTorch/LLMなど技術スタック別おすすめや年収UP実績データも掲載。",
  keywords:
    "AIエンジニア 転職, データサイエンティスト 転職エージェント, 機械学習エンジニア 求人, AI転職, LLMエンジニア 転職",
  openGraph: {
    title:
      "AIキャリアラボ｜AIエンジニア・データサイエンティスト向け転職エージェント比較",
    description:
      "AI・ML領域に強い転職エージェント10社を徹底比較。技術スタック別おすすめ・年収データも掲載。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.className} h-full antialiased`}>
      <head>
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body className="min-h-full flex flex-col bg-[#F8FAFF] text-[#1a1a2e]">
        {children}
      </body>
    </html>
  );
}
