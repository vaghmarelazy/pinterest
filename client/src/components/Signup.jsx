import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import "../stylesheets/Signup.css";
import Popup from "./Popup"; // Adjust the import path as necessary

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); 
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign-Up";
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/ ", {
        fullname :fullName,
        email :email,
        username :username,
         password :password,
      });
      console.log("Registration successful:", response.data);

      // Handle the response to get the token
      const { token } = response.data;
      localStorage.setItem("token", token); // Store the token in local storage

      navigate("/feed"); // Redirect to feed after successful signup
    } catch (err) {
      if (err.response) {
        if (err.response.data.message === "User already exists") {
          setError("User already exists. Please log in.");
        } else {
          setError(err.response.data.message);
        }
      } else {
        setError("Registration failed. Please try again.");
      }
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleClick = () => {
    navigate("/login", { state: { username } });
  };

  return (
    <div className="css-selector min-h-screen">
      <div className="container bg-[rgb(241 245 249 / 12%)] mx-auto my-auto absolute top-1/2 left-1/2 sm:w-[30vw] h-[650px] rounded-2xl -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="content w-full absolute m-auto left-0 right-0 text-center flex flex-col items-center justify-center">
          <img
            className="img1 w-[70px] relative"
            src="https://i.pinimg.com/originals/d3/d1/75/d3d175e560ae133f1ed5cd4ec173751a.png"
            alt="logo"
          />
          <p className="text-white text-3xl leading-[46px] w-fit font-bold mt-10 mb-3">
            Make account to see more
          </p>
          <form
            method="post"
            id="loginOrRegisterForm"
            className="flex flex-col items-center gap-2"
            onSubmit={handleSubmit}
          >
            <input
              className="detail bg-gray-800 bg-opacity-50 rounded-lg p-2 text-white mb-2"
              placeholder="Full name"
              name="fullname"
              type="text"
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              className="detail bg-gray-800 bg-opacity-50 rounded-lg p-2 text-white mb-2"
              name="email"
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="detail bg-gray-800 bg-opacity-50 rounded-lg p-2 text-white mb-2"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="detail bg-gray-800 bg-opacity-50 rounded-lg p-2 text-white mb-2"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="submit"
              className="btn int bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-2xl mt-4"
              value="Register Account"
            />
            <div className="text-white mt-4">Or</div>
            <button
              className="text-white text-sm hover:text-red-500 hover:shadow-md underline"
              onClick={handleClick}
            >
              Already have an account? Log in
            </button>
          </form>
        </div>
      </div>
      {showPopup && error && <Popup message={error} onClose={handleClosePopup} />}
    </div>
  );
}

export default Signup;
