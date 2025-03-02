import React, { createContext, useState, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { QRDisplay } from './components/QRDisplay';
import { ClientCapture } from './components/ClientCapture';
import { ImageDisplay } from './components/ImageDisplay';

interface ImageContextProps {
  images: string[];
  addImage: (imageData: string) => void;
}

export const ImageContext = createContext<ImageContextProps>({
  images: [],
  addImage: () => { },
});

export default function App() {
  const [images, setImages] = useState<string[]>([]);

  const addImage = useCallback((imageData: string) => {
    setImages((prevImages) => [...prevImages, imageData]);
  }, []);

  return (
    <ImageContext.Provider value={{ images, addImage }}>
      <div className="container">
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/client" element={<ClientCapture />} />
        </Routes>
      </div>
    </ImageContext.Provider>
  );
}

function MainScreen() {
  const location = useLocation();
  return (
    <>
      {location.pathname === '/' && <QRDisplay />}
      <ImageDisplay />
    </>
  )
}
