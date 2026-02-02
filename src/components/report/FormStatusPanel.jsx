import { useState } from "react";
import ProgressBar from "./shared/ProgressBar";

// Smart reminder rules configuration
const REMINDER_RULES = [
  {
    id: "minor_patient",
    condition: (formData) => {
      const age = parseInt(formData.age);
      return !isNaN(age) && age < 18;
    },
    message: "⚠️ Patient is a minor - Contact parent/guardian",
    type: "warning",
  },
  {
    id: "head_injury",
    condition: (formData) => {
      return (
        formData.injuryTypes &&
        Array.isArray(formData.injuryTypes) &&
        formData.injuryTypes.includes("head")
      );
    },
    message: "⚠️ Head injury reported - Provide concussion information card",
    type: "warning",
  },
  {
    id: "staff_injury",
    condition: (formData) => {
      return formData.patientType === "staff-working";
    },
    message: "⚠️ Staff injury reported - Notify supervisor",
    type: "warning",
  },
  {
    id: "staff_involved_head_injury",
    condition: (formData) => {
      const isStaff = formData.patientType === "staff-working";
      const hasHeadInjury =
        formData.injuryTypes &&
        Array.isArray(formData.injuryTypes) &&
        formData.injuryTypes.includes("head");
      return isStaff && hasHeadInjury;
    },
    message: "🚨 Staff member with head injury - Notify supervisor and Liz",
    type: "alert",
  },
  {
    id: "severe_injury",
    condition: (formData) => {
      return formData.injurySeverity === "severe";
    },
    message: "🚨 Severe injury - Ensure emergency services have been contacted",
    type: "alert",
  },
];

function FormStatusPanel({
  status,
  onStatusChange,
  completionMetrics,
  pendingCount,
  onPrint,
  onDelete,
  formData,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Check which reminders should be displayed
  const activeReminders = REMINDER_RULES.filter((rule) =>
    rule.condition(formData),
  );

  const hasWarnings = activeReminders.length > 0;

  return (
    <div className="bg-white border-b border-gray-200 rounded-2xl sticky top-[73px] z-30 no-print">
      {/* Collapsed View - Always visible single row */}
      {!isExpanded && (
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3 gap-4">
            {/* Left side - Progress bar and toggle */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label={isExpanded ? "Collapse panel" : "Expand panel"}
              >
                <svg
                  className={`w-5 h-5 text-gray-600 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Warning indicator when collapsed */}
              {hasWarnings && (
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              {/* Progress bar */}
              <div className="flex-1 min-w-0">
                <ProgressBar
                  completionMetrics={completionMetrics}
                  showLegend={false}
                  showPercentage={true}
                  showCompletionMessage={false}
                  size="sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expanded View - Shows when toggled */}
      {isExpanded && (
        <div className="">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Toggle button and Progress Bar with full details */}
            <div className="flex items-start gap-3 mb-4">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors mt-1"
                aria-label="Collapse panel"
              >
                <svg
                  className="w-5 h-5 text-gray-600 transition-transform rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="flex-1">
                <ProgressBar
                  completionMetrics={completionMetrics}
                  showLegend={true}
                  showPercentage={true}
                  showCompletionMessage={true}
                  size="md"
                />
              </div>
            </div>

            {/* Smart Reminders */}
            {activeReminders.length > 0 && (
              <div className="space-y-2 mb-4">
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

            {/* Status and Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Status buttons */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700">
                  Status:
                </span>
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
                      ? "bg-green-100 text-green-800 border-2 border-green-600"
                      : "bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200"
                  }`}
                >
                  Completed
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
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
                <button
                  type="button"
                  onClick={onDelete}
                  className="text-red-600 hover:text-red-700 font-semibold px-4 py-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormStatusPanel;
