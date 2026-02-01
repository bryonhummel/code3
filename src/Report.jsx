import { useState, useEffect } from 'react'
import ReportHeader from './components/report/ReportHeader'
import FormStatusPanel from './components/report/FormStatusPanel'
import FormRenderer from "./components/report/FormRenderer";
import PrintRenderer from "./components/report/print/PrintRenderer";
import { useFormData } from "./hooks/useFormData";
import { useFormValidation } from "./hooks/useFormValidation";
import { ACCIDENT_REPORT_SCHEMA } from "./config/formSchema";

function Report() {
  const [reports, setReports] = useState([]);
  const [currentView, setCurrentView] = useState("list"); // 'list' or 'form'
  const [activeReport, setActiveReport] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Load reports from localStorage on mount
  useEffect(() => {
    const savedReports = localStorage.getItem("accidentReports");
    if (savedReports) {
      try {
        setReports(JSON.parse(savedReports));
      } catch (error) {
        console.error("Error loading reports:", error);
      }
    }
    setIsInitialLoad(false);
  }, []);

  // Save reports to localStorage whenever they change (but not on initial load)
  useEffect(() => {
    if (isInitialLoad) {
      return;
    }
    localStorage.setItem("accidentReports", JSON.stringify(reports));
  }, [reports, isInitialLoad]);

  // Generate unique ID in format YYYYMMDD-<7 random alphanumeric characters>
  const generateId = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const datePrefix = `${year}${month}${day}`;

    const randomChars = Math.random().toString(36).substr(2, 7).toUpperCase();

    return `RPT-${datePrefix}-${randomChars}`;
  };

  // Create new report
  const createNewReport = () => {
    const reportId = generateId();
    const newReport = {
      id: reportId,
      reportId: reportId, // Add reportId for the form field
      reportNumber: reportId,
      dateCreated: new Date().toISOString(),
      dateOfIncident: new Date().toISOString().split("T")[0],
      timeOfIncident: "",
      location: "Chicopee Ski Club",
      status: "in progress",
    };
    setActiveReport(newReport);
    setCurrentView("form");
  };

  // Open existing report
  const openReport = (report) => {
    setActiveReport(report);
    setCurrentView("form");
  };

  // Save report
  const saveReport = (updatedReport) => {
    setReports((prevReports) => {
      const existingIndex = prevReports.findIndex(
        (r) => r.id === updatedReport.id,
      );
      if (existingIndex >= 0) {
        const newReports = [...prevReports];
        newReports[existingIndex] = updatedReport;
        return newReports;
      } else {
        return [...prevReports, updatedReport];
      }
    });
  };

  // Delete report
  const deleteReport = (reportId) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      setReports((prevReports) => prevReports.filter((r) => r.id !== reportId));
      setCurrentView("list");
      setActiveReport(null);
    }
  };

  // Back to list
  const backToList = () => {
    setCurrentView("list");
    setActiveReport(null);
  };

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
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    return status === "completed"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  // Calculate completion percentage for a report based on requiredByPatient fields
  const calculateCompletion = (report) => {
    const requiredByPatientFields = ACCIDENT_REPORT_SCHEMA.sections
      .flatMap((section) => section.fields)
      .filter((field) => field.requiredByPatient)
      .map((field) => field.name);

    const unavailableFields = report.unavailableFields || [];

    const completed = requiredByPatientFields.filter((fieldName) => {
      // If field is marked as unavailable, consider it complete
      if (unavailableFields.includes(fieldName)) return true;

      const value = report[fieldName];
      if (!value) return false;
      if (typeof value === "string" && value.trim() === "") return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    });

    return Math.round(
      (completed.length / requiredByPatientFields.length) * 100,
    );
  };

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
            const completionPercentage = calculateCompletion(report);
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
  // Track which fields are marked as unavailable
  const [unavailableFields, setUnavailableFields] = useState(
    report.unavailableFields || [],
  );

  // Use custom hooks for form management
  const {
    formData,
    setFormData,
    touched,
    handleChange,
    handleBlur,
    markAllTouched,
  } = useFormData(report);

  const {
    errors,
    setErrors,
    validate,
    validateOnBlur,
    calculateCompletion,
    getIncompleteFields,
  } = useFormValidation(formData, ACCIDENT_REPORT_SCHEMA, unavailableFields);

  // Auto-save whenever formData or unavailableFields changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSave({ ...formData, unavailableFields });
    }, 500); // Debounce auto-save by 500ms

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, unavailableFields]);

  // Calculate completion metrics
  const completionPercentage = calculateCompletion();
  const incompleteFields = getIncompleteFields();
  const pendingCount = incompleteFields.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    markAllTouched();
    const isValid = validate();

    if (isValid) {
      // Form is valid
    }
  };

  const handleStatusChange = (newStatus) => {
    // Update local formData state
    const updatedData = { ...formData, status: newStatus, unavailableFields };
    setFormData(updatedData);
    // Save to parent component
    onSave(updatedData);
  };;

  const handleFieldChange = (e) => {
    const { name } = e.target;
    // Clear error for this field when it changes
    if (errors[name]) {
      setErrors((prev) => {
        const { [name]: removed, ...rest } = prev;
        return rest;
      });
    }
    handleChange(e);
  };

  const handleFieldBlur = (fieldName) => {
    handleBlur(fieldName);
    validateOnBlur(fieldName);
  };

  const handlePrint = () => {
    window.print();
  };

  // Toggle field availability
  const toggleFieldAvailability = (fieldName) => {
    setUnavailableFields((prev) => {
      if (prev.includes(fieldName)) {
        // Remove from unavailable list
        return prev.filter((name) => name !== fieldName);
      } else {
        // Add to unavailable list, clear the field value, and clear any errors
        handleChange({ target: { name: fieldName, value: "" } });
        setErrors((prevErrors) => {
          const { [fieldName]: removed, ...rest } = prevErrors;
          return rest;
        });
        return [...prev, fieldName];
      }
    });
  };

  return (
    <div>
      {/* Screen version - visible on screen only */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <ReportHeader reportId={formData.id} onBack={onBack} />

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
          <FormRenderer
            schema={ACCIDENT_REPORT_SCHEMA}
            formData={formData}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            touched={touched}
            errors={errors}
            unavailableFields={unavailableFields}
            onToggleAvailability={toggleFieldAvailability}
            status={formData.status}
          />

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500 italic">
              Changes are automatically saved
            </div>
          </div>
        </form>
      </div>

      {/* Print version - hidden on screen, visible when printing */}
      <PrintRenderer
        schema={ACCIDENT_REPORT_SCHEMA}
        formData={formData}
        unavailableFields={unavailableFields}
      />
    </div>
  );
}

export default Report
