import React from "react";

const ButtonRebirded = ({
  children,
  onClick,
  className = "btn btn-outline-primary w-fit",
}) => {
  return (
    <button type="button" className={className} onClick={() => onClick()}>
      {children}
    </button>
  );
};

export default ButtonRebirded;
