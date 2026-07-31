import { HeroSection } from "@/components/sections/HeroSection";
import { GuideSection } from "@/components/sections/GuideSection";
import { ExperiencesSection } from "@/components/sections/ExperiencesSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { TransformationSection } from "@/components/sections/TransformationSection";
import { PathwaysSection } from "@/components/sections/PathwaysSection";
import { HorizonSection } from "@/components/sections/HorizonSection";
import { JoinSection } from "@/components/sections/JoinSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GuideSection />
      <ExperiencesSection />
      <PhilosophySection />
      <TransformationSection />
      <PathwaysSection />
      <HorizonSection />
      <JoinSection />
    </>
  );
}
