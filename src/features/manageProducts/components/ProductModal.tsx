import { useState } from "react";
import { IProduct } from "../../../components/ProductCard";
import {
  useCreateASingleProductMutation,
  useGetAllCategoriesQuery,
} from "../../../redux/features/product/porduct.api";
import { toast } from "react-toastify";

interface IProductModalProps {
  isAddProductModalOpen: boolean;
  setAddProductModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product?: IProduct;
}

interface IFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  ratings: number;
  isFeatured: boolean;
  images: ArrayBuffer[] | [];
}

const ProductModal: React.FC<IProductModalProps> = ({
  isAddProductModalOpen,
  setAddProductModalOpen,
  product,
}) => {
  const [createASingleProduct] = useCreateASingleProductMutation();
  const initialFormState = {
    name: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
    ratings: 0,
    isFeatured: false,
    images: [],
  };
  const [addNewCategory, setAddNewCategory] = useState<boolean>(false);
  const { data } = useGetAllCategoriesQuery(undefined);
  const categories = data?.data;

  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<IFormData>(initialFormState);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/svg+xml",
      ];
      const maxSize = 3 * 1024 * 1024; // 1 MB

      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid image (SVG, PNG, JPG, or GIF).");
        return;
      }

      if (file.size > maxSize) {
        setError("File size must be less than 3 MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!image) {
      setError("Please Upload an Image..");
      return false;
    }
    // Collect all the data for the API call
    const productData = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      category: formData.category,
      stock: formData.stock,
      ratings: formData.ratings,
      isFeatured: formData.isFeatured,
      images: [image],
    };

    try {
      const result = await createASingleProduct(productData).unwrap();
      if (result.success) {
        toast.success("Product is created successfully....", {
          position: "bottom-left",
        });
        setFormData(initialFormState);
        setImage(null);
        setAddProductModalOpen(!isAddProductModalOpen);
      }
    } catch (error) {
      toast.error(`Failed to create an order...${error.data.message}`, {
        position: "bottom-left",
      });
    }
  };
  return (
    <div
      id="createProductModal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center overflow-y-auto"
    >
      <div className="relative p-4 w-full max-w-3xl h-full md:h-auto">
        {/* Modal content */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* Modal header */}
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add Product
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="createProductModal"
              onClick={() => setAddProductModalOpen(!isAddProductModalOpen)}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {/* Modal body */}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required={true}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  <span
                    className="mr-2 hover:cursor-pointer underline"
                    onClick={() => setAddNewCategory(false)}
                  >
                    Select Category
                  </span>
                  <span
                    onClick={() => setAddNewCategory(true)}
                    className=" underline text-blue-500 hover:cursor-pointer"
                  >
                    Add New Category
                  </span>
                </label>
                {addNewCategory == false ? (
                  <select
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        category: e.target.value,
                      }))
                    }
                    required={true}
                    value={formData.category}
                  >
                    <option value="">Select Category</option>
                    {categories?.map(
                      (rating: { _id: string; image: string }) => (
                        <option key={rating._id} value={rating._id}>
                          {rating._id}
                        </option>
                      )
                    )}
                  </select>
                ) : (
                  <input
                    type="text"
                    name="category"
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type new category"
                    required={true}
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        category: e.target.value,
                      }))
                    }
                    value={formData.category}
                  />
                )}
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Stock"
                  required={true}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      stock: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$2999"
                  required={true}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      price: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="ratings"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ratings
                </label>
                <select
                  id="ratings"
                  name="ratings"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      ratings: Number(e.target.value),
                    }))
                  }
                >
                  <option value="">Select rating</option>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write product description here"
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      description: e.target.value,
                    }))
                  }
                  required={true}
                ></textarea>
              </div>
            </div>
            <div className="mb-4 space-y-4 sm:flex sm:space-y-0">
              <div className="flex items-center mr-4">
                <input
                  id="isFeatured"
                  type="checkbox"
                  name="isFeatured"
                  className="w-4 h-4 bg-gray-100 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      isFeatured: e.target.checked,
                    }))
                  }
                  required={false}
                />
                <label
                  htmlFor="isFeatured"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Is Featured
                </label>
              </div>
            </div>
            {/* open */}
            <div className="mb-4">
              <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Product Images
              </span>
              <div className="flex justify-center items-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  {image ? (
                    <img
                      src={image as string}
                      alt="Uploaded preview"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="mb-3 w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                  )}
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              {image && (
                <button
                  type="button"
                  onClick={handleImageRemove}
                  className="mt-2 text-red-600 hover:text-red-800"
                >
                  Remove Image
                </button>
              )}
            </div>

            {/* close */}

            <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <button
                type="submit"
                className="w-full sm:w-auto justify-center text-white inline-flex bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Add product
              </button>
              <button className="w-full sm:w-auto text-white justify-center inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                <svg
                  className="mr-1 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                Schedule
              </button>
              <button
                data-modal-toggle="createProductModal"
                type="button"
                className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                <svg
                  className="mr-1 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Discard
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
