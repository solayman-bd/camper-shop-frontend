import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBestSellingProducts: build.query({
      query: () => ({
        url: "/product/get-best-selling-products",
        method: "GET",
      }),
    }),
    getAllCategories: build.query({
      query: () => ({
        url: "/product/get-all-categories",
        method: "GET",
      }),
    }),
    getAllProducts: build.query({
      query: () => ({
        url: "/product/get-all-products",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetBestSellingProductsQuery,
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
} = productApi;
