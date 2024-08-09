import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { createApi } from "unsplash-js";
import Photo from "./Photo";
import "../stylesheets/photo.css";

const api = createApi({
  accessKey: `${import.meta.env.VITE_ACCESS_KEY}`,
});
function Feed() {
  const [value, setValue] = useState(false);
  const [user, setUser] = useState(null);
  const [data, setPhotosResponse] = useState(null);

  const navigate = useNavigate();

  function handleToggle() {
    setValue(!value);
  }

  useEffect(() => {
    document.title = "Feed";

    // Fetch user data
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login"); // Redirect if no token
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_HOST}/feed`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
        console.log("DATA",response.data)
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login"); // Redirect on error
      }
    }
    api.search
      .getPhotos({ query: "random,",color:"black", perPage:30 }) // You can change the query here
      .then((result) => {
        setPhotosResponse(result);
      })
      
      .catch(() => {
        console.log("Something went wrong!");
      });
    fetchData();
  }, [navigate]);

  //Unsplash
  
  console.log(data)
  if (data === null) {
    return <div>Loading...</div>;
  }

  if (data.errors) {
    return (
      <div>
        <div>{data.errors[0]}</div>
        <div>PS: Make sure to set your access token!</div>
      </div>
    );
  }


  function handleClick() {
    if (user) {
      navigate("/profile");
    } else {
      console.error("No user data available");
    }
  }

  const photos = data.response.results
  // console.log(photos)

  // Split photos into 4 columns
  const columns = [[], [], [], []];
  photos.forEach((photo, index) => {
    columns[index % 4].push(photo);
  });

  return (
    <div className="container w-screen min-h-screen bg-neutral-800 overflow-hidden">
      <nav className="flex justify-between items-center sticky w-full max-h-[10vh] z-10 px-4">
        <div className="logo flex text-white w-36 gap-2 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
          <img
            src="https://asset.brandfetch.io/idGP0S1Jjj/idrcPTMuDp.svg?updated=1667560243183"
            alt="logo"
            className="pointer-events-none w-20 sm:w-28 lg:w-40"
          />
          <div className="x text-red-600 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
            X
          </div>
          Lazy
        </div>
        <div className="rightbar flex items-center my-2 gap-3 p-1">
          <div
            className={`search-bar-container active flex items-center justify-between bg-white p-1 h-14 m-2 relative duration-500 shadow rounded-full ${
              value ? "fixed w-screen left-0 top-0 z-20" : ""
            }`}
            style={{ width: value ? "20rem" : "3.5rem" }}
          >
            <img
              src="https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/magnifier-512.png"
              alt="magnifier"
              className="magnifier w-10 cursor-pointer bg-white left-3 rounded-full"
              onClick={handleToggle}
            />
            <input
              type="text"
              className="input outline-none h-8"
              placeholder="Search..."
              style={{
                width: value ? "85%" : "0",
                transition: value ? "width 1s" : "",
              }}
            />
            <img
              src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-25-512.png"
              alt="mic-icon"
              className="mic-icon w-8"
              style={{ width: value ? "35px" : "0" }}
            />
          </div>
          <NavLink
            className="profile w-14 h-14 rounded-full overflow-hidden"
            onClick={handleClick}
          >
            <img src={user?.dp} alt="profile picture" />
          </NavLink>
        </div>
      </nav>
      <div className="photo-columns max-w-full overflow-hidden p-4">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="photo-column">
          {column.map(photo => (
            <Photo key={photo.id} photo={photo} />
          ))}
        </div>
      ))}
    </div>
    </div>
  );
}

export default Feed;
