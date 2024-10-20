import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { createApi } from "unsplash-js";
import Photo from "./Photo";
import "../stylesheets/photo.css";

const api = createApi({
  accessKey: `${import.meta.env.VITE_UNSPLASH_API_KEY}`,
});

function Feed() {
  const [value, setValue] = useState(false);
  const [user, setUser] = useState(null);
  const [data, setPhotosResponse] = useState(null);
  const [page, setPage] = useState(1); // Current page
  const [perPage] = useState(20); // Photos per page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [loading, setLoading] = useState(false); // To track loading state
  const [query, setQuery] = useState("Asthetics");

  const navigate = useNavigate();

  function handleToggle() {
    setValue(!value);
  }

  useEffect(() => {
    document.title = "Feed";
    fetchUserData();
    fetchPhotos();
  }, []);

  async function fetchUserData() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/app/login"); // Redirect if no token
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_HOST}/api/feed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      navigate("/app/login"); // Redirect on error
    }
  }

  async function fetchPhotos() {
    setLoading(true); // Set loading true while fetching data
    try {
      const result = await api.search.getPhotos({
        query: query,
        perPage: perPage, // Set the number of photos per page
        page: page, // Use the updated page state
      });

      const totalPhotos = result.response.total;
      setTotalPages(Math.ceil(totalPhotos / perPage));

      if (page === 1) {
        setPhotosResponse(result); // Set new response data for first page
      } else {
        setPhotosResponse((prevData) => ({
          ...prevData,
          response: {
            ...prevData.response,
            results: [...prevData.response.results, ...result.response.results], // Append new results to previous ones
          },
        }));
      }
    } catch (error) {
      console.log("Something went wrong!", error);
    }
    setLoading(false);
  }

  function handlePageChange(newPage) {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      fetchPhotos();
    }
  }

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
      navigate("/api/profile");
    } else {
      console.error("No user data available");
    }
  }

  const photos = data?.response?.results || [];

  const columns = [[], [], []];
  photos.forEach((photo, index) => {
    columns[index % 3].push(photo);
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
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  fetchPhotos();
                }
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

      <div className="w-full text-center sm:text-2xl text-base text-white border-b-2">Showing results for {query}</div>
      {/* Photo Columns */}
      <div className="photo-columns max-w-full overflow-hidden mt-4">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="photo-column">
            {column.map((photo) => (
              <Photo key={photo.id} photo={photo} />
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-center items-center my-4 gap-4">
        <span className="text-white">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          className="bg-white sm:w-1/12 w-2/6 text-black py-2 px-4 rounded-xl border-2-black"
          disabled={page === totalPages || loading}
        >
          Load More
        </button>
      </div>

      <footer className="w-full text-center bg-black">
        <p className="font-mono text-slate-300">
          Developed with ❤️ by{" "}
          <a href="https://github.com/vaghmarelazy" className="font-bold">
            LAZY
          </a>{" "}
          <span>&</span> Powered by⚡
          <a href="https://unsplash.com/">UNSPLASH API</a>
        </p>
      </footer>
    </div>
  );
}

export default Feed;
