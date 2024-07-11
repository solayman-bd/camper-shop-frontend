import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBestSellingProducts: build.query({
      query: () => ({
        url: "/product/get-best-selling-products",
        method: "GET",
      }),
      providesTags: ["BestSellingProduct"],
    }),
    getAllCategories: build.query({
      query: () => ({
        url: "/product/get-all-categories",
        method: "GET",
      }),
      providesTags: ["AllCategory"],
    }),
    getAllProducts: build.query({
      query: () => ({
        url: "/product/get-all-products",
        method: "GET",
      }),
      providesTags: ["AllProduct"],
    }),
    getSingleProduct: build.query({
      query: (id: string) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleProduct"],
    }),
  }),
});

export const {
  useGetBestSellingProductsQuery,
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} = productApi;
