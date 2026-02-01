function FieldWrapper({ label, required = false, name, children, error }) {
  return (
    <div className="field-wrapper">
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
    </div>
  );
}

export default FieldWrapper;
