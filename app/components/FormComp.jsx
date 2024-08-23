"use client";

const FormComp = ({ children, onSubmit }) => {
  return (
    <form
      encType="multipart/form-data"
      onSubmit={onSubmit}
      className="grid grid-cols-2 w-full place-content-center gap-4"
    >
      {children}
    </form>
  );
};

export default FormComp;
