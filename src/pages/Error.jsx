import { Link, useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="error">
      <h1>Ther is a problem</h1>
      <p>{error.message || error.statusText}</p>
      <button
        className="btn"
        onClick={() => {
          navigate(-1);
        }}
      >
        Boro Aghab
      </button>
      <Link to="/retirement-organization/" className="btn">
        Boro Khone
      </Link>
    </div>
  );
}

export default Error;
