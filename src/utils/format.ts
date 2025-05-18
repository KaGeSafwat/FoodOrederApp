/**
 * format.js - Utility functions for formatting data in the application
 */

/**
 * Format a date string into a readable format
 * @param {string} dateString - The date string to format
 * @param {Object} options - Formatting options for toLocaleDateString
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString: string, options = {}) => {
  if (!dateString) return 'Unknown date';

  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    // Default options for date formatting
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    // Merge default options with provided options
    const formattingOptions: Intl.DateTimeFormatOptions = {
      ...defaultOptions,
      ...options,
    };

    return date.toLocaleDateString('en-US', formattingOptions);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Date error';
  }
};

/**
 * Format a date string to show time
 * @param {string} dateString - The date string to format
 * @param {Object} options - Formatting options for toLocaleTimeString
 * @returns {string} Formatted time string
 */
export const formatTime = (dateString: string, options = {}) => {
  if (!dateString) return 'Unknown time';

  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid time';
    }

    // Default options for time formatting
    const defaultOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };

    // Merge default options with provided options
    const formattingOptions: Intl.DateTimeFormatOptions = {
      ...defaultOptions,
      ...options,
    };

    return date.toLocaleTimeString('en-US', formattingOptions);
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'Time error';
  }
};

/**
 * Format a date string to show both date and time
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (dateString: string) => {
  if (!dateString) return 'Unknown date/time';

  try {
    const date = formatDate(dateString);
    const time = formatTime(dateString);

    return `${date} at ${time}`;
  } catch (error) {
    console.error('Error formatting date and time:', error);
    return 'Date/time error';
  }
};

/**
 * Format a date string to show relative time (e.g., "2 days ago")
 * @param {string} dateString - The date string to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (dateString: string) => {
  if (!dateString) return 'Unknown time';

  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const now = new Date();
    const diffInSeconds: number = Math.floor(
      (now.getTime() - date.getTime()) / 1000
    );

    // Less than a minute
    if (diffInSeconds < 60) {
      return 'Just now';
    }

    // Less than an hour
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }

    // Less than a day
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }

    // Less than a week
    if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }

    // Default to standard date format for older dates
    return formatDate(dateString);
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return 'Time error';
  }
};

/**
 * Truncate text to a specified length and add ellipsis if needed
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export const truncateText = (text: string, maxLength = 150) => {
  if (!text) return 'No content available';

  if (text.length <= maxLength) {
    return text;
  }

  // Find the last space before maxLength to avoid cutting words
  const lastSpace = text.lastIndexOf(' ', maxLength);
  const truncateIndex = lastSpace > maxLength / 2 ? lastSpace : maxLength;

  return text.substring(0, truncateIndex) + '...';
};

/**
 * Format a number with commas as thousands separators
 * @param {number} number - The number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (number: number) => {
  if (number === null || number === undefined) return 'N/A';

  try {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } catch (error) {
    console.error('Error formatting number:', error);
    return 'Error';
  }
};

/**
 * Format a number as currency
 * @param {number} amount - The amount to format
 * @param {string} currency - The currency code (default: USD)
 * @returns {string} Formatted currency
 */
export const formatCurrency = (amount: number, currency = 'USD') => {
  if (amount === null || amount === undefined) return 'N/A';

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return 'Error';
  }
};

/**
 * Format a file size in bytes to a human-readable format
 * @param {number} bytes - The file size in bytes
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  if (!bytes) return 'Unknown size';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i]
  );
};

/**
 * Capitalize the first letter of a string
 * @param {string} text - The text to capitalize
 * @returns {string} Capitalized text
 */
export const capitalizeFirstLetter = (text: string) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Convert a string to title case (capitalize first letter of each word)
 * @param {string} text - The text to convert
 * @returns {string} Title case text
 */
export const toTitleCase = (text: string) => {
  if (!text) return '';

  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Format a phone number to a standard format (XXX) XXX-XXXX
 * @param {string} phoneNumber - The phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) return '';

  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');

  // Check if the input is of correct length
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }

  return phoneNumber;
};

/**
 * Format a username by removing special characters and spaces
 * @param {string} username - The username to format
 * @returns {string} Formatted username
 */
export const formatUsername = (username: string) => {
  if (!username) return '';

  // Remove special characters and spaces, convert to lowercase
  return username.toLowerCase().replace(/[^\w]/g, '');
};

/**
 * Format an email address to hide part of it for privacy
 * @param {string} email - The email to format
 * @returns {string} Partially hidden email
 */
export const formatEmailForPrivacy = (email: string) => {
  if (!email) return '';
  if (!email.includes('@')) return email;

  const [username, domain] = email.split('@');
  const hiddenUsername =
    username.charAt(0) +
    '*'.repeat(Math.max(1, username.length - 2)) +
    username.charAt(username.length - 1);

  return `${hiddenUsername}@${domain}`;
};
