import React from 'react'

const Photo = ({ photo }) => {
  const { urls, width, height } = photo;

  // Determine the orientation
  const orientation = width > height ? "horizontal" : "vertical";

  return (
    <div className={`p-2 rounded-xl overflow-hidden ${orientation === "horizontal" ? "w-[30vw] h-auto" : "w-auto h-[60vh]"}`}>
      <img className={`rounded-xl max-h-full max-w-full object-cover ${orientation === "horizontal" ? "w-full h-auto" : "w-auto h-full"}`} src={urls.regular} />
    </div>
  );
};

export default Photo;
