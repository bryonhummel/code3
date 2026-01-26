function TextArea({
  id,
  name,
  value,
  onChange,
  onBlur,
  required = false,
  placeholder = "",
  showError = false,
  errorMessage = "Required",
  rows = 4,
}) {
  return (
    <div className="flex-1">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
          showError ? "border-red-500" : "border-gray-300"
        }`}
      />
      {showError && (
        <p className="text-red-500 text-sm mt-1 no-print">{errorMessage}</p>
      )}
    </div>
  );
}

export default TextArea
