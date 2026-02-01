import FieldWrapper from '../shared/FieldWrapper';
import ValidationMessage from '../shared/ValidationMessage';

function RadioGroupField({
  name,
  value = "",
  onChange,
  onBlur,
  label,
  options = [],
  required = false,
  showError = false,
  errorMessage = "Please select an option",
  disabled = false,
  className = "",
  isUnavailable = false,
  onToggleAvailability,
  isEmpty = false,
  isCompleted = false,
}) {
  const handleChange = (e) => {
    onChange(e);
    // Don't validate immediately on change for radio buttons
    // The validation will happen on form submission or when user moves to another field
  };

  return (
    <FieldWrapper
      label={label}
      required={required}
      name={name}
      isUnavailable={isUnavailable}
      onToggleAvailability={onToggleAvailability}
      isEmpty={isEmpty}
      isCompleted={isCompleted}
    >
      <div className={`space-y-2 ${className}`}>
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center p-2 rounded-lg border transition-colors cursor-pointer ${
              value === option.value
                ? "bg-blue-50 border-blue-500"
                : "bg-white border-gray-300 hover:bg-gray-50"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={handleChange}
              disabled={disabled}
              className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {showError && <ValidationMessage message={errorMessage} type="error" />}
    </FieldWrapper>
  );
}

export default RadioGroupField;
