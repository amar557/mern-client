import { useContext, useState } from "react";
import img from "../assets/registeration-img.jpg";
import { useNavigate } from "react-router-dom";
import { GlobalFunctions } from "../Context/context";
import { toast } from "react-toastify";

function Login() {
  const [loginData, setLoginData] = useState({});
  const { saveInLocalStrg, port } = useContext(GlobalFunctions);
  const navigate = useNavigate();
  function onValueChanges(e) {
    let name = e.target.name;
    let value = e.target.value;

    setLoginData({ ...loginData, [name]: value });
  }
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${port}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      let state = await res.json();
      if (res.ok) {
        saveInLocalStrg(state.token);
        toast.success("logged in successfully");
        navigate("/");
        setLoginData({ email: "", password: "" });
      } else {
        toast.error(state.extradetails ? state.extradetails : state.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }
  return (
    <div className="flex items-start md:flex-row flex-col-reverse w-9/12 mx-auto justify-center gap-12 px- pb-16 mt-8 ">
      <img src={img} alt="" className="md:w-1/2 w-full p-6 " />
      <div className="md:w-1/2 w-full">
        <h1 className="text-2xl font-bold capitalize mb-8">login form </h1>
        <form action="" onSubmit={handleLogin}>
          <label htmlFor="" className="block mb-2 capitalize text-slate-200">
            email
          </label>
          <input
            type="email"
            name="email"
            onChange={onValueChanges}
            required
            id="5"
            className="block mb-2 w-full outline-none p-1 text-sm bg-slate-700 px-2"
            value={loginData.email}
          />

          <label htmlFor="" className="block mb-2 capitalize text-slate-200">
            password
          </label>
          <input
            type="password"
            onChange={onValueChanges}
            name="password"
            value={loginData.password}
            required
            id="6"
            className="block mb-2 w-full outline-none p-1 text-sm bg-slate-700 px-2"
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-400 px-2 py-1 text-white uppercase font-medium "
            onClick={handleLogin}
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
