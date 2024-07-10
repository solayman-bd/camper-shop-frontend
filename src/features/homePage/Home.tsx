import Navbar from "../../components/NavBar";
import { BestSellingSection } from "./components/BestSellingSection/BestSellingSection";
import CategorySection from "./components/CategorySection/CategorySection";
import { FeaturedProductSection } from "./components/FeaturedProductsSection/FeaturedProductsSection";
import HeroSection from "./components/HeroSection/HeroSection";

const Home = () => {
  return (
    <div style={{ border: "1px solid blue" }}>
      <Navbar />
      <main>
        <HeroSection />
        <BestSellingSection />
        <CategorySection />
        <FeaturedProductSection />
      </main>
    </div>
  );
};

export default Home;
