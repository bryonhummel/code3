// Form Schema - Single source of truth for the accident report form structure

export const ACCIDENT_REPORT_SCHEMA = {
  sections: [
    {
      id: "incident-details",
      title: "Incident Details",
      printTitle: "INCIDENT DETAILS",
      fields: [
        {
          name: "reportId",
          type: "readonly",
          label: "Report ID",
          requiredByPatient: false,
          printable: true,
        },
        {
          name: "resort",
          type: "text",
          label: "Resort/Ski Area",
          placeholder: "e.g., Chicopee Ski Club",
          requiredByPatient: false,
          maxLength: 100,
          printable: true,
        },
        {
          name: "dateOfIncident",
          type: "date",
          label: "Date of Incident",
          requiredByPatient: false,
          printable: true,
        },
        {
          name: "timeOfIncident",
          type: "time",
          label: "Time of Incident",
          requiredByPatient: true,
          printable: true,
        },
      ],
    },
    {
      id: "patient-info",
      title: "Patient Information",
      printTitle: "PATIENT INFORMATION",
      fields: [
        {
          name: "name",
          type: "text",
          label: "Name",
          placeholder: "Full name",
          requiredByPatient: true,
          maxLength: 100,
          printable: true,
        },
        {
          name: "homeAddress",
          type: "text",
          label: "Home Address",
          placeholder: "123 Main St",
          requiredByPatient: true,
          maxLength: 100,
          printable: true,
        },
        {
          name: "city",
          type: "text",
          label: "City",
          placeholder: "Name of city",
          requiredByPatient: true,
          maxLength: 50,
          printable: true,
        },
        {
          name: "province",
          type: "text",
          label: "Province",
          placeholder: "Name of province",
          requiredByPatient: true,
          maxLength: 50,
          printable: true,
        },
        {
          name: "postalCode",
          type: "text",
          label: "Postal Code",
          placeholder: "Postal Code",
          requiredByPatient: true,
          maxLength: 10,
          printable: true,
        },
        {
          name: "phone",
          type: "text",
          label: "Phone",
          placeholder: "(555) 123-4567",
          requiredByPatient: true,
          maxLength: 20,
          printable: true,
          validation: {
            type: "phone",
            message: "Please enter a valid phone number",
          },
        },
        {
          name: "schoolProgram",
          type: "radio",
          label: "Student participating in school program?",
          requiredByPatient: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ],
          printable: true,
        },
        {
          name: "occupation",
          type: "text",
          label: "Occupation/School Group",
          placeholder: "Occupation",
          requiredByPatient: true,
          maxLength: 10,
          printable: true,
        },
        {
          name: "dateOfBirth",
          type: "date",
          label: "Date of Birth",
          requiredByPatient: true,
          printable: true,
        },
        {
          name: "age",
          type: "number",
          label: "Age",
          placeholder: "Age",
          requiredByPatient: true,
          printable: true,
        },

        {
          name: "patientGender",
          type: "radio",
          label: "Gender",
          requiredByPatient: true,
          options: [
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "non-binary", label: "Non-Binary" },
            { value: "non-disclosure", label: "Non-Disclosure" },
          ],
          printable: true,
        },
        {
          name: "weight",
          type: "number",
          label: "Weight (lbs)",
          placeholder: "Weight",
          requiredByPatient: true,
          printable: true,
        },
        {
          name: "height",
          type: "text",
          label: "Height",
          placeholder: "e.g., 5'10\"",
          requiredByPatient: true,
          maxLength: 20,
          printable: true,
        },
        {
          name: "patientType",
          type: "radio",
          label: "Patient Type",
          requiredByPatient: true,
          options: [
            { value: "guest", label: "Guest" },
            { value: "staff-off-duty", label: "Staff (off work)" },
            { value: "staff-working", label: "Staff (working)" },
            { value: "unknown", label: "Unkown" },
            { value: "other", label: "Other" },
          ],
          printable: true,
        },
        {
          name: "ticketType",
          type: "radio",
          label: "Ticket Type",
          requiredByPatient: true,
          options: [
            { value: "day-ticket", label: "Day Ticket" },
            { value: "school-visit", label: "School Visit" },
            { value: "9-wk-lessons", label: "9-wk Lessons" },
            { value: "member", label: "Member/Season Pass/Card" },
            { value: "unknown", label: "Unknown" },
          ],
          printable: true,
        },
        {
          name: "patientDescription",
          type: "textarea",
          label: "Patient Description of Incident",
          placeholder: "Patient description of the incident.",
          requiredByPatient: true,
          maxLength: 500,
          rows: 4,
          printable: true,
          fullWidth: true,
        },
        {
          name: "signatureType",
          type: "radio",
          label: "Signed By",
          requiredByPatient: true,
          options: [
            { value: "patient", label: "Patient" },
            { value: "parent", label: "Parent" },
            { value: "guardian", label: "Guardian" },
          ],
          printable: true,
        },
        {
          name: "patientSignature",
          type: "signature",
          label: "Signature",
          requiredByPatient: true,
          printable: true,
          fullWidth: false,
        },
      ],
    },
    {
      id: "injuries",
      title: "Patient Injuries",
      printTitle: "INJURIES & TREATMENT",
      fields: [
        {
          name: "injuryTypes",
          type: "checkbox",
          label: "Injury Type(s)",
          requiredByPatient: false,
          options: [
            { value: "fracture", label: "Fracture" },
            { value: "sprain", label: "Sprain/Strain" },
            { value: "laceration", label: "Laceration" },
            { value: "head", label: "Head Injury" },
            { value: "other", label: "Other" },
          ],
          printable: true,
        },
        {
          name: "bodyPart",
          type: "text",
          label: "Body Part Affected",
          placeholder: "e.g., Left knee, Right wrist",
          requiredByPatient: false,
          maxLength: 100,
          printable: true,
        },
        {
          name: "injurySeverity",
          type: "radio",
          label: "Severity",
          requiredByPatient: false,
          options: [
            { value: "minor", label: "Minor" },
            { value: "moderate", label: "Moderate" },
            { value: "severe", label: "Severe" },
          ],
          printable: true,
        },
        {
          name: "injuryDescription",
          type: "textarea",
          label: "Injury Description",
          placeholder:
            "Detailed description of the injury and how it occurred...",
          requiredByPatient: true,
          maxLength: 500,
          rows: 4,
          printable: true,
          fullWidth: true,
        },
        {
          name: "treatmentProvided",
          type: "textarea",
          label: "Treatment Provided",
          placeholder: "First aid and treatment provided...",
          requiredByPatient: false,
          maxLength: 500,
          rows: 3,
          printable: true,
          fullWidth: true,
        },
      ],
    },
    {
      id: "conditions",
      title: "Ski Conditions",
      printTitle: "SKI CONDITIONS",
      fields: [
        {
          name: "weatherConditions",
          type: "radio",
          label: "Weather",
          requiredByPatient: false,
          options: [
            { value: "clear", label: "Clear" },
            { value: "cloudy", label: "Cloudy" },
            { value: "snowing", label: "Snowing" },
            { value: "fog", label: "Fog" },
          ],
          printable: true,
        },
        {
          name: "snowConditions",
          type: "radio",
          label: "Snow Conditions",
          requiredByPatient: false,
          options: [
            { value: "powder", label: "Powder" },
            { value: "packed", label: "Packed" },
            { value: "icy", label: "Icy" },
            { value: "slushy", label: "Slushy" },
          ],
          printable: true,
        },
        {
          name: "visibility",
          type: "radio",
          label: "Visibility",
          requiredByPatient: false,
          options: [
            { value: "excellent", label: "Excellent" },
            { value: "good", label: "Good" },
            { value: "fair", label: "Fair" },
            { value: "poor", label: "Poor" },
          ],
          printable: true,
        },
        {
          name: "trailDifficulty",
          type: "radio",
          label: "Trail Difficulty",
          requiredByPatient: false,
          options: [
            { value: "green", label: "Green Circle (Beginner)" },
            { value: "blue", label: "Blue Square (Intermediate)" },
            { value: "black", label: "Black Diamond (Advanced)" },
            { value: "double-black", label: "Double Black Diamond (Expert)" },
          ],
          printable: true,
        },
      ],
    },
    {
      id: "patroller-info",
      title: "Patroller Information",
      printTitle: "PATROLLER SIGNATURE",
      fields: [
        {
          name: "patrollerName",
          type: "text",
          label: "Patroller Name",
          placeholder: "Full name",
          requiredByPatient: false,
          maxLength: 100,
          printable: true,
        },
        {
          name: "signature",
          type: "signature",
          label: "Signature",
          requiredByPatient: false,
          printable: true,
          fullWidth: true,
        },
        {
          name: "signatureDate",
          type: "readonly",
          label: "Signature Date",
          requiredByPatient: false,
          printable: true,
        },
      ],
    },
  ],
};

// Helper function to get all fields required by patient
export const getRequiredByPatientFields = () => {
  return ACCIDENT_REPORT_SCHEMA.sections
    .flatMap((section) => section.fields)
    .filter((field) => field.requiredByPatient)
    .map((field) => field.name);
};

// Helper function to get field by name
export const getFieldByName = (fieldName) => {
  for (const section of ACCIDENT_REPORT_SCHEMA.sections) {
    const field = section.fields.find(f => f.name === fieldName);
    if (field) return field;
  }
  return null;
};

// Helper function to initialize form data with default values
export const getInitialFormData = (overrides = {}) => {
  const initialData = {
    dateOfIncident: new Date().toISOString().split('T')[0],
    location: 'Chicopee Ski Club',
    injuryTypes: [], // Initialize checkbox fields as arrays
    ...overrides
  };
  
  return initialData;
};
