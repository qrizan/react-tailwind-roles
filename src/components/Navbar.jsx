import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import api from "../api";


const Navbar = () => {
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();
    await api.post("/api/logout").then(() => {
      Cookies.remove("user");
      Cookies.remove("token");
      Cookies.remove("permissions");

      toast.success("Logout Successfully!", {
        position: "top-right",
        duration: 1000,
      });

      navigate("/");
    });
  };

  const user = JSON.parse(Cookies.get("user"));

  return (
    <nav className="bg-indigo-700 shadow-inner p-4 flex items-center justify-between">
      <div>
        <h1 className="text-white text-xl font-semibold">Base Application</h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-white">{user.name}</span>
        <Link onClick={logout} className="block px-4 py-2 text-sm text-gray-300">
          Sign out
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
