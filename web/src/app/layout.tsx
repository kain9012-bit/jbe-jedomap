import type { Metadata } from "next";
import Link from "next/link";
import Telemetry from "@/components/Telemetry";
import { getInstitutionSummaries } from "@/lib/data";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kain9012-bit.github.io/jbe-jedomap";
const INSTITUTIONS = getInstitutionSummaries();
const MODEL_COUNT = INSTITUTIONS.length;
const LATEST_AS_OF_DATE = INSTITUTIONS.reduce(
  (latest, institution) =>
    institution.asOfDate > latest ? institution.asOfDate : latest,
  "",
);

export const metadata: Metadata = {
  title: {
    default: "한 장으로 읽는 전북교육청 제도맵",
    template: "%s | 전북교육청 제도맵",
  },
  description:
    "기관에는 업무가 있고, 그 근거에는 자치법규가 있다. 전북특별자치도교육청의 주요 업무를 법령·자치법규·조직·절차·문서를 한 장 구조도로 보여드립니다.",
  keywords: "전북교육청, 자치법규, 학생맞춤통합지원, 조례, 교육행정, 업무구조도",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: "한 장으로 읽는 전북교육청 제도맵",
    description: "법령·자치법규부터 실제 업무 흐름까지 한 장으로 읽는 전북교육청 업무 카탈로그",
    url: `${SITE_URL}/`,
    siteName: "전북교육청 제도맵",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-default.png`,
        width: 1200,
        height: 630,
        alt: "전북교육청 제도맵",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "한 장으로 읽는 전북교육청 제도맵",
    description: "법령·자치법규부터 실제 업무 흐름까지 한 장으로 읽는 전북교육청 업무 카탈로그",
    images: [`${SITE_URL}/og-default.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col site-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "한 장으로 읽는 전북교육청 제도맵",
              description:
                "전북특별자치도교육청 주요 업무를 법령·자치법규, 조직, 절차, 문서 흐름으로 정리한 업무 모델 카탈로그",
              inLanguage: "ko-KR",
              url: `${SITE_URL}/`,
              numberOfItems: MODEL_COUNT,
            }).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Telemetry />
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-brand">
          <strong>전북교육청 제도맵</strong>
          <span>Institution Registry</span>
        </Link>

        <nav className="site-nav" aria-label="주요 메뉴">
          <NavLink href="/#institutions">제도 대장</NavLink>
          <NavLink href="/verification/">현장 검증 대장</NavLink>
          <NavLink href="/request/">요청하기</NavLink>
          <span className="site-header-date">기준일 {LATEST_AS_OF_DATE}</span>
        </nav>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`nav-link ${className}`.trim()}>
      {children}
    </Link>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 32,
        }}
      >
        <div>
          <p
            style={{
              fontWeight: 720,
              fontSize: 14,
              color: "var(--color-ink)",
              marginBottom: 8,
            }}
          >
            한 장으로 읽는 전북교육청 제도맵
          </p>
          <p style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.7 }}>
            법령 기준일 기준으로 작성된 참고자료입니다.
            <br />
            법률 자문이나 공식 유권해석이 아닙니다.
          </p>
        </div>
        <div>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: "var(--color-faint)",
              marginBottom: 8,
            }}
          >
            안내
          </p>
          <p style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.7 }}>
            각 제도 페이지에 법령 기준일을 표시합니다.
            <br />
            법령이 개정되면 내용이 달라질 수 있습니다.
            <br />
            오류·제보:{" "}
            <a
              href="mailto:kain9012@jbedu.kr"
              style={{ color: "var(--color-accent-dark)", textDecoration: "none" }}
            >
              kain9012@jbedu.kr
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
