# **Ski Patrol Accident Report Form - Architecture Design Document**

## **1. Overview**

This document outlines the architecture for refactoring the ski patrol accident report form into a maintainable, schema-driven system with separate UI and print components.

### **Key Goals**
- Schema-driven form configuration (single source of truth)
- Separate UI (`AccidentForm`) and Print (`AccidentFormPrint`) components
- Reusable, composable field components
- Deterministic field sizes with maxLength constraints
- Dense A4 print layout with overflow to page 2 if needed
- Extensible validation system

### **Requirements Summary**

#### Field Size Constraints
- Use `maxLength` attribute for character limits
- Short text fields (name, location): 50-100 chars
- Medium fields (phone, age, weight): 20-30 chars
- Long text areas (injury description, treatment): 500-1000 chars

#### Print Layout
- **Page size**: A4 (Legal)
- **Layout**: Single page with dense layout (small font, tight spacing)
- **Overflow**: Allow overflow to page 2 if absolutely required
- **Style**: Hybrid - sections with boxes but condensed

#### Field Types Required
- Text inputs (single line) ✓
- Text areas (multi-line) ✓
- Numeric inputs with steppers (for age, weight, height)
- Date inputs ✓
- DateTime inputs ✓
- Radio buttons (single choice - all options visible when printed)
- Checkboxes (multi-select)
- Signature pad (canvas-based for drawing real signatures)

#### Validation
- Start simple: required fields + maxLength only
- Phone number format validation
- Extensible system to add more validation as project evolves

#### Data Model
- Schema-driven configuration in JSON-like structure
- Single source of truth for form definition

---

## **2. Architecture Overview**

```
src/
├── components/
│   ├── report/
│   │   ├── AccidentForm.jsx              # Main UI form component
│   │   ├── AccidentFormPrint.jsx         # Print-only component
│   │   ├── FormRenderer.jsx              # Renders form from schema
│   │   ├── PrintRenderer.jsx             # Renders print version from schema
│   │   │
│   │   ├── fields/                       # Reusable field components
│   │   │   ├── TextField.jsx             # Text input with maxLength
│   │   │   ├── TextAreaField.jsx         # Multi-line text with maxLength
│   │   │   ├── NumberField.jsx           # Numeric input with steppers
│   │   │   ├── DateField.jsx             # Date picker
│   │   │   ├── DateTimeField.jsx         # Date + Time picker
│   │   │   ├── RadioGroupField.jsx       # Radio buttons (single choice)
│   │   │   ├── CheckboxGroupField.jsx    # Checkboxes (multi-select)
│   │   │   └── SignatureField.jsx        # Signature pad (canvas-based)
│   │   │
│   │   ├── print/                        # Print-specific components
│   │   │   ├── PrintTextField.jsx        # Condensed text display
│   │   │   ├── PrintTextArea.jsx         # Condensed multi-line display
│   │   │   ├── PrintRadioGroup.jsx       # Shows selected option
│   │   │   ├── PrintCheckboxGroup.jsx    # Shows checked items
│   │   │   ├── PrintSignature.jsx        # Displays signature image
│   │   │   └── PrintSection.jsx          # Print section container
│   │   │
│   │   └── shared/
│   │       ├── FieldWrapper.jsx          # Common wrapper for all fields
│   │       └── ValidationMessage.jsx     # Error/warning display
│   │
├── config/
│   └── formSchema.js                     # Form configuration schema
│
├── hooks/
│   ├── useFormData.js                    # Form state management
│   └── useFormValidation.js              # Validation logic
│
├── utils/
│   ├── validation.js                     # Validation functions
│   └── formHelpers.js                    # Helper utilities
│
└── styles/
    └── print.css                         # Print-specific styles
```

---

## **3. Form Schema Structure**

The schema is the single source of truth for the form structure:

