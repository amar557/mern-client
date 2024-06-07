import { useContext, useEffect, useState } from "react";
import img from "../assets/registeration-img.jpg";
import { GlobalFunctions } from "../Context/context";
function Contact() {
  const [messData, setMessData] = useState({});
  const { curUser, port } = useContext(GlobalFunctions);

  function OndataChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setMessData({ ...messData, [name]: value });
  }
  const [userExist, setUserExist] = useState(true);
  useEffect(() => {
    if (userExist && curUser) {
      messData.username = curUser.username;
      messData.email = curUser.email;
      setUserExist(false);
    }
  }, [curUser, messData, userExist]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await fetch(`${port}/form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messData),
      });
    } catch (error) {
      console.log(error);
    }
    setMessData({ message: "" });
  }
  return (
    <div className="w-9/12 py-12 mx-auto">
      <h1 className="text-2xl capitalize font-bold mb-8">contact form</h1>
      <div className="flex items-center md:flex-row flex-col w-full gap-10">
        <form onSubmit={handleSubmit} className="md:w-1/2 w-full">
          <label htmlFor="">user name</label>
          <input
            type="text"
            name="username"
            id=""
            onChange={OndataChange}
            value={messData.username}
            className="w-full py-1 px-2 bg-slate-900 border-0 text-sm"
          />
          <label htmlFor="">email</label>
          <input
            type="email"
            name="email"
            id=""
            onChange={OndataChange}
            value={messData.email}
            className="w-full py-1 px-2 bg-slate-900 border-0 text-sm"
          />
          <label htmlFor="" className="block">
            message
          </label>
          <textarea
            name="message"
            id=""
            value={messData.message}
            cols="30"
            rows="10"
            onChange={OndataChange}
            className="w-full py-1 px-2 bg-slate-900 border-0 text-sm"
          ></textarea>
          <button
            className="bg-blue-500 px-2 py-1 rounded-lg mt-4"
            onClick={handleSubmit}
          >
            submit
          </button>
        </form>
        <div className="md:w-1/2 w-full md:mt-0 mt-4">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Contact;
