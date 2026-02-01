// Smart reminder rules configuration
const REMINDER_RULES = [
  {
    id: 'minor_patient',
    condition: (formData) => {
      const age = parseInt(formData.patientAge)
      return !isNaN(age) && age < 18
    },
    message: '⚠️ Patient is a minor - Remember to contact parent/guardian',
    type: 'warning'
  },
  {
    id: 'head_injury',
    condition: (formData) => {
      return (
        formData.injuryTypes &&
        Array.isArray(formData.injuryTypes) &&
        formData.injuryTypes.includes("head")
      );
    },
    message: '⚠️ Head injury reported - Provide concussion information card',
    type: 'warning'
  },
  {
    id: 'staff_injury',
    condition: (formData) => {
      return (
        formData.guestType === "staff" ||
        formData.guestType === "staff-off-duty"
      );
    },
    message: '⚠️ Staff injury reported - Notify supervisor',
    type: 'warning'
  },
  {
    id: 'staff_involved_head_injury',
    condition: (formData) => {
      const isStaff =
        formData.guestType === "staff" ||
        formData.guestType === "staff-off-duty";
      const hasHeadInjury =
        formData.injuryTypes &&
        Array.isArray(formData.injuryTypes) &&
        formData.injuryTypes.includes("head");
      return isStaff && hasHeadInjury;
    },
    message: '🚨 Staff member with head injury - Notify supervisor and Liz',
    type: 'alert'
  },
  {
    id: 'severe_injury',
    condition: (formData) => {
      return formData.injurySeverity === 'severe'
    },
    message: '🚨 Severe injury - Ensure emergency services have been contacted',
    type: 'alert'
  }
]

function FormStatusPanel({
  status,
  onStatusChange,
  completionMetrics,
  pendingCount,
  onPrint,
  onDelete,
  formData,
}) {
  // Check which reminders should be displayed
  const activeReminders = REMINDER_RULES.filter((rule) =>
    rule.condition(formData),
  );

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200 no-print">
      <div className="flex flex-row-reverse items-center gap-3 pb-5">
        <button
          type="button"
          onClick={onDelete}
          className="text-red-600 hover:text-red-700 font-semibold px-4 py-2"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={onPrint}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Print
        </button>
      </div>

      {/* Stacked Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">
            Form Completion
          </span>
          <span className="text-sm font-semibold text-gray-700">
            {completionMetrics.overallPercentage}%
          </span>
        </div>

        {/* Stacked progress bar container */}
        <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-visible">
          {/* Blue bar - requiredByPatient fields */}
          <div
            className="absolute top-0 left-0 h-full bg-blue-300 transition-all duration-300 rounded-l-full"
            style={{ width: `${completionMetrics.requiredPercentage}%` }}
          />

          {/* Dark gray bar - non-required fields */}
          <div
            className="absolute top-0 h-full bg-gray-400 transition-all duration-300"
            style={{
              left: `${completionMetrics.requiredPercentage}%`,
              width: `${completionMetrics.nonRequiredPercentage}%`,
              borderTopRightRadius:
                completionMetrics.overallPercentage === 100 ? "9999px" : "0",
              borderBottomRightRadius:
                completionMetrics.overallPercentage === 100 ? "9999px" : "0",
            }}
          />

          {/* Threshold marker - shows where requiredByPatient would be 100% */}
          <div
            className="absolute top-0 h-full w-0.5 bg-blue-300 shadow-md"
            style={{
              left: `${completionMetrics.requiredThresholdPercentage}%`,
            }}
            title={`Required fields threshold: ${completionMetrics.requiredThresholdPercentage}%`}
          >
            {/* Small triangle marker at top */}
            <div className="absolute -top-1 -left-1 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-blue-300" />
            {/* Small triangle marker at bottom */}
            <div className="absolute -bottom-1 -left-1 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-blue-300" />
          </div>
        </div>

        {/* Progress details */}
        <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-300 rounded-sm" />
              <span>
                Patient Info: {completionMetrics.completedRequired}/
                {completionMetrics.totalRequired}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-400 rounded-sm" />
              <span>
                Patroller Info: {completionMetrics.completedNonRequired}/
                {completionMetrics.totalNonRequired}
              </span>
            </div>
          </div>
        </div>

        {completionMetrics.overallPercentage === 100 && (
          <p className="text-sm text-green-600 mt-2 font-semibold">
            ✓ All fields completed
          </p>
        )}
      </div>

      {/* Smart Reminders */}
      {activeReminders.length > 0 && (
        <div className="space-y-2">
          {activeReminders.map((reminder) => (
            <div
              key={reminder.id}
              className={`p-3 rounded-lg border-l-4 ${
                reminder.type === "alert"
                  ? "bg-red-50 border-red-500 text-red-800"
                  : "bg-yellow-50 border-yellow-500 text-yellow-800"
              }`}
            >
              <p className="text-sm font-semibold">{reminder.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Status and Actions Row */}
      <div className="flex items-center justify-between mb-4 pt-5">
        <div className="items-center gap-4">
          <span className="text-sm font-semibold text-gray-700">Status</span>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => onStatusChange("in progress")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                status === "in progress"
                  ? "bg-yellow-100 text-yellow-800 border-2 border-yellow-400"
                  : "bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200"
              }`}
            >
              In Progress
            </button>
            <button
              type="button"
              onClick={() => onStatusChange("completed")}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                status === "completed"
                  ? "bg-green-100 text-green-800 border-2 border-green-400"
                  : "bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200"
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormStatusPanel
