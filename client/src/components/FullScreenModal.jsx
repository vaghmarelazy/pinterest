import React from 'react';
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const FullScreenModal = ({ photos, currentIndex, onClose, onNext, onPrev }) => {
  const currentPhoto = photos[currentIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <button className="absolute top-4 right-4 text-white text-2xl" onClick={onClose}>
        <AiOutlineClose />
      </button>
      <button className="absolute left-4 text-white text-2xl" onClick={onPrev}>
        <AiOutlineLeft />
      </button>
      <img src={currentPhoto.urls.regular} alt="" className="max-h-screen max-w-screen" />
      <button className="absolute right-4 text-white text-2xl" onClick={onNext}>
        <AiOutlineRight />
      </button>
    </div>
  );
};

export default FullScreenModal;