```javascript
// config/formSchema.js
export const ACCIDENT_REPORT_SCHEMA = {
  sections: [
    {
      id: 'incident-details',
      title: 'Incident Details',
      printTitle: 'INCIDENT DETAILS',  // Optional: different title for print
      fields: [
        {
          name: 'reportId',
          type: 'readonly',
          label: 'Report ID',
          required: false,
          printable: true
        },
        {
          name: 'location',
          type: 'text',
          label: 'Location',
          placeholder: 'e.g., Main Street Run, Lift 3',
          required: true,
          maxLength: 100,
          printable: true,
          validation: {
            type: 'required',
            message: 'Location is required'
          }
        },
        {
          name: 'dateOfIncident',
          type: 'date',
          label: 'Date of Incident',
          required: true,
          printable: true
        },
        {
          name: 'timeOfIncident',
          type: 'time',
          label: 'Time of Incident',
          required: true,
          printable: true
        }
      ]
    },
    {
      id: 'patient-info',
      title: 'Patient Information',
      printTitle: 'PATIENT INFORMATION',
      fields: [
        {
          name: 'patientName',
          type: 'text',
          label: 'Patient Name',
          placeholder: 'Full name',
          required: true,
          maxLength: 100,
          printable: true
        },
        {
          name: 'patientAge',
          type: 'number',
          label: 'Age',
          placeholder: 'Age',
          required: true,
          min: 0,
          max: 120,
          printable: true
        },
        {
          name: 'patientGender',
          type: 'radio',
          label: 'Gender',
          required: true,
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'non-binary', label: 'Non-Binary' }
          ],
          printable: true
        },
        {
          name: 'guestType',
          type: 'radio',
          label: 'Guest Type',
          required: true,
          options: [
            { value: 'day-ticket', label: 'Day Ticket' },
            { value: 'season-pass', label: 'Season Pass' },
            { value: 'card-holder', label: 'Card Holder' },
            { value: 'staff', label: 'Staff' },
            { value: 'other', label: 'Other' }
          ],
          printable: true
        }
        // ... more fields
      ]
    },
    {
      id: 'injuries',
      title: 'Patient Injuries',
      printTitle: 'INJURIES & TREATMENT',
      fields: [
        {
          name: 'injuryTypes',
          type: 'checkbox',
          label: 'Injury Type(s)',
          required: false,
          options: [
            { value: 'fracture', label: 'Fracture' },
            { value: 'sprain', label: 'Sprain/Strain' },
            { value: 'laceration', label: 'Laceration' },
            { value: 'head', label: 'Head Injury' },
            { value: 'other', label: 'Other' }
          ],
          printable: true
        },
        {
          name: 'injuryDescription',
          type: 'textarea',
          label: 'Injury Description',
          placeholder: 'Detailed description...',
          required: true,
          maxLength: 1000,
          rows: 4,
          printable: true
        }
        // ... more fields
      ]
    },
    {
      id: 'signature',
      title: 'Patroller Information',
      printTitle: 'PATROLLER SIGNATURE',
      fields: [
        {
          name: 'patrollerName',
          type: 'text',
          label: 'Patroller Name',
          required: true,
          maxLength: 100,
          printable: true
        },
        {
          name: 'signature',
          type: 'signature',
          label: 'Signature',
          required: true,
          printable: true
        }
      ]
    }
  ]
};

// Export helper to get all required fields
export const getRequiredFields = () => {
  return ACCIDENT_REPORT_SCHEMA.sections
    .flatMap(section => section.fields)
    .filter(field => field.required)
    .map(field => field.name);
};
```

---

## **4. Component Architecture**

### **4.1 Field Components (UI)**

Each field component follows a consistent interface:

```javascript
// components/report/fields/TextField.jsx
function TextField({
  name,
  value,
  onChange,
  onBlur,
  label,
  placeholder,
  required,
  maxLength,
  showError,
  errorMessage,
  disabled
}) {
  return (
    <FieldWrapper label={label} required={required} name={name}>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      {showError && <ValidationMessage message={errorMessage} />}
      {maxLength && (
        <div className="text-xs text-gray-500 mt-1">
          {value.length}/{maxLength}
        </div>
      )}
    </FieldWrapper>
  );
}
```

**Key Features:**
- Consistent props interface across all field types
- Built-in character counter for maxLength fields
- Validation message display
- Accessible labels and error states

### **4.2 Print Components**

Print components are optimized for dense, paper-friendly display:

```javascript
// components/report/print/PrintTextField.jsx
function PrintTextField({ label, value, required }) {
  return (
    <div className="print-field">
      <div className="print-label">
        {label}{required && ' *'}
      </div>
      <div className="print-value">
        {value || '—'}
      </div>
    </div>
  );
}
```

