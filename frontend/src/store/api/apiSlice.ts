import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LoginInformation,
  RegistrationInformation,
} from "../../components/types/types";
import { authActions } from "../auth-slice";

const BASE_URL = "http://localhost:8000/api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    verifyLogin: build.mutation({
      query: (loginInfo: LoginInformation) => ({
        url: "token/",
        method: "POST",
        body: { email: loginInfo.email, password: loginInfo.password },
        include: "credentials",
      }),
    }),
    registerUser: build.mutation({
      query: (registrationInfo: RegistrationInformation) => ({
        url: "register/",
        method: "POST",
        body: {
          email: registrationInfo.email,
          password: registrationInfo.password,
          password2: registrationInfo.password2,
          first_name: registrationInfo.first_name,
          last_name: registrationInfo.last_name,
          gender: registrationInfo.gender,
          country: registrationInfo.country,
        },
        include: "credentials",
      }),
    }),
  }),
});

export const { useVerifyLoginMutation } = apiSlice;
export const { useRegisterUserMutation } = apiSlice;

export default apiSlice.reducer;
