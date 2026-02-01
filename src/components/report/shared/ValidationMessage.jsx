function ValidationMessage({ message, type = 'error' }) {
  const styles = {
    error: 'text-red-500 bg-red-50 border-red-200',
    warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    info: 'text-blue-600 bg-blue-50 border-blue-200'
  };

  return (
    <div className={`text-sm mt-1 px-2 py-1 rounded border ${styles[type]}`}>
      {message}
    </div>
  );
}

export default ValidationMessage;
