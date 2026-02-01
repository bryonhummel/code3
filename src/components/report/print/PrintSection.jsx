function PrintSection({ title, children }) {
  return (
    <div className="print-section">
      <div className="print-section-title">
        {title}
      </div>
      <div className="print-section-content">
        {children}
      </div>
    </div>
  );
}

export default PrintSection;
