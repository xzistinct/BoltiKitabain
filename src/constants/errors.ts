export const errors = {
  "No Internet": 0,
  "Invalid credentials": 1,
  "Insufficient information": 2,
  "Email already registered": 3,
  "Failed to store credentials": 4,
  "Already authenticated": 5,
  "Login failed unknown reason": 6,
  "Email not registered": 7,
  "Failed to store user information": 8,
  "Failed to retrieve user information": 9,
  "Failed to get credentials from storage": 10,
  "Unknown error": 100,
  "Unknown internal error": 200,
  "Redux state did not initialize": 201,
} as const;

export const getErrorFromCode = (code: number) => {
  const error = Object.entries(errors).find(([, value]) => value === code);
  return error ? error[0] : "Unknown error";
};
