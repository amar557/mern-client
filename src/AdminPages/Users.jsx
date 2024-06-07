import { useContext, useEffect } from "react";
import { GlobalFunctions } from "../Context/context";
import { useNavigate } from "react-router-dom";

function Users() {
  const { allUsers, getAllUsersData, userToken, port } =
    useContext(GlobalFunctions);
  const navigate = useNavigate();
  useEffect(() => {
    getAllUsersData();
  }, []);

  async function handleDeleteUser(id) {
    const user = await fetch(`${port}/deleteuser/${id}`, {
      headers: {
        Authorization: userToken,
      },
      method: "DELETE",
    });
    const res = await user.json();
    console.log(res.acknowledged);
    if (res.acknowledged) {
      getAllUsersData();
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between w-4/5 mx-auto">
        <p className="w-1/5">name</p>
        <p className="w-1/5">phone</p>
        <p className="w-1/5">email</p>
        <button className="w-1/5">edit</button>
        <button className="w-1/5">delete</button>
      </div>
      <div className="mt-5">
        {allUsers.map((e, i) => (
          <div
            key={i}
            className="flex items-center justify-between w-4/5 mx-auto"
          >
            <p className="w-1/5">{e.username}</p>
            <p className="w-1/5">{e.phone}</p>
            <p className="w-1/5">{e.email}</p>
            <button
              className="w-1/5"
              onClick={() => navigate(`/admin/editform/${e._id}`)}
            >
              edit
            </button>
            <button className="w-1/5" onClick={() => handleDeleteUser(e._id)}>
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
