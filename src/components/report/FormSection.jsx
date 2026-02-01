function FormSection({ title, children }) {
  return (
    <div className="border-t border-gray-300 pt-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4 no-print">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export default FormSection
