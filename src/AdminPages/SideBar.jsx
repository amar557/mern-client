import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <div className="w-1/12 flex flex-col ps-2 fixed top-0 left-0 h-screen bg-slate-300">
      <NavLink to="/admin/users">users</NavLink>
      <NavLink to="/admin/contacts">contacts</NavLink>
    </div>
  );
}

export default SideBar;
