import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { About } from "@/components/sections/Nosotros";
import { Stats } from "@/components/sections/Stats";
import { ParallaxCta } from "@/components/sections/ParallaxCta";
import { Products } from "@/components/sections/Products";
import { Crops } from "@/components/sections/Crops";
import { Benefits } from "@/components/sections/Benefits";
import { Brands } from "@/components/sections/Brands";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <ParallaxCta />
        <Products />
        <Crops />
        <Benefits />
        <Brands />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
