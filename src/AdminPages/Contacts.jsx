import { useContext, useEffect } from "react";
import { GlobalFunctions } from "../Context/context";

function Contacts() {
  const { contacts, getContactsData, userToken, port } =
    useContext(GlobalFunctions);

  useEffect(() => {
    getContactsData();
  }, []);
  async function handleDelete(id) {
    try {
      const find = await fetch(`${port}/deletecontact/${id}`, {
        method: "DELETE",
        headers: { Authorization: userToken },
      });
      const f = await find.json();
      console.log(f);
      if (f.y.acknowledged) {
        getContactsData();
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(contacts);
  return (
    <div className="text-white w-1/2 bg-slate-500 px-5 mx-auto">
      <div className="flex justify-between items-center">
        <p className="text-sm ">name</p>
        <p className="text-sm ">email</p>
        <p className="text-sm ">message</p>
        <button className="text-sm ">edit</button>
        <button className="text-sm ">delete</button>
      </div>
      {contacts.map((d) => (
        <div className="flex justify-between items-center">
          <p className="text-sm ">{d.username}</p>
          <p className="text-sm ">{d.email}</p>
          <p className="text-sm ">{d.message}</p>
          <button className="text-sm  " onClick={() => handleDelete(d._id)}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Contacts;
