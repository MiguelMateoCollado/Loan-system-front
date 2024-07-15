import ErrorSign from "./ErrorSign";
import ClientCreatorContext from "../context/clientCreatorContext";
import { useContext } from "react";

export const InputType = ({ data, className, textareaClassName }) => {
  const { values, handleChange, errors } = useContext(ClientCreatorContext);
  const { id, label, type, name, placeholder } = data;
  if (type == "textarea") {
    return (
      <div
        key={id}
        className={`flex flex-col ${
          type == "textarea" ? "col-span-2" : "col-span-1"
        }  gap-2`}
      >
        <label htmlFor="name">{label}</label>
        <textarea
          id={id}
          className={` ${className} ${textareaClassName}  `}
          name={name}
          value={values[name]}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={id}
        type={type || "input"}
        className={`${className} ${
          errors[name] && "border-red-600 bg-red-100 placeholder:text-red-500"
        } `}
        name={name}
        value={values[name]}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {errors[name] && <ErrorSign>{errors[name]}</ErrorSign>}
    </div>
  );
};
