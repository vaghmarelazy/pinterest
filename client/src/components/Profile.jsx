import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../stylesheets/Profile.css";
import axios from "axios";
// import './PowerUtilities.css';

const Profile = () => {
  // const [posts, setPosts] = useState(user.posts || []);
  const [loading, setLoading] = useState(true); // Make sure this is declared
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const confirmUpload = () => {
    if (caption) {
      // Handle the upload logic here
      closeModal();
    } else {
      alert("Caption Required!");
    }
  };

  const closeModal = () => {
    setShowUploadModal(false);
    setSelectedImage(null);
    setCaption("");
  };

  const replaceWithInputField = (id, postText) => {
    // Implement the logic to replace the caption with an input field
  };

  const deletePost = (id) => {
    // Implement the logic to delete a pos
  };

  const toggleOptionsMenu = (id) => {
    // Implement the logic to toggle the options menu for a post
  };
  useEffect(() => {
    document.title = "Profile";
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login"); // Redirect if no token
          console.log("Login failed");
          return;
        }

        const response = await axios.get("https://pinterest-swm4.vercel.app//profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("User", response.data);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login"); // Redirect on error
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }

  // Display an error message if user is null
  if (!user) {
    return <p>No user data available.</p>;
  }
  return (
    <div className="profile text-white absolute w-full">
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
        <div className="logout  w-24 h-9 bg-white flex items-center justify-center rounded-full text-black">
          <NavLink
            to="/login"
            className="font-medium w-full h-full flex items-center justify-center text-sm sm:text-base"
          >
            Log out
          </NavLink>
        </div>
      </nav>
      <header className="Background h-[45vh] sm:min-h-[60vh] bg-no-repeat bg-cover bg-slate-900 text-white flex items-center justify-center rounded-xl">
        <div className="details w-full sm:w-[60%] flex items-center justify-center gap-5 m-auto">
          <img
            src={user?.dp}
            alt="Profile Pic"
            className="profile-pic  bg-white w-32 h-32 sm:w-[20vw] sm:h-[18vw] rounded-full shadow-lg"
          />
          <div className="profile-data w-[60vw] sm:w-[30vw] sm:mx-[5vw] flex flex-col justify-center">
            <h2 className="fullName absolute left-14 bottom-20 sm:bottom-0 sm:left-0 sm:relative font-medium sm:mb-3 text-sm sm:text-[2vw] capitalize">
              {/* USERNAME */}
              {user.fullname}
            </h2>
            <p className="username absolute left-14 bottom-16 sm:bottom-0 sm:left-0 sm:relative m-0 text-xs sm:text-[1.2vw]">
              {/* @username */}@{user.username}
            </p>
            <div className="bio italic p-2 rounded-xl mt-3 sm:h-20 bg-gray-800 text-sm sm:text-base">
              <p className="text-[1vw] text-gray-300">
                {/* 'A passionate and creative individual who loves to explore new
                ideas and create beautiful art.' */}
                {user.bio}
              </p>
            </div>
            <div className="ess gap-4 flex flex-col mb-0 mt-3 text-sm sm:text-base">
              <div className="stats flex">
                <div className="col-4 w-1/3 sm:w-[10vw] text-center">
                  <p id="postnums">0{/* {posts.length} */}</p>
                  <p>Posts</p>
                </div>
                <div className="col-4 w-1/3 sm:w-[10vw] text-center">
                  <p>0</p>
                  <p>Likes</p>
                </div>
                <div className="col-4 w-1/3 sm:w-[10vw] text-center">
                  <p>0</p>
                  <p>Followers</p>
                </div>
              </div>
              <div className="wrapper sm:w-full flex justify-between items-center gap-4">
                <NavLink
                  to="/editprofile"
                  className="hoverbtn w-[50%] text-black bg-white p-3 duration-200 font-medium text-xs sm:text-[1vw] text-center rounded-full hover:text-white hover:bg-red-600"
                >
                  Edit Profile
                </NavLink>
                <button
                  id="upload-btn"
                  className="hoverbtn w-[50%] text-black bg-white p-3 duration-200 font-medium text-xs sm:text-[1vw] text-center rounded-full hover:text-white hover:bg-red-600"
                  onClick={() => setShowUploadModal(true)}
                >
                  Upload Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="post w-full text-center underline text-2xl">Posts</div>
        <div className="postContainer">
          {/* {posts.length === 0 && (
            <div id="noPostEle">
              <div className="noPost">
                <div className="camera">
                  <img src="/images/img/camera-svgrepo-com.svg" alt="" />
                </div>
                <div className="txt">No posts.. Upload one</div>
              </div>
            </div>
          )} */}
          <div className="cardcontainer">
            {/* {posts.map((post) => (
              <div className="card" key={post._id}>
                <img src={`/images/uploads/${post.image}`} alt="" />
                <caption id={`caption_${post._id}`}>{post.postText}</caption>
                <div className="dots" onClick={() => toggleOptionsMenu(post._id)}>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <div className="options" id={`options_${post._id}`}>
                  <div id={`menu${post._id}`} className="options-menu">
                    <button
                      data-post-id={post._id}
                      onClick={() => replaceWithInputField(post._id, post.postText)}
                    >
                      Rename
                    </button>
                    <button
                      id={`btn_${post._id}`}
                      onClick={() => deletePost(post._id)}
                    >
                      Delete Post
                    </button>
                  </div>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </section>

      {showUploadModal && (
        <div id="upload-modal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img id="selected-image" src={selectedImage} alt="Selected Image" />
            <div className="upload-container">
              <span id="captionWarn">Caption Required!</span>
              <input
                type="text"
                id="caption-input"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Enter caption"
              />
              <button id="confirm-upload-btn" onClick={confirmUpload}>
                Confirm Upload
              </button>
            </div>
          </div>
        </div>
      )}

      <form
        id="upload-form"
        method="post"
        action="/upload"
        encType="multipart/form-data"
        style={{ display: "none" }}
      >
        <input type="text" name="filecaption" id="caption" />
        <input
          type="file"
          name="file"
          id="file-input"
          accept="image/*"
          onChange={handleFileSelect}
        />
      </form>

      {showPopup && (
        <div className="popup text-black min-w-full min-h-full flex items-center justify-center absolute bg-[#00000092] w-[70%]">
          <div className="main bg-white p-5 sm:p-8 rounded-3xl ">
            <h3 className="font-semibold mb-4 text-sm sm:text-xl">
              Are you sure you want to delete this post?
            </h3>
            <div className="btns flex justify-center items-center gap-6 ">
              <button
                id="Yes"
                style={{ backgroundColor: "red", color: "white" }}
                className="w-16 h-10 rounded-full text-sm sm:text-base"
              >
                Yes
              </button>
              <button
                id="No"
                onClick={() => {
                  setShowPopup(false);
                }}
                className="text-sm sm:text-base"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
