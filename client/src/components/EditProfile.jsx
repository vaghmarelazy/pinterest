import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "./Popup"; // Adjust the import path as necessary

function EditProfile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newFullName, setNewFullName] = useState("");
  const [newBio, setNewBio] = useState("");
  const [dp, setDp] = useState("");
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Edit Profile";
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login"); // Redirect if no token
          console.log("Login failed");
          return;
        }

        const response = await axios.get("https://pinterest-swm4.vercel.app//editprofile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("User", response.data);
        const userData = response.data.user;
        setUser(userData);
        setNewBio(userData.bio);
        setNewFullName(userData.fullname);
        setNewUsername(userData.username);
        setDp(userData.dp);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login"); // Redirect on error
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>No user data available.</p>;
  }

  async function handleChange(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const update = await axios.post(
        "http://localhost:3000/editprofile",
        {
          newUsername,
          newFullName,
          newBio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = update.data.user;
      setUser(userData);
      setNewBio(userData.bio);
      setNewFullName(userData.fullname);
      setNewUsername(userData.username);
      setDp(userData.dp);
      setShowPopup(true)
      setError(update.data.message)
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      setShowPopup(true);
      console.error("Error updating profile:", error);
    }
  }

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div id="container" className="css-selector min-h-screen w-full ">
      {showPopup && error && <Popup message={error} onClose={handleClosePopup} />}
      <NavLink
        to="/profile"
        id="backbtn"
        className="absolute top-4 left-2 w-12 h-12 text-white hover:scale-[1.2] rounded-full scale-100 hover:bg-white hover:text-black transition duration-300 flex items-center justify-center"
      >
        <span className="material-symbols-outlined text-lg p-2">
          arrow_back
        </span>
      </NavLink>
      <div className="container p-4 bg-opacity-50 backdrop-blur-lg md:w-[40vw] lg:w-[30vw] rounded-2xl absolute left-0 top-0 bottom-0 right-0 m-auto h-[95vh]">
        <div className="flex flex-col items-center justify-center">
          <div className="profilepic w-32 h-32 rounded-full overflow-hidden sm:w-[20vw] sm:h-[18vw] md:w-28 md:h-28 lg:w-36 lg:h-36">
            <img
              src={dp}
              alt="Profile"
              className="w-full h-full object-cover bg-white rounded-full shadow-lg"
            />
          </div>
          <p className="ml-4 text-lg text-white cursor-pointer">
            Change profile photo
          </p>
        </div>

        <form onSubmit={handleChange}>
          <label htmlFor="name" className="block mb-2 text-lg text-white">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="fullName"
            value={newFullName}
            className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 rounded-md text-white"
            onChange={(e) => setNewFullName(e.target.value)}
          />
          <br />

          <label
            htmlFor="username"
            className="block mt-4 mb-2 text-lg text-white"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={newUsername}
            className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 rounded-md text-white"
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <br />

          <label htmlFor="bio" className="block mt-4 mb-2 text-lg text-white">
            Bio:
          </label>
          <textarea
            style={{ height: "20vh" }}
            name="bio"
            id="bio"
            value={newBio}
            className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 rounded-md resize-none text-white"
            onChange={(e) => setNewBio(e.target.value)}
          ></textarea>
          <br />

          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-white text-black rounded-md font-medium hover:bg-red-600 hover:text-white transition duration-300 focus:outline-none"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
