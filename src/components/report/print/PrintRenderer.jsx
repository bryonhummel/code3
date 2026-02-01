import PrintSection from './PrintSection';
import PrintField from './PrintField';

function PrintRenderer({ schema, formData }) {
  return (
    <div className="print-renderer">
      <div className="print-header">
        <h1 className="print-title">Ski Patrol Accident Report</h1>
        <div className="print-report-number">
          Report #{formData.reportNumber || '—'}
        </div>
      </div>

      {schema.sections.map(section => (
        <PrintSection key={section.id} title={section.title}>
          <div className="print-fields-grid">
            {section.fields.map(field => (
              <div 
                key={field.name}
                className={field.fullWidth ? 'print-field-full' : 'print-field-normal'}
              >
                <PrintField
                  label={field.label}
                  value={formData[field.name]}
                  type={field.type}
                />
              </div>
            ))}
          </div>
        </PrintSection>
      ))}

      <div className="print-footer">
        <div className="print-footer-text">
          Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

export default PrintRenderer;
