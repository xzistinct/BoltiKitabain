// Define error codes with a check for uniqueness
export const errors = {
  "No Internet": 0,
  "Invalid credentials": 1,
  "Already authenticated": 2,
  "Insufficient information": 3,
  "Email already registered": 4,
  "Email not registered": 5,
  "Failed to store credentials": 6,
  "Failed to parse server response": 7,
  "Failed to store user information": 8,
  "Failed to retrieve user information": 9,
  "Failed to get credentials from storage": 10,
  "Unknown error": 100,
  "Unknown internal error": 200,
  "Redux state did not initialize": 201,
  "Failed to get appropriate response from server": 202,
  "Failed to initialize book state": 203,
  "Data already exists": 204,
  "Redux state not initialized": 205,
} as const;

// Runtime check to catch duplicate values during development
(() => {
  const values = Object.values(errors);
  const uniqueValues = new Set(values);
  if (values.length !== uniqueValues.size) {
    const duplicates: Record<number, string[]> = {};
    Object.entries(errors).forEach(([key, val]) => {
      if (!duplicates[val]) duplicates[val] = [];
      duplicates[val].push(key);
    });

    const duplicateEntries = Object.entries(duplicates).filter(
      ([_, keys]) => keys.length > 1
    );

    throw new Error(
      `Duplicate error codes found: ${duplicateEntries
        .map(([code, keys]) => `${code} used by [${keys.join(", ")}]`)
        .join(", ")}`
    );
  }
})();

// Type to ensure value uniqueness at compile time
type ValuesOf<T> = T[keyof T];
type ErrorValues = ValuesOf<typeof errors>;

export const getErrorFromCode = (code: number) => {
  const error = Object.entries(errors).find(([, value]) => value === code);
  return error ? error[0] : "Unknown error";
};
