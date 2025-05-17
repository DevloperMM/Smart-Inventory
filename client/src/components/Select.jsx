import { ChevronDown } from "lucide-react";
import React from "react";

function Select({ label, options = [], ...props }) {
  return (
    <div>
      <label className="block text-black mb-1 pb-1">
        {label}
        {props.required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative inline-block w-full">
        <select
          {...props}
          className={`w-full rounded-lg px-3 py-2 shadow-lg focus:ring-1 ${
            props.disabled ? "bg-gray-100 text-gray-700" : "border"
          }`}
        >
          {props.placeholder && (
            <option value="">-- {props.placeholder} --</option>
          )}
          {options.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Select;
