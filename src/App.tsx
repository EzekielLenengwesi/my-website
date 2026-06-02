import { useLenisInit } from '@/hooks/useLenis';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/sections/HeroSection';
import { StorySection } from '@/sections/StorySection';
import { ProductsSection } from '@/sections/ProductsSection';
import { VisitSection } from '@/sections/VisitSection';

function App() {
  useLenisInit();

  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <StorySection />
        <ProductsSection />
        <VisitSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
