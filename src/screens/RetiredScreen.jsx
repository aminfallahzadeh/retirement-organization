// react imports
import { useEffect } from "react";

// rrd imports
import { useNavigate } from "react-router-dom";

// redux imports
import { useSelector } from "react-redux";

// components
import IndividualInfoSection from "../sections/retired/IndividualInfoSection";
import RelatedInfoSection from "../sections/retired/RelatedInfoSection";

function RetiredScreen() {
  const { selectedRequestData } = useSelector((state) => state.requestsData);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRequestData.length === 0) {
      navigate("/retirement-organization/dashboard");
    }
  }, [navigate, selectedRequestData]);

  return (
    <div className="main">
      <IndividualInfoSection />
      <RelatedInfoSection />
    </div>
  );
}

export default RetiredScreen;
