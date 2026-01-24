import { useState, useEffect } from 'react'

function Report() {
  const [reports, setReports] = useState([])
  const [currentView, setCurrentView] = useState('list') // 'list' or 'form'
  const [activeReport, setActiveReport] = useState(null)

  // Load reports from localStorage on mount
  useEffect(() => {
    const savedReports = localStorage.getItem('accidentReports')
    if (savedReports) {
      try {
        setReports(JSON.parse(savedReports))
      } catch (error) {
        console.error('Error loading reports:', error)
      }
    }
  }, [])

  // Save reports to localStorage whenever they change
  useEffect(() => {
    if (reports.length > 0) {
      localStorage.setItem('accidentReports', JSON.stringify(reports))
    }
  }, [reports])

  // Generate unique ID
  const generateId = () => {
    return `RPT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // Create new report
  const createNewReport = () => {
    const newReport = {
      id: generateId(),
      dateCreated: new Date().toISOString(),
      dateOfIncident: '',
      timeOfIncident: '',
      location: '',
      description: '',
      reporterName: '',
      reporterContact: '',
      status: 'draft'
    }
    setActiveReport(newReport)
    setCurrentView('form')
  }

  // Open existing report
  const openReport = (report) => {
    setActiveReport(report)
    setCurrentView('form')
  }

  // Save report
  const saveReport = (updatedReport) => {
    setReports(prevReports => {
      const existingIndex = prevReports.findIndex(r => r.id === updatedReport.id)
      if (existingIndex >= 0) {
        // Update existing report
        const newReports = [...prevReports]
        newReports[existingIndex] = updatedReport
        return newReports
      } else {
        // Add new report
        return [...prevReports, updatedReport]
      }
    })
  }

  // Delete report
  const deleteReport = (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setReports(prevReports => prevReports.filter(r => r.id !== reportId))
      setCurrentView('list')
      setActiveReport(null)
    }
  }

  // Back to list
  const backToList = () => {
    setCurrentView('list')
    setActiveReport(null)
  }

  return (
    <div className='min-h-screen py-6 px-4'>
      <div className='max-w-6xl mx-auto'>
        {currentView === 'list' ? (
          <ReportListView
            reports={reports}
            onCreateNew={createNewReport}
            onOpenReport={openReport}
          />
        ) : (
          <ReportFormView
            report={activeReport}
            onSave={saveReport}
            onBack={backToList}
            onDelete={deleteReport}
          />
        )}
      </div>
    </div>
  )
}

// Report List View Component
function ReportListView({ reports, onCreateNew, onOpenReport }) {
  const formatDate = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    return status === 'submitted' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800'
  }

  const calculateCompletion = (report) => {
    const requiredFields = [
      'dateOfIncident',
      'timeOfIncident',
      'location',
      'description',
      'reporterName',
      'reporterContact'
    ]

    const completedFields = requiredFields.filter(field => {
      const value = report[field]
      return value && value.trim() !== ''
    })

    return Math.round((completedFields.length / requiredFields.length) * 100)
  }

  return (
    <div className='bg-white rounded-2xl shadow-sm p-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-4xl font-extrabold text-gray-900'>Accident Reports</h1>
        <button
          onClick={onCreateNew}
          className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 shadow-sm'
        >
          + Create New Report
        </button>
      </div>

      {reports.length === 0 ? (
        <div className='text-center py-12'>
          <div className='text-gray-400 mb-4'>
            <svg className='mx-auto h-24 w-24' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
            </svg>
          </div>
          <h3 className='text-xl font-semibold text-gray-700 mb-2'>No Reports Yet</h3>
          <p className='text-gray-500 mb-6'>Create your first accident report to get started</p>
          <button
            onClick={onCreateNew}
            className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200'
          >
            Create First Report
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {reports.map(report => {
            const completionPercentage = calculateCompletion(report)
            return (
              <div
                key={report.id}
                onClick={() => onOpenReport(report)}
                className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer bg-gray-50 hover:bg-gray-100'
              >
                <div className='flex justify-between items-start mb-3'>
                  <div className='font-mono text-sm text-gray-600 font-semibold'>
                    {report.id}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(report.status)}`}>
                    {report.status.toUpperCase()}
                  </span>
                </div>
                <div className='text-sm text-gray-500 mb-3'>
                  Created: {formatDate(report.dateCreated)}
                </div>
                
                {/* Completion Progress */}
                <div className='mb-3'>
                  <div className='flex justify-between items-center mb-1'>
                    <span className='text-xs font-semibold text-gray-600'>Completion</span>
                    <span className='text-xs font-semibold text-gray-600'>{completionPercentage}%</span>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-2 overflow-hidden'>
                    <div
                      className={`h-full transition-all duration-300 ${
                        completionPercentage === 100 ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>

                {report.location && (
                  <div className='text-sm text-gray-700 mb-1'>
                    <span className='font-semibold'>Location:</span> {report.location}
                  </div>
                )}
                {report.dateOfIncident && (
                  <div className='text-sm text-gray-700'>
                    <span className='font-semibold'>Incident:</span> {report.dateOfIncident}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// Report Form View Component
function ReportFormView({ report, onSave, onBack, onDelete }) {
  const [formData, setFormData] = useState(report)
  const [touched, setTouched] = useState({})

  // Auto-save whenever formData changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSave(formData)
    }, 500) // Debounce auto-save by 500ms

    return () => clearTimeout(timeoutId)
  }, [formData, onSave])

  // Calculate completion status
  const requiredFields = [
    'dateOfIncident',
    'timeOfIncident',
    'location',
    'description',
    'reporterName',
    'reporterContact'
  ]

  const completedFields = requiredFields.filter(field => {
    const value = formData[field]
    return value && value.trim() !== ''
  })

  const completionPercentage = Math.round((completedFields.length / requiredFields.length) * 100)
  const pendingCount = requiredFields.length - completedFields.length

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleBlur = (fieldName) => {
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mark all fields as touched for validation display
    const allTouched = {}
    requiredFields.forEach(field => {
      allTouched[field] = true
    })
    setTouched(allTouched)
  }

  const handleStatusChange = (newStatus) => {
    const updatedData = { ...formData, status: newStatus }
    setFormData(updatedData)
  }

  const isFieldValid = (fieldName) => {
    const value = formData[fieldName]
    return value && value.trim() !== ''
  }

  const showError = (fieldName) => {
    return touched[fieldName] && !isFieldValid(fieldName)
  }

  return (
    <div className='bg-white rounded-2xl shadow-sm p-8'>
      {/* Completion Status Bar */}
      <div className='mb-6'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-sm font-semibold text-gray-700'>
            Form Completion
          </span>
          <span className='text-sm font-semibold text-gray-700'>
            {completionPercentage}%
          </span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-3 overflow-hidden'>
          <div
            className={`h-full transition-all duration-300 ${
              completionPercentage === 100 ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        {pendingCount > 0 && (
          <p className='text-sm text-gray-600 mt-2'>
            {pendingCount} required field{pendingCount !== 1 ? 's' : ''} remaining
          </p>
        )}
        {completionPercentage === 100 && (
          <p className='text-sm text-green-600 mt-2 font-semibold'>
            ✓ All required fields completed
          </p>
        )}
      </div>

      <div className='flex justify-between items-center mb-6'>
        <div className='flex items-center gap-4'>
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
            <span className='font-mono text-sm text-gray-600 font-semibold'>{formData.id}</span>
          </div>
        </div>
        <button
          onClick={() => onDelete(formData.id)}
          className='text-red-600 hover:text-red-700 font-semibold'
        >
          Delete Report
        </button>
      </div>

      <h1 className='text-4xl font-extrabold text-gray-900 mb-6'>Accident Report Form</h1>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Status */}
        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-2'>
            Report Status
          </label>
          <div className='flex gap-3'>
            <button
              type='button'
              onClick={() => handleStatusChange('draft')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                formData.status === 'draft'
                  ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-400'
                  : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
              }`}
            >
              Draft
            </button>
            <button
              type='button'
              onClick={() => handleStatusChange('submitted')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                formData.status === 'submitted'
                  ? 'bg-green-100 text-green-800 border-2 border-green-400'
                  : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
              }`}
            >
              Submitted
            </button>
          </div>
        </div>

        {/* Date and Time of Incident */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label htmlFor='dateOfIncident' className='block text-sm font-semibold text-gray-700 mb-2'>
              Date of Incident *
            </label>
            <input
              type='date'
              id='dateOfIncident'
              name='dateOfIncident'
              value={formData.dateOfIncident}
              onChange={handleChange}
              onBlur={() => handleBlur('dateOfIncident')}
              required
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                showError('dateOfIncident') ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {showError('dateOfIncident') && (
              <p className='text-red-500 text-sm mt-1'>This field is required</p>
            )}
          </div>
          <div>
            <label htmlFor='timeOfIncident' className='block text-sm font-semibold text-gray-700 mb-2'>
              Time of Incident *
            </label>
            <input
              type='time'
              id='timeOfIncident'
              name='timeOfIncident'
              value={formData.timeOfIncident}
              onChange={handleChange}
              onBlur={() => handleBlur('timeOfIncident')}
              required
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                showError('timeOfIncident') ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {showError('timeOfIncident') && (
              <p className='text-red-500 text-sm mt-1'>This field is required</p>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor='location' className='block text-sm font-semibold text-gray-700 mb-2'>
            Location *
          </label>
          <input
            type='text'
            id='location'
            name='location'
            value={formData.location}
            onChange={handleChange}
            onBlur={() => handleBlur('location')}
            required
            placeholder='e.g., 123 Main St, City, State'
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              showError('location') ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {showError('location') && (
            <p className='text-red-500 text-sm mt-1'>This field is required</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor='description' className='block text-sm font-semibold text-gray-700 mb-2'>
            Description of Incident *
          </label>
          <textarea
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            onBlur={() => handleBlur('description')}
            required
            rows={6}
            placeholder='Provide a detailed description of what happened...'
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
              showError('description') ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {showError('description') && (
            <p className='text-red-500 text-sm mt-1'>This field is required</p>
          )}
        </div>

        {/* Reporter Information */}
        <div className='border-t border-gray-200 pt-6'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>Reporter Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label htmlFor='reporterName' className='block text-sm font-semibold text-gray-700 mb-2'>
                Reporter Name *
              </label>
              <input
                type='text'
                id='reporterName'
                name='reporterName'
                value={formData.reporterName}
                onChange={handleChange}
                onBlur={() => handleBlur('reporterName')}
                required
                placeholder='Full name'
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  showError('reporterName') ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {showError('reporterName') && (
                <p className='text-red-500 text-sm mt-1'>This field is required</p>
              )}
            </div>
            <div>
              <label htmlFor='reporterContact' className='block text-sm font-semibold text-gray-700 mb-2'>
                Contact Information *
              </label>
              <input
                type='text'
                id='reporterContact'
                name='reporterContact'
                value={formData.reporterContact}
                onChange={handleChange}
                onBlur={() => handleBlur('reporterContact')}
                required
                placeholder='Phone or email'
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  showError('reporterContact') ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {showError('reporterContact') && (
                <p className='text-red-500 text-sm mt-1'>This field is required</p>
              )}
            </div>
          </div>
        </div>

        {/* Auto-save indicator */}
        <div className='flex justify-between items-center pt-4 border-t border-gray-200'>
          <div className='text-sm text-gray-500 italic'>
            Changes are automatically saved
          </div>
          {completionPercentage === 100 && (
            <div className='text-sm text-green-600 font-semibold'>
              ✓ Form complete
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default Report
