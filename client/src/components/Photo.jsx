// import React from 'react'

// const Photo = ({ photo }) => {
//   const { urls, width, height } = photo;

//   // Determine the orientation
//   const orientation = width > height ? "horizontal" : "vertical";

//   return (
//     <div className={` m-2 gap-2 `}>
//       <img className="photo-img max-w-[50vw] max-h-[60vh] object-cover rounded-xl" src={urls.small} alt="Unsplash" />
//     </div>
//   );
// };

// export default Photo;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/photo.css';

const Photo = ({ photo }) => {
  const { urls, user } = photo;
  const [state, setState] = useState(false);
  const navigate = useNavigate();

  function Hover() {
    setState(true);
  }

  function Hoverout() {
    setState(false);
  }

  function handleUserClick() {
    navigate(`/user/${user.username}`);
  }

  return (
    <div className="h-fit flex relative rounded-xl overflow-hidden" onMouseOver={Hover} onMouseLeave={Hoverout}>
      <img className={`rounded-xl duration-300 object-cover object-center ${state ? "scale-110" : "scale-100"}`} src={urls.regular} alt={user.name} />
      <div
        className={`w-fit flex text-white absolute bottom-1 left-1 items-center gap-1 cursor-pointer ${state ? "opacity-100" : "opacity-0"} duration-200`}
        onClick={handleUserClick}
      >
        <img src={user.profile_image.medium} alt={user.name} className='rounded-full w-[12%]' />
        <p>{user.name}</p>
      </div>
    </div>
  );
};

export default Photo;

