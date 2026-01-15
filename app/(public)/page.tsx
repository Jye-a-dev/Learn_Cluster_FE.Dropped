import HeroSection from '@/components/pages/PublicHome/HeroSection';
import ProblemSolution from '@/components/pages/PublicHome/ProblemSolution';
import CoreFeatures from '@/components/pages/PublicHome/CoreFeatures';
import RoleExperience from '@/components/pages/PublicHome/RoleExperience';
import GamificationSection from '@/components/pages/PublicHome/GamificationSection';
import DemoFlow from '@/components/pages/PublicHome/DemoFlow';
import UseCases from '@/components/pages/PublicHome/UseCases';
import CallToAction from '@/components/pages/PublicHome/CallToAction';


export default function PublicHome() {
  return (
    <main className="flex flex-col gap-4">
      <HeroSection />
      <ProblemSolution />
      <CoreFeatures />
      <RoleExperience />
      <GamificationSection />
      <DemoFlow />
      <UseCases />
      <CallToAction />
    </main>
  );
}