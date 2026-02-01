function FieldWrapper({
  label,
  required = false,
  name,
  children,
  error,
  isUnavailable = false,
  onToggleAvailability,
}) {
  return (
    <div className="field-wrapper">
      {label && (
        <label
          htmlFor={name}
          onClick={onToggleAvailability}
          className={`block text-sm font-semibold mb-1 cursor-pointer hover:text-blue-600 transition-colors ${
            isUnavailable ? "text-gray-400 line-through" : "text-gray-700"
          }`}
          title={
            isUnavailable
              ? "Click to mark as available"
              : "Click to mark as unavailable"
          }
        >
          {label}
          {required && !isUnavailable && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
      )}
      {children}
    </div>
  );
}

export default FieldWrapper;
