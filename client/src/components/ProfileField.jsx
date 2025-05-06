import React from "react";

function ProfileField({ label, value }) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={value}
        disabled
        className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-700"
      />
    </div>
  );
}

export default ProfileField;
