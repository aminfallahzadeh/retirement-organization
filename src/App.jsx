// import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/main.scss";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Outlet />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
