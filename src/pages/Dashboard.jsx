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
  const { data: roles, isLoading, error, isSuccess } = useGetRoleQuery(token);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      setSelectedRole(roles?.itemList[0].itemName);
    }
  }, [isSuccess, roles, setSelectedRole]);

  useEffect(() => {
    console.log(selectedRole);
  }, [selectedRole]);

  return (
    <section className="main flex flex-col">
      <h4 className="title">کارتابل</h4>
      <RoleSelectionForm
        setSelectedRole={setSelectedRole}
        isLoading={isLoading}
        roles={roles}
      />
      <CartableGrid />
    </section>
  );
}

export default Dashboard;
