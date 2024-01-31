// component imports
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";

// library imports
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// rrd imports
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";

const router = createBrowserRouter([
  {
    errorElement: <Error />,
    children: [
      {
        path: "/retirement-organization/",
        element: <Login />,
      },
      {
        errorElement: <Error />,
        path: "/retirement-organization/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;
