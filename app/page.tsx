import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { SoftSkills } from "@/components/soft-skills";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { CaseStudies } from "@/components/case-studies";
import { ProofOfAutomation } from "@/components/proof-of-automation";
import { SkillCards } from "@/components/skill-cards";
import { CertificationCards } from "@/components/certification-cards";
import { Philosophy } from "@/components/philosophy";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <ExperienceTimeline />
        <SkillCards />
        <SoftSkills />
        <ProofOfAutomation />
        <CaseStudies />
        <CertificationCards />
        <Philosophy />
      </main>
      <Footer />
    </>
  );
}