**Print-specific CSS:**
```css
/* Optimized for A4 dense layout */
.print-field {
  display: flex;
  border-bottom: 1px solid #ddd;
  padding: 2px 4px;
  font-size: 9pt;
}

.print-label {
  font-weight: 600;
  width: 30%;
  min-width: 120px;
}

.print-value {
  flex: 1;
  word-break: break-word;
}
```

### **4.3 Form Renderer**

Dynamically renders the form from schema:

```javascript
// components/report/FormRenderer.jsx
function FormRenderer({ schema, formData, onChange, onBlur, touched, errors }) {
  const renderField = (field) => {
    const commonProps = {
      name: field.name,
      value: formData[field.name] || '',
      onChange,
      onBlur,
      label: field.label,
      required: field.required,
      showError: touched[field.name] && errors[field.name],
      errorMessage: errors[field.name]
    };

    switch (field.type) {
      case 'text':
        return <TextField {...commonProps} maxLength={field.maxLength} placeholder={field.placeholder} />;
      case 'number':
        return <NumberField {...commonProps} min={field.min} max={field.max} />;
      case 'radio':
        return <RadioGroupField {...commonProps} options={field.options} />;
      case 'checkbox':
        return <CheckboxGroupField {...commonProps} options={field.options} />;
      case 'signature':
        return <SignatureField {...commonProps} />;
      // ... more field types
      default:
        return null;
    }
  };

  return (
    <div className="form-renderer">
      {schema.sections.map(section => (
        <FormSection key={section.id} title={section.title}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.fields.map(field => (
              <div key={field.name} className={field.fullWidth ? 'col-span-full' : ''}>
                {renderField(field)}
              </div>
            ))}
          </div>
        </FormSection>
      ))}
    </div>
  );
}
```

### **4.4 Print Renderer**

Renders the print-optimized version:

```javascript
// components/report/PrintRenderer.jsx
function PrintRenderer({ schema, formData }) {
  const renderPrintField = (field) => {
    if (!field.printable) return null;

    const value = formData[field.name];

    switch (field.type) {
      case 'text':
      case 'number':
        return <PrintTextField label={field.label} value={value} required={field.required} />;
      case 'textarea':
        return <PrintTextArea label={field.label} value={value} required={field.required} />;
      case 'radio':
        return <PrintRadioGroup label={field.label} value={value} options={field.options} />;
      case 'checkbox':
        return <PrintCheckboxGroup label={field.label} values={value} options={field.options} />;
      case 'signature':
        return <PrintSignature label={field.label} signatureData={value} />;
      default:
        return null;
    }
  };

  return (
    <div className="print-only print-container">
      <div className="print-header">
        <h1>SKI PATROL ACCIDENT REPORT</h1>
        <div className="report-id">{formData.id}</div>
      </div>
      
      {schema.sections.map(section => (
        <PrintSection key={section.id} title={section.printTitle || section.title}>
          {section.fields.map(field => (
            <div key={field.name}>
              {renderPrintField(field)}
            </div>
          ))}
        </PrintSection>
      ))}
    </div>
  );
}
```

---

## **5. State Management**

### **5.1 Form Data Hook**

```javascript
// hooks/useFormData.js
export function useFormData(initialData, schema) {
  const [formData, setFormData] = useState(initialData);
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleSignatureChange = (fieldName, signatureData) => {
    setFormData(prev => ({ ...prev, [fieldName]: signatureData }));
  };

  return {
    formData,
    setFormData,
    touched,
    setTouched,
    handleChange,
    handleBlur,
    handleSignatureChange
  };
}
```

### **5.2 Validation Hook**

```javascript
// hooks/useFormValidation.js
export function useFormValidation(formData, schema) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    schema.sections.forEach(section => {
      section.fields.forEach(field => {
        if (field.required) {
          const value = formData[field.name];
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            newErrors[field.name] = field.validation?.message || `${field.label} is required`;
          }
        }
        
        // Add custom validation here
        if (field.validation?.custom) {
          const customError = field.validation.custom(formData[field.name], formData);
          if (customError) {
            newErrors[field.name] = customError;
          }
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateCompletion = () => {
    const requiredFields = schema.sections
      .flatMap(s => s.fields)
      .filter(f => f.required);
    
    const completed = requiredFields.filter(field => {
      const value = formData[field.name];
      return value && value.toString().trim() !== '';
    });

    return Math.round((completed.length / requiredFields.length) * 100);
  };

  return { errors, validate, calculateCompletion };
}
```

