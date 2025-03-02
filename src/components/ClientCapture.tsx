import React, { useRef, useContext, useEffect, useState } from 'react';
    import { ImageContext } from '../App';

    export const ClientCapture: React.FC = () => {
      const { addImage } = useContext(ImageContext);
      const videoRef = useRef<HTMLVideoElement>(null);
      const canvasRef = useRef<HTMLCanvasElement>(null);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        const startCamera = async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
              video: {
                facingMode: { ideal: 'environment' }
              } 
            });
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          } catch (err:any) {
            setError(err.message);
          }
        };

        startCamera();

        return () => {
          if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
          }
        };
      }, []);

      const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
          const context = canvasRef.current.getContext('2d');
          if (context) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
            const imageData = canvasRef.current.toDataURL('image/png');
            addImage(imageData);

            const stream = videoRef.current.srcObject as MediaStream | null;
            if(stream) {
              const tracks = stream.getTracks();
              tracks.forEach(track => track.stop());
            }
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
          }
        }
      };

      return (
        <div className="flex flex-col items-center">
          {error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <>
              <video ref={videoRef} autoPlay className="mb-4 rounded-lg shadow-md w-full max-w-md" />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              <button className="btn" onClick={capturePhoto}>
                Capture
              </button>
            </>
          )}
        </div>
      );
    };
