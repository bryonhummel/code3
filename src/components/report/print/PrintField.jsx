function PrintField({ label, value, type = "text", isUnavailable = false }) {
  const renderValue = () => {
    if (isUnavailable) {
      return <span className="print-field-empty">—</span>;
    }

    if (!value || (Array.isArray(value) && value.length === 0)) {
      return <span className="print-field-empty">—</span>;
    }

    switch (type) {
      case "checkbox":
        // For checkbox arrays, join with commas
        return Array.isArray(value) ? value.join(", ") : value;

      case "signature":
        // For signatures, render the image
        return (
          <img src={value} alt="Signature" className="print-signature-image" />
        );

      case "textarea":
        // Preserve line breaks for textarea
        return <div className="print-field-textarea">{value}</div>;

      default:
        return value;
    }
  };

  return (
    <div className="print-field">
      <div
        className={`print-field-label ${isUnavailable ? "print-field-unavailable" : ""}`}
      >
        {label}
        {isUnavailable ? " (NA)" : ""}
      </div>
      <div className="print-field-value">{renderValue()}</div>
    </div>
  );
}

export default PrintField;
