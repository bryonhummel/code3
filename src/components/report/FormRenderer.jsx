import FormSection from './FormSection';
import TextField from './fields/TextField';
import TextAreaField from './fields/TextAreaField';
import NumberField from './fields/NumberField';
import DateField from './fields/DateField';
import TimeField from './fields/TimeField';
import RadioGroupField from './fields/RadioGroupField';
import CheckboxGroupField from './fields/CheckboxGroupField';
import SignatureField from './fields/SignatureField';

function FormRenderer({
  schema,
  formData,
  onChange,
  onBlur,
  touched,
  errors,
  unavailableFields = [],
  onToggleAvailability,
  status = "in progress",
}) {
  const renderField = (field) => {
    const isUnavailable = unavailableFields.includes(field.name);
    const fieldValue = formData[field.name];

    // Determine if field is empty
    const isEmpty =
      !fieldValue ||
      (typeof fieldValue === "string" && fieldValue.trim() === "") ||
      (Array.isArray(fieldValue) && fieldValue.length === 0);

    const isCompleted = status === "completed";

    const commonProps = {
      name: field.name,
      value: fieldValue || (field.type === "checkbox" ? [] : ""),
      onChange,
      onBlur,
      label: field.label,
      requiredByPatient: field.requiredByPatient,
      showError: touched[field.name] && !!errors[field.name],
      errorMessage: errors[field.name],
      disabled: field.type === "readonly" || isUnavailable,
      isUnavailable,
      onToggleAvailability: () => onToggleAvailability(field.name),
      isEmpty,
      isCompleted,
    };

    switch (field.type) {
      case "text":
        return (
          <TextField
            {...commonProps}
            maxLength={field.maxLength}
            placeholder={field.placeholder}
          />
        );

      case "textarea":
        return (
          <TextAreaField
            {...commonProps}
            maxLength={field.maxLength}
            placeholder={field.placeholder}
            rows={field.rows}
          />
        );

      case "number":
        return (
          <NumberField
            {...commonProps}
            min={field.min}
            max={field.max}
            placeholder={field.placeholder}
          />
        );

      case "date":
        return <DateField {...commonProps} />;

      case "time":
        return <TimeField {...commonProps} />;

      case "radio":
        return <RadioGroupField {...commonProps} options={field.options} />;

      case "checkbox":
        return <CheckboxGroupField {...commonProps} options={field.options} />;

      case "signature":
        return <SignatureField {...commonProps} />;

      case "readonly":
        return (
          <div className="py-2 px-3">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {field.label}
            </label>
            <div className="text-gray-900 font-mono px-4">
              {formData[field.name] || "—"}
            </div>
          </div>
        );

      default:
        console.warn(`Unknown field type: ${field.type}`);
        return null;
    }
  };

  return (
    <div className="form-renderer space-y-6">
      {schema.sections.map((section) => (
        <FormSection key={section.id} title={section.title}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.fields.map((field) => (
              <div
                key={field.name}
                className={field.fullWidth ? "col-span-full" : ""}
              >
                {renderField(field)}
              </div>
            ))}
          </div>
        </FormSection>
      ))}
    </div>
  );
}

export default FormRenderer;
