import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/signin");
  };

  const curentUser = JSON.parse(localStorage.getItem("currentUser")) || [];

  return (
    <div className="w-full h-14 flex justify-between items-center px-8 bg-gray-100 border-b-2 border-[#0290B8] fixed top-0">
      <h2 className="text-lg text-[#0290B8] font-semibold tracking-wider">
        {curentUser.username}
      </h2>
      <button
        onClick={handleLogout}
        className="w-28 flex gap-2 justify-center items-center text-sm text-[#0290B8] hover:text-white font-semibold px-3 py-2 rounded-full border border-[#0290B8] cursor-pointer hover:bg-linear-to-br from-[#53c1de] to-[#0290B8] transition"
      >
        <BiLogOut size={20} />
        <p>Logout</p>
      </button>
    </div>
  );
};
