// redux imports
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setNewCredentials, logout } from "./authSlice";
import { Mutex } from "async-mutex";

// constant imports
import { BASE_URL, USERS_URL_HTTPS } from "../constants";

const mutex = new Mutex();
let isRefreshingToken = false;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "same-origin",
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = getState().auth.token;
    if (token && !isRefreshingToken && endpoint !== "login") {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
    }
    return headers;
  },
});

// HADNLE AUTO REFRESH TOKEN
const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === "FETCH_ERROR") {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        console.log("sending refresh token");
        const refreshToken = api.getState().auth.refreshToken;
        const expiredate = api.getState().auth.expiredate;
        isRefreshingToken = true;

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
        isRefreshingToken = false;
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
  return result;
};

// parent slice
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
