import { NavLink, Outlet } from "react-router-dom";
import SideBar from "./SideBar";

function Admin() {
  return (
    <div>
      <SideBar />
      <div className="ms-[8.33%]">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
