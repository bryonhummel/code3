import { useState, useCallback } from 'react';

export function useFormData(initialData = {}) {
  const [formData, setFormData] = useState(initialData);
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleBlur = useCallback((fieldName) => {
    setTouched(prev => ({ 
      ...prev, 
      [fieldName]: true 
    }));
  }, []);

  const setFieldValue = useCallback((fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  }, []);

  const resetForm = useCallback((newData = {}) => {
    setFormData(newData);
    setTouched({});
  }, []);

  const markAllTouched = useCallback(() => {
    const allFields = Object.keys(formData);
    const allTouched = {};
    allFields.forEach(field => {
      allTouched[field] = true;
    });
    setTouched(allTouched);
  }, [formData]);

  return {
    formData,
    setFormData,
    touched,
    setTouched,
    handleChange,
    handleBlur,
    setFieldValue,
    resetForm,
    markAllTouched
  };
}
