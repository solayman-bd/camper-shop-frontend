import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBestSellingProducts: build.query({
      query: () => ({
        url: "/product/get-best-selling-products",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBestSellingProductsQuery } = productApi;
