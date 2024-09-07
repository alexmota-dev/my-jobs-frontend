import React, { useState } from 'react';

const PreviousButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      className="previous-button"
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      viewBox="0 96 960 960"
      width="20"
      style={{
        transition: 'transform 0.2s ease-in-out',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
    </svg>
  );
};

export default PreviousButton;
