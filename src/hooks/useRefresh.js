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
      console.log("Refresh Token Run!");
      try {
        const res = await refreshApiCall({
          token: "<string>",
          refreshToken,
          error: "<string>",
          expiredate,
        }).unwrap();
        console.log(res);
        dispatch(setNewCredentials({ ...res }));
      } catch (err) {
        console.error(err);
      }
    } else {
      return;
    }
  };

  return refreshTokenHnadler;
};

export default useRefreshToken;
