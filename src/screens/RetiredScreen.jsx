// react imports
import { useEffect } from "react";

// rrd imports
import { useNavigate } from "react-router-dom";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { setPersonID } from "../slices/retiredStateSlice";

// components
import IndividualInfoSection from "../sections/retired/IndividualInfoSection";
import RelatedInfoSection from "../sections/retired/RelatedInfoSection";

function RetiredScreen() {
  const { selectedRequestData } = useSelector((state) => state.requestsData);
  const personID = selectedRequestData?.personId;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRequestData) {
      dispatch(setPersonID(selectedRequestData.personId));
    }
  }, [selectedRequestData, dispatch]);

  useEffect(() => {
    if (selectedRequestData.length === 0) {
      navigate("/retirement-organization/dashboard");
    }
  }, [navigate, selectedRequestData]);

  return (
    <div className="main">
      <IndividualInfoSection personID={personID} />
      <RelatedInfoSection />
    </div>
  );
}

export default RetiredScreen;
