import React, { useState, useEffect } from 'react';

const InfiniteImageRotation = ({ className }: { className: string }) => {
  const images = [
    './images/1stimage.jpg',
    './images/2ndimage.jpg',
    './images/3rdimage.jpg',
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Rotate every 5 seconds (adjust the time as needed)

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`image-rotation-wrapper ${className}`}>
      <div className="infinite-image-rotation opacity-100">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className={
              index === currentImageIndex ? 'visible opacity-100' : 'hidden'
            }
          />
        ))}
      </div>
    </div>
  );
};

export default InfiniteImageRotation;
