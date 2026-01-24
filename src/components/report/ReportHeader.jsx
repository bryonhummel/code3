function ReportHeader({ reportId, onBack }) {
  return (
    <div className='flex items-center gap-4 mb-6 no-print'>
      <button
        onClick={onBack}
        className='text-gray-600 hover:text-gray-900 font-semibold flex items-center gap-2'
      >
        <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
        </svg>
        Back to List
      </button>
      <div className='border-l border-gray-300 pl-4'>
        <span className='font-mono text-sm text-gray-600 font-semibold'>{reportId}</span>
      </div>
    </div>
  )
}

export default ReportHeader
