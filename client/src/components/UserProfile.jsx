import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { createApi } from "unsplash-js";

const api = createApi({
  accessKey: `${import.meta.env.VITE_ACCESS_KEY}`,
});

const UserProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await api.users.get({ username });
        const photos = await api.users.getPhotos({ username, perPage: 20 });
        console.log(photos.response.results);
        setPhotos(photos.response.results);
        setUserData(response.response); // response contains the user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, [username]);

  if (!userData) {
    return <div>Loading...</div>;
  }
  //   const photos = userData.response
  //   console.log(photos);

  return (
    <div className="user-profile text-white absolute w-full">
      <nav className="w-full h-[10vh] fixed flex items-center justify-between px-4">
        <div>
          <NavLink
            to="/feed"
            id="backbtn"
            className=" text-white rounded-3xl text-center flex items-center justify-center hover:bg-white hover:text-black hover:scale-[1.5] h-8 w-8 duration-300"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </NavLink>
        </div>
      </nav>
      <header className="Background h-[45vh] sm:min-h-[60vh] bg-no-repeat bg-cover bg-slate-900 text-white flex items-center justify-center rounded-xl">
        <div className="details w-full sm:w-[60%] flex items-center justify-center gap-5 m-auto">
          <img
            src={userData.profile_image.large}
            alt="Profile Pic"
            className="profile-pic  bg-white w-32 h-32 sm:w-[20vw] sm:h-[18vw] rounded-full shadow-lg"
          />
          <div className="profile-data w-[60vw] sm:w-[30vw] sm:mx-[5vw] flex flex-col justify-center">
            <h2 className="fullName absolute left-14 bottom-20 sm:bottom-0 sm:left-0 sm:relative font-medium sm:mb-3 text-sm sm:text-[2vw] capitalize">
              {/* USERNAME */}
              {userData.name}
            </h2>
            <p className="username absolute left-14 bottom-16 sm:bottom-0 sm:left-0 sm:relative m-0 text-xs sm:text-[1.2vw]">
              {/* @username */}@{userData.username}
            </p>
            <div className="bio italic p-2 rounded-xl mt-3 lg:h-[20vh] sm:h-20 bg-gray-800 text-sm sm:text-base overflow-x-hidden  overflow-scroll">
              <p className="text-[1vw] text-gray-300">
                {/* 'A passionate and creative individual who loves to explore new
                ideas and create beautiful art.' */}
                {userData.bio}
              </p>
            </div>
            <div className="ess gap-4 flex flex-col mb-0 mt-3 text-[10px] sm:text-base">
              <div className="stats flex">
                <div className="col-4 w-1/4 sm:w-[10vw] text-center">
                  <p id="postnums">{userData.total_photos}</p>
                  <p>Posts</p>
                </div>
                <div className="col-4 w-1/4 sm:w-[10vw] text-center">
                  <p>{userData.total_likes}</p>
                  <p>Likes</p>
                </div>
                <div className="col-4 w-1/4 sm:w-[10vw] text-center">
                  <p>{userData.followers_count}</p>
                  <p>Followers</p>
                </div>
                <div className="col-4 w-1/4 sm:w-[10vw] text-center">
                  <p>{userData.downloads}</p>
                  <p>Downloads</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="postContainer mt-4">
          <div className="cardcontainer grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photos) => (
              <div
                key={photos.id}
                className="w-fit flex relative rounded-xl overflow-hidden "
              >
                <img
                  className={`rounded-xl duration-300 object-cover object-center}`}
                  src={photos.urls.regular}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
