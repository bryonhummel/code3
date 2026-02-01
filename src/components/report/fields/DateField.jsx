import FieldWrapper from '../shared/FieldWrapper';
import ValidationMessage from '../shared/ValidationMessage';

function DateField({
  name,
  value = "",
  onChange,
  onBlur,
  label,
  required = false,
  showError = false,
  errorMessage = "This field is required",
  disabled = false,
  className = "",
  isUnavailable = false,
  onToggleAvailability,
}) {
  const handleBlur = (e) => {
    if (onBlur) {
      onBlur(name);
    }
  };

  return (
    <FieldWrapper
      label={label}
      required={required}
      name={name}
      isUnavailable={isUnavailable}
      onToggleAvailability={onToggleAvailability}
    >
      <input
        type="date"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        required={required}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
          showError ? "border-red-500" : "border-gray-300"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""} ${className}`}
      />
      {showError && <ValidationMessage message={errorMessage} type="error" />}
    </FieldWrapper>
  );
}

export default DateField;
