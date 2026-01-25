function DateTimeInput({ 
  dateId,
  dateName,
  dateValue,
  timeId,
  timeName,
  timeValue,
  onChange, 
  onBlur,
  showDateError = false,
  showTimeError = false,
  dateLabel = 'Date',
  timeLabel = 'Time'
}) {
  return (
    <div className='flex-1 flex gap-4'>
      <div className='flex-1'>
        <input
          type='date'
          id={dateId}
          name={dateName}
          value={dateValue}
          onChange={onChange}
          onBlur={() => onBlur(dateName)}
          required
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            showDateError ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {showDateError && (
          <p className='text-red-500 text-sm mt-1 no-print'>Required</p>
        )}
      </div>
      <div className='flex-1'>
        <input
          type='time'
          id={timeId}
          name={timeName}
          value={timeValue}
          onChange={onChange}
          onBlur={() => onBlur(timeName)}
          required
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            showTimeError ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {showTimeError && (
          <p className='text-red-500 text-sm mt-1 no-print'>Required</p>
        )}
      </div>
    </div>
  )
}

export default DateTimeInput
