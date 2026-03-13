import "./Campus.css";
import { useEffect, useState } from "react";
import campus5 from "../../assets/campus5.jpeg";
import campus3 from "../../assets/campus3.jpeg";
import campus7 from "../../assets/campus7.jpeg";
import campus1 from "../../assets/campus1.jpeg";
import campus4 from "../../assets/campus4.jpeg";
import campus6 from "../../assets/campus6.jpeg";
import campus8 from "../../assets/campus8.jpeg";
import campus9 from "../../assets/campus9.jpeg";
import campus10 from "../../assets/campus10.jpeg";
import campus12 from "../../assets/campus12.jpeg";
import campus13 from "../../assets/campus13.jpeg";
import campus14 from "../../assets/campus14.jpeg";
import campus15 from "../../assets/campus15.jpeg";
import campus16 from "../../assets/campus16.jpeg";
import campus17 from "../../assets/campus17.jpeg";
import campus18 from "../../assets/campus18.jpeg";
import campus19 from "../../assets/campus19.jpeg";
import campus20 from "../../assets/campus20.jpeg";
import campus21 from "../../assets/campus21.jpeg";
import campus22 from "../../assets/campus22.jpeg";


import white_arrow from "../../assets/white-arrow.png";

const Campus = () => {
  const images = [campus7, campus5, campus3, campus9, campus1, campus4, campus6, campus8, campus10, campus12, campus13, campus14, campus15, campus16, campus17, campus18, campus19, campus20, campus21, campus22]; // Array of images
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide
  const [showGallery, setShowGallery] = useState(false); // Track the gallery view state

  // Slideshow effect with automatic slide change every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === images.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [images.length]);

  // Function to open the full gallery
  const openGallery = () => {
    setShowGallery(true);
  };

  // Function to close the gallery view
  const closeGallery = () => {
    setShowGallery(false);
  };

  return (
    <div className="campus">
      <div className="gallery">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Campus"
            className={index === currentSlide ? "active" : ""}
          />
        ))}
      </div>
      <div className="button-container">
     <button className="btn dark-btn" onClick={openGallery}>
      See more here <img src={white_arrow} alt="arrow" />
     </button>
      </div>

      {/* Modal for full gallery view */}
      {showGallery && (
        <div className="modal">
          <span className="close-btn" onClick={closeGallery}>X</span>
          <div className="modal-gallery">
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Campus ${index + 1}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Campus;
