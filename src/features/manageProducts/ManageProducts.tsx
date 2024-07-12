import ProductModal from "./components/ProductModal";
import DeleteModal from "./components/DeleteModal";
import UpdateProductForm from "./components/UpdateProductForm";
import { useState } from "react";
import { useGetAllProductsQuery } from "../../redux/features/product/porduct.api";
import { IProduct } from "../../components/ProductCard";
import SectionsWraper from "../../components/SectionsWraper";
import Navbar from "../../components/NavBar";
import FooterSection from "../homePage/components/FooterSection/FooterSection";

const ManageProducts = () => {
  const [isAddProductModalOpen, setAddProductModalOpen] =
    useState<boolean>(false);
  const [isDeleteProductModalOpen, setDeleteProductModalOpen] =
    useState<boolean>(false);
  const [isEditProductModalOpen, setEditProductModalOpen] =
    useState<boolean>(false);

  const { data, error, isLoading } = useGetAllProductsQuery(undefined);
  return (
    <div>
      <Navbar />

      <SectionsWraper heading="Manage Products">
        {/* Start block */}

        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased max-h-screen overflow-scroll">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
            <div className="bg-white min-h-screen dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="flex-1 flex items-center space-x-2">
                  <h5>
                    <span className="text-gray-500">All Products:</span>
                  </h5>
                  <h5 className="text-gray-500 dark:text-gray-400 ml-1">
                    {data?.data?.length}
                  </h5>
                </div>
              </div>
              {/* //Search Add Product Filter Prouct Section Start */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
                <div className="w-full md:w-1/2">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewbox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        placeholder="Search for products"
                        required=""
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                  </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <button
                    type="button"
                    id="createProductButton"
                    data-modal-toggle="createProductModal"
                    className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 mr-16"
                    onClick={() =>
                      setAddProductModalOpen(!isAddProductModalOpen)
                    }
                  >
                    <svg
                      className="h-3.5 w-3.5 mr-1.5 -ml-1"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      />
                    </svg>
                    Add product
                  </button>

                  <div
                    id="filterDropdown"
                    className="z-10 hidden px-3 pt-1 bg-white rounded-lg shadow w-80 dark:bg-gray-700 right-0"
                  >
                    <div
                      id="accordion-flush"
                      data-accordion="collapse"
                      data-active-classes="text-black dark:text-white"
                      data-inactive-classes="text-gray-500 dark:text-gray-400"
                    >
                      {/* Category */}
                      <h2 id="category-heading">
                        <button
                          type="button"
                          className="flex items-center justify-between w-full py-2 px-1.5 text-sm font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                          data-accordion-target="#category-body"
                          aria-expanded="true"
                          aria-controls="category-body"
                        >
                          <span>Category</span>
                          <svg
                            aria-hidden="true"
                            data-accordion-icon=""
                            className="w-5 h-5 rotate-180 shrink-0"
                            fill="currentColor"
                            viewbox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            />
                          </svg>
                        </button>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              {/* //Search Add Product Filter Prouct Section End */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="">
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <button
                            id="sln"
                            type="button"
                            className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          >
                            SL
                          </button>
                          <label htmlFor="sln" className="sr-only">
                            Serial No
                          </label>
                        </div>
                      </th>
                      <th scope="col" className="p-4">
                        Product
                      </th>
                      <th scope="col" className="p-4">
                        Category
                      </th>
                      <th scope="col" className="p-4">
                        Stock
                      </th>

                      <th scope="col" className="p-4">
                        Rating
                      </th>

                      <th scope="col" className="p-4">
                        Last Update
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.map((product: IProduct, index: number) => (
                      <tr
                        key={product._id}
                        className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <td className="p-4 w-4">
                          <div className="flex items-center">
                            <button
                              id="sln"
                              type="button"
                              className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                              {index + 1}
                            </button>
                            <label htmlFor="sln" className="sr-only">
                              Serial No
                            </label>
                          </div>
                        </td>
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <div id="img-name" className="flex items-center mr-3">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-8 w-auto mr-3"
                            />
                            {product.name}
                          </div>
                        </th>
                        <td id="Category" className="px-4 py-3">
                          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                            {product.category}
                          </span>
                        </td>
                        <td
                          id="stock"
                          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <div className="flex items-center">
                            <div className="h-4 w-4 rounded-full inline-block mr-2 bg-red-700"></div>
                            {product.stock}
                          </div>
                        </td>

                        <td
                          id="rating"
                          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <div className="flex items-center">
                            {Array.from({ length: product.ratings }).map(
                              (_, i) => (
                                <svg
                                  key={i}
                                  aria-hidden="true"
                                  className="w-5 h-5 text-yellow-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              )
                            )}
                            <span className="text-gray-500 dark:text-gray-400 ml-1">
                              {product.ratings}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center space-x-4">
                            <button
                              type="button"
                              className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2 -ml-0.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path
                                  fillRule="evenodd"
                                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Edit
                            </button>
                            <button
                              type="button"
                              className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            >
                              <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-gray-400 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* End block */}
        {isAddProductModalOpen && (
          <ProductModal
            isAddProductModalOpen={isAddProductModalOpen}
            setAddProductModalOpen={setAddProductModalOpen}
          />
        )}
        {/* drawer component */}
        <UpdateProductForm />
        {/* Preview Drawer */}

        {/* Delete Modal */}
        <DeleteModal />
      </SectionsWraper>
      <FooterSection />
    </div>
  );
};

export default ManageProducts;
