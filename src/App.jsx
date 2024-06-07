import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Services from "./pages/Services";
import Layout from "./pages/Layout";
import Admin from "./AdminPages/Admin";
import Users from "./AdminPages/Users";
import Contacts from "./AdminPages/Contacts";
import Dashboard from "./AdminPages/Dashboard";
import UpdateForm from "./AdminPages/UpdateForm";
import { useContext } from "react";
import { GlobalFunctions } from "./Context/context";

function App() {
  const { curUser, isLoading, userToken } = useContext(GlobalFunctions);
  console.log();
  if (isLoading) return;
  return (
    <div className="bg-black text-white ">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<Home />} index path="/" />
            <Route element={<About />} path="about" />
            <Route element={<Contact />} path="contact" />
            <Route element={<Register />} path="register" />
            <Route element={<Login />} path="login" />
            <Route element={<Services />} path="services" />
          </Route>
          <Route
            path="/admin"
            element={
              !curUser.isAdmin || !userToken ? <Navigate to="/" /> : <Admin />
            }
          >
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/contacts" element={<Contacts />} />
            <Route path="/admin/editform/:id" element={<UpdateForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
    </div>
  );
}

export default App;
