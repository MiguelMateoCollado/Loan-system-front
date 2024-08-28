import ErrorSign from "./ErrorSign";

import { useContext } from "react";

export const InputType = ({ data, className, textareaClassName, context }) => {
  const { values, handleChange, errors } = useContext(context);
  const { id, label, type, name, placeholder } = data;
  if (type == "textarea") {
    return (
      <div key={id} className={`flex flex-col col-span-2 gap-2`}>
        <label htmlFor={name}>{label}</label>
        <textarea
          id={id}
          className={` ${className} ${textareaClassName} ${
            errors[name] && "border-red-600 bg-red-100 placeholder:text-red-500"
          }   `}
          name={name}
          value={values[name]}
          onChange={handleChange}
          placeholder={placeholder}
        />
        {errors[name] && <ErrorSign errors={errors} name={name} />}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <label htmlFor={name}>{label}</label>
      <input
        id={id}
        type={type || "input"}
        min={0}
        className={`${className} ${
          errors[name] && "border-red-600 bg-red-100 placeholder:text-red-500"
        } `}
        name={name}
        value={values[name]}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {errors[name] && <ErrorSign errors={errors} name={name} />}
    </div>
  );
};
