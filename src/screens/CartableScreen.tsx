// react imports
import { useCallback, useEffect, useState } from "react";

// redux improts
import { setSelectedRole } from "@/slices/roleDataSlice.js";
import { useLazyGetRoleQuery } from "@/slices/requestApiSlice";
import { useDispatch, useSelector } from "react-redux";

// TYPES
import { useAppSelector } from "@/hooks/usePreTypesHooks";
// import { RootState } from "@/store";

// component imports
import RequestsGrid from "@/grids/RequestsGrid";

// library imports
import { toast } from "react-toastify";

function CartableScreen() {
  const dispatch = useDispatch();
  const [allRoles, setAllRoles] = useState([]);

  const { selectedRole } = useSelector((state: any) => state.roleData);

  // ACCESS ROLE QUERY
  const [getRoles, { isLoading, isFetching }] = useLazyGetRoleQuery();

  const fetchRoles = useCallback(async () => {
    try {
      const res = await getRoles().unwrap();
      console.log(res);
      dispatch(
        setSelectedRole({
          value: res?.itemList[0].url,
          label: res?.itemList[0].itemName,
        })
      );
      setAllRoles(res?.itemList);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  }, [dispatch, getRoles]);

  useEffect(() => {
    fetchRoles();

    // return () => {
    //   dispatch(setSelectedRole(null));
    //   setAllRoles([]);
    // };
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
