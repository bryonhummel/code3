function ReportHeader({ reportId, onBack }) {
  return (
    <>
      <div className="flex items-center gap-4 mb-6 no-print">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 font-semibold flex items-center gap-2"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
        Ski Patrol Incident Report
      </h1>
    </>
  );
}

export default ReportHeader
