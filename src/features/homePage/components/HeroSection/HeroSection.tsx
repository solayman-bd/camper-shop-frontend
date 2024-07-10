import { FC } from "react";
import { Link } from "react-router-dom";
import heroSvg from "../../assets/hero.svg";

const HeroSection: FC = () => {
  return (
    <div>
      <section className="py-10 sm:py-16">
        <div className="px-4 min-w-full sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold text-black sm:text-5xl lg:text-6xl">
                Explore the Great Outdoors with
                <div className="relative inline-flex">
                  <span className="absolute inset-x-0 bottom-0 border-b-8 border-blue-400"></span>
                  <h1 className="relative text-4xl font-bold text-black sm:text-5xl lg:text-6xl">
                    Campers Shop
                  </h1>
                </div>
              </h1>

              <p className="mt-8 text-lg text-gray-700 sm:text-xl">
                Your one-stop shop for all camping needs. Discover a wide range
                of gear and accessories to make your outdoor adventures
                unforgettable.
              </p>

              <div className="mt-10 sm:flex sm:items-center sm:space-x-8">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 rounded-md"
                  role="button"
                >
                  Start exploring
                </Link>
              </div>
            </div>

            <div>
              <img className="w-full" src={heroSvg} alt="Camping Image" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
