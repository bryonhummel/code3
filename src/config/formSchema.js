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
          name: "location",
          type: "text",
          label: "Location",
          placeholder: "e.g., Main Street Run, Lift 3",
          requiredByPatient: false,
          maxLength: 100,
          printable: true,
          validation: {
            type: "required",
            message: "Location is required",
          },
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
          name: "patientName",
          type: "text",
          label: "Patient Name",
          placeholder: "Full name",
          requiredByPatient: true,
          maxLength: 100,
          printable: true,
        },
        {
          name: "patientBirthdate",
          type: "date",
          label: "Date of Birth",
          requiredByPatient: true,
          printable: true,
        },
        {
          name: "patientAge",
          type: "number",
          label: "Age",
          placeholder: "Age",
          requiredByPatient: true,
          printable: true,
        },
        {
          name: "patientPhoneNumber",
          type: "text",
          label: "Phone Number",
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
          name: "patientGender",
          type: "radio",
          label: "Gender",
          requiredByPatient: true,
          options: [
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "non-binary", label: "Non-Binary" },
          ],
          printable: true,
        },
        {
          name: "patientWeight",
          type: "number",
          label: "Weight (lbs)",
          placeholder: "Weight",
          requiredByPatient: true,
          printable: true,
        },
        {
          name: "patientHeight",
          type: "text",
          label: "Height",
          placeholder: "e.g., 5'10\"",
          requiredByPatient: true,
          maxLength: 20,
          printable: true,
        },
        {
          name: "guestType",
          type: "radio",
          label: "Guest Type",
          requiredByPatient: true,
          options: [
            { value: "day-ticket", label: "Day Ticket" },
            { value: "season-pass", label: "Season Pass" },
            { value: "card-holder", label: "Card Holder" },
            { value: "staff", label: "Staff" },
            { value: "staff-off-duty", label: "Staff (Off Duty)" },
            { value: "other", label: "Other" },
          ],
          printable: true,
        },
        {
          name: "patientDescription",
          type: "textarea",
          label: "Patient Description",
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
            { value: "guardian", label: "Guardian" },
            { value: "other", label: "Other" },
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
