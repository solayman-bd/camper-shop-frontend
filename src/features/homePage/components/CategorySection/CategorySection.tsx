import SectionsWraper from "../../../../components/SectionsWraper";
import CategoryCard, { ICategoryCardProps } from "./CategoryCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useGetAllCategoriesQuery } from "../../../../redux/features/product/porduct.api";
const CategorySection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2500,
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

  const { data, error, isLoading } = useGetAllCategoriesQuery(undefined);
  return (
    <SectionsWraper heading="All Categories">
      {isLoading && (
        <div className="flex items-center justify-center h-full border border-gray-200 rounded-lg w-full dark:border-gray-700">
          <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
            <p className=" text-3xl"> loading...</p>
          </div>
        </div>
      )}
      {error && <p className="text-3xl text-red-800">Some error occured....</p>}

      <div className="flex flex-wrap gap-4">
        <div className="w-full slider-container ">
          {data?.success && (
            <Slider {...settings}>
              {data?.data?.map(
                (category: ICategoryCardProps, index: number) => (
                  <CategoryCard
                    key={index}
                    image={category.image}
                    _id={category._id}
                  />
                )
              )}
            </Slider>
          )}
        </div>
      </div>
    </SectionsWraper>
  );
};

export default CategorySection;
