function FormFieldElement({ label, required = false, children }) {
  return (
    <div className="rounded-lg p-1">
      <label className="text-sm font-semibold text-gray-700 px-1">{label}</label>
      {children}
    </div>
  );
}

export default FormFieldElement
