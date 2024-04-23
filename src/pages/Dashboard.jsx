// react imports
import { useState, useEffect } from "react";

// library imports
import { toast } from "react-toastify";

// redux imports
import { useGetRoleQuery } from "../slices/requestApiSlice";

// component imports
import CartableGrid from "../grids/CartableGrid";
import RoleSelectionForm from "../forms/RoleSelectionForm";

function Dashboard() {
  const {
    data: roles,
    isLoading,
    error,
    isSuccess: isRolesSuccess,
  } = useGetRoleQuery();

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
    <section className="main flex-col">
      <div className="flex-row flex-row--grow">
        <h4 className="title-primary">کارتابل</h4>
        <RoleSelectionForm
          setSelectedRole={setSelectedRole}
          isLoading={isLoading}
          roles={roles}
        />
      </div>
      {isRolesSuccess && selectedRole && (
        <CartableGrid selectedRole={selectedRole} />
      )}
    </section>
  );
}

export default Dashboard;
