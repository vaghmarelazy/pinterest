import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { createApi } from "unsplash-js";
import Photo from "./Photo";


const api = createApi({
  accessKey: "gbaLzCoBw615RIlc2mqpDpXtOCoxVa2KDz2loXQG8Uc" // Replace with your Unsplash access key
});



const UnsplashFeed = () => {
  const [data, setPhotosResponse] = useState(null);

  useEffect(() => {
    api.search
      .getPhotos({ query: "aesthetic",  }) // You can change the query here
      .then(result => {
        setPhotosResponse(result);
      })
      .catch(() => {
        console.log("Something went wrong!");
      });
  }, []);

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

  return (
    <div className="feed overflow-hidden">
      <div className="columnUl flex flex-wrap">
        {data.response.results.map(photo => (
          <div key={photo.id} className="li">
            <Photo photo={photo}/>
          </div>
        ))}
      </div>
    </div>
  );
};

function Feed() {
  const [value, setValue] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  function handleToggle() {
    setValue(!value);
  }

  useEffect(() => {
    document.title = "Feed";

    // Fetch user data
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate("/login"); // Redirect if no token
          return;
        }

        const response = await axios.get("http://localhost:3000/feed", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login"); // Redirect on error
      }
    }
    fetchData();
  }, [navigate]);

  function handleClick() {
    if (user) {
      navigate("/profile");
    } else {
      console.error("No user data available");
    }
  }

  return (
    <div className="container w-screen min-h-screen h-full bg-neutral-800 overflow-hidden">
      <nav className="flex justify-between items-center sticky w-full min-h-[10vh] z-10 px-4">
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
            <img
              src={user?.dp}
              alt="profile picture"
            />
          </NavLink>
        </div>
      </nav>
      <div className="h-[90vh] overflow-scroll">
      <UnsplashFeed />
      </div>
    </div>
  );
}

export default Feed;
