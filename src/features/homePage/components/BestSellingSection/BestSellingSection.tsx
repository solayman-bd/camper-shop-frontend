import ProductCard, { IProduct } from "../../../../components/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useGetBestSellingProductsQuery } from "../../../../redux/features/product/porduct.api";

export const BestSellingSection = () => {
  const { data, error, isLoading } = useGetBestSellingProductsQuery(undefined);
  console.log(data);
  console.log(error);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 733,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 536,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div
      style={{ maxWidth: "100%", border: "1px solid red" }}
      className="py-10 sm:py-16"
    >
      {isLoading && (
        <div className="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
            loading...
          </div>
        </div>
      )}
      {error && <p className=" text-red-800">Some error occured....</p>}
      {data.success && (
        <>
          {" "}
          <h2 className="text-4xl font-bold text-black sm:text-5xl text-center mb-14">
            Best Selling / Recommended Products
          </h2>
          <div className="slider-container ">
            <Slider {...settings}>
              {data.data.map((product: IProduct) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </Slider>
          </div>
        </>
      )}
    </div>
  );
};
