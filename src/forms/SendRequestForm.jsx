// react imports
import { useState, useEffect } from "react";

// redux imports
import { useGetExpertQuery } from "../slices/requestApiSlice";

// library imports
import { toast } from "react-toastify";

function SendRequestForm() {
  const [expertCombo, setExpertCombo] = useState([]);

  const searchParams = new URLSearchParams(location.search);
  const requestID = searchParams.get("requestID");
  const role = searchParams.get("Role");

  const {
    data: experts,
    isSuccess,
    isLoading,
    isFetching,
    error,
  } = useGetExpertQuery({ conditionValue: 1, role, requestID });

  useEffect(() => {
    if (isSuccess) {
      const data = experts.map((expert) => ({
        id: expert.id,
        name: `${expert.firstName} ${expert.lastName}`,
      }));
      setExpertCombo(data);
    }
  }, [isSuccess, experts]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  const content = (
    <section className="formContainer flex-col flex-center">
      <form method="post" className="inputBox__form"></form>
    </section>
  );

  return content;
}

export default SendRequestForm;
