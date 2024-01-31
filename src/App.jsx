// import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./providers/AuthProvider";
import Error from "./pages/Error";

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
