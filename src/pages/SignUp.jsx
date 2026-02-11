import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const isExist = users.find((user) => user.email === values.email);

    if (isExist) {
      setErrorMessage("Email already registered!");
      return;
    }

    users.push(values);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Sign up success! Please sign in.");
    navigate("/signin");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center p-6">
      <div className="max-w-xl w-full">
        {errorMessage && (
          <div className="px-4 py-2 mb-4 text-sm text-slate-700 bg-red-200 border border-slate-700 rounded-md flex justify-between items-center">
            <p>{errorMessage}</p>
            <p
              onClick={() => setErrorMessage("")}
              className="text-slate-700 text-lg font-semibold cursor-pointer"
            >
              X
            </p>
          </div>
        )}
        <div className="max-w-xl w-full shadow-[0px_3px_6px_3px_rgba(0,0,0,0.1)] rounded-lg p-8">
          <h1 className="text-3xl text-center text-[#0290B8] font-bold mb-6">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 w-full">
              <div>
                <label
                  htmlFor="username"
                  className="text-slate-600 text-sm font-semibold block mb-1"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Jhon Doe"
                  className="border-b border-[#0290B8] w-full outline-none py-2 text-sm text-slate-700 focus:border-b-2"
                  onChange={(e) =>
                    setValues({ ...values, username: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-slate-600 text-sm font-semibold block mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="name@gmail.com"
                  className="border-b border-[#0290B8] w-full outline-none py-2 text-sm text-slate-700 focus:border-b-2"
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-slate-600 text-sm font-semibold block mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="*****"
                  className="border-b border-[#0290B8] w-full outline-none py-2 text-sm text-slate-700 focus:border-b-2"
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="w-full p-2 rounded-full bg-linear-to-br from-[#53c1de] to-[#0290B8] text-white cursor-pointer font-semibold hover:scale-99 transition"
              >
                Sign Up
              </button>
              <p className="text-slate-700 text-sm leading-normal text-center mt-4">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-[#0290B8] font-semibold hover:border-b-2"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
