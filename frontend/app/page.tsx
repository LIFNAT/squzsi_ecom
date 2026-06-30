import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturedProducts from "./components/FeaturedProducts";
import Categories from "./components/Categories";
import PromoBanner from "./components/PromoBanner";
import Footer from "./components/Footer";
import FloatingCircles from "./components/FloatingCircles";
import AllItem from "./allitem/component/allitemlist";
export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen">
      
      
      <main className="flex-1">
        <HeroSection />
        <FeaturedProducts />
        <Categories />
        <PromoBanner />
        <AllItem />
      </main>
      <Footer />
    </div>
  );
}