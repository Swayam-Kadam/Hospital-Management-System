import React, { useState,useEffect } from "react";

const HomeImage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
   "/doctor/Home1.jpg",
   "/doctor/Home2.jpg",
   "/doctor/Home3.jpg",
  ];

  const texts = [
    "Preventive Care is the need of the hour <br/> Wide range of health check packages available.",
    "Corporate Services for <br/> Pre Employment &amp; Periodic Health Checks",
    "Preventive Health Checks, Diagnostics, <br/> Specialist Consultation, Pharmacy, all under one roof." ,
  ];

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

   // Auto-slide every 3 seconds
   useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, );

  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      {/* Indicators */}
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={index === activeIndex ? "active" : ""}
            aria-current={index === activeIndex ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          ></button>
        ))}
      </div>

      {/* Carousel Items */}
      <div className="carousel-inner">
        {images.map((src, index) => (
          <div key={index} className={`carousel-item ${index === activeIndex ? "active" : ""}`} style={{ position: "relative" }}>
            {/* Image */}
            <img
              className="d-block w-100 img-fluid"
              src={src}
              alt={`Slide ${index + 1}`}
              style={{
                height: "auto",
                objectFit: "cover",
              }}
            />

            {/* Overlay */}
            <div className="overlay"></div>

            {/* Text Overlay */}
            <div className="carousel-caption">
              <h2 className="text-box" dangerouslySetInnerHTML={{ __html: texts[index] }}></h2>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" onClick={handlePrev}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next" onClick={handleNext}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>

      {/* Custom Styles */}
      <style>
        {`
          /* Overlay */
          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6); /* Dark transparent overlay */
            z-index: 1;
          }

          /* Text Box */
          .text-box {
            position: relative;
            margin: 0 auto;
            padding: 15px 30px;
            border-radius: 10px;
            display: inline-block;
            color: white;
            z-index: 2;
            font-size: 1.5rem;
            font-weight: bold;
          }

          /* Center text in the middle of the carousel */
          .carousel-caption {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            z-index: 3;
            width: 100%;
          }

          /* Ensure height for desktop */
          @media (min-width: 992px) {
            .carousel-inner img {
              height: 35rem !important; /* Fixed height for Desktop */
            }
          }

          /* Responsive for Mobile (No Fixed Height) */
          @media (max-width: 991px) {
            .carousel-inner img {
              height: auto !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default HomeImage;
