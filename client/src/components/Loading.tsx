import React from 'react';
import BarLoader from "react-spinners/BarLoader";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <BarLoader color="#ffffff" />
    </div>
  );
};

export default Loading;