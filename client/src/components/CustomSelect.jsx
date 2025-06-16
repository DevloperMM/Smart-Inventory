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
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-black mb-1 pb-1">
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
      />
    </div>
  );
}

export default CustomSelect;
