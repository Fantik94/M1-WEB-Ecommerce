// src/components/vues/Banner.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Banner = ({ text, image }) => {
  return (
    <div className="relative w-full h-64 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">{text}</h1>
      </div>
    </div>
  );
};

Banner.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Banner;
