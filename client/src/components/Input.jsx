import React from "react";

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {props.required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className="w-full text-sm border rounded-lg px-3 py-2 shadow-sm focus:ring-1 disabled:bg-gray-100 disabled:text-gray-700"
      />
    </div>
  );
}

export default Input;
