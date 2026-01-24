function FormSection({ title, children }) {
  return (
    <div className='border border-gray-300 rounded-lg p-6 mb-6'>
      <h2 className='text-xl font-bold text-gray-800 mb-4'>{title}</h2>
      <div className='space-y-3'>
        {children}
      </div>
    </div>
  )
}

export default FormSection
