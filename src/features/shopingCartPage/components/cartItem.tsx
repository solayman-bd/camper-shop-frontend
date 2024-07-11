import React, { useState } from "react";

import { IProduct } from "../../../components/ProductCard";
import { useDispatch } from "react-redux";
import {
  decreaseCartByValue,
  increaseCartByValue,
} from "../../../redux/features/cart/cartSlice";

interface ICartItemProps {
  product: IProduct;
  onDecrement: (product: IProduct) => void;
  onIncrement: (product: IProduct) => void;
  onRemove: (product: IProduct) => void;
}

const CartItem: React.FC<ICartItemProps> = ({
  product,
  onDecrement,
  onIncrement,
  onRemove,
}) => {
  const dispatch = useDispatch();
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [customIncrementDecrement, setcustomIncrementDecrement] =
    useState(false);
  const [customValue, setCustomValue] = useState<number>(0);
  const handleRemove = () => {
    if (confirmRemove) {
      onRemove(product);
    } else {
      setConfirmRemove(true);
    }
  };

  const cancelRemove = () => {
    setConfirmRemove(false);
  };
  const handleIncrementByCustomValue = () => {
    dispatch(increaseCartByValue({ product, value: customValue }));
  };
  const handleDecrementByCustomValue = () => {
    dispatch(decreaseCartByValue({ product, value: customValue }));
  };
  return (
    <div key={product._id} className={`space-y-6 `}>
      <div
        className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6 ${
          confirmRemove ? " bg-gray-400" : ""
        }`}
      >
        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
          <div className="shrink-0 md:order-1">
            <img
              className="h-20 w-20 dark:hidden"
              src={product.images[0]}
              alt={product.name}
            />
          </div>

          <label htmlFor="counter-input" className="sr-only">
            Choose quantity:
          </label>
          <div className="flex items-center justify-between md:order-3 md:justify-end">
            <div className="flex items-center flex-col justify-center">
              {customIncrementDecrement == false ? (
                <div>
                  {" "}
                  <button
                    type="button"
                    id="decrement-button"
                    onClick={() => onDecrement(product)}
                    data-input-counter-decrement="counter-input"
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                  >
                    <svg
                      className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h16"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    id="counter-input"
                    data-input-counter
                    className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                    placeholder=""
                    value={product.cartQuantity}
                    required
                  />
                  <button
                    type="button"
                    id="increment-button"
                    onClick={() => onIncrement(product)}
                    data-input-counter-increment="counter-input"
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                  >
                    <svg
                      className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    className="mr-1 font-bold text-2xl rounded text-red-400 bg"
                    onClick={() => handleDecrementByCustomValue()}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    id="custom-counter-input"
                    data-input-counter
                    className="w-10 shrink-0 text-center text-sm font-medium text-gray-900 outline rounded-lg outline-1"
                    placeholder=""
                    onChange={(e) => setCustomValue(Number(e.target.value))}
                    required
                  />
                  <button
                    type="button"
                    className="ml-1 font-bold text-2xl rounded text-blue-400 bg"
                    onClick={() => handleIncrementByCustomValue()}
                  >
                    +
                  </button>
                </div>
              )}
              {customIncrementDecrement == true ? (
                <button
                  type="button"
                  className="text-blue-500 mt-1"
                  onClick={() =>
                    setcustomIncrementDecrement(!customIncrementDecrement)
                  }
                >
                  Switch to Single Increment Decrement
                </button>
              ) : (
                <button
                  type="button"
                  className="text-blue-500 mt-1"
                  onClick={() =>
                    setcustomIncrementDecrement(!customIncrementDecrement)
                  }
                >
                  Switch to Custom Increment Decrement
                </button>
              )}
            </div>
            <div className="text-end md:order-4 md:w-32">
              <p className="text-base font-bold text-gray-900 dark:text-white">
                ${product.price}
              </p>
            </div>
          </div>

          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
            <div className="text-base font-medium text-gray-900 hover:underline dark:text-white">
              {product.description}
            </div>

            <div className="flex items-center gap-4">
              {confirmRemove ? (
                <>
                  <button
                    type="button"
                    className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                    onClick={handleRemove}
                  >
                    Confirm Remove
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:underline dark:text-gray-400"
                    onClick={cancelRemove}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                  onClick={() => setConfirmRemove(true)}
                >
                  <svg
                    className="mr-1.5 h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L17.94 6M18 18L6.06 6"
                    />
                  </svg>
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
