// REACT IMPORTS
import { useCallback, useEffect, useState } from "react";

// TYPES
import { ApiError } from "@/types/ApiErrorTypes";

// REDUX
import { setSelectedRole } from "@/slices/roleDataSlice";
import { useLazyGetRoleQuery } from "@/slices/requestApiSlice";
import { useDispatch } from "react-redux";

// HOOKS
import { useAppSelector } from "@/hooks/usePreTypesHooks";

// COMPONENTS
import RequestsGrid from "@/grids/RequestsGrid";

// LIBRARIES
import { toast } from "react-toastify";

function CartableScreen() {
  const dispatch = useDispatch();
  const [allRoles, setAllRoles] = useState([]);

  const { selectedRole } = useAppSelector((state) => state.roleData);

  // ACCESS ROLE QUERY
  const [getRoles, { isLoading, isFetching }] = useLazyGetRoleQuery();

  const fetchRoles = useCallback(async () => {
    try {
      const res = await getRoles().unwrap();
      dispatch(
        setSelectedRole({
          value: res?.itemList[0].url,
          label: res?.itemList[0].itemName,
        })
      );
      setAllRoles(res?.itemList);
    } catch (error) {
      console.log(error);
      const apiError = error as ApiError;
      toast.error(apiError.data?.message || apiError.error, {
        autoClose: 2000,
      });
    }
  }, [dispatch, getRoles]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>کارتابل
        </h4>
      </div>

      {selectedRole && (
        <RequestsGrid isLoading={isLoading || isFetching} roles={allRoles} />
      )}
    </section>
  );
}

export default CartableScreen;
