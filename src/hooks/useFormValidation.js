import { useState, useCallback, useMemo } from 'react';
import { validatePhoneNumber } from '../utils/validation';

export function useFormValidation(formData, schema, unavailableFields = []) {
  const [errors, setErrors] = useState({});

  // Get all fields required by patient from schema
  const requiredByPatientFields = useMemo(() => {
    return schema.sections
      .flatMap((section) => section.fields)
      .filter((field) => field.requiredByPatient)
      .map((field) => field.name);
  }, [schema]);

  // Validate a single field
  const validateField = useCallback(
    (fieldName, value) => {
      const field = schema.sections
        .flatMap((s) => s.fields)
        .find((f) => f.name === fieldName);

      if (!field) return null;

      // Required field validation - all fields are technically required, so don't display this special warning for empty fields.
      // all we care about is an error message for specific form data validation (not empty)
      // if (field.required) {
      //   if (!value || (typeof value === "string" && value.trim() === "")) {
      //     return field.validation?.message || `${field.label} is required`;
      //   }

      //   // For arrays (checkboxes), check if at least one is selected
      //   if (Array.isArray(value) && value.length === 0) {
      //     return field.validation?.message || `${field.label} is required`;
      //   }
      // }

      // Phone number validation
      if (field.validation?.type === "phone" && value) {
        if (!validatePhoneNumber(value)) {
          return (
            field.validation?.message || "Please enter a valid phone number"
          );
        }
      }

      // Custom validation function
      if (field.validation?.custom) {
        const customError = field.validation.custom(value, formData);
        if (customError) return customError;
      }

      return null;
    },
    [schema, formData],
  );

  // Validate all fields
  const validate = useCallback(() => {
    const newErrors = {};

    schema.sections.forEach((section) => {
      section.fields.forEach((field) => {
        const value = formData[field.name];
        const error = validateField(field.name, value);
        if (error) {
          newErrors[field.name] = error;
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [schema, formData, validateField]);

  // Get all fields from schema (both required and non-required)
  const allFields = useMemo(() => {
    return schema.sections
      .flatMap((section) => section.fields)
      .map((field) => field.name);
  }, [schema]);

  // Calculate completion metrics for stacked progress bar
  const calculateCompletion = useCallback(() => {
    // Count completed requiredByPatient fields
    const completedRequired = requiredByPatientFields.filter((fieldName) => {
      // If field is marked as unavailable, consider it complete
      if (unavailableFields.includes(fieldName)) return true;

      const value = formData[fieldName];

      // Check if value exists and is not empty
      if (!value) return false;
      if (typeof value === "string" && value.trim() === "") return false;
      if (Array.isArray(value) && value.length === 0) return false;

      return true;
    }).length;

    // Get non-required fields
    const nonRequiredFields = allFields.filter(
      (fieldName) => !requiredByPatientFields.includes(fieldName),
    );

    // Count completed non-required fields
    const completedNonRequired = nonRequiredFields.filter((fieldName) => {
      // If field is marked as unavailable, consider it complete
      if (unavailableFields.includes(fieldName)) return true;

      const value = formData[fieldName];

      // Check if value exists and is not empty
      if (!value) return false;
      if (typeof value === "string" && value.trim() === "") return false;
      if (Array.isArray(value) && value.length === 0) return false;

      return true;
    }).length;

    const totalFields = allFields.length;
    const totalCompleted = completedRequired + completedNonRequired;
    const overallPercentage = Math.round((totalCompleted / totalFields) * 100);

    // Calculate percentages for stacked bar
    const requiredPercentage = Math.round(
      (completedRequired / totalFields) * 100,
    );
    const nonRequiredPercentage = Math.round(
      (completedNonRequired / totalFields) * 100,
    );

    // Calculate the threshold where requiredByPatient would be 100%
    const requiredThresholdPercentage = Math.round(
      (requiredByPatientFields.length / totalFields) * 100,
    );

    return {
      overallPercentage,
      requiredPercentage,
      nonRequiredPercentage,
      requiredThresholdPercentage,
      completedRequired,
      totalRequired: requiredByPatientFields.length,
      completedNonRequired,
      totalNonRequired: nonRequiredFields.length,
      totalCompleted,
      totalFields,
    };
  }, [formData, requiredByPatientFields, unavailableFields, allFields]);

  // Get list of incomplete requiredByPatient fields
  const getIncompleteFields = useCallback(() => {
    return requiredByPatientFields
      .filter((fieldName) => {
        // If field is marked as unavailable, don't consider it incomplete
        if (unavailableFields.includes(fieldName)) return false;

        const value = formData[fieldName];

        if (!value) return true;
        if (typeof value === "string" && value.trim() === "") return true;
        if (Array.isArray(value) && value.length === 0) return true;

        return false;
      })
      .map((fieldName) => {
        const field = schema.sections
          .flatMap((s) => s.fields)
          .find((f) => f.name === fieldName);
        return {
          name: fieldName,
          label: field?.label || fieldName,
        };
      });
  }, [formData, requiredByPatientFields, schema, unavailableFields]);

  // Validate single field on blur
  const validateOnBlur = useCallback(
    (fieldName) => {
      const value = formData[fieldName];
      const error = validateField(fieldName, value);

      setErrors((prev) => {
        if (error) {
          return { ...prev, [fieldName]: error };
        } else {
          const { [fieldName]: removed, ...rest } = prev;
          return rest;
        }
      });
    },
    [formData, validateField],
  );

  return {
    errors,
    setErrors,
    validate,
    validateField,
    validateOnBlur,
    calculateCompletion,
    getIncompleteFields,
    requiredByPatientFields,
  };
}
