import React from 'react';
import { Zap } from 'lucide-react';

export const GravityButton = ({ children = "Launch Session", className = "" }) => {
  return (
    <div className={`levitate-wrapper ${className}`}>
      {/* Magnetic Repulsion Halo */}
      <div className="levitation-halo" />
      
      {/* Floating Button Body */}
      <button className="gravity-btn">
        <div className="gravity-btn-blobs">
          <div className="gravity-blob blob-1" />
          <div className="gravity-blob blob-2" />
          <div className="gravity-blob blob-3" />
        </div>
        
        <Zap size={20} className="text-white relative z-10" />
        <span className="gravity-btn-text">{children}</span>
      </button>
    </div>
  );
};

export default GravityButton;
