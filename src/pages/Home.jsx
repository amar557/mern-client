import { useNavigate } from "react-router-dom";
import img from "../assets/registeration-img.jpg";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex bg-black text-white items-center md:flex-row flex-col justify-between w-9/12 mx-auto py-16">
      <div className="md:w-1/2 w-11/12 ">
        <p className="text-xs ">Lorem ipsum dolor sit amet consectetur.</p>
        <h1 className="capitalize my-2 md:text-4xl sm:text-3xl text-2xl font-semibold  pe-8">
          welcome to coding world
        </h1>
        <p className="text-xs text-start mb-5 ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
          suscipit nemo architecto provident mollitia pariatur tenetur ab animi
          assumenda facilis debitis voluptatem, iusto dolores ipsam ipsa?
        </p>
        <button
          onClick={() => navigate("contact")}
          className="bg-blue-500 px-2 py-1 text-white inline-block rounded-lg"
        >
          contact me
        </button>
        <button className="inline-block border border-blue-900 bg-transparent rounded-lg px-2 py-1 ms-2">
          learn more
        </button>
      </div>

      <img src={img} alt="" className="md:w-1/2 w-full md:p-10 py-5" />
    </div>
  );
}

export default Home;
