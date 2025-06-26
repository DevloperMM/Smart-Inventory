import Select from "react-select";

function CustomSelect({
  label,
  name,
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  required,
  isDisabled = false,
  labelClass = {},
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className={`block ${labelClass} mb-1 pb-1`}>
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Select
        name={name}
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        isDisabled={isDisabled}
        classNamePrefix="react-select"
        className="shadow-lg"
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: isDisabled ? "#f3f4f6" : "#ffffff", // Tailwind's gray-100
            borderColor: isDisabled ? "#cbd5e1" : "#d1d5db", // Tailwind's gray-400 or default border
            boxShadow: state.isFocused ? "0 0 0 1px #0ea5e9" : undefined, // Tailwind focus ring (blue-500)
            padding: "0.1rem 0.5rem",
            borderRadius: "0.5rem",
            minHeight: "1.5rem",
          }),
          singleValue: (base) => ({
            ...base,
            color: isDisabled ? "#4b5563" : "#111827", // Tailwind gray-700 or gray-900
          }),
          placeholder: (base) => ({
            ...base,
            color: "#9ca3af", // Tailwind gray-400
          }),
        }}
      />
    </div>
  );
}

export default CustomSelect;
