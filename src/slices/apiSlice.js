// redux imports
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setNewCredentials, logout } from "./authSlice";
import { Mutex } from "async-mutex";

// constant imports
import { BASE_URL, USERS_URL_HTTPS } from "../constants";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "same-origin",
  // prepareHeaders: (headers, { getState }) => {
  //   const token = getState().auth.token;
  //   if (token) {
  //     headers.set("Authorization", `Bearer ${token}`);
  //     headers.set("Content-Type", "application/json");
  //   }
  //   return headers;
  // },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  console.log("error res", result);

  if (result.error && result.error.status === "FETCH_ERROR") {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        console.log("sending refresh token");
        const refreshToken = api.getState().auth.refreshToken;
        const expiredate = api.getState().auth.expiredate;
        const refreshResult = await baseQuery(
          {
            url: `${USERS_URL_HTTPS}/RefreshToken`,
            method: "POST",
            body: {
              token: "<string>",
              refreshToken,
              error: "<string>",
              expiredate,
            },
          },
          api,
          extraOptions
        );
        console.log("refresh result", refreshResult);
        if (refreshResult.data) {
          api.dispatch(setNewCredentials({ ...refreshResult.data }));
          result = await baseQuery(
            {
              ...args,
              headers: {
                "Authorization": `Bearer ${refreshResult.data.itemList[0].token}`,
              },
            },
            api,
            extraOptions
          );
          console.log("data", refreshResult.data);
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  console.log("final result", result);
  return result;
};

// parent slice
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
