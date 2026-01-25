function TextInput({ 
  id, 
  name, 
  value, 
  onChange, 
  onBlur, 
  required = false, 
  placeholder = '', 
  showError = false,
  errorMessage = 'This field is required',
  className = ''
}) {
  return (
    <div className='flex-1'>
      <input
        type='text'
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          showError ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
      />
      {showError && (
        <p className='text-red-500 text-sm mt-1 no-print'>{errorMessage}</p>
      )}
    </div>
  )
}

export default TextInput
