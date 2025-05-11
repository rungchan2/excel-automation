import Header from "@/components/header"
import Hero from "@/components/hero"
import Problem from "@/components/problem"
import Solution2 from "@/components/solution2"
import Solution from "@/components/solution"
import Features from "@/components/features"
import Differentiation from "@/components/differentiation"
import Pricing from "@/components/pricing"
import Case from "@/components/case"
import Faq from "@/components/faq"
import Cta from "@/components/cta"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution2 />
        <Solution />
        <Features />
        <Differentiation />
        <Pricing />
        <Case />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
