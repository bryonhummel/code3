function FormFieldInline({ label, required = false, children }) {
  return (
    <div className='flex items-start gap-4'>
      <label className='text-sm font-semibold text-gray-700 px-2 flex-shrink-0 pt-2 text-right'>
        {label}
      </label>
      {children}
    </div>
  )
}

export default FormFieldInline
