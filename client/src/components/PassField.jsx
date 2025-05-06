import React from "react";

function PassField({
  label,
  value,
  handleChange,
  disabled = true,
  type = "text",
  name,
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        disabled={disabled}
        onChange={!disabled ? handleChange : undefined}
        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-700"
      />
    </div>
  );
}

export default PassField;
