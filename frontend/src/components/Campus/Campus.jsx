import "./Campus.css";
import { useEffect, useState } from "react";
import api from "../../services/api";

import white_arrow from "../../assets/white-arrow.png";

const Campus = () => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide
  const [showGallery, setShowGallery] = useState(false); // Track the gallery view state

  useEffect(() => {
    const fetchCampusImages = async () => {
      try {
        const { data } = await api.get("/gallery");
        const campusItems = (data || [])
          .filter((item) => item.mediaType === "image")
          .filter((item) => (item.category || "").toLowerCase() === "campus")
          .map((item) => item.imageUrl);

        setImages(campusItems);
      } catch (error) {
        console.error("Error loading campus images:", error);
        setImages([]);
      }
    };

    fetchCampusImages();
  }, []);

  // Slideshow effect with automatic slide change every 3 seconds
  useEffect(() => {
    if (!images.length) return undefined;

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
        {images.length > 0 ? (
          images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Campus"
              className={index === currentSlide ? "active" : ""}
            />
          ))
        ) : (
          <div className="text-white text-center py-10">Campus images are loading...</div>
        )}
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
