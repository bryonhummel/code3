import { useState, useCallback, useMemo } from 'react';
import { validatePhoneNumber } from '../utils/validation';

export function useFormValidation(formData, schema, unavailableFields = []) {
  const [errors, setErrors] = useState({});

  // Get all required fields from schema
  const requiredFields = useMemo(() => {
    return schema.sections
      .flatMap((section) => section.fields)
      .filter((field) => field.required)
      .map((field) => field.name);
  }, [schema]);

  // Validate a single field
  const validateField = useCallback(
    (fieldName, value) => {
      const field = schema.sections
        .flatMap((s) => s.fields)
        .find((f) => f.name === fieldName);

      if (!field) return null;

      // Required field validation
      if (field.required) {
        if (!value || (typeof value === "string" && value.trim() === "")) {
          return field.validation?.message || `${field.label} is required`;
        }

        // For arrays (checkboxes), check if at least one is selected
        if (Array.isArray(value) && value.length === 0) {
          return field.validation?.message || `${field.label} is required`;
        }
      }

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

  // Calculate completion percentage
  const calculateCompletion = useCallback(() => {
    const completed = requiredFields.filter((fieldName) => {
      // If field is marked as unavailable, consider it complete
      if (unavailableFields.includes(fieldName)) return true;

      const value = formData[fieldName];

      // Check if value exists and is not empty
      if (!value) return false;
      if (typeof value === "string" && value.trim() === "") return false;
      if (Array.isArray(value) && value.length === 0) return false;

      return true;
    });

    return Math.round((completed.length / requiredFields.length) * 100);
  }, [formData, requiredFields, unavailableFields]);

  // Get list of incomplete required fields
  const getIncompleteFields = useCallback(() => {
    return requiredFields
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
  }, [formData, requiredFields, schema, unavailableFields]);

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
    requiredFields,
  };
}
