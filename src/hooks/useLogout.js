// library imports
import { toast } from "react-toastify";

// redux import
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useSelector, useDispatch } from "react-redux";

const useLogout = () => {
  const dispatch = useDispatch();
  const [logoutApiCall, { isLoading: logoutLoading }] = useLogoutMutation();
  const { refreshToken, expDate } = useSelector((state) => state.auth);
  const logoutHandler = async () => {
    try {
      const res = await logoutApiCall({
        token: "<string>",
        refreshToken,
        error: "<string>",
        expiredate: expDate,
      });
      dispatch(logout());
      toast.success(res.data.message, {
        fontSize: "18px",
        autoClose: 2000,
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        fontSize: "18px",
        autoClose: 2000,
      });
    }
  };

  return { logoutHandler, logoutLoading };
};

export default useLogout;
