import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postAnOrder: build.mutation({
      query: (orderData) => ({
        url: "/order/create-an-order",
        method: "POST",
        body: orderData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [
        "AllProduct",
        "AllCategory",
        "BestSellingProduct",
        "SingleProduct",
      ],
    }),
  }),
});

export const { usePostAnOrderMutation } = orderApi;
