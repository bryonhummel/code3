/**
 * Reusable stacked progress bar component
 * Shows completion progress with separate bars for required and optional fields
 */
function ProgressBar({
  completionMetrics,
  showLegend = true,
  showPercentage = true,
  size = "md", // 'sm', 'md', 'lg'
}) {
  // Size configurations
  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const legendSizeClasses = {
    sm: "text-xs",
    md: "text-xs",
    lg: "text-sm",
  };

  const legendIconClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  return (
    <div>
      {/* Header with title and percentage */}
      {showPercentage && (
        <div className="flex justify-between items-center mb-2">
          <span
            className={`${textSizeClasses[size]} font-semibold text-gray-700`}
          >
            Form Completion
          </span>
          <span
            className={`${textSizeClasses[size]} font-semibold ${completionMetrics.overallPercentage === 100 ? "text-green-600" : "text-gray-700"}`}
          >
            {completionMetrics.overallPercentage}%
          </span>
        </div>
      )}

      {/* Stacked progress bar container */}
      <div
        className={`relative w-full ${completionMetrics.overallPercentage === 100 ? "bg-green-600" : "bg-gray-200"} rounded-full ${sizeClasses[size]} overflow-visible`}
      >
        {/* Blue bar - requiredByPatient fields */}
        {completionMetrics.overallPercentage !== 100 && (
          <div
            className="absolute top-0 left-0 h-full bg-blue-300 transition-all duration-300 rounded-l-full"
            style={{ width: `${completionMetrics.requiredPercentage}%` }}
          />
        )}

        {/* Dark gray bar - non-required fields */}
        {completionMetrics.overallPercentage !== 100 && (
          <div
            className={`absolute top-0 h-full bg-gray-400 transition-all duration-300 ${completionMetrics.requiredPercentage === 0 ? "rounded-l-full" : ""}`}
            style={{
              left: `${completionMetrics.requiredPercentage}%`,
              width: `${completionMetrics.nonRequiredPercentage}%`,
              borderTopRightRadius:
                completionMetrics.overallPercentage === 100 ? "9999px" : "0",
              borderBottomRightRadius:
                completionMetrics.overallPercentage === 100 ? "9999px" : "0",
            }}
          />
        )}

        {/* Threshold marker - shows where requiredByPatient would be 100% */}
        {completionMetrics.overallPercentage !== 100 && (
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
        )}
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="flex justify-between items-center mt-2 text-gray-400">
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <div
                className={`${legendIconClasses[size]} bg-blue-300 rounded-sm`}
              />
              <span className={legendSizeClasses[size]}>
                Patient Info: {completionMetrics.completedRequired}/
                {completionMetrics.totalRequired}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div
                className={`${legendIconClasses[size]} bg-gray-400 rounded-sm`}
              />
              <span className={legendSizeClasses[size]}>
                Patroller Info: {completionMetrics.completedNonRequired}/
                {completionMetrics.totalNonRequired}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProgressBar;
