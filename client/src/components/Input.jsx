import React from "react";

function Input({ label, list, rowSpan, ...props }) {
  const listId =
    list && list.length > 0
      ? `${(props.name || label).replace(/\s+/g, "-").toLowerCase()}-options`
      : undefined;

  return (
    <div className={`row-span-${rowSpan}`}>
      <label className="block text-black mb-1 pb-1">
        {label}
        {label && props.required && <span className="text-red-500">*</span>}
      </label>

      {rowSpan ? (
        <textarea
          autoComplete="off"
          rows={rowSpan}
          {...props}
          className={`w-full rounded-lg px-3 py-2 shadow-lg focus:ring-1 ${
            props.disabled
              ? "bg-gray-100 text-gray-700 border border-gray-400"
              : "border"
          }`}
        />
      ) : (
        <input
          autoComplete="off"
          {...props}
          list={listId}
          className={`w-full rounded-lg px-3 py-2 shadow-lg focus:ring-1 ${
            props.disabled
              ? "bg-gray-100 text-gray-700 border border-gray-400"
              : "border"
          } `}
        />
      )}

      {list && (
        <datalist id={listId}>
          {list.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      )}
    </div>
  );
}

export default Input;
