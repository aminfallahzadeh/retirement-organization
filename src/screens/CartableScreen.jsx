// react imports
import { useEffect, useState } from "react";

// redux improts
import { setSelectedRole } from "../slices/roleDataSlice.js";
import { useGetRoleQuery } from "../slices/requestApiSlice";
import { useDispatch, useSelector } from "react-redux";

// component imports
import RequestsGrid from "../grids/RequestsGrid";

// library imports
import { toast } from "react-toastify";

function CartableScreen() {
  const dispatch = useDispatch();
  const [allRoles, setAllRoles] = useState([]);

  const { selectedRole } = useSelector((state) => state.roleData);

  const {
    data: roles,
    isLoading,
    error: rolesError,
    isSuccess: isRolesSuccess,
    refetch,
  } = useGetRoleQuery();

  // set selected role default to first role
  useEffect(() => {
    refetch();
    if (isRolesSuccess) {
      dispatch(
        setSelectedRole({
          value: roles.itemList[0].url,
          label: roles.itemList[0].itemName,
        })
      );
      setAllRoles(roles.itemList);
    }

    return () => {
      dispatch(setSelectedRole(null));
      setAllRoles([]);
    };
  }, [isRolesSuccess, dispatch, roles, refetch]);

  useEffect(() => {
    if (rolesError) {
      console.log(rolesError);
      toast.error(rolesError?.data?.message || rolesError.error, {
        autoClose: 2000,
      });
    }
  }, [rolesError]);

  return (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>کارتابل
        </h4>
      </div>

      {selectedRole && <RequestsGrid isLoading={isLoading} roles={allRoles} />}
    </section>
  );
}

export default CartableScreen;
