import { useState } from "react";
import { Navbar, HeroSection, PortfolioSection, ServicesSection, ProcessSection } from "@/components/landing/HeroSections";
import { CalculatorSection, ReviewsSection, GallerySection } from "@/components/landing/MiddleSections";
import { FaqSection, ContactsSection, Footer } from "@/components/landing/BottomSections";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [area, setArea] = useState(150);
  const [floors, setFloors] = useState(1);
  const [material, setMaterial] = useState("concrete");
  const [galleryIdx, setGalleryIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-brand-dark text-white font-golos overflow-x-hidden">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HeroSection />
      <PortfolioSection />
      <ServicesSection />
      <ProcessSection />
      <CalculatorSection area={area} setArea={setArea} floors={floors} setFloors={setFloors} material={material} setMaterial={setMaterial} />
      <ReviewsSection />
      <GallerySection galleryIdx={galleryIdx} setGalleryIdx={setGalleryIdx} />
      <FaqSection />
      <ContactsSection />
      <Footer />
    </div>
  );
}
