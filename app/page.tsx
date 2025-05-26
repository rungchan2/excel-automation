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
  url:
    process.env.NEXT_PUBLIC_BASE_URL || "https://classflow.monstercoop.co.kr",
  description:
    "학원 운영에 필요한 반복적인 업무들로 부터 해방! 효율적인 자동화로 시간을 되찾으세요",
  image:
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://classflow.monstercoop.co.kr/og-image.jpg",
  author: {
    "@type": "Organization",
    name: "ClassFlow",
  },
  publisher: {
    "@type": "Organization",
    name: "ClassFlow",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
