// react imports
import { useState, useEffect } from "react";

// library imports
import { toast } from "react-toastify";

// redux imports
import { useSelector } from "react-redux";
import { useGetRoleQuery } from "../slices/requestApiSlice";

// component imports
import CartableGrid from "../grids/CartableGrid";
import RoleSelectionForm from "../forms/RoleSelectionForm";

function Dashboard() {
  const { token } = useSelector((state) => state.auth);
  const {
    data: roles,
    isLoading,
    error,
    isSuccess: isRolesSuccess,
  } = useGetRoleQuery(token);

  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  useEffect(() => {
    if (isRolesSuccess) {
      setSelectedRole(roles?.itemList[0].url);
    }
  }, [isRolesSuccess, roles, setSelectedRole]);

  return (
    <section className="main flex flex-col">
      <RoleSelectionForm
        setSelectedRole={setSelectedRole}
        isLoading={isLoading}
        roles={roles}
      />
      <h4 className="title">کارتابل</h4>
      {isRolesSuccess && selectedRole && (
        <CartableGrid selectedRole={selectedRole} />
      )}
    </section>
  );
}

export default Dashboard;
