import Navbar from "../../components/NavBar";
import { BestSellingSection } from "./components/BestSellingSection/BestSellingSection";
import HeroSection from "./components/HeroSection/HeroSection";

const Home = () => {
  return (
    <div style={{ border: "1px solid blue" }}>
      <Navbar />
      <HeroSection />
      <BestSellingSection />
    </div>
  );
};

export default Home;
