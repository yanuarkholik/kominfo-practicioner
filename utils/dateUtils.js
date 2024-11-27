/**
 * Formats the provided date into a readable string in the format: "Day Month Year"
 *
 * @param {Date} [date=new Date()] - The date to format. Defaults to the current date if not provided.
 * @param {number} [day=0] - The number of days to add to or subtract from the provided date.
 * @param {number} [month=0] - The number of months to add to or subtract from the provided date.
 * @param {number} [year=0] - The number of years to add to or subtract from the provided date.
 * @returns {string} The formatted date as a string in the format "Day Month Year", adjusted if necessary.
 */
function formatDate2(date = new Date(), day = 0, month = 0, year = 0) {
  let adjustedDate = new Date(date);  // Create a copy of the original date to avoid modifying it directly.
  
  // Apply the adjustments for day, month, and year.
  adjustedDate.setDate(adjustedDate.getDate() + day);
  adjustedDate.setMonth(adjustedDate.getMonth() + month);
  adjustedDate.setFullYear(adjustedDate.getFullYear() + year);

  const dayOfMonth = adjustedDate.getDate();  // Get the adjusted day of the month (1-31).
  const yearAdjusted = adjustedDate.getFullYear();  // Get the adjusted full year (e.g., 2024).
  
  // Get the month name (e.g., "January", "February", etc.) using toLocaleString.
  const monthName = adjustedDate.toLocaleString('default', { month: 'long' });

  // Return the formatted and adjusted date in the "Day Month Year" format.
  return `${dayOfMonth} ${monthName} ${yearAdjusted}`;
}

/**
 * Formats a Date object into a string optimized for use as a filename.
 * 
 * The formatted string includes the date and time with precise milliseconds in the format:
 * "YYYY-MM-DD_HH-MM-SS-SSS".
 * 
 * Example output: "2024-11-23_15-30-45-123".
 * 
 * @param {Date} date - The Date object to format.
 * @returns {string} A string representation of the date and time, suitable for filenames.
 */

function formatDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}-${milliseconds}`;
}


module.exports = {
  formatDate: formatDate,
  formatDate2: formatDate2
}