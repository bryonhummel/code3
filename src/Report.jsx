function Report() {
  return (
    <div className='min-h-screen py-6 px-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-sm p-8'>
          <h1 className='text-4xl font-extrabold text-gray-900 mb-6'>Report</h1>
          <div className='space-y-4'>
            <p className='text-gray-600 text-lg'>
              This is the report page. Add your reporting functionality here.
            </p>
            <div className='border-t border-gray-200 pt-4 mt-6'>
              <h2 className='text-2xl font-bold text-gray-800 mb-4'>Report Details</h2>
              <div className='bg-gray-50 rounded-lg p-4'>
                <p className='text-gray-500'>
                  Report content will be displayed here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report
