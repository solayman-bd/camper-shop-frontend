import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/NavBar";

import FooterSection from "../homePage/components/FooterSection/FooterSection";
import { RootState } from "../../redux/store";
import {
  addToCart,
  decreaseCart,
  removeFromCart,
} from "../../redux/features/cart/cartSlice";
import { IProduct } from "../../components/ProductCard";
import SectionsWraper from "../../components/SectionsWraper";
import CartItem from "./components/cartItem";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const handleDecrement = (product: IProduct) => {
    dispatch(decreaseCart(product));
  };

  const handleIncrement = (product: IProduct) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (product: IProduct) => {
    dispatch(removeFromCart(product));
  };

  return (
    <>
      <Navbar />
      <SectionsWraper heading="Cart">
        <section className="antialiased">
          <div className="mx-auto p-4 max-w-screen-xl border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Shopping Cart
            </h2>

            {cart.cartItems.length === 0 ? (
              <div className="flex items-center justify-center flex-col gap-5">
                <p className="text-lg text-gray-800 dark:text-gray-200">
                  Your cart is empty...
                </p>
                <Link to="/products">
                  <button
                    className="bg-blue-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md px-4 py-3 text-base font-semibold text-white focus:outline-none focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700"
                    type="button"
                  >
                    Continue Shopping
                  </button>
                </Link>
              </div>
            ) : (
              <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                  {cart.cartItems.map((product) => (
                    <CartItem
                      key={product._id}
                      product={product}
                      onDecrement={handleDecrement}
                      onIncrement={handleIncrement}
                      onRemove={handleRemoveFromCart}
                    />
                  ))}
                </div>

                <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                  <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      Order summary
                    </p>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Original price
                          </dt>
                          <dd className="text-base font-medium text-gray-900 dark:text-white">
                            ${cart.cartTotalAmount}
                          </dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Savings
                          </dt>
                          <dd className="text-base font-medium text-green-600">
                            $0
                          </dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Store Pickup
                          </dt>
                          <dd className="text-base font-medium text-gray-900 dark:text-white">
                            $0
                          </dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Tax
                          </dt>
                          <dd className="text-base font-medium text-gray-900 dark:text-white">
                            $0
                          </dd>
                        </dl>
                      </div>

                      <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt className="text-base font-bold text-gray-900 dark:text-white">
                          Total
                        </dt>
                        <dd className="text-base font-bold text-gray-900 dark:text-white">
                          ${cart.cartTotalAmount}
                        </dd>
                      </dl>
                    </div>

                    <Link to="/checkout">
                      {" "}
                      <button
                        type="button"
                        className="w-full rounded-md bg-blue-800 px-4 py-3 text-base font-semibold text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                      >
                        Continue to Checkout
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </SectionsWraper>
      <FooterSection />
    </>
  );
};

export default ShoppingCart;
