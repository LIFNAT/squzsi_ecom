import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturedProducts from "./components/FeaturedProducts";
import Categories from "./components/Categories";
import PromoBanner from "./components/PromoBanner";
import Footer from "./components/Footer";
import FloatingCircles from "./components/FloatingCircles";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <FloatingCircles />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedProducts />
        <Categories />
        <PromoBanner />
      </main>
      <Footer />
    </div>
  );
}
