// rrd imports
import { Link, useNavigate, useRouteError } from "react-router-dom";

// library imports
import { ArrowUturnLeftIcon, HomeIcon } from "@heroicons/react/24/solid";

function Error() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="errorContainer">
      <div className="errorContainer__message">
        <h1>! به نظر می آید مشکلی پیش آمده است</h1>
        <p>&quot; {error.message || error.statusText} &quot;</p>
      </div>

      <div className="errorContainer__buttons u-margin-top-medium">
        <button
          className="btn btn--dark"
          onClick={() => {
            navigate(-1);
          }}
        >
          صفحه قبل
          <ArrowUturnLeftIcon width={20} />
        </button>
        <Link to="/retirement-organization/" className="btn btn--dark">
          صفحه اصلی
          <HomeIcon width={20} />
        </Link>
      </div>
    </div>
  );
}

export default Error;
