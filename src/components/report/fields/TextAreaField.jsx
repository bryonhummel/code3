import FieldWrapper from '../shared/FieldWrapper';
import ValidationMessage from '../shared/ValidationMessage';

function TextAreaField({
  name,
  value = "",
  onChange,
  onBlur,
  label,
  placeholder = "",
  requiredByPatient = false,
  maxLength,
  rows = 3,
  showError = false,
  errorMessage = "This field is required",
  disabled = false,
  className = "",
  isUnavailable = false,
  onToggleAvailability,
  isEmpty = false,
  isCompleted = false,
}) {
  const handleBlur = (e) => {
    if (onBlur) {
      onBlur(name);
    }
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
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-y ${
          showError ? "border-red-500" : "border-gray-300"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""} ${className}`}
      />
      {showError && <ValidationMessage message={errorMessage} type="error" />}
      {maxLength && (
        <div className="text-xs text-gray-500 mt-1">
          {value.length}/{maxLength} characters
        </div>
      )}
    </FieldWrapper>
  );
}

export default TextAreaField;