---

## **6. Print Styling**

```css
/* src/styles/print.css */
@media print {
  @page {
    size: A4;
    margin: 10mm;
  }

  /* Hide UI elements */
  .no-print,
  nav,
  header,
  button,
  .form-status-panel {
    display: none !important;
  }

  /* Show print-only elements */
  .print-only {
    display: block !important;
  }

  /* Print container */
  .print-container {
    width: 100%;
    font-family: Arial, sans-serif;
    font-size: 9pt;
    color: #000;
    background: white;
  }

  /* Print header */
  .print-header {
    text-align: center;
    border-bottom: 2px solid #000;
    padding-bottom: 5mm;
    margin-bottom: 5mm;
  }

  .print-header h1 {
    font-size: 14pt;
    font-weight: bold;
    margin: 0;
  }

  /* Print sections */
  .print-section {
    margin-bottom: 5mm;
    page-break-inside: avoid;
  }

  .print-section-title {
    font-size: 11pt;
    font-weight: bold;
    background: #f0f0f0;
    padding: 2mm;
    margin-bottom: 2mm;
    border: 1px solid #000;
  }

  /* Print fields */
  .print-field {
    display: flex;
    border-bottom: 1px solid #ddd;
    padding: 1mm 2mm;
    min-height: 6mm;
  }

  .print-label {
    font-weight: 600;
    width: 35%;
    min-width: 40mm;
  }

  .print-value {
    flex: 1;
    word-break: break-word;
  }

  /* Signature */
  .print-signature {
    border: 1px solid #000;
    min-height: 20mm;
    padding: 2mm;
  }

  /* Ensure page breaks work properly */
  .print-section {
    page-break-inside: avoid;
  }
}

/* Hide print-only by default */
.print-only {
  display: none;
}
```

---

## **7. Implementation Plan**

### **Phase 1: Foundation**
1. Create form schema structure (`formSchema.js`)
2. Build base field components (TextField, NumberField, etc.)
3. Create FieldWrapper and ValidationMessage components
4. Implement useFormData and useFormValidation hooks

### **Phase 2: Renderers**
5. Build FormRenderer component
6. Create print field components
7. Build PrintRenderer component
8. Implement print CSS

### **Phase 3: Integration**
9. Refactor Report.jsx to use new architecture
10. Create AccidentForm component (uses FormRenderer)
11. Create AccidentFormPrint component (uses PrintRenderer)
12. Test and refine print layout

### **Phase 4: Enhancement**
13. Add SignatureField component (canvas-based)
14. Implement CheckboxGroupField
15. Implement RadioGroupField
16. Add phone number validation
17. Fine-tune responsive layouts

---

## **8. Benefits of This Architecture**

✅ **Single Source of Truth**: Schema defines everything  
✅ **Separation of Concerns**: UI and print are completely separate  
✅ **Reusability**: Field components work across any form  
✅ **Maintainability**: Add/remove fields by editing schema only  
✅ **Consistency**: All fields follow same patterns  
✅ **Extensibility**: Easy to add new field types or validation  
✅ **Print Reliability**: Dedicated print components ensure consistent output  
✅ **Type Safety**: Schema can be typed with TypeScript later  

---

## **9. Migration Strategy**

To migrate from the current POC to this new architecture:

1. **Keep existing Report.jsx working** while building new components
2. **Build new components in parallel** in the new structure
3. **Test new components independently** before integration
4. **Gradual migration**: Replace sections one at a time
5. **Maintain data compatibility**: Ensure formData structure remains compatible
6. **Final cutover**: Replace old Report.jsx with new AccidentForm + AccidentFormPrint

---

## **10. Future Enhancements**

- TypeScript migration for type safety
- Form versioning (track schema changes over time)
- Export to PDF (in addition to print)
- Offline support with service workers
- Form templates (pre-fill common scenarios)
- Multi-language support
- Accessibility improvements (WCAG 2.1 AA compliance)
