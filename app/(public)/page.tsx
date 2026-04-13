import ProductArchitecture from '@/components/pages/PublicHome/ProductArchitecture';
import ProductCallToAction from '@/components/pages/PublicHome/ProductCallToAction';
import ProductFlow from '@/components/pages/PublicHome/ProductFlow';
import ProductHero from '@/components/pages/PublicHome/ProductHero';
import ProductProblems from '@/components/pages/PublicHome/ProductProblems';
import ProductUseCases from '@/components/pages/PublicHome/ProductUseCases';


export default function PublicHome() {
  return (
    <main className="flex flex-col gap-4">
      <ProductHero />
      <ProductProblems />
      <ProductArchitecture />
      <ProductFlow />
      <ProductUseCases />
      <ProductCallToAction />
    </main>
  );
}
