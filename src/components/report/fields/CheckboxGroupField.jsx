import FieldWrapper from '../shared/FieldWrapper';
import ValidationMessage from '../shared/ValidationMessage';

function CheckboxGroupField({
  name,
  value = [],
  onChange,
  onBlur,
  label,
  options = [],
  requiredByPatient = false,
  showError = false,
  errorMessage = "Please select at least one option",
  disabled = false,
  className = "",
  isUnavailable = false,
  onToggleAvailability,
  isEmpty = false,
  isCompleted = false,
}) {
  const handleCheckboxChange = (optionValue) => {
    const currentValues = Array.isArray(value) ? value : [];
    const newValues = currentValues.includes(optionValue)
      ? currentValues.filter((v) => v !== optionValue)
      : [...currentValues, optionValue];

    // Create synthetic event to match expected onChange signature
    const syntheticEvent = {
      target: {
        name: name,
        value: newValues,
        type: "checkbox",
      },
    };

    onChange(syntheticEvent);

    // Trigger blur for validation
    if (onBlur) {
      setTimeout(() => onBlur(name), 0);
    }
  };

  const isChecked = (optionValue) => {
    return Array.isArray(value) && value.includes(optionValue);
  };

  return (
    <FieldWrapper
      label={label}
      requiredByPatient={requiredByPatient}
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
            className={`flex items-center p-2 rounded-lg border transition-colors cursor-pointer bg-white ${
              isChecked(option.value) ? " " : "  hover:bg-gray-50"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <input
              type="checkbox"
              name={`${name}[]`}
              value={option.value}
              checked={isChecked(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
              disabled={disabled}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
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

export default CheckboxGroupField;
