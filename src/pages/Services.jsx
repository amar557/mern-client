import { useContext, useEffect } from "react";
import { GlobalFunctions } from "../Context/context";

function Services() {
  const { services, servicesData } = useContext(GlobalFunctions);
  useEffect(() => {
    servicesData();
  }, []);

  return (
    <div className="flex flex-wrap gap-5 md:w-9/12 mx-auto justify-between w-10/12 mt-10  ">
      {services.map((e, i) => (
        <div className="md:w-1/5 sm:w-1/4 w-1/3 flex items-center justify-center flex-col">
          <img src={e.image} alt="" className="h-16 w-12" />
          <p className=" text-xs md:text-sm text-center">{e.title}</p>
          <p>{e.dscription}</p>
        </div>
      ))}
    </div>
  );
}

export default Services;
