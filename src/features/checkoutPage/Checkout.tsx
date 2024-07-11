import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Navbar from "../../components/NavBar";
import SectionsWraper from "../../components/SectionsWraper";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { usePostAnOrderMutation } from "../../redux/features/order/order.api";
import { clearCart } from "../../redux/features/cart/cartSlice";
export interface IFormData {
  Name: string;
  Email: string;
  Country: string;
  City: string;
  Phone: string;
  Area: string;
}
export interface IFormFieldMockup {
  id: number;
  name: string;
  placeHolder: string;
}
export const Checkout = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [postAnOrder] = usePostAnOrderMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submissionReadyData = {
      name: formData.Name,
      email: formData.Email,
      phoneNumber: formData.Phone,
      deliveryAddress: `${formData.Area}, ${formData.City}, ${formData.Country}`,
      productDetails: cart.cartItems.map((item) => ({
        productId: item._id,
        quantity: item.cartQuantity,
        totalPrice: item.price * item.cartQuantity,
      })),

      totalCost: cart.cartTotalAmount,
      paymentMethod: "cashOnDelivery",
    };

    try {
      const result = await postAnOrder(submissionReadyData).unwrap();
      if (result.success) {
        toast.success("Your order is created....", { position: "bottom-left" });
        dispatch(clearCart());
        navigate("/success");
      }
    } catch (error) {
      toast.error("Failed to create an order....", { position: "bottom-left" });
    }
  };

  const data: IFormFieldMockup[] = [
    { id: 1, name: "Name", placeHolder: "Write your name" },
    { id: 2, name: "Email", placeHolder: "name@example.com" },
    { id: 3, name: "Country", placeHolder: "Write your country" },
    { id: 4, name: "City", placeHolder: "Name of your city" },
    { id: 5, name: "Phone", placeHolder: "+88017000000000" },
    { id: 6, name: "Area", placeHolder: "Detail of your address" },
  ];

  const [formData, setFormData] = useState<IFormData>({
    Name: "",
    Email: "",
    Country: "",
    City: "",
    Phone: "",
    Area: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <Navbar />
      <SectionsWraper heading="Checkout Page">
        <section className="antialiased dark:bg-gray-900 md:py-16">
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-screen-xl p-5 border rounded-lg shadow-md"
          >
            <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
              <div className="min-w-0 flex-1 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Delivery Details
                  </h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {data.map((item) => (
                      <div key={item.id}>
                        <label
                          htmlFor={item.name}
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {item.name}
                        </label>
                        <input
                          type="text"
                          id={item.name}
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                          placeholder={item.placeHolder}
                          value={formData[item.name as keyof IFormData]}
                          onChange={handleChange}
                          required={true}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Payment
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="paypal-2"
                            aria-describedby="paypal-text"
                            type="radio"
                            name="payment-method"
                            defaultChecked={true}
                            className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                          />
                        </div>
                        <div className="ms-4 text-sm">
                          <label
                            htmlFor="paypal-2"
                            className="font-medium leading-none text-gray-900 dark:text-white"
                          >
                            Cash On Delivery
                          </label>
                          <p
                            id="paypal-text"
                            className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                          >
                            Cash a convenient way to pay
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                <div className="flow-root">
                  <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Subtotal
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        ${cart.cartTotalAmount}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Savings
                      </dt>
                      <dd className="text-base font-medium text-green-500">
                        0
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Store Pickup
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        $0
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Tax
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        $0
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                        ${cart.cartTotalAmount}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="space-y-3">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-black hover:bg-primary-800 hover:ring-4 hover:ring-primary-300"
                  >
                    Complete the Order
                  </button>
                  <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Want to buy more items?
                    <Link
                      to="/products"
                      title=""
                      className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500 mx-3"
                    >
                      Go to products page
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </section>
      </SectionsWraper>
    </>
  );
};
