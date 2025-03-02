import React, { useContext } from 'react';
import { ImageContext } from '../App';

export const ImageDisplay: React.FC = () => {
  const { images } = useContext(ImageContext);

  return (
    <div className="mt-8">
      {images.length > 0 && (
        <div className="grid-container">
          {images.map((imageData, index) => (
            <div key={index} className="grid-item">
              <img src={imageData} alt={`Captured ${index}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
