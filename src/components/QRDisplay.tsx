import React from 'react';
import QRCode from 'qrcode.react';

export const QRDisplay: React.FC = () => {
  const fullUrl = `${window.location.origin}/client`;

  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <p className="text-lg text-gray-600 mb-4">Scan to capture</p>
      <QRCode value={fullUrl} size={256} level="H" className="rounded-lg" />
    </div>
  );
};
