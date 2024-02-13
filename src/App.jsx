// library imports
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// rrd imports
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
