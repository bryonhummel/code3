function FormFieldRow({ label, required = false, children }) {
  return (
    <div className='flex items-start gap-4'>
      <label className='text-sm font-semibold text-gray-700 w-40 flex-shrink-0 pt-2 text-right'>
        {label}
      </label>
      {children}
    </div>
  )
}

export default FormFieldRow
