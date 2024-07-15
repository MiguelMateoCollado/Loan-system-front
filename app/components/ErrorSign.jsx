import React from "react";

const ErrorSign = ({children}) => {
  return (
    <div className="bg-red-600 p-1 my-2 rounded-md w-fit text-white">
      {children}
    </div>
  );
};

export default ErrorSign;
