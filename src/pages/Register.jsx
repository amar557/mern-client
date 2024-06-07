import { useContext, useState } from "react";
import img from "../assets/registeration-img.jpg";
import { useNavigate } from "react-router-dom";
import { GlobalFunctions } from "../Context/context";
import { toast } from "react-toastify";
function Register() {
  const [registerationData, setRegisterationData] = useState({});
  const { saveInLocalStrg, port } = useContext(GlobalFunctions);
  // console.log(d);
  const navigate = useNavigate();
  function handleInput(e) {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setRegisterationData({ ...registerationData, [name]: value });
  }
  async function handleFormSubmition(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${port}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerationData),
      });
      const res_json = await res.json();

      if (res.ok) {
        saveInLocalStrg(res_json.token);
        setRegisterationData({
          username: "",
          password: "",
          phone: "",
          email: "",
        });
        navigate("/");
      } else {
        toast.error(
          res_json.extradetails ? res_json.extradetails : res_json.message
        );
      }
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <div className="flex items-start md:flex-row flex-col-reverse w-9/12 mx-auto justify-between gap-16 pb-16 mt-8">
      <img src={img} alt="" className="md:w-[40%] w-full pt-16" />
      <div className="md:w-1/2 w-full">
        <h1 className="text-2xl font-bold capitalize mb-8">
          registeration form
        </h1>
        <form action="" onSubmit={handleFormSubmition}>
          <label htmlFor="" className="block mb-2 capitalize text-slate-200">
            username
          </label>
          <input
            type="text"
            name="username"
            onChange={handleInput}
            required
            value={registerationData.username}
            className="px-2 block mb-2 w-full outline-none p-1 text-sm bg-slate-700"
          />
          <label htmlFor="" className="block mb-2 capitalize text-slate-200">
            email
          </label>
          <input
            type="email"
            name="email"
            onChange={handleInput}
            required
            className="block mb-2 w-full outline-none p-1 text-sm bg-slate-700 px-2"
            value={registerationData.email}
          />
          <label htmlFor="" className="block mb-2 capitalize text-slate-200">
            phone
          </label>
          <input
            type="number"
            name="phone"
            onChange={handleInput}
            required
            value={registerationData.phone}
            className="block mb-2 w-full outline-none p-1 text-sm bg-slate-700 px-2"
          />
          <label htmlFor="" className="block mb-2 capitalize text-slate-200">
            password
          </label>
          <input
            type="password"
            onChange={handleInput}
            name="password"
            value={registerationData.password}
            required
            className="block mb-2 w-full outline-none p-1 text-sm bg-slate-700 px-2"
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-400 px-2 py-1 text-white uppercase font-medium mt-2"
            onClick={handleFormSubmition}
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
