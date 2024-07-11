import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../../components/ProductCard";
import Navbar from "../../components/NavBar";
import FooterSection from "../homePage/components/FooterSection/FooterSection";
import { useGetSingleProductQuery } from "../../redux/features/product/porduct.api";
import SectionsWraper from "../../components/SectionsWraper";
import noImg from "../../assets/no-image.png";
const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data, error, isLoading } = useGetSingleProductQuery(
    productId as string
  );

  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    if (data) {
      setProduct(data.data);
    }
  }, [data]);

  const handleAddToCart = () => {
    if (product) {
      console.log(`Added ${product.name} to cart.`);
    }
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = noImg;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600 dark:text-gray-400 text-lg">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600 dark:text-red-400 text-lg">
          Error fetching data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <SectionsWraper heading={`Product Details of ${product?.name}`}>
        <div className=" p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:cursor-pointer text-gray-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row -mx-4 justify-center items-center">
              <div className="md:flex-1 px-4">
                <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                  <img
                    className="w-full h-full object-cover"
                    src={product?.images[0]}
                    onError={handleImageError}
                    alt="Product Image"
                  />
                </div>
                <div className="flex -mx-2 mb-4">
                  <div className="w-1/2 px-2">
                    <button
                      className={`w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold ${
                        product?.stock === 0
                          ? "cursor-not-allowed opacity-50"
                          : "hover:bg-gray-800 dark:hover:bg-gray-700"
                      }`}
                      onClick={handleAddToCart}
                      disabled={product?.stock === 0}
                    >
                      {product?.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                  <div className="w-1/2 px-2">
                    <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
              <div className="md:flex-1 px-4">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                  {product?.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-2xl mb-4">
                  {product?.description}
                </p>
                <div className="flex mb-4">
                  <div className="mr-4 text-xl">
                    <span className="font-bold text-gray-700 dark:text-gray-300 ">
                      Price:
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      ${product?.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xl">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Availability:
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {(product?.stock as number) > 0
                        ? `In Stock: ${product?.stock}`
                        : "Out of Stock"}
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300 text-xl">
                    Product Description:
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 text-base mt-2">
                    {product?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionsWraper>
      <FooterSection />
    </>
  );
};

export default ProductDetails;
