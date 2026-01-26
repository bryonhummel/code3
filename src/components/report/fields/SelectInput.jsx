function SelectInput({
  id,
  name,
  value,
  onChange,
  onBlur,
  required = false,
  options = [],
  showError = false,
  errorMessage = "Required",
  placeholder = "Select an option",
}) {
  return (
    <div className="flex-1">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          showError ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {showError && (
        <p className="text-red-500 text-sm mt-1 no-print">{errorMessage}</p>
      )}
    </div>
  );
}

export default SelectInput;
