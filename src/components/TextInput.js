import React from "react";

const TextInput = ({
  label,
  type = "text",
  name,
  id,
  value,
  placeholder,
  onChange,
  required = false,
  className = "",
}) => {
  return (
    <div className="w-full md:w-1/3 my-3 px-4">
      {label && (
        <label htmlFor={id} className="block text-lg font-medium px-4 text-tertiary-500">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
      />
    </div>
  );
};

export default TextInput;
