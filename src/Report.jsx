import { useState, useEffect } from 'react'
import ReportHeader from './components/report/ReportHeader'
import FormStatusPanel from './components/report/FormStatusPanel'
import FormSection from './components/report/FormSection'
import FormFieldElement from "./components/report/FormFieldElement";
import TextInput from './components/report/fields/TextInput'
import DateTimeInput from './components/report/fields/DateTimeInput'
import DateInput from "./components/report/fields/DateInput";
import TextArea from './components/report/fields/TextArea'
import SelectInput from './components/report/fields/SelectInput'

// Single source of truth for required fields - updated for ski patrol
const REQUIRED_FIELDS = [
  "dateOfIncident",
  "timeOfIncident",
  "location",
  "patientName",
  "patientAge",
  "patientBirthdate",
  "patientGender",
  "patientWeight",
  "patientHeight",
  "patientPhoneNumber",
  "guestType",
  "injuryDescription",
  "patrollerName",
  "signature",
];

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
    const randomChars = Math.random().toString(36).substr(2, 7).toUpperCase();
    
    return `RPT-${datePrefix}-${randomChars}`
  }

  // Create new report
  const createNewReport = () => {
    const newReport = {
      id: generateId(),
      dateCreated: new Date().toISOString(),
      dateOfIncident: new Date().toISOString().split("T")[0],
      timeOfIncident: "",
      location: "Chicopee Ski Club",
      description: "",
      reporterName: "",
      reporterContact: "",
      signature: "",
      signatureDate: "",
      status: "in progress",
    };
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
    <div className="min-h-screen py-6 px-4 text-left">
      <div className="max-w-6xl mx-auto">
        {currentView === "list" ? (
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
  );
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
    return status === "completed"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="md:flex justify-between items-center mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Accident Reports
        </h1>
        <button
          onClick={onCreateNew}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 shadow-sm"
        >
          + Create New Report
        </button>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-24 w-24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Reports Yet
          </h3>
          <p className="text-gray-500 mb-6">
            Create your first accident report to get started
          </p>
          <button
            onClick={onCreateNew}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Create New Report
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {reports.map((report) => {
            const completionPercentage = calculateReportCompletion(report);
            return (
              <div
                key={report.id}
                onClick={() => onOpenReport(report)}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="font-mono text-sm text-gray-600 font-semibold">
                    {report.id}
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(report.status)}`}
                  >
                    {report.status.toUpperCase()}
                  </span>
                </div>

                {report.patientName && (
                  <div className="text-sm text-gray-700 mb-1">
                    <span className="font-semibold">Patient:</span>{" "}
                    {report.patientName}
                  </div>
                )}

                <div className="text-sm text-gray-500 mb-3">
                  Created: {formatDate(report.dateCreated)}
                </div>

                {/* Completion Progress */}
                <div className="my-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-gray-600">
                      Completion
                    </span>
                    <span className="text-xs font-semibold text-gray-600">
                      {completionPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        completionPercentage === 100
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Report Form View Component
function ReportFormView({ report, onSave, onBack, onDelete }) {
  const [formData, setFormData] = useState(() => ({
    ...report,
    // Initialize new ski patrol fields if they don't exist
    patientName: report.patientName || "",
    patientAge: report.patientAge || "",
    patientBirthdate: report.patientBirthdate || "",
    patientGender: report.patientGender || "",
    patientWeight: report.patientWeight || "",
    patientHeight: report.patientHeight || "",
    patientPhoneNumber: report.patientPhoneNumber || "",
    guestType: report.guestType || "",
    injuryType: report.injuryType || "",
    injuryDescription: report.injuryDescription || "",
    bodyPart: report.bodyPart || "",
    injurySeverity: report.injurySeverity || "",
    treatmentProvided: report.treatmentProvided || "",
    weatherConditions: report.weatherConditions || "",
    snowConditions: report.snowConditions || "",
    visibility: report.visibility || "",
    trailDifficulty: report.trailDifficulty || "",
    patrollerName: report.patrollerName || "",
  }));
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
    <div>
      <div className="bg-white rounded-2xl shadow-sm p-8">
        {/* Report Header */}
        <ReportHeader reportId={formData.id} onBack={onBack} />

        {/* Form Status Panel */}
        <FormStatusPanel
          status={formData.status}
          onStatusChange={handleStatusChange}
          completionPercentage={completionPercentage}
          pendingCount={pendingCount}
          onPrint={handlePrint}
          onDelete={() => onDelete(formData.id)}
          formData={formData}
        />

        <form onSubmit={handleSubmit}>
          {/* Incident Details Section */}
          <FormSection title="Incident Details">
            <FormFieldElement label="Report ID">
              <span className="text-red-700 p-2">{formData.id}</span>
            </FormFieldElement>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div>
                <FormFieldElement label="Location" required>
                  <TextInput
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    onBlur={() => handleBlur("location")}
                    required
                    placeholder="e.g., Main Street Run, Lift 3"
                    showError={showError("location")}
                  />
                </FormFieldElement>
              </div>
              <FormFieldElement label="Date & Time" required>
                <DateTimeInput
                  dateId="dateOfIncident"
                  dateName="dateOfIncident"
                  dateValue={formData.dateOfIncident}
                  timeId="timeOfIncident"
                  timeName="timeOfIncident"
                  timeValue={formData.timeOfIncident}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  showDateError={showError("dateOfIncident")}
                  showTimeError={showError("timeOfIncident")}
                />
              </FormFieldElement>
            </div>
          </FormSection>

          {/* Patient Information Section */}
          <FormSection title="Patient Information">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <FormFieldElement label="Patient Name" required>
                <TextInput
                  id="patientName"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  onBlur={() => handleBlur("patientName")}
                  required
                  placeholder="Full name"
                  showError={showError("patientName")}
                />
              </FormFieldElement>
              <div className="flex">
                <FormFieldElement label="Date of Birth" required>
                  <DateInput
                    id="patientBirthdate"
                    name="patientBirthdate"
                    value={formData.patientBirthdate}
                    onChange={handleChange}
                    onBlur={() => handleBlur("patientBirthdate")}
                    required
                    placeholder="Date of Birth"
                    showError={showError("patientBirthdate")}
                  />
                </FormFieldElement>
                <FormFieldElement label="Age" required>
                  <TextInput
                    id="patientAge"
                    name="patientAge"
                    value={formData.patientAge}
                    onChange={handleChange}
                    onBlur={() => handleBlur("patientAge")}
                    required
                    placeholder="Age"
                    showError={showError("patientAge")}
                  />
                </FormFieldElement>
              </div>
              <FormFieldElement label="Phone #">
                <TextInput
                  id="patientPhoneNumber"
                  name="patientPhoneNumber"
                  value={formData.patientPhoneNumber}
                  onChange={handleChange}
                  onBlur={() => handleBlur("patientPhoneNumber")}
                  required
                  placeholder="Phone number"
                  showError={showError("patientPhoneNumber")}
                />
              </FormFieldElement>
              <FormFieldElement label="Gender">
                <SelectInput
                  id="patientGender"
                  name="patientGender"
                  value={formData.patientGender}
                  onChange={handleChange}
                  onBlur={() => handleBlur("patientGender")}
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "non-binary", label: "Non-Binary" },
                  ]}
                  placeholder="Select gender"
                  required
                  showError={showError("patientGender")}
                />
              </FormFieldElement>
              <div className="flex">
                <FormFieldElement label="Weight" required>
                  <TextInput
                    id="patientWeight"
                    name="patientWeight"
                    value={formData.patientWeight}
                    onChange={handleChange}
                    onBlur={() => handleBlur("patientWeight")}
                    required
                    placeholder="Weight"
                    showError={showError("patientWeight")}
                  />
                </FormFieldElement>
                <FormFieldElement label="Height" required>
                  <TextInput
                    id="patientHeight"
                    name="patientHeight"
                    value={formData.patientHeight}
                    onChange={handleChange}
                    onBlur={() => handleBlur("patientHeight")}
                    required
                    placeholder="Height"
                    showError={showError("patientHeight")}
                  />
                </FormFieldElement>
              </div>

              <FormFieldElement label="Guest Type">
                <SelectInput
                  id="guestType"
                  name="guestType"
                  value={formData.guestType}
                  onChange={handleChange}
                  onBlur={() => handleBlur("guestType")}
                  options={[
                    { value: "day-ticket", label: "Day Ticket" },
                    { value: "season-pass", label: "Season Pass" },
                    { value: "card-holder", label: "Card Holder" },
                    { value: "staff", label: "Staff" },
                    { value: "staff-off-duty", label: "Staff (Off Duty)" },
                    { value: "other", label: "Other" },
                  ]}
                  placeholder="Select guest type"
                  required
                  showError={showError("guestType")}
                />
              </FormFieldElement>
            </div>
          </FormSection>

          {/* Patient Injuries Section */}
          <FormSection title="Patient Injuries">
            <FormFieldElement label="Injury Type">
              <SelectInput
                id="injuryType"
                name="injuryType"
                value={formData.injuryType}
                onChange={handleChange}
                onBlur={() => handleBlur("injuryType")}
                options={[
                  { value: "fracture", label: "Fracture" },
                  { value: "sprain", label: "Sprain/Strain" },
                  { value: "laceration", label: "Laceration" },
                  { value: "head", label: "Head Injury" },
                  { value: "other", label: "Other" },
                ]}
                placeholder="Select injury type"
                showError={false}
              />
            </FormFieldElement>

            <FormFieldElement label="Description" required>
              <TextArea
                id="injuryDescription"
                name="injuryDescription"
                value={formData.injuryDescription}
                onChange={handleChange}
                onBlur={() => handleBlur("injuryDescription")}
                required
                placeholder="Detailed description of the injury and how it occurred..."
                rows={4}
                showError={showError("injuryDescription")}
              />
            </FormFieldElement>

            <FormFieldElement label="Body Part Affected">
              <TextInput
                id="bodyPart"
                name="bodyPart"
                value={formData.bodyPart}
                onChange={handleChange}
                onBlur={() => handleBlur("bodyPart")}
                placeholder="e.g., Left knee, Right wrist"
                showError={false}
              />
            </FormFieldElement>

            <FormFieldElement label="Severity">
              <SelectInput
                id="injurySeverity"
                name="injurySeverity"
                value={formData.injurySeverity}
                onChange={handleChange}
                onBlur={() => handleBlur("injurySeverity")}
                options={[
                  { value: "minor", label: "Minor" },
                  { value: "moderate", label: "Moderate" },
                  { value: "severe", label: "Severe" },
                ]}
                placeholder="Select severity"
                showError={false}
              />
            </FormFieldElement>

            <FormFieldElement label="Treatment Provided">
              <TextArea
                id="treatmentProvided"
                name="treatmentProvided"
                value={formData.treatmentProvided}
                onChange={handleChange}
                onBlur={() => handleBlur("treatmentProvided")}
                placeholder="First aid and treatment provided..."
                rows={3}
                showError={false}
              />
            </FormFieldElement>
          </FormSection>

          {/* Ski Conditions Section */}
          <FormSection title="Ski Conditions">
            <FormFieldElement label="Weather">
              <SelectInput
                id="weatherConditions"
                name="weatherConditions"
                value={formData.weatherConditions}
                onChange={handleChange}
                onBlur={() => handleBlur("weatherConditions")}
                options={[
                  { value: "clear", label: "Clear" },
                  { value: "cloudy", label: "Cloudy" },
                  { value: "snowing", label: "Snowing" },
                  { value: "fog", label: "Fog" },
                ]}
                placeholder="Select weather"
                showError={false}
              />
            </FormFieldElement>

            <FormFieldElement label="Snow Conditions">
              <SelectInput
                id="snowConditions"
                name="snowConditions"
                value={formData.snowConditions}
                onChange={handleChange}
                onBlur={() => handleBlur("snowConditions")}
                options={[
                  { value: "powder", label: "Powder" },
                  { value: "packed", label: "Packed" },
                  { value: "icy", label: "Icy" },
                  { value: "slushy", label: "Slushy" },
                ]}
                placeholder="Select snow conditions"
                showError={false}
              />
            </FormFieldElement>

            <FormFieldElement label="Visibility">
              <SelectInput
                id="visibility"
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
                onBlur={() => handleBlur("visibility")}
                options={[
                  { value: "excellent", label: "Excellent" },
                  { value: "good", label: "Good" },
                  { value: "fair", label: "Fair" },
                  { value: "poor", label: "Poor" },
                ]}
                placeholder="Select visibility"
                showError={false}
              />
            </FormFieldElement>

            <FormFieldElement label="Trail Difficulty">
              <SelectInput
                id="trailDifficulty"
                name="trailDifficulty"
                value={formData.trailDifficulty}
                onChange={handleChange}
                onBlur={() => handleBlur("trailDifficulty")}
                options={[
                  { value: "green", label: "Green Circle (Beginner)" },
                  { value: "blue", label: "Blue Square (Intermediate)" },
                  { value: "black", label: "Black Diamond (Advanced)" },
                  {
                    value: "double-black",
                    label: "Double Black Diamond (Expert)",
                  },
                ]}
                placeholder="Select trail difficulty"
                showError={false}
              />
            </FormFieldElement>
          </FormSection>

          {/* Patroller Information Section */}
          <FormSection title="Patroller Information">
            <FormFieldElement label="Patroller Name" required>
              <TextInput
                id="patrollerName"
                name="patrollerName"
                value={formData.patrollerName}
                onChange={handleChange}
                onBlur={() => handleBlur("patrollerName")}
                required
                placeholder="Full name"
                showError={showError("patrollerName")}
              />
            </FormFieldElement>

            <FormFieldElement label="Signature" required>
              <TextInput
                id="signature"
                name="signature"
                value={formData.signature}
                onChange={handleChange}
                onBlur={() => handleBlur("signature")}
                required
                placeholder="Type your full name to sign"
                showError={showError("signature")}
                className="font-serif italic text-lg"
              />
            </FormFieldElement>

            {formData.signature && formData.signatureDate && (
              <FormFieldElement label="">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">
                    Signed on:{" "}
                    {new Date(formData.signatureDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </p>
                </div>
              </FormFieldElement>
            )}
          </FormSection>

          {/* Auto-save indicator */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200 no-print">
            <div className="text-sm text-gray-500 italic">
              Changes are automatically saved
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Report
