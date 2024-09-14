import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      {/* Image with heartbeat animation */}
      <img 
        src="/assets/logo.png" 
        alt="Loading..." 
        className="w-50 h-50 animate-heartbeat" 
      />
    </div>
  );
};

export default Loader;

