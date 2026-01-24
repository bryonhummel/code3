import { useState, useEffect } from 'react'

// Single source of truth for required fields
const REQUIRED_FIELDS = [
  'dateOfIncident',
  'timeOfIncident',
  'location',
  'description',
  'reporterName',
  'reporterContact',
  'signature'
]

// Shared utility function for calculating completion percentage
const calculateReportCompletion = (report) => {
  const completedFields = REQUIRED_FIELDS.filter(field => {
    const value = report[field]
    return value && value.trim() !== ''
  })

  return Math.round((completedFields.length / REQUIRED_FIELDS.length) * 100)
}

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

  // Generate unique ID in format YYYYMMDD-<9 random alphanumeric characters>
  const generateId = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const datePrefix = `${year}${month}${day}`
    
    // Generate 9 random alphanumeric characters
    const randomChars = Math.random().toString(36).substr(2, 7)
    
    return `RPT-${datePrefix}-${randomChars}`
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
      signature: '',
      signatureDate: '',
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

  return (
    <div className='bg-white rounded-2xl shadow-sm p-6'>
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
            const completionPercentage = calculateReportCompletion(report)
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

  // Calculate completion status using shared utility
  const completionPercentage = calculateReportCompletion(formData)
  
  // Calculate pending count for display
  const completedFields = REQUIRED_FIELDS.filter(field => {
    const value = formData[field]
    return value && value.trim() !== ''
  })
  
  const pendingCount = REQUIRED_FIELDS.length - completedFields.length

  const handleChange = (e) => {
    const { name, value } = e.target
    
    setFormData(prev => {
      const updates = {
        ...prev,
        [name]: value
      }
      
      // Auto-fill signature date when signature is entered
      if (name === 'signature' && value.trim() !== '' && !prev.signatureDate) {
        updates.signatureDate = new Date().toISOString().split('T')[0]
      }
      
      return updates
    })
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
    REQUIRED_FIELDS.forEach(field => {
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

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className='bg-white rounded-2xl shadow-sm p-8'>
      {/* Completion Status Bar */}
      <div className='mb-6 no-print'>
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

      <div className='flex justify-between items-center mb-6 no-print'>
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
        <div className='flex items-center gap-3'>
          <button
            onClick={handlePrint}
            className='bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2'
          >
            <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z' />
            </svg>
            Print Report
          </button>
          <button
            onClick={() => onDelete(formData.id)}
            className='text-red-600 hover:text-red-700 font-semibold'
          >
            Delete Report
          </button>
        </div>
      </div>

      {/* Print-only header */}
      <div className='print-only mb-6'>
        <div className='text-center mb-4'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Accident Report</h1>
          <p className='text-sm text-gray-600'>Report ID: {formData.id}</p>
          <p className='text-sm text-gray-600'>Status: {formData.status.toUpperCase()}</p>
        </div>
      </div>

      <h1 className='text-4xl font-extrabold text-gray-900 mb-4 no-print'>Accident Report Form</h1>

      <form onSubmit={handleSubmit} className='space-y-3'>
        {/* Status */}
        <div className='flex items-center gap-4'>
          <label className='text-sm font-semibold text-gray-700 w-40 flex-shrink-0 text-right'>
            Report Status
          </label>
          <div className='flex gap-3 no-print flex-1'>
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
          <div className='print-only'>
            <p className='text-gray-900 font-semibold'>{formData.status.toUpperCase()}</p>
          </div>
        </div>

        {/* Date and Time of Incident - Combined Row */}
        <div className='flex items-start gap-4'>
          <label htmlFor='dateOfIncident' className='text-sm font-semibold text-gray-700 w-40 flex-shrink-0 pt-2 text-right'>
            Date & Time *
          </label>
          <div className='flex-1 flex gap-4'>
            <div className='flex-1'>
              <input
                type='date'
                id='dateOfIncident'
                name='dateOfIncident'
                value={formData.dateOfIncident}
                onChange={handleChange}
                onBlur={() => handleBlur('dateOfIncident')}
                required
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  showError('dateOfIncident') ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {showError('dateOfIncident') && (
                <p className='text-red-500 text-sm mt-1 no-print'>Required</p>
              )}
            </div>
            <div className='flex-1'>
              <input
                type='time'
                id='timeOfIncident'
                name='timeOfIncident'
                value={formData.timeOfIncident}
                onChange={handleChange}
                onBlur={() => handleBlur('timeOfIncident')}
                required
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  showError('timeOfIncident') ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {showError('timeOfIncident') && (
                <p className='text-red-500 text-sm mt-1 no-print'>Required</p>
              )}
            </div>
          </div>
        </div>

        {/* Location */}
        <div className='flex items-start gap-4'>
          <label htmlFor='location' className='text-sm font-semibold text-gray-700 w-40 flex-shrink-0 pt-2 text-right'>
            Location *
          </label>
          <div className='flex-1'>
            <input
              type='text'
              id='location'
              name='location'
              value={formData.location}
              onChange={handleChange}
              onBlur={() => handleBlur('location')}
              required
              placeholder='e.g., 123 Main St, City, State'
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                showError('location') ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {showError('location') && (
              <p className='text-red-500 text-sm mt-1 no-print'>This field is required</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className='flex items-start gap-4'>
          <label htmlFor='description' className='text-sm font-semibold text-gray-700 w-40 flex-shrink-0 pt-2 text-right'>
            Description *
          </label>
          <div className='flex-1'>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              onBlur={() => handleBlur('description')}
              required
              rows={4}
              placeholder='Provide a detailed description of what happened...'
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                showError('description') ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {showError('description') && (
              <p className='text-red-500 text-sm mt-1 no-print'>This field is required</p>
            )}
          </div>
        </div>

        {/* Reporter Information */}
        <div className='border-t border-gray-200 pt-4'>
          <h2 className='text-xl font-bold text-gray-800 mb-3'>Reporter Information</h2>
          <div className='flex items-start gap-4'>
            <label htmlFor='reporterName' className='text-sm font-semibold text-gray-700 w-40 flex-shrink-0 pt-2 text-right'>
              Reporter *
            </label>
            <div className='flex-1 flex gap-4'>
              <div className='flex-1'>
                <input
                  type='text'
                  id='reporterName'
                  name='reporterName'
                  value={formData.reporterName}
                  onChange={handleChange}
                  onBlur={() => handleBlur('reporterName')}
                  required
                  placeholder='Full name'
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    showError('reporterName') ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {showError('reporterName') && (
                  <p className='text-red-500 text-sm mt-1 no-print'>Required</p>
                )}
              </div>
              <div className='flex-1'>
                <input
                  type='text'
                  id='reporterContact'
                  name='reporterContact'
                  value={formData.reporterContact}
                  onChange={handleChange}
                  onBlur={() => handleBlur('reporterContact')}
                  required
                  placeholder='Phone or email'
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    showError('reporterContact') ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {showError('reporterContact') && (
                  <p className='text-red-500 text-sm mt-1 no-print'>Required</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className='border-t border-gray-200 pt-4'>
          <h2 className='text-xl font-bold text-gray-800 mb-3'>Signature</h2>
          <div className='flex items-start gap-4'>
            <label htmlFor='signature' className='text-sm font-semibold text-gray-700 w-40 flex-shrink-0 pt-2 text-right'>
              Signature *
            </label>
            <div className='flex-1'>
              <input
                type='text'
                id='signature'
                name='signature'
                value={formData.signature}
                onChange={handleChange}
                onBlur={() => handleBlur('signature')}
                required
                placeholder='Type your full name to sign'
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-serif italic text-lg ${
                  showError('signature') ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {showError('signature') && (
                <p className='text-red-500 text-sm mt-1 no-print'>This field is required</p>
              )}
              {formData.signature && formData.signatureDate && (
                <p className='text-sm text-gray-600 mt-2'>
                  Signed on: {new Date(formData.signatureDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Auto-save indicator */}
        <div className='flex justify-between items-center pt-4 border-t border-gray-200 no-print'>
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
