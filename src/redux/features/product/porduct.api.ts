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
    deleteASingleProduct: build.mutation({
      query: (data) => ({
        url: "/product/delete-a-product",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["AllProduct", "BestSellingProduct", "AllCategory"],
    }),
    createASingleProduct: build.mutation({
      query: (data) => ({
        url: "/product/create-a-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllProduct", "BestSellingProduct", "AllCategory"],
    }),
    updateASingleProduct: build.mutation({
      query: (data) => ({
        url: "/product/update-a-product",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AllProduct", "BestSellingProduct", "AllCategory"],
    }),
  }),
});

export const {
  useGetBestSellingProductsQuery,
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useDeleteASingleProductMutation,
  useCreateASingleProductMutation,
  useUpdateASingleProductMutation,
} = productApi;
