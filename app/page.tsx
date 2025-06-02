import Header from "@/components/header";
import Hero from "@/components/hero";
import Problem from "@/components/problem";
import Solution2 from "@/components/solution2";
import Solution from "@/components/solution";
// import Features from "@/components/features";
// import Pricing from "@/components/pricing";

import Differentiation from "@/components/differentiation";
import Case from "@/components/case";
import Faq from "@/components/faq";
import Cta from "@/components/cta";
import Footer from "@/components/footer";
import Team from "@/components/Team";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ClassFlow",
  alternateName: "클래스플로우",
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://classflow.monstercoop.co.kr",
  description: "학원 운영에 필요한 반복적인 업무들로 부터 해방! 효율적인 자동화로 시간을 되찾으세요",
  image: (process.env.NEXT_PUBLIC_BASE_URL || "https://classflow.monstercoop.co.kr") + "/og-image.png",
  author: {
    "@type": "Organization",
    name: "ClassFlow",
    url: "https://classflow.monstercoop.co.kr",
    logo: "https://classflow.monstercoop.co.kr/logo.svg"
  },
  publisher: {
    "@type": "Organization",
    name: "ClassFlow",
    url: "https://classflow.monstercoop.co.kr",
    logo: "https://classflow.monstercoop.co.kr/logo.svg"
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://classflow.monstercoop.co.kr/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ClassFlow",
  alternateName: "클래스플로우",
  url: "https://classflow.monstercoop.co.kr",
  logo: "https://classflow.monstercoop.co.kr/logo.svg",
  description: "엑셀 기반 학원 자동화 서비스 전문 업체",
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+82-10-2625-9706",
    contactType: "customer service",
    areaServed: "KR",
    availableLanguage: "Korean"
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "양화로 124, 로컬스티치 3F",
    addressLocality: "마포구",
    addressRegion: "서울시",
    addressCountry: "KR"
  },
  sameAs: [
    "https://kmong.com/gig/668754"
  ]
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "학원 자동화 서비스",
  description: "엑셀 기반 학원 출결관리, 문자발송, 수납관리 자동화 솔루션",
  provider: {
    "@type": "Organization",
    name: "ClassFlow"
  },
  areaServed: "KR",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "학원 자동화 서비스",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "출결관리 자동화",
          description: "QR코드 체크인으로 자동 출결 기록 및 문자 발송"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "수납관리 자동화",
          description: "입금 내역 자동 확인 및 미납자 알림 시스템"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "문자발송 자동화",
          description: "출결 상태에 따른 맞춤형 문자 자동 발송"
        }
      }
    ]
  }
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main>
          <Hero />
          <Problem />
          <Solution2 />
          <Solution />
          {/* <Features /> */}
          <Differentiation />
          {/* <Pricing /> */}
          <Case />
          <Team />
          <Faq />
          <Cta />
        </main>
        <Footer />
      </div>
    </>
  );
}
