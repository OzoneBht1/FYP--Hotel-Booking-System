import { apiSlice } from "./apiSlice";
import { ISearchResponse, IHotelData } from "../../components/types/types";

export const hotelApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    hotelSearch: build.mutation<
      ISearchResponse,
      { q?: string | number; limit?: number }
    >({
      query: ({ q = "", limit = "" }) => ({
        url: `hotels/search?q=${q}&limit=${limit}`,
        method: "GET",
        include: "credentials",
      }),
    }),

    getHomePageItems: build.query<IHotelData[], void>({
      query: () => ({
        url: `/hotels-by-location`,
        method: "GET",
      }),
    }),
    getHotelDetails: build.query<IHotelData, { id?: string }>({
      query: ({ id }) => ({
        url: `/hotels/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useHotelSearchMutation,
  useGetHomePageItemsQuery,
  useGetHotelDetailsQuery,
} = hotelApiSlice;
