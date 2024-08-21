"use client";

const FormComp = ({ children, onSubmit }) => {
  return (
    <form
      encType="multipart/form-data"
      onSubmit={onSubmit}
      className="grid grid-cols-2 container gap-x-4 align-middle "
    >
      {children}
    </form>
  );
};

export default FormComp;
