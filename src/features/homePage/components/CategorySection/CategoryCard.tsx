import React from "react";
import noImageSrc from "../../../../assets/no-image.png";

export interface ICategoryCardProps {
  image: string;
  _id: string;
}

const CategoryCard: React.FC<ICategoryCardProps> = ({ image, _id }) => {
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = noImageSrc;
  };

  return (
    <div className="m-3">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 hover:scale-95 transition-transform duration-300 flex items-center justify-between flex-col  min-h-[360px]">
        <a href="#">
          <img
            className="p-8 rounded-t-lg mx-auto"
            src={image}
            alt={`${_id} image`}
            onError={handleImageError}
          />
        </a>
        <div className="px-5 pb-5">
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
              {_id}
            </h5>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;