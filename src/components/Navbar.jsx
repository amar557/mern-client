import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useContext, useEffect, useState } from "react";
import { GlobalFunctions } from "../Context/context";
import { RxHamburgerMenu } from "react-icons/rx";
const navdata = [
  { to: "/", name: "home" },
  { to: "/about", name: "about" },
  { to: "/services", name: "services" },
  { to: "/contact", name: "contact" },
  { to: "/register", name: "register" },
];

function Navbar() {
  const { userToken, Logout } = useContext(GlobalFunctions);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  // const { Logout } = useContext(GlobalFunctions);

  useEffect(() => {
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) {
        // console.log(window.innerWidth);
        console.log("barh gaya");
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    });
  }, []);

  function handleNavbar() {
    if (window.innerWidth <= 767) {
      setIsOpen(false);
    } else return;
  }

  return (
    <div className="flex justify-between py-2 items-center md:w-9/12 w-5/6 mx-auto px-3 ">
      <img src={logo} alt="" className="h-16 w-auto invert" />
      <ul
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex gap-5 md:static fixed top-0 right-0 transition-all duration-300 bg-white md:bg-black md:px-0 px-5 py-20 md:py-0 w-1/2 sm:w-1/3 md:w-auto items-center h-full md:h-auto z-10 text-black md:text-white flex-col md:flex-row `}
      >
        <button
          className="absolute top-6 right-6 text-black md:hidden block"
          onClick={() => setIsOpen((open) => !open)}
        >
          <RxHamburgerMenu />
        </button>
        {navdata.map((data, i) => (
          <li key={i} className="capitalize text-sm " onClick={handleNavbar}>
            <NavLink to={data.to} className="relative">
              {data.name}
            </NavLink>
          </li>
        ))}
        {userToken ? (
          <li className="capitalize text-sm " onClick={Logout}>
            logout
          </li>
        ) : (
          <li className="capitalize text-sm ">
            <NavLink to="/login" className="relative">
              login
            </NavLink>
          </li>
        )}
      </ul>
      <button
        className={`text-sm md:hidden z-50 relative  ${
          isOpen ? "hidden" : "block"
        }`}
        onClick={() => setIsOpen((open) => !open)}
      >
        <RxHamburgerMenu />
      </button>
    </div>
  );
}

export default Navbar;
