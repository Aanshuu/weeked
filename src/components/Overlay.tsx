'use client';
import React, { ReactNode } from 'react';

interface OverlayProps {
  children: ReactNode;
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ children, onClose }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleClick}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg"
        style={{
          transform: 'translateY(-160%)', // Adjust this value to move the modal up or down
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Overlay;
