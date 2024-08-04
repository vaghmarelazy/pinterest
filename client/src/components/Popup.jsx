import { React, useEffect } from "react";
import "../stylesheets/popup.css";

const Popup = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="popup">
      <span className="material-symbols-outlined">info</span>
      {message}
      <div className="popup-border"></div>
    </div>
  );
};

export default Popup;
