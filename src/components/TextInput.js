import React from "react";

const TextInput = ({
  label,
  type = "text",
  name,
  id,
  autoComplete = "false",
  value,
  placeholder,
  onChange,
  required = false,
  className = "",
}) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className="block text-lg mx-2 font-medium text-white">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={id}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`mt-1 p-2 border w-full bg-blue-100 placeholder-gray-500 rounded-md focus:ring-2 focus:ring-yellow-300 focus:outline-none ${className}`}
      />
    </>
  );
};

export default TextInput;
