import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalFunctions } from "../Context/context";
import { toast } from "react-toastify";

function UpdateForm() {
  const params = useParams();
  const { userToken } = useContext(GlobalFunctions);
  const [userData, setUserData] = useState({});
  const onChangeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setUserData({ ...userData, [name]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const req = await fetch(`http://localhost:4000/updateusers/${params.id}`, {
      method: "PATCH",
      headers: {
        Authorization: userToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (req.ok) {
      toast.success("updated data successfully");
    } else {
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    async function findUser() {
      const user = await fetch(`http://localhost:4000/finduser/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: userToken,
        },
      });
      const ts = await user.json();
      setUserData(ts.user);
    }
    findUser();
  }, [params.id]);

  return (
    <div className="py-5 px-5">
      <h1>update data</h1>

      <form action="" className="text-black space-y-2">
        <label htmlFor="" className="capitalize block text-white">
          username
        </label>
        <input
          type="text"
          name="username"
          id=""
          onChange={onChangeHandler}
          value={userData.username}
          className="text-black w-1/2 outline-none"
        />
        <label htmlFor="" className="capitalize block text-white">
          email
        </label>
        <input
          type="email"
          name="email"
          id=""
          onChange={onChangeHandler}
          value={userData.email}
          className="outline-none text-black w-1/2"
        />
        <label htmlFor="" className="capitalize block text-white">
          phone
        </label>
        <input
          type="number"
          name="phone"
          id=""
          onChange={onChangeHandler}
          value={userData.phone}
          className="text-black w-1/2 block outline-none"
        />
        <button
          onClick={submitHandler}
          className="text-black px-2 py-1 rounded-lg bg-white"
        >
          submit
        </button>
      </form>
    </div>
  );
}

export default UpdateForm;
