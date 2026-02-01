import FieldWrapper from '../shared/FieldWrapper';
import ValidationMessage from '../shared/ValidationMessage';

function CheckboxGroupField({
  name,
  value = [],
  onChange,
  onBlur,
  label,
  options = [],
  required = false,
  showError = false,
  errorMessage = 'Please select at least one option',
  disabled = false,
  className = ''
}) {
  const handleCheckboxChange = (optionValue) => {
    const currentValues = Array.isArray(value) ? value : [];
    const newValues = currentValues.includes(optionValue)
      ? currentValues.filter(v => v !== optionValue)
      : [...currentValues, optionValue];
    
    // Create synthetic event to match expected onChange signature
    const syntheticEvent = {
      target: {
        name: name,
        value: newValues,
        type: 'checkbox'
      }
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
    <FieldWrapper label={label} required={required} name={name}>
      <div className={`space-y-2 ${className}`}>
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center p-2 rounded-lg border transition-colors cursor-pointer ${
              isChecked(option.value)
                ? 'bg-blue-50 border-blue-500'
                : 'bg-white border-gray-300 hover:bg-gray-50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
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
      {Array.isArray(value) && value.length > 0 && (
        <div className="text-xs text-gray-500 mt-1">
          {value.length} selected
        </div>
      )}
    </FieldWrapper>
  );
}

export default CheckboxGroupField;
