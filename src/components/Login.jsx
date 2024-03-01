import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../api";

import Input from "./Base/Input";


const Login = () => {
  document.title = "Login | Administartor";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const login = async (e) => {
    e.preventDefault();

    await api
      .post("/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        Cookies.set("token", response.data.token, { secure: true, sameSite: "strict" });
        Cookies.set("user", JSON.stringify(response.data.user), {
          secure: true,
          sameSite: "strict",
        });
        Cookies.set("permissions", JSON.stringify(response.data.permissions), {
          secure: true,
          sameSite: "strict",
        });

        toast.success("Login Successfully!");

        navigate("/dashboard");
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };

  if (Cookies.get("token")) {
    return navigate("/dashboard");
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="my-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {errors.message && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-5"
            role="alert"
          >
            <span className="block sm:inline">{errors.message}</span>
          </div>
        )}

        <form onSubmit={login} className="space-y-6">
          <div>
            <div className="mt-2">
              <Input
                htmlFor="email"
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
              />
            </div>
            {errors.email && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-2"
                role="alert"
              >
                <span className="block sm:inline">{errors.email[0]}</span>
              </div>
            )}
          </div>

          <div>
            <div className="mt-2">
              <Input
                htmlFor="password"
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
            </div>
            {errors.password && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-2"
                role="alert"
              >
                <span className="block sm:inline">{errors.password[0]}</span>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="
              flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 
              text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
              focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
