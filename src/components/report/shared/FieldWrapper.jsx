function FieldWrapper({
  label,
  requiredByPatient = false,
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
      className={`field-wrapper ${shouldHighlight ? "bg-yellow-50 p-3 rounded-lg border-2 border-yellow-300" : isEmpty && !isUnavailable ? (requiredByPatient ? "bg-blue-50 rounded-lg border-2 border-blue-100 p-3" : " bg-gray-50 rounded-lg border-2 border-gray-200 p-3") : " border-2 border-white p-3"}`}
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
        </label>
      )}
      {children}
    </div>
  );
}

export default FieldWrapper;
