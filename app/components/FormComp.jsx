"use client";

const FormComp = ({ children, onSubmit, className, context }) => {
  
  return (
    <form
      encType="multipart/form-data"
      onSubmit={onSubmit}
      className={`grid ${className} grid-cols-2 w-full place-content-start p-4 gap-4`}
    >
      {children}
    </form>
  );
};

export default FormComp;
