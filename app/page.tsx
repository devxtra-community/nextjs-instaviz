// app/page.tsx
import Navbar1 from "@/components/Navbar1"
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import Footer1 from "@/components/Footer1";

export default function Page() {
  return (
    <div className="min-h-screen text-slate-800 bg-linear-to-b from-white to-[#fff7ff] font-sans">
      <Navbar1 />
      <HeroSection />
      <Features />
      <Stats />
      <Testimonials />
      <FAQSection />
      <Footer1 />
    </div>
  );
}