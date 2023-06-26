import React from 'react'

export const Loading = () => {
  return (
    <div className="flex-1 h-full w-full grid place-items-center bg-black/60 backdrop-blur-lg">
      <span className="loader"></span>
    </div>
  );
}
