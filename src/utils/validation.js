// Validation utility functions

/**
 * Validates a phone number
 * Accepts formats like: (555) 123-4567, 555-123-4567, 5551234567, etc.
 */
export function validatePhoneNumber(phone) {
  if (!phone) return false;
  
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Check if it has 10 or 11 digits (with optional country code)
  return digitsOnly.length === 10 || digitsOnly.length === 11;
}

/**
 * Formats a phone number to (XXX) XXX-XXXX format
 */
export function formatPhoneNumber(phone) {
  if (!phone) return '';
  
  const digitsOnly = phone.replace(/\D/g, '');
  
  if (digitsOnly.length === 10) {
    return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
  }
  
  if (digitsOnly.length === 11) {
    return `+${digitsOnly[0]} (${digitsOnly.slice(1, 4)}) ${digitsOnly.slice(4, 7)}-${digitsOnly.slice(7)}`;
  }
  
  return phone;
}

/**
 * Validates an email address
 */
export function validateEmail(email) {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a date is not in the future
 */
export function validateDateNotFuture(dateString) {
  if (!dateString) return true; // Allow empty
  
  const inputDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return inputDate <= today;
}

/**
 * Validates a number is within a range
 */
export function validateNumberRange(value, min, max) {
  const num = Number(value);
  
  if (isNaN(num)) return false;
  if (min !== undefined && num < min) return false;
  if (max !== undefined && num > max) return false;
  
  return true;
}
