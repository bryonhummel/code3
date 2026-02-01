function FieldWrapper({
  label,
  required = false,
  name,
  children,
  error,
  isUnavailable = false,
  onToggleAvailability,
  isEmpty = false,
  isCompleted = false,
}) {
  // Determine if we should highlight this field
  const shouldHighlight = isCompleted && isEmpty && !isUnavailable;

  return (
    <div
      className={`field-wrapper ${shouldHighlight ? "bg-yellow-50 p-3 rounded-lg border-2 border-yellow-300" : ""}`}
    >
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
