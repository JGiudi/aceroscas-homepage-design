import HeroSection from "@/components/HeroSection";
import LegacySection from "@/components/LegacySection";
import AdvantagesSection from "@/components/AdvantagesSection";
import FooterSection from "@/components/FooterSection";
import SmoothScroll from "@/components/SmoothScroll";

const Index = () => {
  return (
    <SmoothScroll>
      <main>
        <HeroSection />
        <LegacySection />
        <AdvantagesSection />
        <FooterSection />
      </main>
    </SmoothScroll>
  );
};

export default Index;
