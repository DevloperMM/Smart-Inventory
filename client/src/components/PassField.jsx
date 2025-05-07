import React from "react";

function PassField({ label, value, onChange, onClick, name, type = "text" }) {
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
        onChange={onChange}
        onClick={onClick}
        className="border border-gray-500 rounded-md px-3 py-2 text-gray-700"
      />
    </div>
  );
}

export default PassField;
