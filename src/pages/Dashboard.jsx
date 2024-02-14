// redux imports
import { useSelector } from "react-redux";

// rrd imports
import { useNavigate } from "react-router-dom";

// react imports
import { useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate("/retirement-organization/");
    }
  }, [userInfo, navigate]);

  return (
    <div className="dashboard">
      <h1>خوش آمدید</h1>
    </div>
  );
}

export default Dashboard;
