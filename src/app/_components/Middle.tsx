
import React from "react";

const Middle = ({ text }: { text: string }) => {
  return (
    <>
      <div className="relative h-[90vh] w-[70vw] rounded-2xl border-8 border-white bg-gray-50 shadow-2xl">
        {text}
      </div >
    </>
  );
};

export default Middle;
