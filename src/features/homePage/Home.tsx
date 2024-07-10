import Navbar from "../../components/NavBar";
import { BestSellingSection } from "./components/BestSellingSection/BestSellingSection";
import CategorySection from "./components/CategorySection/CategorySection";
import FAQSection from "./components/FAQSection/FAQSection";
import { FeaturedProductSection } from "./components/FeaturedProductsSection/FeaturedProductsSection";
import HeroSection from "./components/HeroSection/HeroSection";
import TestimonialsSection from "./components/TestimonialSection/TestimonialSection";
import FooterSection from "./components/FooterSection/FooterSection";

const Home = () => {
  return (
    <div>
      <Navbar />
      <main>
        <HeroSection />
        <BestSellingSection />
        <CategorySection />
        <FeaturedProductSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default Home;
