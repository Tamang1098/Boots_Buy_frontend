import React, { useEffect, useState } from 'react';
import './Homepage.css';
import backgroundImage1 from '../assets/home.webp';
import backgroundImage2 from '../assets/home2.png';

export default function Homepage() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage-slider">
      <div
        className="slider-track"
        style={{ transform: `translateX(-${slideIndex * 100}vw)` }}
      >
        <div
          className="slide"
          style={{ backgroundImage: `url(${backgroundImage1})` }}
        ></div>
        <div
          className="slide"
          style={{ backgroundImage: `url(${backgroundImage2})` }}
        ></div>
      </div>
    </div>
  );
}
