function DateInput({ 
  id,
  name,
  value,
  onChange, 
  onBlur,
  showError = false,
  required = false,
  placeholder = ''
}) {
  return (
    <div className='flex-1'>
      <input
        type='date'
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={() => onBlur && onBlur(name)}
        required={required}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          showError ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {showError && (
        <p className='text-red-500 text-sm mt-1 no-print'>Required</p>
      )}
    </div>
  )
}

export default DateInput
