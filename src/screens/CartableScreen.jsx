// react imports
import { useEffect } from "react";

// library imports
import { toast } from "react-toastify";

// redux imports
import { setSelectedRole } from "../slices/requestsDataSlice";
import { useGetRoleQuery } from "../slices/requestApiSlice";
import { useSelector, useDispatch } from "react-redux";

// component imports
import RequestsGrid from "../grids/RequestsGrid";

function CartableScreen() {
  const { selectedRole } = useSelector((state) => state.requestsData);

  const dispatch = useDispatch();

  const {
    data: roles,
    isLoading,
    error,
    isSuccess: isRolesSuccess,
  } = useGetRoleQuery();

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  // set selected role default to first role
  useEffect(() => {
    if (isRolesSuccess) {
      dispatch(setSelectedRole(roles?.itemList[0].url));
    }
  }, [isRolesSuccess, dispatch, roles]);

  return (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>کارتابل
        </h4>
      </div>

      {isRolesSuccess && selectedRole && (
        <RequestsGrid isLoading={isLoading} roles={roles} />
      )}
    </section>
  );
}

export default CartableScreen;
