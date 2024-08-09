import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Popup from "./Popup";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
},[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${import.meta.env.VITE_HOST}/login`, {
          username,
          password,
        });
      console.log("Login success:", response.data);
      const token = response.data.token;
      localStorage.setItem("token", token); // Save token in localStorage
      navigate("/feed");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred during login.");
      }
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleClosePopup = () => {
    setShowError(false);
  };

  return (
    <div className="css-selector min-h-screen">
      {showError && error && (
        <Popup message={error} onClose={handleClosePopup} />
      )}
      <div className="container bg-[rgb(241 245 249 / 12%)] mx-auto my-auto absolute top-1/2 left-1/2 sm:w-[30vw] h-[650px] rounded-2xl -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="content w-full absolute m-auto left-0 right-0 text-center flex flex-col items-center justify-center">
          <img
            className="img1 w-[70px] relative"
            src="https://i.pinimg.com/originals/d3/d1/75/d3d175e560ae133f1ed5cd4ec173751a.png"
            alt="logo"
          />
          <p className="text-white text-3xl font-bold font-[Poppins] mb-6">
            Welcome back
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              name="username"
              type="text"
              placeholder="Username"
              className={`detail bg-gray-800 bg-opacity-50 rounded-lg p-2 text-white mb-1 ${error ? "border-2 border-red-600" : ""}`}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <br />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className={`detail bg-gray-800 bg-opacity-50 rounded-lg p-2 text-white mb-1 ${error ? "border-2 border-red-600" : ""}`}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSubmit(e);
              }}
            />
            <br />
            <button
              type="submit"
              className="btn int flex items-center justify-center text-white bg-red-700 w-[60%] mx-auto h-10 rounded-2xl border-none hover:bg-red-800 duration-300 font-semibold"
            >
              Log In
            </button>
            <NavLink
              to="/"
              className="mt-8 text-white hover:text-red-600 text-sm underline"
            >
              Don't have an account? Make one
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
