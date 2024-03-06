// library imports
import { toast } from "react-toastify";

// redux imports
import { useRefreshMutation } from "../slices/usersApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { setNewCredentials } from "../slices/authSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const [refreshApiCall] = useRefreshMutation();
  const { refreshToken, expiredate } = useSelector((state) => state.auth);

  const tokenDate = new Date(expiredate);

  const refreshTokenHnadler = async () => {
    if (tokenDate - 3000 < Date.now()) {
      try {
        const res = await refreshApiCall({
          token: "string",
          refreshToken,
          error: "string",
          expiredate: expiredate,
        }).unwrap();
        console.log("Refresh Token Run!");
        dispatch(setNewCredentials({ ...res }));
      } catch (err) {
        toast.error(err?.data?.message || err.error, {
          autoClose: 2000,
          style: {
            fontSize: "18px",
          },
        });
      }
    } else {
      return;
    }
  };

  return refreshTokenHnadler;
};

export default useRefreshToken;
