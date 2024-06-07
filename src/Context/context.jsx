import { createContext, useEffect, useState } from "react";

const GlobalFunctions = createContext();
function Context({ children }) {
  const [userToken, setUserToken] = useState(localStorage.getItem("token"));
  const [curUser, setCurUser] = useState("");
  const [services, setServices] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const port = "https://mern-stack-4rph.vercel.app";
  function saveInLocalStrg(token) {
    localStorage.setItem("token", token);
    setUserToken(token);
    // console.log(token);
  }

  async function servicesData() {
    const d = await fetch(`${port}/services`, {
      method: "Get",
    });
    const toJson = await d.json();
    setServices(toJson.servicesData);
  }

  useEffect(() => {
    if (userToken) {
      setIsLoading(true);
      async function fetchdata() {
        const data = await fetch(`${port}/user`, {
          headers: {
            Authorization: `${userToken}`,
          },
          method: "GET",
        });
        const d = await data.json();
        setCurUser(d.data);
        setIsLoading(false);
      }
      fetchdata();
    } else {
      setIsLoading(false);
    }
  }, [userToken]);

  async function getAllUsersData() {
    const users = await fetch(`${port}/users`, {
      method: "GET",
      headers: {
        Authorization: userToken,
      },
    });
    const toJson = await users.json();
    setAllUsers(toJson);
  }

  async function getContactsData() {
    const contacts = await fetch(`{${port}/contacts`, {
      method: "GET",
      headers: {
        Authorization: userToken,
      },
    });
    const toJson = await contacts.json();
    setContacts(toJson);
  }

  function Logout() {
    localStorage.removeItem("token");
    setUserToken("");
  }
  return (
    <GlobalFunctions.Provider
      value={{
        saveInLocalStrg,
        Logout,
        userToken,
        curUser,
        services,
        allUsers,
        contacts,
        getContactsData,
        getAllUsersData,
        servicesData,
        isLoading,
        port,
      }}
    >
      {children}
    </GlobalFunctions.Provider>
  );
}
export { Context, GlobalFunctions };
